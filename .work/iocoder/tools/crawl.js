const fs = require('fs');
const path = require('path');
const http = require('https');

const BASE = 'https://doc.iocoder.cn';
const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'site');
fs.mkdirSync(SITE, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function get(url, tries = 3) {
  return new Promise((resolve, reject) => {
    const req = http.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
          'Accept-Encoding': 'gzip, deflate, br',
          Accept: 'text/html,application/xhtml+xml',
          'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        },
      },
      (res) => {
        if ([301, 302, 307, 308].includes(res.statusCode)) {
          res.resume();
          const loc = new URL(res.headers.location, url).href;
          return resolve(get(loc, tries));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error('HTTP ' + res.statusCode + ' ' + url));
        }
        const chunks = [];
        let stream = res;
        if (/gzip/.test(res.headers['content-encoding'] || '')) stream = res.pipe(require('zlib').createGunzip());
        else if (/deflate/.test(res.headers['content-encoding'] || '')) stream = res.pipe(require('zlib').createInflate());
        else if (/br/.test(res.headers['content-encoding'] || '')) stream = res.pipe(require('zlib').createBrotliDecompress());
        stream.on('data', (c) => chunks.push(c));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        stream.on('error', reject);
      }
    );
    req.on('error', (e) => {
      if (tries > 1) return setTimeout(() => get(url, tries - 1).then(resolve, reject), 1200);
      reject(e);
    });
    req.setTimeout(30000, () => req.destroy(new Error('timeout ' + url)));
  });
}

const seedFile = path.join(ROOT, 'raw', 'crm_build.html');
const seedHtml = fs.readFileSync(seedFile, 'utf8');

function linksFrom(html) {
  return [...html.matchAll(/href="(\/[^"#?]*?)"/g)].map((m) => m[1]);
}

const isDocPath = (p) =>
  /^\/(?:[\w\-.%]+\/)*$/.test(p) &&
  !p.startsWith('/assets/') &&
  !p.startsWith('/img/') &&
  !p.endsWith('/img/') &&
  p !== '/';

function extractPage(html) {
  const s = html.indexOf('content__default');
  const e = html.indexOf('page-edit');
  if (s < 0 || e < s) return null;
  if (html.includes('看来我们的链接坏掉了')) return null;
  let seg = html.slice(s, e);
  seg = seg.replace(/^content__default"?>/, '');
  seg = seg.replace(/<style>[\s\S]*$/i, '');
  seg = seg.replace(/<script[\s\S]*$/i, '');
  seg = seg.replace(/<div class="page-edit[\s\S]*$/i, '');
  return seg.trim();
}

function titleOf(html, p) {
  const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html.slice(html.indexOf('content__default')));
  const pick = (t) =>
    t
      .replace(/<a[^>]*class="header-anchor"[\s\S]*?<\/a>/g, '')
      .replace(/<[^>]+>/g, '')
      .trim();
  if (h1) {
    const t = pick(h1[1]);
    if (t) return t;
  }
  const t = /<title>([\s\S]*?)<\/title>/.exec(html);
  return t ? pick(t[1]).replace(/\s*\|\s*ruoyi-vue-pro 开发指南\s*$/, '') : p;
}

(async () => {
  const queue = [];
  const seen = new Set();
  const add = (p) => {
    if (!p || seen.has(p) || !isDocPath(p)) return;
    seen.add(p);
    queue.push(p);
  };

  for (const p of linksFrom(seedHtml)) add(p);
  add('/intro/');
  add('/');

  if (process.env.LIMIT) queue.length = Math.min(queue.length, Number(process.env.LIMIT));

  const pages = {};
  const failed = [];
  let done = 0;

  while (queue.length) {
    const batch = queue.splice(0, 4);
    await Promise.all(
      batch.map(async (p) => {
        const url = BASE + p;
        try {
          const html = await get(url);
          const content = extractPage(html);
          if (!content) {
            failed.push(p + ' (empty/404)');
            return;
          }
          pages[p] = { p, title: titleOf(html, p), content };
          // 从正文里补充发现的文档链接
          for (const l of linksFrom(content)) add(l);
        } catch (e) {
          failed.push(p + ' ' + e.message);
        }
      })
    );
    done += batch.length;
    if (done % 40 === 0) console.log('done', done, 'queue', queue.length, 'pages', Object.keys(pages).length);
    await sleep(350);
  }

  fs.writeFileSync(path.join(SITE, 'pages.json'), JSON.stringify(pages), 'utf8');
  fs.writeFileSync(path.join(SITE, 'failed.json'), JSON.stringify(failed, null, 2), 'utf8');
  console.log('TOTAL pages:', Object.keys(pages).length, 'failed:', failed.length);

  // 顺带保存侧边栏 HTML
  const i = seedHtml.indexOf('class="sidebar-links"');
  const start = seedHtml.lastIndexOf('<', i);
  let depth = 0, end = -1;
  const seg = seedHtml.slice(start);
  const re = /<\/?ul\b[^>]*>/g;
  let m2;
  while ((m2 = re.exec(seg))) {
    if (m2[0].startsWith('</')) depth--; else depth++;
    if (depth === 0) { end = start + m2.index + m2[0].length; break; }
  }
  fs.writeFileSync(path.join(SITE, 'sidebar.html'), seedHtml.slice(start, end), 'utf8');

  // 导航栏
  const ns = seedHtml.indexOf('<header class="navbar"');
  console.log('navbar idx', ns);
})();
