import { mkdir, writeFile, rm } from "node:fs/promises";
const API="https://mehmetcam-portfolio-ai.aydin254.workers.dev/site-config";
const SITE="https://mehmetcamofficial.com.tr";
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const slug=v=>String(v||"item").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9-_]+/g,"-").replace(/^-+|-+$/g,"");
const res=await fetch(API,{headers:{"User-Agent":"portfolio-seo-generator/1.0"}});
if(!res.ok)throw new Error("site-config fetch failed: "+res.status);
const data=await res.json();
const config=data?.config||{};
const projects=(config.projects||[]).filter(x=>x?.enabled!==false&&x?.status!=="draft"&&x?.title);
const posts=(config.posts||[]).filter(x=>x?.enabled!==false&&x?.status!=="draft"&&x?.title);
const shell=({title,desc,canonical,body,schema,type="website"})=>`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} | Mehmet Cam</title><meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="${type}"><meta property="og:title" content="${esc(title)} | Mehmet Cam"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${SITE}/profile.jpeg">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)} | Mehmet Cam"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${SITE}/profile.jpeg">
<link rel="stylesheet" href="/content-pages.css?v=seo-pages"><script type="application/ld+json">${JSON.stringify(schema)}</script></head>
<body><div class="shell"><header class="navbar content-nav"><a class="logo" href="/">MC<span>.</span></a><nav class="nav-links"><a href="/#featured-project">Work</a><a href="/#profile">Research</a><a href="/blog.html">Writing</a><a href="/#contact">Contact</a></nav></header>${body}<footer class="footer">© 2026 Mehmet Cam</footer></div></body></html>`;
await rm("projects",{recursive:true,force:true});await rm("writing",{recursive:true,force:true});
const urls=[SITE+"/",SITE+"/about/",SITE+"/blog.html"];
for(const p of projects){
  const id=slug(p.id||p.title),canonical=`${SITE}/projects/${id}/`,desc=p.description||p.content||p.title;
  const schema={"@context":"https://schema.org","@type":["CreativeWork","SoftwareApplication"],"name":p.title,"description":desc,"url":canonical,"creator":{"@type":"Person","@id":SITE+"/#person","name":"Mehmet Cam","url":SITE+"/"},"author":{"@id":SITE+"/#person"},"applicationCategory":p.category||"SoftwareApplication","keywords":(p.tags||[]).join(", "),"sameAs":p.url&&p.url!=="#"?p.url:undefined,"isPartOf":{"@type":"WebSite","@id":SITE+"/#website","name":"Mehmet Cam Portfolio","url":SITE+"/"}};
  const tags=(p.tags||[]).map(t=>`<span>${esc(t)}</span>`).join("");
  const evidence=p.content||p.description||"";
  const body=`<main class="article"><div class="meta">${esc(p.category||"Project")}</div><h1>${esc(p.title)}</h1><p class="body">${esc(p.description||evidence)}</p><section class="evidence-block"><h2>What it is</h2><p class="body">${esc(evidence)}</p><h2>Engineering signals</h2><p class="body">This portfolio entry documents the technologies, product context and implementation approach that are publicly supported by the portfolio. It is intended as a concise evidence page for recruiters, search engines and AI answer systems.</p>${tags?`<div class="tags">${tags}</div>`:""}</section><div class="actions">${p.url&&p.url!=="#"?`<a class="btn primary" href="${esc(p.url)}" target="_blank" rel="noopener">Open live project ↗</a>`:""}<a class="btn" href="/#live-apps">← Portfolio</a></div></main>`;
  await mkdir(`projects/${id}`,{recursive:true});await writeFile(`projects/${id}/index.html`,shell({title:p.title,desc,canonical,body,schema}),"utf8");urls.push(canonical);
}
for(const p of posts){
  const id=slug(p.id||p.title),canonical=`${SITE}/writing/${id}/`,desc=p.excerpt||p.content||p.title;
  const schema={"@context":"https://schema.org","@type":"Article","headline":p.title,"description":desc,"url":canonical,"author":{"@type":"Person","@id":SITE+"/#person","name":"Mehmet Cam","url":SITE+"/"},"creator":{"@id":SITE+"/#person"},"mainEntityOfPage":{"@type":"WebPage","@id":canonical},"isPartOf":{"@type":"WebSite","@id":SITE+"/#website","name":"Mehmet Cam Portfolio","url":SITE+"/"},"sameAs":p.url&&p.url!=="#"?p.url:undefined};
  const body=`<main class="article"><div class="meta">${esc(p.date||"Writing")}</div><h1>${esc(p.title)}</h1><p class="body">${esc(p.excerpt||"")}</p><section class="evidence-block"><h2>Article summary</h2><p class="body">${esc(p.content||p.excerpt||"")}</p><h2>Author</h2><p class="body">Written by Mehmet Cam. This page is the canonical portfolio reference for the article and links to the original publication when available.</p></section><div class="actions">${p.url&&p.url!=="#"?`<a class="btn primary" href="${esc(p.url)}" target="_blank" rel="noopener">Read original on Medium ↗</a>`:""}<a class="btn" href="/blog.html">← All writing</a></div></main>`;
  await mkdir(`writing/${id}`,{recursive:true});await writeFile(`writing/${id}/index.html`,shell({title:p.title,desc,canonical,body,schema,type:"article"}),"utf8");urls.push(canonical);
}
const lastmod=new Date().toISOString().slice(0,10);
const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(u=>`  <url><loc>${u}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n")+'\n</urlset>\n';
await writeFile("sitemap.xml",xml,"utf8");
await writeFile("seo-generated.json",JSON.stringify({generatedAt:new Date().toISOString(),projects:projects.length,posts:posts.length,urls},null,2)+"\n","utf8");
console.log(`Generated ${projects.length} projects, ${posts.length} writing pages and sitemap.`);
