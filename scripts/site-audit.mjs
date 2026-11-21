#!/usr/bin/env node
/**
 * Zero-dependency checks for the public GitHub Pages portfolio.
 * Usage: node scripts/site-audit.mjs
 * AMP is intentionally not enabled. Historic AMP reports must still be
 * investigated using the exact affected URL in Search Console.
 */
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(".");
const origin = "https://mehmetcamofficial.com.tr";
const problems = [];
const fail = (message) => problems.push(message);
const read = (path) => readFileSync(join(root, path), "utf8");
const attr = (element, key) =>
  element.match(new RegExp("(?:^|\\s)" + key + "\\s*=\\s*([\"'])(.*?)\\1", "i"))?.[2] ?? null;
const pathToFile = (pathname) => {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, "");
  return !clean ? "index.html" : clean.endsWith("/") ? clean + "index.html" : clean;
};
const localUrl = (url, base) => {
  if (!url || url === "#" || /^(?:mailto:|tel:|data:|javascript:)/i.test(url)) return null;
  try {
    const parsed = new URL(url, base);
    return parsed.origin === origin ? parsed : null;
  } catch {
    fail("Invalid URL " + url + " (" + base + ")");
    return null;
  }
};
const exists = (file) => existsSync(join(root, file));

const sitemap = read("sitemap.xml");
const locations = [...sitemap.matchAll(/<loc>\s*(.*?)\s*<\/loc>/g)].map((match) => match[1]);
if (!locations.length) fail("Sitemap is empty");
if (new Set(locations).size !== locations.length) fail("Duplicate sitemap URLs");
if (!read("robots.txt").includes(origin + "/sitemap.xml")) fail("robots.txt sitemap URL mismatch");
if (read("CNAME").trim() !== new URL(origin).hostname) fail("CNAME mismatch");
if (!exists("404.html") || !/name="robots"\s+content="noindex/i.test(read("404.html"))) {
  fail("Custom 404.html missing or not marked noindex");
}

for (const loc of locations) {
  let url;
  try { url = new URL(loc); } catch { fail("Invalid sitemap URL " + loc); continue; }
  if (url.origin !== origin || url.search || url.hash) {
    fail("Noncanonical sitemap entry " + loc);
    continue;
  }
  const file = pathToFile(url.pathname);
  if (!exists(file)) { fail("Sitemap target missing " + file); continue; }
  const html = read(file);
  const tags = [...html.matchAll(/<(?:link|meta|img|script|source|video|a)\b[^>]*>/gi)].map((x) => x[0]);
  const links = tags.filter((tag) => /^<link\b/i.test(tag));
  const metas = tags.filter((tag) => /^<meta\b/i.test(tag));
  const canonical = links.find((tag) => attr(tag, "rel")?.toLowerCase() === "canonical");
  if (attr(canonical ?? "", "href") !== loc) fail(file + ": canonical URL mismatch");
  if (!/<html\b[^>]*\blang=["'][a-z]{2}(?:-[a-z]{2})?["']/i.test(html)) fail(file + ": no lang");
  if (!/<title>[^<]{5,}<\/title>/i.test(html)) fail(file + ": no title");
  if (!/<h1\b/i.test(html)) fail(file + ": no H1");
  if (!metas.some((tag) => attr(tag, "name")?.toLowerCase() === "description" && attr(tag, "content")?.trim())) {
    fail(file + ": missing meta description");
  }
  if (metas.some((tag) => attr(tag, "name")?.toLowerCase() === "robots" && /noindex/i.test(attr(tag, "content") ?? ""))) {
    fail(file + ": noindex page listed in sitemap");
  }
  if (links.some((tag) => attr(tag, "rel")?.toLowerCase() === "amphtml") || /<html\b[^>]*\samp(?:\s|>)/i.test(html)) {
    fail(file + ": AMP advertised but not deployed");
  }
  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((x) => x[1]));
  for (const tag of tags) {
    if (/^<img\b/i.test(tag) && attr(tag, "alt") === null) fail(file + ": image missing alt");
    if (/^<a\b/i.test(tag)) {
      const href = attr(tag, "href");
      if (href?.startsWith("#") && href.length > 1 && !ids.has(decodeURIComponent(href.slice(1)))) {
        fail(file + ": broken same-page anchor " + href);
      }
      const internal = localUrl(href, loc);
      if (internal && !exists(pathToFile(internal.pathname))) fail(file + ": broken internal link " + href);
    }
    const tagName = tag.match(/^<(\w+)/)?.[1]?.toLowerCase();
    const asset = ["script","img","source","video"].includes(tagName) ||
      (tagName === "link" && ["stylesheet","icon","preload"].includes((attr(tag, "rel") ?? "").toLowerCase()));
    if (asset) {
      const href = attr(tag, tagName === "link" ? "href" : "src");
      const internal = localUrl(href, loc);
      if (internal && !exists(pathToFile(internal.pathname))) fail(file + ": missing local asset " + href);
    }
  }
}
if (problems.length) {
  console.error("Static SEO audit failed:\n" + problems.map((p) => " - " + p).join("\n"));
  process.exitCode = 1;
} else {
  console.log("PASS: sitemap, canonical, metadata, internal links, assets, AMP policy (" + locations.length + " pages)");
}
