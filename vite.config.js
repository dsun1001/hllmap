import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const ROOT_STATIC_FILES = new Set([
  "/google499b9a0ce1578e3c.html",
  "/site.webmanifest"
]);

function serveExistingStaticAssets() {
  return {
    name: "serve-existing-static-assets",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = decodeURIComponent((req.url || "").split("?")[0]);
        if (!pathname.startsWith("/images/") && !ROOT_STATIC_FILES.has(pathname)) {
          next();
          return;
        }

        const filePath = path.join(process.cwd(), pathname.slice(1));
        if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
          next();
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentTypes = {
          ".gif": "image/gif",
          ".html": "text/html; charset=utf-8",
          ".ico": "image/x-icon",
          ".jpg": "image/jpeg",
          ".json": "application/manifest+json; charset=utf-8",
          ".png": "image/png",
          ".svg": "image/svg+xml",
          ".webp": "image/webp"
        };
        res.setHeader("Content-Type", contentTypes[ext] || "application/octet-stream");
        fs.createReadStream(filePath).pipe(res);
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), serveExistingStaticAssets()],
  publicDir: false,
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});
