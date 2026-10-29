const fs = require('fs');
const path = require('path');

const RAW = path.resolve(__dirname, '..', 'raw');
const html = fs.readFileSync(path.join(RAW, 'crm_build.html'), 'utf8');

// 找到侧边栏起点
const markers = ['sidebar-links', 'class="sidebar"', 'aside'];
for (const m of markers) {
  console.log(m, '=>', html.indexOf(m));
}

const i = html.indexOf('class="sidebar-links"');
if (i >= 0) {
  const start = html.lastIndexOf('<', i);
  console.log('--- first 1200 chars of sidebar ---');
  console.log(html.slice(start, start + 1200));
  // 粗略统计 ul 平衡
  const seg = html.slice(start);
  let depth = 0, end = -1;
  const re = /<\/?ul\b[^>]*>/g;
  let m2;
  while ((m2 = re.exec(seg))) {
    if (m2[0].startsWith('</')) depth--; else depth++;
    if (depth === 0) { end = start + m2.index + m2[0].length; break; }
  }
  console.log('--- sidebar end index', end, 'len', end - start);
  if (end > 0) {
    const sb = html.slice(start, end);
    fs.writeFileSync(path.join(RAW, '_sidebar.html'), sb, 'utf8');
    const links = [...sb.matchAll(/href="(\/[^"#?]*)"/g)].map((x) => x[1]);
    console.log('sidebar links:', new Set(links).size);
  }
}
