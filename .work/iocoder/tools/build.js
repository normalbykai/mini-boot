const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'site');
const BASE = 'https://doc.iocoder.cn';

const pages = JSON.parse(fs.readFileSync(path.join(SITE, 'pages.json'), 'utf8'));
const sidebarRaw = fs.readFileSync(path.join(SITE, 'sidebar.html'), 'utf8');
const css = fs.readFileSync(path.join(SITE, 'site.css'), 'utf8');
const seed = fs.readFileSync(path.join(ROOT, 'raw', 'crm_build.html'), 'utf8');

// ---------- 导航栏 ----------
const navbarStart = seed.indexOf('<header class="navbar');
const navbarEnd = seed.indexOf('</header>', navbarStart) + '</header>'.length;
let navbar = seed.slice(navbarStart, navbarEnd);

// 去掉原站依赖 JS 的搜索框与下拉菜单里的外链标记，保留外形
navbar = navbar.replace(/<div class="search-box"[\s\S]*?<\/div>\s*<\/div>/, (m) => m);

// ---------- 侧边栏 ----------
// 去掉「当前页子标题」列表（仅在种子页存在，且指向页内锚点）
function stripByClass(html, cls) {
  let out = html;
  for (;;) {
    const i = out.indexOf(`<ul class="${cls}"`);
    if (i < 0) return out;
    const re = /<\/?ul\b[^>]*>/g;
    re.lastIndex = i;
    let depth = 0, end = -1, m;
    while ((m = re.exec(out))) {
      depth += m[0].startsWith('</') ? -1 : 1;
      if (depth === 0) { end = m.index + m[0].length; break; }
    }
    if (end < 0) return out;
    out = out.slice(0, i) + out.slice(end);
  }
}

const sidebarClean = stripByClass(sidebarRaw, 'sidebar-sub-headers');

const sidebarOrder = [...sidebarClean.matchAll(/<a href="(\/[^"]*)"[^>]*class="([^"]*sidebar-link[^"]*)"[^>]*>([\s\S]*?)<\/a>/g)]
  .filter((m) => !/sidebar-sub-header/.test(m[2]))
  .map((m) => ({ p: m[1], label: m[3].replace(/<[^>]+>/g, '').trim() }));

const seenOrder = new Set();
const order = [];
for (const it of sidebarOrder) {
  if (pages[it.p] && !seenOrder.has(it.p)) {
    seenOrder.add(it.p);
    order.push(it.p);
  }
}
// 未出现在侧边栏的页面，按路径补到末尾
const extra = Object.keys(pages).filter((p) => !seenOrder.has(p)).sort();
const allOrder = order.concat(extra);

// 侧边栏链接改为 hash 路由，并打上 data-path
const sidebar = sidebarClean.replace(/<a\b([^>]*)>/g, (m, attrs) => {
  const hrefM = /href="(\/[^"]*)"/.exec(attrs);
  if (!hrefM) return m;
  const href = hrefM[1];
  const cls = ((/class="([^"]*)"/.exec(attrs) || [, ''])[1] || '')
    .split(/\s+/)
    .filter((c) => c && c !== 'active' && c !== 'router-link-active' && c !== 'router-link-exact-active')
    .join(' ');
  if (!/\bsidebar-link\b/.test(cls)) return m;
  const rest = attrs
    .replace(/\s*href="[^"]*"/, '')
    .replace(/\s*class="[^"]*"/, '')
    .replace(/\s*aria-current="[^"]*"/, '')
    .replace(/\s*data-path="[^"]*"/, '');
  if (pages[href]) return `<a href="#${href}" data-path="${href}" class="${cls}"${rest}>`;
  return `<a href="${BASE}${href}" target="_blank" rel="noopener" class="${cls} missing"${rest}>`;
});

// 导航栏入口指向站内页面
const navPatch = navbar
  .replace(/href="\/"/g, `href="#${allOrder[0] || '/'}"`)
  .replace(/href="(\/[a-z0-9\-]+\/)"/g, (m, href) => (pages[href] ? `href="#${href}"` : m))
  .replace(/<!---->/g, '');

// ---------- 内容处理 ----------
function processContent(html, p) {
  let s = html;

  // 内部文档链接 -> hash 路由；其它内部链接 -> 原站绝对地址
  s = s.replace(/href="(\/[^"#?]*?)"/g, (m, href) => {
    if (pages[href]) return `href="#${href}"`;
    if (href.startsWith('/img/') || href.startsWith('/assets/')) return `href="${BASE}${href}" target="_blank" rel="noopener"`;
    return `href="${BASE}${href}" target="_blank" rel="noopener"`;
  });

  // 图片绝对化，懒加载
  s = s.replace(/<img([^>]*?)src="(\/[^"]*?)"/g, (m, pre, src) => `<img${pre}src="${BASE}${src}" loading="lazy"`);
  s = s.replace(/<img([^>]*?)src="(?!https?:)([^"]*?)"/g, (m, pre, src) => `<img${pre}src="${BASE}/${src}" loading="lazy"`);

  // 站外链接新窗口打开
  s = s.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a target="_blank" rel="noopener" href="$1"');

  return s;
}

const data = {};
const tocData = {};
for (const p of allOrder) {
  let c = processContent(pages[p].content, p);
  if (!/<h1[\s>]/.test(c.slice(0, 400))) {
    c = `<h1 class="page-title">${pages[p].title}</h1>\n` + c;
  } else {
    c = c.replace(/<h1([^>]*)>([\s\S]*?)<\/h1>/, (m, attrs, inner) => `<h1${attrs} class="page-title">${inner}</h1>`);
  }
  data[p] = { t: pages[p].title, h: c };
  tocData[p] = [...c.matchAll(/<h([23])[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/h\1>/g)].map((m) => ({
    l: Number(m[1]),
    id: m[2],
    t: m[3]
      .replace(/<a[^>]*header-anchor[\s\S]*?<\/a>/g, '')
      .replace(/<[^>]+>/g, '')
      .trim(),
  }));
}

// ---------- 生成 HTML ----------
const overrideCss = `
:root{--contentWidth:48rem}
html{scroll-behavior:smooth}
body{margin:0}
.navbar .search-box{display:none}
.navbar .site-name{white-space:nowrap}
.theme-container .sidebar{transform:none}
@media (max-width:719px){.theme-container .sidebar{transform:translateX(-100%)}.theme-container.sidebar-open .sidebar{transform:translateX(0)}}
@media (min-width:720px){.page{padding-left:18rem!important;padding-right:1rem}}
.page .theme-vdoing-content{max-width:46rem;margin:0 auto;padding:2rem 2rem 4rem}
.page .theme-vdoing-content>:first-child{margin-top:0!important;padding-top:0!important}
.page .theme-vdoing-content>h1:first-child{display:block!important}
.page .theme-vdoing-content>h1:first-child+.custom-block,
.page .theme-vdoing-content>h1:first-child+p,
.page .theme-vdoing-content>h1:first-child+pre{margin-top:1rem}
.page .theme-vdoing-content h1{font-size:1.9rem;margin-bottom:1rem}
.page .theme-vdoing-content img{max-width:100%;border:1px solid #eee;border-radius:4px}
.page .theme-vdoing-content pre{background:#282c34;color:#abb2bf;border-radius:6px;padding:1rem 1.1rem;overflow:auto;font-size:.86rem;line-height:1.6}
.page .theme-vdoing-content pre code{background:transparent;color:inherit;padding:0;font-size:inherit}
.page .theme-vdoing-content :not(pre)>code{background:rgba(27,31,35,.06);color:#e96900;padding:.15rem .35rem;border-radius:4px;font-size:.88em}
.page .theme-vdoing-content table{display:block;overflow-x:auto;border-collapse:collapse}
.page .theme-vdoing-content table th,.page .theme-vdoing-content table td{border:1px solid #e6e6e6;padding:.5rem .8rem}
.page .theme-vdoing-content blockquote{border-left:4px solid #42b983;background:#f6f8fa;margin:1rem 0;padding:.6rem 1rem;color:#555}
.page .theme-vdoing-content blockquote p{margin:.3rem 0}
.header-anchor{display:none}
.custom-block{padding:.6rem 1.2rem;border-left:4px solid #42b983;background:#f6f8fa;border-radius:4px;margin:1rem 0}
.custom-block.tip{border-color:#42b983}.custom-block.warning{border-color:#e7c000;background:#fffbe6}.custom-block.danger{border-color:#c00;background:#fff2f2}
.custom-block-title{font-weight:700;margin:.2rem 0}

/* 顶部搜索 */
.local-search{position:relative;margin:.6rem 1rem 0;display:flex;align-items:center}
.local-search input{width:100%;box-sizing:border-box;border:1px solid var(--borderColor,#eaecef);background:#fff;border-radius:5px;padding:.42rem .6rem .42rem 1.9rem;font-size:.9rem;color:#333;outline:none}
.local-search input:focus{border-color:#42b983}
.local-search svg{position:absolute;left:.55rem;width:1rem;height:1rem;opacity:.45}
.search-empty{display:none;padding:.8rem 1.1rem;color:#999;font-size:.9rem}

/* 侧边栏折叠 */
.sidebar-group .sidebar-heading{cursor:pointer;position:relative;user-select:none}
.sidebar-group .sidebar-heading:after{content:"▸";position:absolute;right:.7rem;top:.05rem;font-size:.8rem;color:#aaa;transition:transform .15s}
.sidebar-group.open>.sidebar-heading:after{transform:rotate(90deg)}
.sidebar-group:not(.open)>ul{display:none}
.sidebar-link.active{color:#42b983!important;font-weight:600;border-left-color:#42b983;background:rgba(66,185,131,.08)}

/* 正文底部 */
.doc-footer{border-top:1px solid #eee;margin-top:3rem;padding:1rem 2rem 3rem;display:flex;justify-content:space-between;gap:1rem;font-size:.92rem}
.doc-footer a{display:block;max-width:48%;color:#42b983}
.doc-footer .next{text-align:right;margin-left:auto}
.crumb{font-size:.85rem;color:#999;max-width:46rem;margin:4.4rem auto 0;padding:0 2rem;box-sizing:border-box}.crumb a{color:#42b983;text-decoration:none}.crumb-path{color:#666}

/* 右侧页内目录 */
.page-toc{position:fixed;right:.75rem;top:5rem;width:11rem;max-height:78vh;overflow:auto;font-size:.85rem;padding-left:.8rem;border-left:1px solid #eee}
.page-toc a{display:block;color:#666;padding:.18rem 0;text-decoration:none;border-left:2px solid transparent;padding-left:.45rem;margin-left:-.1rem}
.page-toc a:hover{color:#42b983}
.page-toc a.lv3{padding-left:1.15rem;color:#888}
@media (max-width:1399px){.page-toc{display:none}}
@media (min-width:1400px){.page{padding-right:15rem}}
`;

const boot = {
  pages: data,
  toc: tocData,
  order: allOrder,
  extra: extra,
};

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>ruoyi-vue-pro 开发指南 · 离线全站</title>
<style>${css}</style>
<style>${overrideCss}</style>
</head>
<body>
<div id="app">
  <div class="theme-container sidebar-open">
    ${navPatch}
    <div class="sidebar-mask"></div>
    <aside class="sidebar">
      <div class="local-search">
        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/></svg>
        <input id="search-input" type="search" placeholder="搜索文档标题…" autocomplete="off">
      </div>
      <div class="search-empty" id="search-empty">没有匹配的文档</div>
      ${sidebar}
    </aside>
    <main class="page">
      <div class="crumb" id="crumb"></div>
      <div class="theme-vdoing-content" id="content"></div>
      <div class="doc-footer" id="footer"></div>
    </main>
    <nav class="page-toc" id="page-toc"></nav>
  </div>
</div>
<script>window.__DOC__=${JSON.stringify(boot)};</script>
<script>
(function(){
  var D = window.__DOC__, P = D.pages, ORDER = D.order;
  var contentEl = document.getElementById('content');
  var crumbEl = document.getElementById('crumb');
  var tocEl = document.getElementById('page-toc');
  var footerEl = document.getElementById('footer');
  var HOME = ORDER[0] || '/';

  function norm(h){
    if(!h) return HOME;
    h = h.replace(/^#/, '');
    if(!h) return HOME;
    if(!h.startsWith('/')) h = '/' + h;
    if(!h.endsWith('/') && !/\\.html$/.test(h)) h += '/';
    return h;
  }

  function setActive(p){
    document.querySelectorAll('.sidebar-link.active').forEach(function(a){a.classList.remove('active','router-link-active')});
    var link = null;
    document.querySelectorAll('.sidebar-link[data-path]').forEach(function(a){
      if(a.getAttribute('data-path') === p) link = a;
    });
    if(!link) return;
    link.classList.add('active','router-link-active');
    // 自动展开所在分组
    var group = link.closest('.sidebar-group');
    while(group){
      group.classList.add('open');
      group = group.parentElement ? group.parentElement.closest('.sidebar-group') : null;
    }
    try{ link.scrollIntoView({block:'nearest'}); }catch(e){}
  }

  function buildToc(p){
    var items = (D.toc[p]||[]);
    if(items.length < 2){ tocEl.innerHTML=''; return; }
    tocEl.innerHTML = items.map(function(it){
      return '<a href="#'+it.id+'" class="lv'+it.l+'">'+it.t+'</a>';
    }).join('');
  }

  function buildFooter(p){
    var i = ORDER.indexOf(p);
    var prev = i > 0 ? ORDER[i-1] : null;
    var next = i >= 0 && i < ORDER.length-1 ? ORDER[i+1] : null;
    var html = '';
    html += prev ? '<a class="prev" href="#'+prev+'">← '+P[prev].t+'</a>' : '<span></span>';
    html += next ? '<a class="next" href="#'+next+'">'+P[next].t+' →</a>' : '<span></span>';
    footerEl.innerHTML = html;
  }

  function render(p, keepScroll){
    var page = P[p];
    if(!page){ location.hash = HOME; return; }
    contentEl.innerHTML = page.h;
    var grp = GRP[p] || '';
    crumbEl.innerHTML = (grp ? '<span class="crumb-path">' + grp + '</span> · ' : '') +
      '<a href="https://doc.iocoder.cn' + p + '" target="_blank" rel="noopener">原文链接 ↗</a>';
    document.title = page.t + (grp ? ' · ' + grp : '') + ' · ruoyi-vue-pro 开发指南';
    setActive(p);
    buildToc(p);
    buildFooter(p);
    if(!keepScroll) window.scrollTo({top:0,behavior:'instant'});
  }

  function route(){
    var p = norm(location.hash);
    if(!P[p]) { p = HOME; }
    render(p);
  }

  // 主动导航（同时兜底 hashchange 不可靠的情况）
  function go(target){
    if(norm(location.hash) !== norm('#' + target)){ location.hash = target; }
    route();
  }

  // 点击侧边栏链接
  document.addEventListener('click', function(e){
    var a = e.target.closest('a');
    if(!a) return;
    var href = a.getAttribute('href') || '';
    if(href.startsWith('#')){
      var target = href.slice(1);
      if(target.startsWith('/')){
        e.preventDefault();
        go(target);
        return;
      }
      // 页内锚点
      var el = document.getElementById(decodeURIComponent(target));
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
      return;
    }
    if(href.startsWith('http')){
      a.setAttribute('target','_blank');
    }
  });

  // 侧边栏分组折叠
  document.querySelectorAll('.sidebar-group > .sidebar-heading').forEach(function(h){
    h.addEventListener('click', function(){
      var g = h.parentElement;
      g.classList.toggle('open');
    });
  });

  // 默认展开首个分组 + 当前页分组
  (function(){
    var first = document.querySelector('.sidebar-group');
    if(first) first.classList.add('open');
  })();

  // 每页所属的分组路径（用于面包屑 / 标题）
  var GRP = {};
  document.querySelectorAll('.sidebar-link[data-path]').forEach(function(a){
    var names = [], g = a.closest('.sidebar-group');
    while(g){
      var h = g.querySelector(':scope > .sidebar-heading');
      if(h) names.unshift(h.textContent.trim());
      g = g.parentElement ? g.parentElement.closest('.sidebar-group') : null;
    }
    GRP[a.getAttribute('data-path')] = names.join(' / ');
  });

  // 快捷键：/ 聚焦搜索，Esc 清空
  document.addEventListener('keydown', function(e){
    if(e.key === '/' && document.activeElement !== input){
      e.preventDefault(); input.focus();
    } else if(e.key === 'Escape' && document.activeElement === input){
      input.value = ''; input.dispatchEvent(new Event('input')); input.blur();
    }
  });

  // 搜索
  var input = document.getElementById('search-input');
  var empty = document.getElementById('search-empty');
  input.addEventListener('input', function(){
    var q = input.value.trim().toLowerCase();
    var groups = document.querySelectorAll('.sidebar-group');
    var hit = 0;
    document.querySelectorAll('.sidebar-link').forEach(function(a){
      var t = (a.textContent || '').toLowerCase();
      var p = (a.getAttribute('data-path') || '').toLowerCase();
      var show = !q || t.indexOf(q) >= 0 || p.indexOf(q) >= 0;
      var li = a.parentElement;
      li.style.display = show ? '' : 'none';
      if(show) hit++;
    });
    groups.forEach(function(g){
      var any = Array.prototype.some.call(g.querySelectorAll('.sidebar-link'), function(a){ return a.parentElement.style.display !== 'none'; });
      var own = g.querySelector(':scope > .sidebar-heading');
      var selfMatch = own && q && own.textContent.toLowerCase().indexOf(q) >= 0;
      g.style.display = (any || selfMatch) ? '' : 'none';
      if(q && (any || selfMatch)) g.classList.add('open');
    });
    empty.style.display = q && !hit ? 'block' : 'none';
  });

  window.addEventListener('hashchange', route);
  route();
})();
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(SITE, 'index.html'), html, 'utf8');
console.log('pages:', allOrder.length, 'extra:', extra.length);
console.log('bytes:', fs.statSync(path.join(SITE, 'index.html')).size);






