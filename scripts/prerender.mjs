// Po buildzie klienta i SSR zapisuje gotowy HTML dla każdego adresu (strona główna + podstrony usługowe)
// oraz generuje sitemap.xml, żeby roboty Google dostawały treść bez uruchamiania JavaScriptu.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { SERVICE_PAGES, SITE_URL, jsonLdFor, pageUrl } from '../src/pages.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')
const { render } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)

const template = readFileSync(join(dist, 'index.html'), 'utf8')

const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender: nie znaleziono ${label} w index.html`)
  return html.replace(pattern, () => replacement)
}

const metaTag = (attr, key) => new RegExp(String.raw`<meta\s+${attr}="${key}"\s+content="[^"]*"\s*/?>`)

function withMeta(html, { title, description, url }) {
  const t = esc(title)
  const d = esc(description)
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${t}</title>`, 'title')
  html = replaceOnce(html, metaTag('name', 'description'), `<meta name="description" content="${d}" />`, 'description')
  html = replaceOnce(html, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`, 'canonical')
  html = replaceOnce(html, metaTag('property', 'og:title'), `<meta property="og:title" content="${t}" />`, 'og:title')
  html = replaceOnce(html, metaTag('property', 'og:description'), `<meta property="og:description" content="${d}" />`, 'og:description')
  html = replaceOnce(html, metaTag('property', 'og:url'), `<meta property="og:url" content="${url}" />`, 'og:url')
  html = replaceOnce(html, metaTag('name', 'twitter:title'), `<meta name="twitter:title" content="${t}" />`, 'twitter:title')
  html = replaceOnce(html, metaTag('name', 'twitter:description'), `<meta name="twitter:description" content="${d}" />`, 'twitter:description')
  return html
}

const inject = (html, body) => replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${body}</div>`, '#root')

// strona główna
writeFileSync(join(dist, 'index.html'), inject(template, render('/')))

// podstrony usługowe
for (const page of SERVICE_PAGES) {
  const url = `${SITE_URL}${pageUrl(page)}`
  let html = withMeta(template, { title: page.metaTitle, description: page.metaDescription, url })
  const ld = jsonLdFor(page)
    .map(obj => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, String.raw`\u003c`)}</script>`)
    .join('\n    ')
  html = replaceOnce(html, /<\/head>/, `    ${ld}\n  </head>`, '</head>')
  html = inject(html, render(`/${page.slug}`))

  const dir = join(dist, page.slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

// sitemap.xml
const today = new Date().toISOString().slice(0, 10)
const urls = [
  { loc: `${SITE_URL}/`, priority: '1.0' },
  ...SERVICE_PAGES.map(p => ({ loc: `${SITE_URL}${pageUrl(p)}`, priority: '0.8' })),
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)

rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerender: ${urls.length} stron + sitemap.xml`)
