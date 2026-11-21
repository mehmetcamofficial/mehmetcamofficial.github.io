# Google Search Console baseline and SEO priorities — 21 November 2026

## Scope and source

Verified OpenSEO connection to Google Search Console domain property `sc-domain:mehmetcamofficial.com.tr` using owner-level access. This report uses **first-party GSC data** for **22 October–18 November 2026** (finalized 28-day window); site implementation is at GitHub Pages. Avoid treating these numbers as keyword-search volumes or guarantees of future growth.

## Baseline

| Dimension | Observation |
| --- | --- |
| Clicks | 2 |
| Impressions | 177 |
| CTR | ~1.1% |
| Average position | ~7.5 |
| Homepage | 167 impressions, 2 clicks, ~7.1 average position |
| Applied AI research page | 7 impressions, 0 clicks, ~17.9 |
| TourPilot case page | 3 impressions, 0 clicks, ~6.3 |
| About page | 1 impression, 0 clicks, ~16 |
| Desktop | 67 impressions; 1 click |
| Mobile | 109 impressions; 1 click |
| Tablet | 1 impression; 0 clicks |

Sample query rows: `mehmet cam` (41 impressions, ~6.6 position), `mehmet çam` (30 impressions, ~10.1), `applied ai turkey` (2 impressions, ~43.5), `metevet` (2 impressions, ~4). GSC sometimes withholds anonymized query details: the query report may not reconcile with total clicks; do not attribute those two clicks to a query without evidence.

## Index coverage (GSC URL Inspection; 24 canonical sitemap URLs)

- **11** indexed.
- **8** discovered but currently not indexed, including `/blog.html` and `/research/agritech/`.
- **5** reported as unknown to Google, mainly older Turkish writing routes.

An OpenSEO static audit previously completed with **0 reported technical SEO issues**, but that is distinct from GSC indexing and PageSpeed/Core Web Vitals. The public content and internal link improvements merged on 21 November 2026, after many GSC last-crawl dates; results need fresh Google recrawls.

## Prioritized work

1. **Indexing (first):** Inspect `/blog.html` and `/research/agritech/` using Search Console's live URL test and request indexing via the Search Console interface if eligible. Do the same for selected unknown writing pages after validating their value. Requests are not promises or direct indexing API calls.
2. **Branded entity clarity:** Ensure visible homepage text states **Mehmet Cam** and the documented AI/AgriTech profile, while keeping the Digital Mehmet hero and existing persona/voice design intact.
3. **Writing discovery:** Preserve 13 HTML-rendered article links; add standards-based CollectionPage/ItemList metadata grounded in the actual archive, not invented article content.
4. **Professional relevance:** Focus `/research/applied-ai/` and `/research/agritech/` on demonstrated research, methods and project evidence. Do not stuff keywords or invent credentials.
5. **Localization strategy:** The existing EN/TR JavaScript switch preserves user choice but does **not** provide independently crawlable Turkish URL alternates. A genuine Turkish landing page and `hreflang` can be considered only with equivalent, editorially verified translations and self-canonical URLs.
6. **Performance:** Obtain mobile and desktop Core Web Vitals / Lighthouse measurements separately; the earlier static OpenSEO audit did not run Lighthouse.

## Measurement plan

Compare equivalent **finalized** 28-day windows after Google recrawls. Monitor: total and branded vs non-branded impressions; clicks and CTR by landing page; index coverage of all 24 sitemap URLs; `/blog.html` and `/research/agritech/` crawl/index status; and mobile versus desktop breakdown. Low traffic means changes may be noisy; do not infer causality from small movements. Capture commit SHA for each release.

### Links

- [OpenSEO Search Performance](https://app.openseo.so/p/0178b7c7-03bb-4a00-a025-27e30d63538c/search-performance)
- [Search Console](https://search.google.com/search-console)
- [Sitemap](https://mehmetcamofficial.com.tr/sitemap.xml)
