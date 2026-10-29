const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');
const { gfm } = require('turndown-plugin-gfm');

const RAW = path.resolve(__dirname, '..', 'raw');
const OUT = path.resolve(__dirname, '..', 'out');
fs.mkdirSync(OUT, { recursive: true });

const PAGES = [
  ['crm-preview', 'CRM 系统概述', 'https://doc.iocoder.cn/crm-preview/'],
  ['crm_build', '功能开启', 'https://doc.iocoder.cn/crm/build/'],
  ['crm_customer', '客户管理', 'https://doc.iocoder.cn/crm/customer/'],
  ['crm_clue', '线索管理', 'https://doc.iocoder.cn/crm/clue/'],
  ['crm_business', '商机管理', 'https://doc.iocoder.cn/crm/business/'],
  ['crm_contract', '合同管理', 'https://doc.iocoder.cn/crm/contract/'],
  ['crm_receivable', '回款管理', 'https://doc.iocoder.cn/crm/receivable/'],
  ['crm_product', '产品管理', 'https://doc.iocoder.cn/crm/product/'],
  ['crm_follow-up', '跟进记录', 'https://doc.iocoder.cn/crm/follow-up/'],
  ['crm_permission', '数据权限', 'https://doc.iocoder.cn/crm/permission/'],
  ['crm_mobile', '移动端（uni-app）', 'https://doc.iocoder.cn/crm/mobile/'],
];

const SITE = 'https://doc.iocoder.cn';

function td() {
  const t = new TurndownService({
    headingStyle: 'atx',
    hr: '---',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    fence: '```',
    emDelimiter: '*',
    strongDelimiter: '**',
  });
  t.use(gfm);

  // fenced code with language
  t.addRule('fencedCodeLang', {
    filter: (node) =>
      node.nodeName === 'PRE' &&
      node.firstChild &&
      node.firstChild.nodeName === 'CODE',
    replacement: (content, node) => {
      const codeEl = node.firstChild;
      const cls = (node.getAttribute('class') || '') + ' ' + (codeEl.getAttribute('class') || '');
      const m = cls.match(/language-([\w+-]+)/);
      const lang = m ? m[1] : '';
      let code = codeEl.textContent.replace(/\n$/, '');
      const longest = (code.match(/`+/g) || []).reduce((a, b) => Math.max(a, b.length), 2);
      const fence = '`'.repeat(Math.max(3, longest + 1));
      return `\n\n${fence}${lang}\n${code}\n${fence}\n\n`;
    },
  });

  // images -> absolute url, drop empty alt
  t.addRule('absoluteImages', {
    filter: 'img',
    replacement: (content, node) => {
      let src = node.getAttribute('src') || '';
      if (!src) return '';
      if (/^\/\//.test(src)) src = 'https:' + src;
      else if (src.startsWith('/')) src = SITE + src;
      const alt = (node.getAttribute('alt') || '').replace(/\n/g, ' ').trim();
      return `![${alt}](${src})`;
    },
  });

  // links -> absolute, drop "opens new window" text
  t.addRule('cleanLinks', {
    filter: 'a',
    replacement: (content, node) => {
      let href = node.getAttribute('href') || '';
      const text = content.replace(/\s*\(opens new window\)\s*/g, '').trim();
      if (!href || href.startsWith('javascript')) return text;
      if (href.startsWith('/')) href = SITE + href;
      if (!text) return '';
      return `[${text}](${href})`;
    },
  });

  // VuePress 自定义容器标题（tip/warning/danger）
  t.addRule('customBlockTitle', {
    filter: (node) =>
      node.nodeName === 'P' && /custom-block-title/.test(node.getAttribute('class') || ''),
    replacement: (content) => `**${content.trim()}**`,
  });

  return t;
}

function extract(html) {
  const s = html.indexOf('content__default');
  const e = html.indexOf('page-edit');
  if (s < 0) throw new Error('no content');
  let seg = html.slice(s, e > s ? e : undefined);
  // drop the wrapper opening tag remainder
  seg = seg.replace(/^content__default"?>/, '');
  // drop trailing injected style/script blocks
  seg = seg.replace(/<style>[\s\S]*$/i, '');
  seg = seg.replace(/<script[\s\S]*$/i, '');
  return seg;
}

function clean(md) {
  return md
    .replace(/\[#\]\(#[^)]*\)\s*/g, '') // VuePress 标题锚点
    .replace(/\(opens new window\)/g, '')
    // 原站少量 markdown 笔误：](]( 形如 「[文本])(/path)」
    .replace(/\]\)\((\/[^)\s]*)\)/g, (m, href) => `](${SITE}${href})`)
    // 行内代码里的反斜杠转义还原
    .replace(/`([^`\n]+)`/g, (m, code) =>
      '`' + code.replace(/\\([\\`*_{}\[\]()#+\-.!])/g, '$1') + '`'
    )
    .replace(/^(\s*)[-*][ \t]{2,}/gm, '$1- ') // 列表符号后多余空格
    .replace(/^(\s*)(\d+)\.[ \t]{2,}/gm, '$1$2. ')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n+/, '')
    .replace(/\n+$/, '');
}

// 代码围栏外的多余转义还原（Turndown 会转义 _ [ ] ` 等字符）
function unescapeProse(md) {
  let inFence = false;
  return md
    .split('\n')
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      return line.replace(/\\([\[\]_`])/g, '$1');
    })
    .join('\n');
}

// 依据「1. / 1.1 / 1.1.1」编号统一标题层级：编号段数 + 2
function normalizeHeadingLevels(md) {
  return md.replace(/^(#{2,6}) (\d+(?:\.\d+)*)\.?\s+(.*)$/gm, (m, hashes, num, text) => {
    const depth = num.split('.').length;
    const level = Math.min(6, depth + 2);
    return `${'#'.repeat(level)} ${num}. ${text}`;
  });
}

const parts = [];
const toc = [];
let n = 0;
for (const [name, title, url] of PAGES) {
  n++;
  const html = fs.readFileSync(path.join(RAW, name + '.html'), 'utf8');
  const seg = extract(html);
  let md = clean(td().turndown(seg));
  // demote existing h1 -> h2, h2 -> h3 so the file has one document root
  md = md.replace(/^(#{1,5}) (.*)$/gm, (m, hashes, text) => '#'.repeat(hashes.length + 1) + ' ' + text);
  md = normalizeHeadingLevels(md);
  md = unescapeProse(md);
  const heading = `## ${n}. ${title}`;
  const anchor = `${n}. ${title}`
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
  toc.push(`- [${n}. ${title}](#${anchor})`);
  parts.push(`${heading}\n\n> 原文：<${url}>\n\n${md}`);
  fs.writeFileSync(path.join(OUT, name + '.md'), md + '\n', 'utf8');
}

const header = `# 芋道 CRM 系统（ruoyi-vue-pro / yudao-module-crm）文档合集

> 来源：<https://doc.iocoder.cn/crm-preview/> 及同栏目下 11 篇文档
> 抓取时间：${new Date().toISOString().slice(0, 10)}
> 说明：原站栏目入口为 /crm-preview/ 与 /crm/*，共 11 页，本文档为全文离线合集。

## 目录

${toc.join('\n')}

---
`;

const body = parts.join('\n\n---\n\n');
fs.writeFileSync(path.join(OUT, 'yudao-crm-docs.md'), header + '\n' + body + '\n', 'utf8');
console.log('pages:', n);
console.log('out bytes:', fs.statSync(path.join(OUT, 'yudao-crm-docs.md')).size);
