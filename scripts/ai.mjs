import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const base = 'https://docs.withaster.dev';

const config = JSON.parse(readFileSync(join(root, 'docs.json'), 'utf8'));
const groups = config.navigation.groups;

function frontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { meta: {}, body: raw };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const km = line.match(/^(\w+):\s*(.*)$/);
    if (km) meta[km[1].trim()] = km[2].trim().replace(/^"|"$/g, '');
  }
  return { meta, body: raw.slice(m[0].length).trim() };
}

const pages = [];
for (const g of groups) {
  for (const slug of g.pages) {
    const file = join(root, `${slug}.md`);
    if (!existsSync(file)) {
      console.error(`docs.json lists "${slug}" but ${slug}.md does not exist`);
      process.exit(1);
    }
    const { meta, body } = frontmatter(readFileSync(file, 'utf8'));
    const title = meta.title || slug;
    const md = body.startsWith('# ') ? body : `# ${title}\n\n${body}`;
    pages.push({ group: g.group, slug, title, desc: meta.description || '', md });
  }
}

for (const p of pages) writeFileSync(join(dist, `${p.slug}.md`), `${p.md}\n`);

const index = [`# ${config.name}`, '', `> ${config.description}`, ''];
for (const g of groups) {
  index.push(`## ${g.group}`, '');
  for (const slug of g.pages) {
    const p = pages.find((x) => x.slug === slug);
    index.push(`- [${p.title}](${base}/${p.slug}.md)${p.desc ? `: ${p.desc}` : ''}`);
  }
  index.push('');
}
writeFileSync(join(dist, 'llms.txt'), index.join('\n'));

const full = [`# ${config.name}`, '', `> ${config.description}`, ''];
for (const p of pages) full.push('---', '', p.md, '');
writeFileSync(join(dist, 'llms-full.txt'), full.join('\n'));

writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);

// Inject llms.txt / markdown directives into every exported HTML head.
import { readdirSync, mkdirSync } from 'node:fs';

function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(p));
    else if (entry.name === 'index.html') out.push(p);
  }
  return out;
}

for (const file of htmlFiles(dist)) {
  const rel = dirname(file).slice(dist.length) || '/';
  const slug = rel === '/' ? 'index' : rel.replace(/\/+$/, '').split('/').pop();
  let html = readFileSync(file, 'utf8');
  if (!html.includes('rel="llms.txt"')) {
    const tag = `<link rel="llms.txt" href="/llms.txt"><link rel="alternate" type="text/markdown" href="/${slug}.md">`;
    html = html.replace('</head>', `${tag}</head>`);
    writeFileSync(file, html);
  }
}

// Copy static brand assets into the export (mint export drops the public/ dir).
import { cpSync } from 'node:fs';
cpSync(join(root, 'public'), dist, { recursive: true });

// Inject the navbar logo: the export renders an empty nav ul and no img.
for (const file of htmlFiles(dist)) {
  let html = readFileSync(file, 'utf8');
  if (html.includes('data-component-part="navbar-logo"')) continue;
  const img = `<img data-component-part="navbar-logo" src="/logo/light.svg" alt="Aster" class="h-8 w-auto dark:hidden" /><img data-component-part="navbar-logo" src="/logo/dark.svg" alt="Aster" class="h-8 w-auto hidden dark:block" />`;
  html = html.replace(
    /(<nav aria-label="Main"[^>]*><ul class="flex space-x-6 items-center"><\/ul>)/,
    `<li class="flex items-center mr-2">${img}</li>$1`,
  );
  writeFileSync(file, html);
}

const wellKnown = join(dist, '.well-known');
mkdirSync(wellKnown, { recursive: true });
writeFileSync(
  join(wellKnown, 'ai-plugin.json'),
  JSON.stringify(
    {
      name_for_human: 'Aster Docs',
      name_for_model: 'aster-docs',
      description_for_human: 'Search and read the documentation for Aster, the terminal coding agent.',
      description_for_model: 'Search and read the Aster documentation: install, configure, extend, and operate the terminal coding agent. Tools: search_docs, get_page.',
      api: { type: 'mcp', url: `${base}/mcp` },
      logo_url: `${base}/favicon.svg`,
      contact_email: 'chiziaruhoma@gmail.com',
    },
    null,
    2,
  ),
);
writeFileSync(
  join(wellKnown, 'mcp.json'),
  JSON.stringify({ mcpServers: { 'aster-docs': { url: `${base}/mcp` } } }, null, 2),
);

writeFileSync(
  join(dist, 'search-index.json'),
  JSON.stringify(pages.map((p) => ({ slug: p.slug, title: p.title, desc: p.desc }))),
);

const skill = `---
name: aster-docs
description: Search and read the documentation for Aster, the terminal coding agent. Use when a question is about installing, configuring, or extending Aster.
---

Aster documentation is machine-readable at ${base}.

- Fetch ${base}/llms.txt for the page index with descriptions.
- Fetch any page as markdown by appending .md, e.g. ${base}/configuration.md.
- ${base}/llms-full.txt contains every page in one file.
- An MCP server also serves these docs over streamable HTTP at ${base}/mcp with two tools: search_docs (find pages) and get_page (read one).
`;

writeFileSync(join(dist, 'SKILL.md'), skill);
writeFileSync(join(dist, 'skill.md'), skill);

const urls = pages.map((p) => (p.slug === 'index' ? `${base}/` : `${base}/${p.slug}`));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);

console.log(`ai surfaces: ${pages.length} markdown pages, llms.txt, llms-full.txt, robots.txt, sitemap.xml`);
