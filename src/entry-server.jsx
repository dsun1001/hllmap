import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App.jsx";
import { getSeo, parseRoute } from "./data/maps.js";
import "./styles.css";

export function render(url) {
  const parsed = parseRoute(url);
  const route = parsed.type === "redirect" ? parseRoute(parsed.to) : parsed;
  const seo = getSeo(route.type === "notFound" ? { type: "home", path: "/" } : route);
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

  return { html, seo };
}
