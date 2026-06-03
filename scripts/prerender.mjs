import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getIndexableRoutes, getSeo, getSitemapXml } from "../src/data/maps.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const templatePath = path.join(distDir, "index.html");

const { render } = await import("../dist-ssr/entry-server.js");

await copyStaticAssets();

const template = restoreStaticHeadLinks(await fs.readFile(templatePath, "utf8"));
const routes = getIndexableRoutes();
const legacyRoutes = [{ type: "about", path: "/about.html" }];

for (const route of [...routes, ...legacyRoutes]) {
  const { html, seo } = render(route.path);
  const renderedHtml = template
    .replace("<!--seo-head-->", renderSeoHead(seo))
    .replace("<!--app-html-->", html);
  await writeRouteFile(route.path, renderedHtml);
}

await fs.writeFile(path.join(distDir, "sitemap.xml"), getSitemapXml(), "utf8");

async function copyStaticAssets() {
  await fs.cp(path.join(rootDir, "images"), path.join(distDir, "images"), { recursive: true });
  await copyIfExists("site.webmanifest");
  await copyIfExists("robots.txt");
  await copyIfExists("google499b9a0ce1578e3c.html");
}

async function copyIfExists(filename) {
  const source = path.join(rootDir, filename);
  try {
    await fs.access(source);
    await fs.copyFile(source, path.join(distDir, filename));
  } catch {
    // Optional root static file is not present.
  }
}

async function writeRouteFile(routePath, html) {
  const outputPath = routePath === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, ...routePath.slice(1).split("/"));

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, html, "utf8");
}

function renderSeoHead(seo) {
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeAttr(seo.description)}" />`,
    `<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`,
    `<meta property="og:title" content="${escapeAttr(seo.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(seo.description)}" />`,
    `<meta property="og:url" content="${escapeAttr(seo.canonical)}" />`,
    `<meta property="og:image" content="${escapeAttr(seo.image)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(seo.image)}" />`
  ].join("\n    ");
}

function restoreStaticHeadLinks(html) {
  return html
    .replace(
      /<link rel="apple-touch-icon" sizes="180x180" href="[^"]+" \/>/,
      '<link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />'
    )
    .replace(
      /<link rel="icon" type="image\/png" sizes="32x32" href="[^"]+" \/>/,
      '<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />'
    )
    .replace(
      /<link rel="icon" type="image\/png" sizes="16x16" href="[^"]+" \/>/,
      '<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />'
    )
    .replace(
      /<link rel="manifest" href="[^"]+" \/>/,
      '<link rel="manifest" href="/site.webmanifest" />'
    );
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}
