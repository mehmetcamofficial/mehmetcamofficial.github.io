#!/usr/bin/env node
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const read = path => readFileSync(path, "utf8");
const pages = [...read("sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(match => {
    const pathname = new URL(match[1]).pathname;
    if (pathname === "/") return "index.html";
    if (pathname.endsWith("/")) return pathname.slice(1) + "index.html";
    return pathname.slice(1);
  });

test("premium layer is connected to every canonical public page", () => {
  assert.equal(pages.length, 24, "Unexpected sitemap coverage change");
  for (const path of pages) {
    assert.ok(existsSync(path), "Missing sitemap route: " + path);
    const html = read(path);
    assert.match(html, /premium-ui\.css\?v=20261121-p1/, path + " CSS missing");
    assert.match(html, /premium-ui\.js\?v=20261121-p1/, path + " JS missing");
    assert.match(html, /site-language\.js/, path + " must retain EN/TR");
    assert.match(html, /<html\s+lang="en"/i, path + " English default missing");
  }
});

test("premium effects do not override hero media or business logic", () => {
  const js = read("premium-ui.js");
  const css = read("premium-ui.css");
  const index = read("index.html");
  assert.match(index, /data-dm-intro-video/);
  assert.match(index, /dm-character-base/);
  assert.match(index, /data-site-lang="tr"/);
  assert.match(index, /id="dmHeroListen"/);
  assert.doesNotMatch(js, /\b(fetch|XMLHttpRequest|localStorage|sessionStorage)\s*\(/);
  assert.doesNotMatch(js, /\.play\s*\(/);
  assert.doesNotMatch(js, /\.innerHTML\s*=/);
  assert.match(js, /IntersectionObserver/);
  assert.match(js, /MutationObserver/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /prefers-contrast:more/);
  assert.match(css, /premium-hero-ambient/);
});

test("progressive enhancement preserves content in the absence of JavaScript", () => {
  const css = read("premium-ui.css");
  assert.match(css, /html\[data-premium-motion="on"\] \.premium-reveal/);
  assert.match(css, /\.premium-reveal\.premium-in-view/);
  const js = read("premium-ui.js");
  assert.match(js, /rect\.top < window\.innerHeight \* 0\.86/);
  assert.match(js, /if \(!canAnimate \|\| !\("IntersectionObserver" in window\)\) return;/);
});

test("site remains independent from third-party animation libraries", () => {
  const js = read("premium-ui.js");
  assert.doesNotMatch(js, /import\s*\(|require\s*\(|gsap|ScrollTrigger|AOS|three\.js/i);
  assert.ok(Buffer.byteLength(js) < 8000, "Animation code exceeded its 8KB source budget");
  assert.ok(Buffer.byteLength(read("premium-ui.css")) < 12000, "Style budget exceeded 12KB");
});
