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
      keys: ["tourpilot", "tour", "reservation", "operations"],
      html: "<strong>TourPilot</strong> is Mehmet's featured AI-assisted tour operations product. It brings reservation ingestion, operational planning, RBAC, auditability, data quality and automation into one production-minded workflow."
    },
    {
      keys: ["ai", "claude", "codex", "workflow", "build", "engineering"],
      html: "Mehmet uses <strong>Claude Code and Codex as engineering agents</strong> inside a disciplined loop: frame → architect → build → test → verify → ship & learn."
    },
    {
      keys: ["stack", "technology", "tools", "tech"],
      html: "The portfolio highlights <strong>TypeScript, Python, PostgreSQL, Neon, Render, n8n, Streamlit, Expo, GitHub, Claude Code and Codex</strong>, alongside research methods and data-driven decision systems."
    },
    {
      keys: ["research", "agriculture", "agritech", "horizon", "springer"],
      html: "Mehmet combines <strong>applied AI, sustainable agriculture and research</strong>. The portfolio includes Horizon 2020 experience, smart-agriculture work and a Springer publication."
    },
    {
      keys: ["product", "evalora", "oncoconnect", "automation", "n8n"],
      html: "Beyond TourPilot, the portfolio includes <strong>Evalora, OncoConnect, n8n automation workflows</strong> and several live AI applications."
    },
    {
      keys: ["contact", "work", "collaborate", "hire"],
      html: "You can reach Mehmet through the <strong>Contact</strong> section. He is open to AI product, automation, data, AgriTech, research and product-building collaborations."
    }
  ];

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
    const answer = document.getElementById("v3AskAnswer");
    const chips = document.querySelectorAll("[data-v3-question]");
    if (!trigger || !panel || !answer) return;

    const setAnswer = (question) => {
      const q = (question || "").trim().toLowerCase();
      const match = answers.find((item) => item.keys.some((key) => q.includes(key)));
      answer.innerHTML = match
        ? match.html
        : "Try asking about <strong>TourPilot, AI workflow, tech stack, research, products or collaboration</strong>.";
    };

    const open = () => {
      panel.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
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
      chip.addEventListener("click", () => {
        setAnswer(chip.getAttribute("data-v3-question"));
      });
    });

    const submitQuestion = () => {
      if (!input) return;
      setAnswer(input.value);
      input.value = "";
    };

    submit?.addEventListener("click", submitQuestion);
    input?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") submitQuestion();
    });
  }

  function init() {
    createMetrics();
    initCommandPalette();
    initAskPortfolio();
  }

  document.addEventListener("DOMContentLoaded", init);
})();