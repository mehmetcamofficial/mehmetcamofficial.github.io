#!/usr/bin/env node
// Static guardrails for 2026-11-21 SEO findings; not Google ranking promises.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const origin="https://mehmetcamofficial.com.tr";
const read=path=>readFileSync(path,"utf8");
const sitemap=read("sitemap.xml");
const pages=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>{
  const path=new URL(m[1]).pathname;
  return {url:m[1],path,file:path==="/"?"index.html":path.endsWith("/")?path.slice(1)+"index.html":path.slice(1)};
});
const contents=new Map(pages.map(p=>[p.path,read(p.file)]));
const strip=html=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,"");
const links=html=>[...strip(html).matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map(m=>m[1]);
const words=html=>strip(html).replace(/<[^>]+>/g," ").replace(/&[a-z]+;/gi," ").trim().split(/\s+/).filter(Boolean).length;
const desc=html=>(html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)||[])[1];
const title=html=>(html.match(/<title>([^<]+)<\/title>/i)||[])[1];

test("24 canonical sitemap entries and no unverifiable lastmod",()=>{
  assert.equal(pages.length,24);
  assert.doesNotMatch(sitemap,/<lastmod>/);
  assert.equal(new Set(pages.map(p=>p.url)).size,24);
});
test("all nine previously orphaned pages have direct HTML inbound links",()=>{
  const orphan=[
    "/projects/evalora/","/research/agritech/","/research/applied-ai/",
    "/writing/blockchain-energy/","/writing/eu-turkiye-migration-russia/",
    "/writing/exploring-data-science/","/writing/gelecegin-tarimi/",
    "/writing/livable-world-food/","/writing/search-intelligence-medium/"
  ];
  const inbound=new Map(pages.map(p=>[p.path,0]));
  for(const p of pages) for(const href of links(contents.get(p.path))){
    const u=new URL(href,p.url);
    if(u.origin===origin && u.pathname!==p.path && inbound.has(u.pathname)){
      inbound.set(u.pathname,inbound.get(u.pathname)+1);
    }
  }
  for(const path of orphan) assert.ok(inbound.get(path)>0,"No crawlable internal link: "+path);
});
test("blog has thirteen crawlable archive links and descriptive HTML",()=>{
  const html=strip(contents.get("/blog.html"));
  const refs=new Set(links(html).filter(h=>/^\/writing\/[^/]+\/$/.test(h)));
  assert.equal(refs.size,13);
  assert.ok(words(html)>=150,"The writing index should not be JS-only");
});
test("unique descriptive metadata and clean canonical blog links",()=>{
  for(const p of pages){
    const html=contents.get(p.path), t=title(html),d=desc(html);
    assert.ok(t && t.length<=66,p.file+": overly long title "+(t?.length));
    assert.ok(d && d.length>=70 && d.length<=160,p.file+": description length "+(d?.length));
    assert.ok(!links(html).some(h=>/\/blog\.html\?v=/.test(h)),p.file+": noncanonical blog href");
  }
});
test("reference pages provide meaningful topic guidance and source boundaries",()=>{
  for(const p of pages.filter(x=>x.path.startsWith("/writing/"))){
    const html=contents.get(p.path);
    assert.match(html,/<h2>Topic and context<\/h2>/,p.file);
    assert.match(html,/<h2>Questions worth exploring<\/h2>/,p.file);
    assert.ok(words(html)>=115,p.file+": very limited editorial content");
  }
  for(const p of pages.filter(x=>x.path.startsWith("/projects/"))){
    const html=contents.get(p.path);
    assert.ok(words(html)>=145,p.file+": too little project context");
    assert.match(html,/class="seo-related-links"/,p.file);
  }
});
test("EN/TR premium design and hero media untouched by SEO patches",()=>{
  for(const p of pages){
    const html=contents.get(p.path);
    assert.match(html,/<html\b[^>]*lang="en"/,p.file);
    assert.match(html,/site-language\.js/,p.file);
    assert.match(html,/premium-ui\.css/,p.file);
  }
  const home=contents.get("/");
  assert.match(home,/id="dmHeroListen"/);
  assert.match(home,/data-dm-intro-video/);
  assert.match(home,/class="dm-character-base"/);
  assert.doesNotMatch(pages.map(p=>contents.get(p.path)).join(""),/GAMEPLAY303\.html|pub-f868e77df61146e2a31924f0f62189d5/);
});

test("Search Console brand and writing discovery enhancements stay accurate",()=>{
  const home=contents.get("/");
  assert.match(home, /<p class="dm-hero-identity">\s*<a href="\/about\/">Mehmet Cam<\/a>/);
  assert.match(title(home), /^Mehmet Cam \|/);
  const blog=contents.get("/blog.html");
  const scripts=[...blog.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length,1,"Writing hub must expose one JSON-LD CollectionPage");
  const schema=JSON.parse(scripts[0][1]);
  assert.equal(schema["@type"],"CollectionPage");
  assert.equal(schema.mainEntity["@type"],"ItemList");
  assert.equal(schema.mainEntity.itemListElement.length,13);
  const targets=new Set(links(blog).filter(h=>/^\/writing\/[a-z0-9-]+\/$/.test(h)));
  for(const item of schema.mainEntity.itemListElement){
    const u=new URL(item.url);
    assert.equal(u.origin,origin);
    assert.ok(targets.has(u.pathname),item.url+" is not an archive link");
  }
  const locale=read("site-language.js");
  assert.ok(locale.includes("Yapay Zekâ Mühendisliği ve Uygulamalı Yapay Zekâ Araştırmaları"));
});
