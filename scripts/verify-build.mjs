import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getImageForRoute, getIndexableRoutes, getSeo } from "../src/data/maps.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const failures = [];

for (const route of getIndexableRoutes()) {
  const filePath = outputFileForPath(route.path);
  const html = await readFile(filePath);
  const seo = getSeo(route);

  if (!html) {
    failures.push(`Missing HTML file for ${route.path}`);
    continue;
  }

  assertIncludes(html, `<title>${seo.title}</title>`, `${route.path} title`);
  assertIncludes(html, `<link rel="canonical" href="${seo.canonical}"`, `${route.path} canonical`);
  assertIncludes(html, `content="${seo.description}"`, `${route.path} description`);

  if (route.type === "detail") {
    assertIncludes(html, `src="${getImageForRoute(route)}"`, `${route.path} image`);
  }
}

const sitemap = await readFile(path.join(distDir, "sitemap.xml"));
if (!sitemap) {
  failures.push("Missing sitemap.xml");
} else {
  for (const route of getIndexableRoutes()) {
    assertIncludes(sitemap, `<loc>${getSeo(route).canonical}</loc>`, `sitemap ${route.path}`);
  }
}

for (const asset of [
  "images/carentan_allies.webp",
  "images/junobeach_allies.webp",
  "images/junobeach_axis.webp",
  "images/previews/carentan.jpg",
  "images/previews/juno-beach.jpg",
  "images/previews/thanh-hoa-bridge.jpg",
  "images/thanhhoabridge_us.webp",
  "images/favicon/favicon.ico",
  "images/flags/us.svg",
  "images/flags/uk.svg",
  "images/flags/canada.svg",
  "images/flags/balkenkreuz.svg",
  "images/flags/soviet-union.svg",
  "images/flags/north-vietnam.svg",
  "site.webmanifest",
  "robots.txt",
  "google499b9a0ce1578e3c.html"
]) {
  try {
    await fs.access(path.join(distDir, asset));
  } catch {
    failures.push(`Missing copied asset ${asset}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Verified ${getIndexableRoutes().length} prerendered routes.`);

function outputFileForPath(routePath) {
  if (routePath === "/") return path.join(distDir, "index.html");
  return path.join(distDir, ...routePath.slice(1).split("/"));
}

async function readFile(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

function assertIncludes(haystack, needle, label) {
  if (!haystack.includes(needle)) {
    failures.push(`Missing ${label}: ${needle}`);
  }
}
