# hllmap.com

Fan-made Hell Let Loose map tool for Offensive default garrison locations and tank identification.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

On Windows PowerShell, use `npm.cmd run build` if script execution policy blocks `npm`.

The build outputs static files to `dist/`:

- `/` is a map-picker hub.
- `/about` and `/about.html` are prerendered about pages.
- Every valid map route is prerendered as an extensionless S3 object, such as `/carentan/allies/map` and `/thanh-hoa-bridge/us/map`.
- `sitemap.xml` is generated from the same route manifest as the React app.

When uploading to S3, extensionless route objects in `dist/` must use `Content-Type: text/html; charset=utf-8`.

## Card preview images

Homepage cards use `previewImage` from `src/data/maps.js` when present, and otherwise fall back to the first team map image. Only add loading-screen or promotional images if they are official/approved for reuse or you have permission to host them.

## Credits

Map images and inspiration are credited to the Default Garrison Ultimate Guide and the Maps Let Loose tool. This project is not affiliated with Black Matter or Team17.
