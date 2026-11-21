#!/usr/bin/env node
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
const read = file => readFileSync(join(process.cwd(), file), "utf8");

test("every public sitemap page loads the shared language layer", () => {
  const urls = [...read("sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]));
  assert.equal(urls.length, 24);
  for (const url of urls) {
    const page = !url.pathname || url.pathname === "/" ? "index.html" :
      url.pathname.endsWith("/") ? url.pathname.slice(1) + "index.html" : url.pathname.slice(1);
    assert.ok(existsSync(page), "Missing public page: " + page);
    assert.match(read(page), /site-language\.js\?v=/, "No language layer in " + page);
  }
});

test("initial page language and hero controls default to English", () => {
  const html = read("index.html");
  assert.match(html, /<html lang="en"/);
  assert.match(html, /id="dmHeroListen"/);
  assert.match(html, /<strong>Listen to me<\/strong>/);
  assert.match(html, /data-site-lang="en"/);
  assert.match(html, /data-site-lang="tr"/);
  assert.match(html, /id="dmVisualPlay"/);
  assert.match(html, /data-dm-intro-video/);
  assert.match(html, /dm-character-base/);
  assert.doesNotMatch(html, /autoplay/i, "Playback must require a user gesture");
});

test("video and image assets exist and the same hero surface is used", () => {
  const html = read("index.html");
  for (const asset of [
    "assets/digital-mehmet/digital-mehmet-hero.webp",
    "assets/digital-mehmet/digital-mehmet-motion.mp4",
  ]) assert.ok(existsSync(asset), "Missing media " + asset);
  assert.match(html, /poster="assets\/digital-mehmet\/digital-mehmet-hero\.webp/);
  const js = read("digital-mehmet.js");
  assert.match(js, /this\.visualPlay\?\.addEventListener\("click", \(\) => this\.playIntroMotion\(\)\)/);
  assert.match(js, /document\.addEventListener\("digital-mehmet:listen", \(\) => this\.playIntroMotion\(\)\)/);
  assert.match(js, /video\.onended = cleanup/);
  assert.match(js, /Promise\.allSettled\(\[video\.play\(\), narration\.play\(\)\]\)/);
  assert.ok(js.indexOf('await fetch(TTS_URL') < js.indexOf('Promise.allSettled([video.play(), narration.play()])'), "Narration should be prepared before playback");
  const css = read("digital-mehmet.css");
  assert.match(css, /same surface at every breakpoint/);
  assert.match(css, /object-fit:cover!important/);
  assert.match(css, /object-position:center 47%!important/);
});

test("locale preference is persistent and updates the document language", () => {
  const js = read("site-language.js");
  assert.match(js, /localStorage\.getItem\("portfolio-language"\)/);
  assert.match(js, /localStorage\.setItem\("portfolio-language", current\)/);
  assert.match(js, /document\.documentElement\.lang = current/);
  assert.match(js, /originalNodes = new WeakMap\(\)/);
});
