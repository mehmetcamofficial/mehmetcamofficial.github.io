#!/usr/bin/env node
import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,statSync} from "node:fs";
const read = p => readFileSync(p,"utf8");

test("mobile skips oversized NASA JPEG but desktop uses the original photograph as optimized WebP",()=>{
  const css = read("premium-ui.css");
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /html\[data-theme="light"\] body\.dm-hero-page/);
  assert.match(css, /html\[data-theme="dark"\] body\.dm-hero-page/);
  assert.match(css, /background-attachment:scroll!important/);
  assert.match(read("style.css"), /url\("nasa-bg\.jpg"\)/);
});
test("intro hero is requested early but video isn't auto-played",()=>{
  const home=read("index.html");
  assert.match(home, /rel="preload" as="image" href="assets\/digital-mehmet\/digital-mehmet-hero\.webp[^"]+" fetchpriority="high"/);
  assert.match(home, /class="dm-character-base"[^>]*fetchpriority="high"/);
  assert.match(home, /data-dm-intro-video/);
  assert.doesNotMatch(home, /<video[^>]*autoplay/);
});
test("offscreen agricultural cards load lazily",()=>{
  const js=read("script.js");
  assert.match(js,/loading="lazy"\s+decoding="async"\s+fetchpriority="low"/);
});
test("decorative animations pause on reduced motion and hidden tabs",()=>{
  const js=read("script.js");
  assert.match(js,/function initStarsCanvas\(\)/);
  assert.match(js,/prefers-reduced-motion: reduce/);
  assert.match(js,/document\.hidden/);
  assert.match(js,/1000 \/ 20 : 1000 \/ 30/);
  assert.match(js,/function animateSatelliteLabels\(\)/);
  assert.match(js,/document\.addEventListener\("visibilitychange"/);
});
