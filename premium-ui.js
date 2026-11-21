/* Portfolio Premium UI — optional, accessible and lightweight.
 * No dependencies, no changes to business logic, no hidden content without JS.
 */
(() => {
  "use strict";
  if (window.__portfolioPremiumUI) return;
  window.__portfolioPremiumUI = true;

  const TARGETS = [
    ".section-heading",
    ".v3-impact",
    ".v3-currently",
    ".profile-text",
    ".profile-card",
    ".focus-card",
    ".timeline-item",
    ".agri-intro",
    ".agri-card",
    ".case-copy",
    ".product-window",
    ".workflow-step",
    ".training-card",
    ".publication-card",
    ".education-card",
    ".skill-column",
    ".app-card",
    ".contact-grid",
    ".content-hero",
    ".article",
    ".writing-item",
    ".card"
  ].join(",");

  function init() {
    const body = document.body;
    if (!body || body.classList.contains("premium-enabled")) return;
    body.classList.add("premium-enabled");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = navigator.connection?.saveData === true;
    const canAnimate = !reduceMotion.matches && !saveData;

    const hero = document.querySelector(".dm-hero-final");
    if (hero && !hero.querySelector(".premium-hero-ambient")) {
      const ambient = document.createElement("div");
      ambient.className = "premium-hero-ambient";
      ambient.setAttribute("aria-hidden", "true");
      hero.prepend(ambient);
    }

    // Read-only scroll progress. One passive listener, composited transform.
    const progress = document.createElement("div");
    progress.className = "premium-scroll-progress";
    progress.setAttribute("aria-hidden", "true");
    body.append(progress);

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const amount = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progress.style.setProperty("--premium-scroll", String(amount));
      body.classList.toggle("premium-scrolled", window.scrollY > 24);
    };
    const requestProgress = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };
    window.addEventListener("scroll", requestProgress, { passive:true });
    window.addEventListener("resize", requestProgress, { passive:true });
    updateProgress();

    if (!canAnimate || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("premium-in-view");
        observer.unobserve(entry.target);
      }
    }, { threshold:0.08, rootMargin:"0px 0px -6% 0px" });

    // The initial viewport is always visible. Only lower sections receive
    // a reveal class so first-paint SEO content is never held off screen.
    let sequence = 0;
    const track = root => {
      const elements = root.matches?.(TARGETS)
        ? [root, ...root.querySelectorAll(TARGETS)]
        : [...root.querySelectorAll(TARGETS)];
      for (const element of elements) {
        if (element.dataset.premiumObserved === "yes") continue;
        element.dataset.premiumObserved = "yes";
        if (element.closest("[hidden],[aria-hidden='true'],.project-modal,.v3-overlay,.v3-ask-panel")) continue;
        const rect = element.getBoundingClientRect();
        if (rect.height < 4 || rect.width < 4 || rect.bottom < 0 ||
            rect.top < window.innerHeight * 0.86) continue;
        element.classList.add("premium-reveal");
        element.style.setProperty("--premium-delay", String((sequence++ % 4) * 55) + "ms");
        observer.observe(element);
      }
    };

    track(body);
    document.documentElement.dataset.premiumMotion = "on";

    // CMS cards and project tiles may arrive after page load. The observer
    // watches additions only; it never rewrites text, clicks, media or links.
    let scanFrame = 0;
    const mutations = new MutationObserver(records => {
      if (!records.some(record => record.addedNodes.length)) return;
      if (scanFrame) return;
      scanFrame = requestAnimationFrame(() => {
        scanFrame = 0;
        track(body);
        requestProgress();
      });
    });
    mutations.observe(body, { childList:true, subtree:true });

    reduceMotion.addEventListener?.("change", event => {
      if (event.matches) {
        document.documentElement.removeAttribute("data-premium-motion");
        observer.disconnect();
        mutations.disconnect();
        document.querySelectorAll(".premium-reveal").forEach(element => {
          element.classList.add("premium-in-view");
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once:true });
  } else {
    init();
  }
})();
