/* Portfolio V3 — isolated interactions */
(() => {
  "use strict";

  const commands = [
    { label: "View TourPilot", hint: "Live product", action: () => window.open("https://tourpilot.com.tr/", "_blank", "noopener") },
    { label: "Explore live AI apps", hint: "Portfolio section", action: () => document.querySelector("#live-apps")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "See how I build with AI", hint: "Engineering workflow", action: () => document.querySelector("#ai-workflow")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "View digital products", hint: "Evalora · OncoConnect · Automation", action: () => document.querySelector("#digital-products")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Read research profile", hint: "AI · AgriTech · EU research", action: () => document.querySelector("#profile")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Read writing", hint: "Blog & Medium", action: () => document.querySelector("#blog")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Contact Mehmet", hint: "Start a conversation", action: () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Download CV", hint: "PDF", action: () => window.location.href = "Mehmet-Cam-CV..pdf" }
  ];

  const answers = [
    {
      id: "tourpilot",
      keys: ["tourpilot", "tour", "reservation", "operations", "rbac", "audit"],
      title: "TourPilot",
      html: "<strong>TourPilot</strong> is Mehmet's featured AI-assisted tour operations product. It brings reservation ingestion, operational planning, RBAC, auditability, data quality and automation into one production-minded workflow.",
      actions: [
        { label: "Launch TourPilot ↗", type: "url", target: "https://tourpilot.com.tr/" },
        { label: "See build workflow", type: "section", target: "#ai-workflow" }
      ]
    },
    {
      id: "workflow",
      keys: ["ai", "claude", "codex", "workflow", "build", "engineering", "agent"],
      title: "AI-native engineering workflow",
      html: "Mehmet uses <strong>Claude Code and Codex as engineering agents</strong> inside a disciplined loop: frame → architect → build → test → verify → ship & learn. The emphasis is on constraints, reviewability, staging and human judgment rather than blind code generation.",
      actions: [
        { label: "View workflow", type: "section", target: "#ai-workflow" },
        { label: "Featured case study", type: "section", target: "#featured-project" }
      ]
    },
    {
      id: "stack",
      keys: ["stack", "technology", "tools", "tech", "typescript", "python", "postgresql", "neon", "render"],
      title: "Tech stack",
      html: "The portfolio highlights <strong>TypeScript, Python, PostgreSQL, Neon, Render, n8n, Streamlit, Expo, GitHub, Claude Code and Codex</strong>, alongside research methods and data-driven decision systems.",
      actions: [
        { label: "Live AI apps", type: "section", target: "#live-apps" },
        { label: "Digital products", type: "section", target: "#digital-products" }
      ]
    },
    {
      id: "research",
      keys: ["research", "agriculture", "agritech", "horizon", "springer", "publication", "sustainable"],
      title: "Research & AgriTech",
      html: "Mehmet combines <strong>applied AI, sustainable agriculture and research</strong>. The portfolio includes Horizon 2020 experience, smart-agriculture work and a peer-reviewed Springer publication.",
      actions: [
        { label: "Research profile", type: "section", target: "#profile" },
        { label: "Publication", type: "section", target: "#publication" }
      ]
    },
    {
      id: "products",
      keys: ["product", "evalora", "oncoconnect", "automation", "n8n", "apps"],
      title: "Products & automation",
      html: "Beyond TourPilot, the portfolio includes <strong>Evalora, OncoConnect, n8n automation workflows</strong> and several live AI applications spanning search intelligence, health and decision-support use cases.",
      actions: [
        { label: "Evalora ↗", type: "url", target: "https://www.evalora.com.tr/" },
        { label: "OncoConnect ↗", type: "url", target: "https://oncoconnectai.com.tr/" },
        { label: "Live apps", type: "section", target: "#live-apps" }
      ]
    },
    {
      id: "collaboration",
      keys: ["contact", "work", "collaborate", "hire", "together", "project", "help"],
      title: "Collaboration",
      html: "Mehmet is open to <strong>AI product development, automation, data systems, AgriTech, research and product-building collaborations</strong>. The fastest path is the contact section or email.",
      actions: [
        { label: "Contact Mehmet", type: "section", target: "#contact" },
        { label: "Email ↗", type: "url", target: "mailto:aydin254@gmail.com" }
      ]
    }
  ];

  
function renderPortfolioSources(sources) {
  if (!Array.isArray(sources) || !sources.length) return "";
  const safe = sources
    .filter(source => source && typeof source === "object" && source.title)
    .slice(0, 4)
    .map(source => {
      const title = String(source.title);
      if (!source.url || !/^https:\/\//i.test(source.url)) {
        return '<span class="v3-ask-source">' + escapeHtml(title) + '</span>';
      }
      return '<a class="v3-ask-source" href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener">' + escapeHtml(title) + ' ↗</a>';
    });
  return safe.length ? '<div class="v3-ask-sources"><small>Sources</small>' + safe.join("") + '</div>' : "";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

function renderEvidenceCards(evidence) {
  if (!Array.isArray(evidence) || !evidence.length) return "";
  return '<div class="v3-evidence-grid">' + evidence.slice(0, 3).map(item => {
    const tools = Array.isArray(item.tools) ? item.tools : [];
    const useCases = Array.isArray(item.useCases) ? item.useCases : [];
    const tags = [...tools, ...useCases].slice(0, 6)
      .map(tag => '<span>' + escapeHtml(tag) + '</span>').join("");

    const timeline = item.kind === "timeline"
      ? '<div class="v3-evidence-timeline"><b>' + escapeHtml(item.period || "") + '</b><span>' +
        escapeHtml(item.role || "") + (item.organization ? ' · ' + escapeHtml(item.organization) : '') + '</span></div>'
      : "";

    const primary = item.cta?.url && /^https:\/\//i.test(item.cta.url)
      ? '<a class="v3-evidence-cta primary" href="' + escapeHtml(item.cta.url) + '" target="_blank" rel="noopener">' +
        escapeHtml(item.cta.label || "Open") + ' ↗</a>'
      : "";

    const secondary = item.secondary?.target
      ? '<button class="v3-evidence-cta" type="button" data-v3-evidence-target="' +
        escapeHtml(item.secondary.target) + '">' + escapeHtml(item.secondary.label || "View") + '</button>'
      : "";

    const source = !primary && item.url && /^https:\/\//i.test(item.url)
      ? '<a class="v3-evidence-cta" href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener">Inspect evidence ↗</a>'
      : "";

    return '<article class="v3-evidence-card' + (item.kind ? ' is-' + escapeHtml(item.kind) : '') + '">' +
      '<small>' + escapeHtml(item.label || "Evidence") + '</small>' +
      '<strong>' + escapeHtml(item.title || "") + '</strong>' +
      timeline +
      '<div class="v3-evidence-tags">' + tags + '</div>' +
      (item.approach ? '<p><b>Approach</b> · ' + escapeHtml(item.approach) + '</p>' : '') +
      (item.why ? '<p class="v3-evidence-why">' + escapeHtml(item.why) + '</p>' : '') +
      ((primary || secondary || source) ? '<div class="v3-evidence-actions">' + primary + secondary + source + '</div>' : '') +
    '</article>';
  }).join("") + '</div>';
}

function createMetrics() {
    const liveApps = document.querySelectorAll("#live-apps .focus-card").length;
    const products = document.querySelectorAll("#digital-products .focus-card").length;
    const publications = document.querySelectorAll(".publication-card").length;
    const workflowSteps = document.querySelectorAll("#ai-workflow .workflow-step").length;

    const targets = [
      ["liveAppsMetric", liveApps || 4],
      ["productsMetric", products || 3],
      ["workflowMetric", workflowSteps || 6],
      ["publicationMetric", publications || 1]
    ];

    targets.forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(value).padStart(2, "0");
    });
  }

  function initCommandPalette() {
    const overlay = document.getElementById("v3CommandOverlay");
    const input = document.getElementById("v3CommandInput");
    const list = document.getElementById("v3CommandList");
    const hint = document.getElementById("v3CommandHint");
    if (!overlay || !input || !list) return;

    let filtered = commands.slice();
    let activeIndex = 0;

    const close = () => {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
      input.value = "";
      filtered = commands.slice();
      activeIndex = 0;
      render();
    };

    const open = () => {
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => input.focus());
    };

    const render = () => {
      list.innerHTML = "";
      if (!filtered.length) {
        const empty = document.createElement("div");
        empty.className = "v3-command-empty";
        empty.textContent = "No matching action.";
        list.appendChild(empty);
        return;
      }

      filtered.forEach((item, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "v3-command-item" + (index === activeIndex ? " is-active" : "");
        button.innerHTML = "<span>" + item.label + "</span><small>" + item.hint + "</small>";
        button.addEventListener("click", () => {
          close();
          item.action();
        });
        list.appendChild(button);
      });
    };

    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      filtered = commands.filter((item) =>
        (item.label + " " + item.hint).toLowerCase().includes(q)
      );
      activeIndex = 0;
      render();
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        activeIndex = Math.min(activeIndex + 1, filtered.length - 1);
        render();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        render();
      } else if (event.key === "Enter" && filtered[activeIndex]) {
        event.preventDefault();
        const action = filtered[activeIndex].action;
        close();
        action();
      }
    });

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) close();
    });

    hint?.addEventListener("click", open);

    document.addEventListener("keydown", (event) => {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (isShortcut) {
        event.preventDefault();
        overlay.classList.contains("is-open") ? close() : open();
      } else if (event.key === "Escape" && overlay.classList.contains("is-open")) {
        close();
      }
    });

    render();
  }

  function initAskPortfolio() {
    const trigger = document.getElementById("v3AskTrigger");
    const panel = document.getElementById("v3AskPanel");
    const closeButton = document.getElementById("v3AskClose");
    const input = document.getElementById("v3AskInput");
    const submit = document.getElementById("v3AskSubmit");
    const legacyAnswer = document.getElementById("v3AskAnswer");
    const chips = document.querySelectorAll("[data-v3-question]");
    const body = panel?.querySelector(".v3-ask-body");
    const head = panel?.querySelector(".v3-ask-head");
    const modeButtons = panel?.querySelectorAll("[data-v3-mode]") || [];
    const recruiterPanel = document.getElementById("v3RecruiterPanel");
    const roleBrief = document.getElementById("v3RoleBrief");
    const analyzeRole = document.getElementById("v3AnalyzeRole");
    if (!trigger || !panel || !body || !input || !submit) return;

    if (head && !head.querySelector(".v3-ask-status")) {
      const status = document.createElement("div");
      status.className = "v3-ask-status";
      status.textContent = "Evidence-grounded portfolio AI · Live";
      head.appendChild(status);
    }

    let conversation = body.querySelector(".v3-ask-conversation");
    if (!conversation) {
      conversation = document.createElement("div");
      conversation.className = "v3-ask-conversation";
      if (legacyAnswer) {
        legacyAnswer.insertAdjacentElement("beforebegin", conversation);
      } else {
        body.prepend(conversation);
      }
    }

    if (legacyAnswer) legacyAnswer.style.display = "none";

    if (!body.querySelector(".v3-ask-helper")) {
      const helper = document.createElement("div");
      helper.className = "v3-ask-helper";
      helper.innerHTML = "Try a topic above or type naturally · <kbd>Enter</kbd> to ask";
      body.appendChild(helper);
    }

    const normalize = (value) =>
      (value || "")
        .toLocaleLowerCase("en-US")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const findAnswer = (question) => {
      const q = normalize(question);
      let best = null;
      let score = 0;

      answers.forEach((item) => {
        const itemScore = item.keys.reduce((total, key) => {
          return total + (q.includes(normalize(key)) ? 1 : 0);
        }, 0);
        if (itemScore > score) {
          score = itemScore;
          best = item;
        }
      });

      return best;
    };

    const scrollConversation = () => {
      conversation.scrollTop = conversation.scrollHeight;
    };

    const appendUser = (text) => {
      const msg = document.createElement("div");
      msg.className = "v3-msg user";
      msg.textContent = text;
      conversation.appendChild(msg);
      scrollConversation();
    };

    const appendAssistant = (item) => {
      const msg = document.createElement("div");
      msg.className = "v3-msg assistant";
      msg.innerHTML = item
        ? item.html
        : "I can help with <strong>TourPilot, AI workflow, tech stack, research, products or collaboration</strong>.";

      if (item?.actions?.length) {
        const actions = document.createElement("div");
        actions.className = "v3-ask-actions";

        item.actions.forEach((action) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "v3-ask-action";
          button.textContent = action.label;
          button.addEventListener("click", () => {
            if (action.type === "url") {
              if (action.target.startsWith("mailto:")) {
                window.location.href = action.target;
              } else {
                window.open(action.target, "_blank", "noopener");
              }
            } else {
              document.querySelector(action.target)?.scrollIntoView({ behavior: "smooth" });
              panel.classList.remove("is-open");
              trigger.setAttribute("aria-expanded", "false");
            }
          });
          actions.appendChild(button);
        });

        msg.appendChild(actions);
      }

      const meta = document.createElement("span");
      meta.className = "v3-msg-meta";
      meta.textContent = "Based on this portfolio";
      msg.appendChild(meta);

      conversation.appendChild(msg);
      scrollConversation();
    };

    const showTyping = () => {
      const typing = document.createElement("div");
      typing.className = "v3-typing";
      typing.innerHTML = "<i></i><i></i><i></i>";
      conversation.appendChild(typing);
      scrollConversation();
      return typing;
    };

    let responseTimer = null;
    const API_URL = "https://mehmetcam-portfolio-ai.aydin254.workers.dev/chat";
    const chatHistory = [];
    let currentMode = "explore";

    const appendAIText = (text, model, sources = [], metaData = {}) => {
      const msg = document.createElement("div");
      msg.className = "v3-msg assistant";

      if (metaData.recruiter) {
        const recruiter = document.createElement("div");
        recruiter.className = "v3-recruiter-result";
        const areas = Array.isArray(metaData.recruiter.verifiedAreas) ? metaData.recruiter.verifiedAreas : [];
        recruiter.innerHTML = '<small>RECRUITER EVIDENCE REVIEW</small><strong>' +
          escapeHtml(String(metaData.recruiter.evidenceCount || 0)) + ' evidence-backed signal' +
          (Number(metaData.recruiter.evidenceCount) === 1 ? '' : 's') +
          '</strong><div>' + areas.map(area => '<span>' + escapeHtml(area) + '</span>').join('') + '</div>';
        msg.appendChild(recruiter);
      }

      const content = document.createElement("div");
      content.textContent = text;
      msg.appendChild(content);

      if (metaData.grounded) {
        const proof = document.createElement("div");
        proof.className = "v3-proof-badge";
        proof.textContent = metaData.route === "not-found" ? "✓ Safe no-answer" : "✓ Grounded in portfolio evidence";
        msg.appendChild(proof);
      }

      const evidenceMarkup = renderEvidenceCards(metaData.evidence || []);
      if (evidenceMarkup) {
        const evidenceWrap = document.createElement("div");
        evidenceWrap.innerHTML = evidenceMarkup;
        msg.appendChild(evidenceWrap);
      }

      const sourceMarkup = renderPortfolioSources(sources);
      if (sourceMarkup) {
        const sourceWrap = document.createElement("div");
        sourceWrap.innerHTML = sourceMarkup;
        msg.appendChild(sourceWrap);
      }

      const meta = document.createElement("span");
      meta.className = "v3-msg-meta";
      meta.textContent = model ? "Portfolio AI · " + model : "Portfolio AI";
      msg.appendChild(meta);

      conversation.appendChild(msg);
      scrollConversation();
    };

    const ask = async (question) => {
      const clean = (question || "").trim();
      if (!clean) return;

      if (responseTimer) window.clearTimeout(responseTimer);

      appendUser(clean);
      input.value = "";
      const typing = showTyping();

      submit.disabled = true;
      input.disabled = true;

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: clean,
            mode: currentMode,
            history: chatHistory.slice(-6)
          })
        });

        const data = await response.json();
        if (!response.ok || !data.answer) throw new Error(data.error || "AI request failed");

        typing.remove();
        appendAIText(data.answer, "Live", data.sources || [], data);
        chatHistory.push(
          { role: "user", content: clean },
          { role: "assistant", content: data.answer }
        );
      } catch (error) {
        console.warn("Portfolio AI fallback:", error);
        typing.remove();
        appendAssistant(findAnswer(clean));
      } finally {
        submit.disabled = false;
        input.disabled = false;
        input.focus();
      }
    };

    const open = () => {
      panel.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      if (!conversation.children.length) {
        appendAssistant({
          html: "<strong>I’m Mehmet’s evidence-grounded portfolio AI.</strong><br><br>I can connect projects, engineering decisions, professional experience, research and publications — and show the sources behind the answer.",
          actions: [
            { label: "Inspect TourPilot", type: "section", target: "#featured-project" },
            { label: "See AI workflow", type: "section", target: "#ai-workflow" }
          ]
        });
      }
      window.setTimeout(() => input.focus(), 80);
    };

    const close = () => {
      panel.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    };

    trigger.addEventListener("click", () => {
      panel.classList.contains("is-open") ? close() : open();
    });

    closeButton?.addEventListener("click", close);

    chips.forEach((chip) => {
      chip.addEventListener("click", () => ask(chip.getAttribute("data-v3-question")));
    });

    modeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const mode = button.getAttribute("data-v3-mode");
        currentMode = mode || "explore";
        modeButtons.forEach((item) => item.classList.toggle("is-active", item === button));
        if (recruiterPanel) recruiterPanel.hidden = mode !== "recruiter";
        input.placeholder = mode === "recruiter"
          ? "Ask a follow-up about experience or evidence…"
          : "Ask for evidence, projects or engineering decisions…";
        if (mode === "recruiter") window.setTimeout(() => roleBrief?.focus(), 60);
      });
    });

    analyzeRole?.addEventListener("click", () => {
      const brief = (roleBrief?.value || "").trim();
      if (!brief) {
        roleBrief?.focus();
        return;
      }
      const prompt = "Act as an evidence navigator for a recruiter. Using only Mehmet's documented portfolio knowledge, analyze this role brief. Summarize the strongest relevant evidence, concrete projects/experience to inspect, and any important requirement that is not documented. Do not invent a fit score. Role brief: " + brief.slice(0, 800);
      ask(prompt);
    });

    conversation.addEventListener("click", (event) => {
      const button = event.target.closest("[data-v3-evidence-target]");
      if (!button) return;
      const target = button.getAttribute("data-v3-evidence-target");
      if (!target) return;
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      panel.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    });

    submit.addEventListener("click", () => ask(input.value));

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        ask(input.value);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && panel.classList.contains("is-open")) close();
    });
  }

  function initAdminShortcut() {
    const button = document.getElementById("v3SecretAdmin");
    const openAdmin = () => {
      window.location.href = "portfolio-ai-admin.html";
    };
    button?.addEventListener("click", openAdmin);
    document.addEventListener("keydown", (event) => {
      const shortcut = (event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === "a";
      if (shortcut) {
        event.preventDefault();
        openAdmin();
      }
    });
  }

  async function initVisitorCounter() {
    const counter = document.getElementById("v3VisitCounter");
    if (!counter) return;
    try {
      let visitorId = localStorage.getItem("mc_portfolio_visitor_id");
      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem("mc_portfolio_visitor_id", visitorId);
      }
      const response = await fetch("https://mehmetcam-portfolio-ai.aydin254.workers.dev/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId })
      });
      const data = await response.json();
      if (response.ok && Number.isFinite(Number(data.totalVisitors))) {
        counter.textContent = "Portfolio visitors · " + new Intl.NumberFormat("en-US").format(Number(data.totalVisitors));
      } else {
        counter.textContent = "Portfolio analytics · live";
      }
    } catch {
      counter.textContent = "Portfolio analytics · live";
    }
  }

  function init() {
    createMetrics();
    initCommandPalette();
    initAskPortfolio();
    initVisitorCounter();
    initAdminShortcut();
  }

  document.addEventListener("DOMContentLoaded", init);
})();