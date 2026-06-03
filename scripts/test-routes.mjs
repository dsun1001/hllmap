import assert from "node:assert/strict";
import {
  getCanonicalUrl,
  getIndexableRoutes,
  getSitemapXml,
  parseRoute
} from "../src/data/maps.js";

const vietnamUs = parseRoute("/thanh-hoa-bridge/us/map");
assert.equal(vietnamUs.type, "detail");
assert.equal(vietnamUs.team.slug, "us");
assert.equal(vietnamUs.path, "/thanh-hoa-bridge/us/map");

const vietnamNva = parseRoute("/thanh-hoa-bridge/nva/map");
assert.equal(vietnamNva.type, "detail");
assert.equal(vietnamNva.team.slug, "nva");
assert.equal(vietnamNva.path, "/thanh-hoa-bridge/nva/map");

const legacyAxis = parseRoute("/thanh-hoa-bridge/axis/map");
assert.equal(legacyAxis.type, "redirect");
assert.equal(legacyAxis.to, "/thanh-hoa-bridge/nva/map");

const legacyAllies = parseRoute("/thanh-hoa-bridge/allies/map");
assert.equal(legacyAllies.type, "redirect");
assert.equal(legacyAllies.to, "/thanh-hoa-bridge/us/map");

const unavailableVietnamTanks = parseRoute("/thanh-hoa-bridge/us/tanks");
assert.equal(unavailableVietnamTanks.type, "redirect");
assert.equal(unavailableVietnamTanks.to, "/thanh-hoa-bridge/us/map");

const carentanTanks = parseRoute("/carentan/axis/tanks");
assert.equal(carentanTanks.type, "detail");
assert.equal(carentanTanks.view, "tanks");

assert.equal(getCanonicalUrl("/"), "https://hllmap.com/");
assert.equal(getIndexableRoutes().length, 82);

const sitemap = getSitemapXml();
assert.match(sitemap, /https:\/\/hllmap\.com\/thanh-hoa-bridge\/us\/map/);
assert.match(sitemap, /https:\/\/hllmap\.com\/thanh-hoa-bridge\/nva\/map/);
assert.doesNotMatch(sitemap, /https:\/\/hllmap\.com\/thanh-hoa-bridge\/axis\/map/);
assert.doesNotMatch(sitemap, /https:\/\/hllmap\.com\/thanh-hoa-bridge\/allies\/map/);

console.log("Route helper tests passed.");
