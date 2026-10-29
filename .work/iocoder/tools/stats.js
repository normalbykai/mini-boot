const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '..', 'site');
const s = fs.readFileSync(path.join(dir, 'sidebar.html'), 'utf8');
const pages = JSON.parse(fs.readFileSync(path.join(dir, 'pages.json'), 'utf8'));

const parts = s.split(/<section class="sidebar-group depth-0">/).slice(1);
let total = 0;
const rows = [];
for (const p of parts) {
  const name = (p.match(/<span>([^<]+)<\/span>/) || [])[1] || '?';
  const hrefs = [...p.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]);
  const uniq = [...new Set(hrefs)].filter((h) => pages[h]);
  total += uniq.length;
  rows.push([name, uniq.length]);
}
rows.sort((a, b) => b[1] - a[1]);
rows.forEach((r) => console.log(r[1] + '\t' + r[0]));
console.log('TOTAL\t' + total + ' / ' + Object.keys(pages).length);
