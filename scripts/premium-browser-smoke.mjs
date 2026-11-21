#!/usr/bin/env node
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { chromium } from "playwright-core";

const chromePath = [
  process.env.CHROME_PATH,
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium"
].find(path => path && existsSync(path));
assert.ok(chromePath, "Browser smoke requires installed Google Chrome/Chromium");
const browser = await chromium.launch({
  executablePath:chromePath,
  headless:true,
  args:["--no-sandbox","--disable-dev-shm-usage"]
});
const base = "http://127.0.0.1:8123";
try {
  for (const viewport of [{ width:1440,height:900 },{ width:393,height:873 }]) {
    const context = await browser.newContext({ viewport, deviceScaleFactor:1 });
    const page = await context.newPage();
    const pageErrors = [];
    page.on("pageerror", error => pageErrors.push(error.message));
    await page.goto(base + "/", { waitUntil:"domcontentloaded" });
    await page.waitForFunction(() => document.body.classList.contains("premium-enabled"));
    const result = await page.evaluate(() => {
      const hero=document.querySelector(".dm-hero-final");
      const glow=document.querySelector(".premium-hero-ambient");
      const image=document.querySelector(".dm-character-base");
      const video=document.querySelector(".dm-character-video");
      const img=image?.getBoundingClientRect();
      const vid=video?.getBoundingClientRect();
      return {
        hero:!!hero, glow:!!glow, glowIsPassive:glow && getComputedStyle(glow).pointerEvents==="none",
        scrollProgress:!!document.querySelector(".premium-scroll-progress"),
        imgWidth:img?.width, imgHeight:img?.height,
        videoWidth:vid?.width,videoHeight:vid?.height,
        lang:document.documentElement.lang
      };
    });
    assert.equal(result.lang, "en", "English must remain the default");
    assert.ok(result.hero && result.glow && result.scrollProgress && result.glowIsPassive, "Premium surface not initialized");
    assert.ok(Math.abs(result.imgWidth-result.videoWidth)<3 && Math.abs(result.imgHeight-result.videoHeight)<3,
      "Hero image and video geometry differs: " + JSON.stringify(result));
    await page.locator('[data-site-lang="tr"]').first().click();
    assert.equal(await page.locator("html").getAttribute("lang"), "tr");
    await page.locator('[data-site-lang="en"]').first().click();
    assert.equal(await page.locator("html").getAttribute("lang"), "en");
    const heading=page.locator(".section-heading").nth(1);
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    assert.ok((await page.locator(".premium-reveal.premium-in-view").count())>0,
      "Below-fold reveal did not become visible after scrolling");
    assert.equal(pageErrors.filter(x => x.includes("premium-ui")).length,0,
      "Premium UI emitted an uncaught error: "+pageErrors.join("; "));
    await page.goto(base + "/about/", {waitUntil:"domcontentloaded"});
    await page.waitForFunction(() => document.body.classList.contains("premium-enabled"));
    assert.ok(await page.locator(".article").count(), "Editorial page not enhanced");
    await context.close();
    process.stdout.write("PASS premium browser smoke "+viewport.width+"x"+viewport.height+"\n");
  }

  const reduced = await browser.newContext({ reducedMotion:"reduce" });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(base + "/", { waitUntil:"domcontentloaded" });
  await reducedPage.waitForFunction(() => document.body.classList.contains("premium-enabled"));
  const animations = await reducedPage.locator(".premium-hero-ambient")
    .evaluate(element => getComputedStyle(element).animationName);
  assert.equal(animations,"none","Reduce-motion preference should disable ambient animation");
  assert.equal(await reducedPage.locator("html").getAttribute("data-premium-motion"),null);
  await reduced.close();
  process.stdout.write("PASS reduced-motion browser smoke\n");
} finally {
  await browser.close();
}
