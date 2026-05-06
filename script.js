/* =========================================================
   Mehmet Cam Portfolio
   Final Compatible script.js
   ========================================================= */

/* -----------------------------
   AI Apps Data
----------------------------- */

const apps = [
  {
    title: "AgriVision AI",
    description:
      "AI-powered agriculture intelligence application for data-driven insights, smart decision support and AgriTech innovation.",
    tags: ["AI", "AgriTech", "Streamlit"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://agrivision-ai09.streamlit.app/",
    badge: "AgriTech",
    icon: "🌾",
    gradient: "linear-gradient(135deg, #00d084 0%, #00d4ff 100%)"
  },
  {
    title: "Food Regulatory Dashboard",
    description:
      "Interactive dashboard for food regulatory monitoring, compliance insights, analytics and visualization.",
    tags: ["FoodTech", "Regulatory", "Dashboard"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://food-regulatory-dashboard-09.streamlit.app/",
    badge: "FoodTech",
    icon: "🍽️",
    gradient: "linear-gradient(135deg, #ff8a3d 0%, #ff3864 100%)"
  },
  {
    title: "GrantMirror AI",
    description:
      "AI-assisted grant discovery and project development tool for innovation funding opportunities and EU projects.",
    tags: ["AI", "EU Projects", "Grants"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://grantmirror-ai.streamlit.app/",
    badge: "EU Grants",
    icon: "🔎",
    gradient: "linear-gradient(135deg, #7b61ff 0%, #00d4ff 100%)"
  },
  {
    title: "MeetAlign",
    description:
      "Smart meeting alignment and collaboration assistant designed to improve productivity, planning and decision-making.",
    tags: ["Productivity", "AI", "Meetings"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://meetalign.streamlit.app/",
    badge: "Productivity",
    icon: "🤝",
    gradient: "linear-gradient(135deg, #00c2ff 0%, #00d084 100%)"
  },
  {
    title: "OncoConnect Co-Creation",
    description:
      "Oncology-focused co-creation concept for stakeholder engagement, collaboration and healthcare innovation.",
    tags: ["HealthTech", "Oncology", "Co-Creation"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://oncoconnect-co-creation-app.streamlit.app/",
    badge: "HealthTech",
    icon: "💊",
    gradient: "linear-gradient(135deg, #ff4ca8 0%, #7b61ff 100%)"
  }
];

/* -----------------------------
   Agricultural Projects Data
----------------------------- */

const agriProjects = [
  {
    title: "Agricultural Solution Center",
    originalTitle: "Tarımsal Çözüm Merkezi",
    category: "Software",
    role: "Project Manager",
    imageFile: "agricultural-solution-center.jpg",
    imageMode: "cover",
    source: "https://tabitaim.com//projelerimiz",
    description:
      "A software-oriented agricultural solution concept designed to support stakeholders in the agriculture and food value chain through technology-enabled consulting, process management and decision support. I contributed to digital advisory workflows, farmer support mechanisms and solution design.",
    impact:
      "Digital advisory • Farmer support • Decision support software • Agricultural process management",
    icon: "🌱"
  },
  {
    title: "Smart OASIS",
    originalTitle: "Smart OASIS",
    category: "Digital Farm",
    role: "Researcher",
    imageFile: "smart-oasis.jpg",
    imageMode: "cover",
    source: "https://tabitaim.com//projelerimiz",
    description:
      "An integrated digital farm initiative combining smart production infrastructure, IoT, data-driven monitoring and technology-oriented agricultural production concepts. I contributed as a researcher through project analysis, information gathering, innovation mapping and design support.",
    impact:
      "Digital farm • Smart production • IoT • AgriTech infrastructure",
    icon: "🛰️"
  },
  {
    title: "Tabit Smart Village",
    originalTitle: "Tabit Akıllı Köy",
    category: "Smart Village",
    role: "Researcher",
    imageFile: "smart-village.jpg",
    imageMode: "cover",
    source: "https://tabitaim.com//projelerimiz",
    description:
      "A smart village model combining rural development, agricultural innovation, digital transformation and technology-enabled farming practices. I contributed to research activities, user needs analysis and field-oriented learning processes.",
    impact:
      "Smart village • Rural innovation • Digital transformation • Farmer-centered design",
    icon: "🏡"
  },
  {
    title: "RIGEL",
    originalTitle: "Rapor ve İstatistik Geliştirme Uzayı",
    category: "Software",
    role: "Project Manager",
    imageFile: "rigel.jpg",
    imageMode: "contain",
    source: "https://tabitaim.com//projelerimiz",
    description:
      "A reporting and statistics-focused software concept designed to transform agricultural information into structured insights and decision-support outputs. As project manager, I contributed to process planning, output tracking and data-driven structure development.",
    impact:
      "Reporting • Statistics • Data-driven decisions • Structured agricultural insights",
    icon: "📊"
  },
  {
    title: "Azmud Smart Greenhouse",
    originalTitle: "Azmud Akıllı Sera",
    category: "Smart Greenhouse",
    role: "Researcher",
    imageFile: "azmud.jpg",
    imageMode: "contain",
    source: "https://tabitaim.com//projelerimiz",
    description:
      "A smart greenhouse sensor initiative focused on controlled agriculture, sensor technologies, monitoring and data-supported greenhouse management. I contributed to technical needs analysis, use-case development and agricultural technology assessment.",
    impact:
      "Smart greenhouse • Sensors • Controlled agriculture • Monitoring",
    icon: "🌿"
  },
  {
    title: "Vodafone Farmers Club",
    originalTitle: "Vodafone Çiftçi Kulübü",
    category: "Business Model",
    role: "Contributor and Trainer",
    imageFile: "vodafone-farmers-club.jpg",
    imageMode: "cover",
    source: "https://tabitaim.com//projelerimiz",
    description:
      "A farmer-oriented service, communication, training and business model initiative. I contributed to farmer engagement, training processes and field-oriented knowledge transfer activities.",
    impact:
      "Farmer services • Business model • Training • Agricultural communication",
    icon: "📱"
  }
];

/* -----------------------------
   Helpers
----------------------------- */

const repoBase =
  "https://cdn.jsdelivr.net/gh/mehmetcamofficial/mehmetcamofficial.github.io@main";

function safeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getImageCandidates(fileName) {
  return [
    `./${fileName}`,
    `${fileName}`,
    `./images/${fileName}`,
    `./assets/${fileName}`,
    `${repoBase}/${fileName}`,
    `https://raw.githubusercontent.com/mehmetcamofficial/mehmetcamofficial.github.io/main/${fileName}`
  ];
}

window.handleImageError = function handleImageError(img) {
  const fileName = img.dataset.file;
  let step = Number(img.dataset.step || "0");

  const candidates = getImageCandidates(fileName);
  step += 1;

  if (step < candidates.length) {
    img.dataset.step = String(step);
    img.src = candidates[step];
  } else {
    img.onerror = null;
    img.classList.add("image-missing");
    img.alt = "Project image could not be loaded";
  }
};

function isValidFormspreeUrl(url) {
  return (
    typeof url === "string" &&
    url.startsWith("https://formspree.io/f/") &&
    !url.includes("your-form-id")
  );
}

/* -----------------------------
   Stars Canvas
----------------------------- */

function initStarsCanvas() {
  const canvas = document.getElementById("starsCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let stars = [];
  let animationFrame = null;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];

    const count = Math.floor((canvas.width * canvas.height) / 7000);

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.25 + 0.2,
        alpha: Math.random() * 0.65 + 0.15,
        speed: Math.random() * 0.25 + 0.05,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";

    const t = Date.now() * 0.001;

    stars.forEach((star) => {
      const pulse = Math.sin(t * star.speed + star.phase) * 0.2;
      const alpha = Math.max(0.05, star.alpha + pulse);

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

      ctx.fillStyle = isDark
        ? `rgba(190, 220, 255, ${alpha})`
        : `rgba(0, 80, 160, ${alpha * 0.3})`;

      ctx.fill();
    });

    animationFrame = requestAnimationFrame(drawStars);
  }

  resizeCanvas();
  createStars();
  drawStars();

  window.addEventListener("resize", () => {
    resizeCanvas();
    createStars();
  });

  window.addEventListener("beforeunload", () => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
  });
}

/* -----------------------------
   Render AI Apps
----------------------------- */

function renderApps() {
  const appsGrid = document.getElementById("appsGrid");
  if (!appsGrid) return;

  appsGrid.innerHTML = "";

  apps.forEach((app) => {
    const card = document.createElement("article");
    card.className = "app-card";

    const tagsHtml = app.tags
      .map((tag) => `<span>${safeText(tag)}</span>`)
      .join("");

    card.innerHTML = `
      <div class="app-card-visual" style="background:${app.gradient}">
        <div class="app-card-glow"></div>
        <span class="app-icon">${safeText(app.icon)}</span>
        <span class="app-badge">${safeText(app.badge)}</span>
      </div>

      <div class="app-card-body">
        <h3>${safeText(app.title)}</h3>

        <p>${safeText(app.description)}</p>

        <div class="app-tags">
          ${tagsHtml}
        </div>

        <div class="app-actions">
          <a href="${app.github}" target="_blank" rel="noopener" class="app-btn ghost">
            GitHub
          </a>

          <a href="${app.demo}" target="_blank" rel="noopener" class="app-btn primary">
            Open App →
          </a>
        </div>
      </div>
    `;

    appsGrid.appendChild(card);
  });
}

/* -----------------------------
   Render Agricultural Projects
----------------------------- */

function renderAgriProjects() {
  const agriGrid = document.getElementById("agriGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (!agriGrid) return;

  function createImpactChips(impactText) {
    return impactText
      .split("•")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => `<span>${safeText(item)}</span>`)
      .join("");
  }

  function createCards(filter = "All") {
    agriGrid.innerHTML = "";

    const filtered =
      filter === "All"
        ? agriProjects
        : agriProjects.filter((project) => project.category === filter);

    filtered.forEach((project) => {
      const card = document.createElement("article");
      card.className = "agri-card agri-card-premium";
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `View project: ${project.title}`);

      const firstImage = getImageCandidates(project.imageFile)[0];
      const imageClass =
        project.imageMode === "contain" ? "contain-img" : "cover-img";

      card.innerHTML = `
        <div class="agri-img-wrap">
          <img
            src="${firstImage}"
            data-file="${safeText(project.imageFile)}"
            data-step="0"
            onerror="handleImageError(this)"
            alt="${safeText(project.title)}"
            class="agri-img ${imageClass}"
          />

          <div class="agri-img-overlay">
            <span class="agri-overlay-icon">${safeText(project.icon)}</span>
            <strong>View Details →</strong>
          </div>
        </div>

        <div class="agri-card-body">
          <div class="agri-card-top">
            <span class="agri-category">${safeText(project.category)}</span>
            <span class="agri-role">${safeText(project.role)}</span>
          </div>

          <h3>${safeText(project.title)}</h3>

          <p class="agri-original">
            ${safeText(project.originalTitle)}
          </p>

          <div class="agri-impact-chips">
            ${createImpactChips(project.impact)}
          </div>

          <button type="button" class="view-project-btn">
            View Project →
          </button>
        </div>
      `;

      card.addEventListener("click", () => {
        openProjectModal(project);
      });

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openProjectModal(project);
        }
      });

      agriGrid.appendChild(card);
    });
  }

  createCards("All");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterValue = button.dataset.filter || "All";

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      createCards(filterValue);
    });
  });
}

/* -----------------------------
   Project Modal
----------------------------- */

function openProjectModal(project) {
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  const modalImage = document.getElementById("modalImage");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalOriginal = document.getElementById("modalOriginal");
  const modalRole = document.getElementById("modalRole");
  const modalDescription = document.getElementById("modalDescription");
  const modalImpact = document.getElementById("modalImpact");
  const modalSource = document.getElementById("modalSource");

  const firstImage = getImageCandidates(project.imageFile)[0];

  if (modalImage) {
    modalImage.classList.remove("image-missing", "modal-contain");

    modalImage.src = firstImage;
    modalImage.alt = project.title;
    modalImage.dataset.file = project.imageFile;
    modalImage.dataset.step = "0";

    modalImage.onerror = function () {
      handleImageError(this);
    };

    if (project.imageMode === "contain") {
      modalImage.classList.add("modal-contain");
    }
  }

  if (modalCategory) modalCategory.textContent = project.category;
  if (modalTitle) modalTitle.textContent = project.title;
  if (modalOriginal) modalOriginal.textContent = project.originalTitle;
  if (modalRole) modalRole.textContent = project.role;
  if (modalDescription) modalDescription.textContent = project.description;

  if (modalImpact) {
    const impactItems = project.impact
      .split("•")
      .map((item) => item.trim())
      .filter(Boolean);

    modalImpact.innerHTML = impactItems
      .map((item) => `<span>${safeText(item)}</span>`)
      .join("");
  }

  if (modalSource) {
    modalSource.href = project.source;
  }

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}

function initProjectModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  document.addEventListener("click", (event) => {
    const closeTarget = event.target.closest(
      "[data-close-modal], .modal-close, .project-modal-backdrop"
    );

    if (closeTarget) {
      event.preventDefault();
      event.stopPropagation();
      closeProjectModal();
    }
  });

  const panel = modal.querySelector(".project-modal-panel");

  if (panel) {
    panel.addEventListener("click", (event) => {
      if (!event.target.closest("[data-close-modal], .modal-close")) {
        event.stopPropagation();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProjectModal();
    }
  });
}

/* -----------------------------
   Theme Toggle
----------------------------- */

function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  if (!themeToggle) return;

  const savedTheme = localStorage.getItem("theme") || "light";

  html.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "🌙" : "☀️";

  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);

    themeToggle.textContent = nextTheme === "dark" ? "🌙" : "☀️";
  });
}

/* -----------------------------
   Contact Form
----------------------------- */

function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const status = document.createElement("div");
  status.className = "form-status";
  status.style.display = "none";

  form.appendChild(status);

  form.addEventListener("submit", async (event) => {
    const actionUrl = form.getAttribute("action");

    if (!isValidFormspreeUrl(actionUrl)) {
      event.preventDefault();

      status.style.display = "block";
      status.className = "form-status warning";
      status.textContent = "Formspree URL is not configured correctly.";

      return;
    }

    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton ? submitButton.textContent : "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    status.style.display = "block";
    status.className = "form-status info";
    status.textContent = "Sending your message...";

    try {
      const response = await fetch(actionUrl, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        form.reset();

        status.className = "form-status success";
        status.textContent =
          "Thank you! Your message has been sent successfully.";
      } else {
        status.className = "form-status error";
        status.textContent =
          "Something went wrong. Please try again or contact me by email.";
      }
    } catch {
      status.className = "form-status error";
      status.textContent =
        "Network error. Please try again or contact me by email.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }
  });
}

/* -----------------------------
   Navigation Highlight
----------------------------- */

function initNavigationHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          link.classList.remove("active-nav");

          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active-nav");
          }
        });
      });
    },
    {
      threshold: 0.3
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/* -----------------------------
   Reveal Animations
----------------------------- */

function initRevealAnimations() {
  const revealItems = document.querySelectorAll(
    ".section-heading, .glass-panel, .stat-card, .agri-card, .app-card, .focus-card, .timeline-item, .training-card, .skill-column, .education-card, .publication-card, .contact-form, .contact-info"
  );

  if (!revealItems.length) return;

  document.documentElement.classList.add("js-reveal");

  revealItems.forEach((item) => {
    item.classList.add("reveal");
  });

  function showItem(item) {
    item.classList.add("visible");
    item.classList.add("revealed");
  }

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(showItem);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        showItem(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));

  setTimeout(() => {
    revealItems.forEach(showItem);
  }, 900);
}

/* -----------------------------
   Footer Year
----------------------------- */

function setFooterYear() {
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

/* -----------------------------
   Runtime Styles
   Orbit + Agri Cards
----------------------------- */

function injectOrbitMotionStyles() {
  if (document.getElementById("portfolioRuntimeRepairStyles")) return;

  const style = document.createElement("style");
  style.id = "portfolioRuntimeRepairStyles";

  style.textContent = `
    .orbit-system {
      overflow: visible !important;
    }

    .profile-planet {
      overflow: visible !important;
      isolation: isolate !important;
      background: transparent !important;
    }

    .profile-planet img {
      position: relative !important;
      z-index: 10 !important;
      border-radius: 50% !important;
      background: #ffffff !important;
    }

    .runtime-profile-halo {
      position: absolute !important;
      inset: -58px !important;
      z-index: 1 !important;
      border-radius: 50% !important;
      pointer-events: none !important;

      background:
        radial-gradient(
          circle,
          rgba(0, 111, 214, 0.2) 0%,
          rgba(104, 76, 255, 0.14) 42%,
          transparent 72%
        ) !important;

      animation: runtimeProfileHaloPulse 3.4s ease-in-out infinite !important;
    }

    .runtime-profile-ring {
      position: absolute !important;
      inset: -20px !important;
      z-index: 4 !important;
      border-radius: 50% !important;
      pointer-events: none !important;

      background:
        conic-gradient(
          from 0deg,
          transparent 0deg,
          transparent 165deg,
          rgba(0, 111, 214, 0.16) 205deg,
          #006fd6 240deg,
          #684cff 285deg,
          #009f61 330deg,
          transparent 360deg
        ) !important;

      -webkit-mask:
        radial-gradient(
          farthest-side,
          transparent calc(100% - 17px),
          #000 calc(100% - 16px)
        ) !important;

      mask:
        radial-gradient(
          farthest-side,
          transparent calc(100% - 17px),
          #000 calc(100% - 16px)
        ) !important;

      animation: runtimeProfileRingSpin 7.5s linear infinite !important;
      filter: drop-shadow(0 0 20px rgba(0, 111, 214, 0.42)) !important;
    }

    .runtime-profile-ring::after {
      content: "" !important;
      position: absolute !important;
      right: 10px !important;
      top: 50% !important;

      width: 14px !important;
      height: 14px !important;

      border-radius: 50% !important;

      background: #00ff88 !important;

      box-shadow:
        0 0 12px #00ff88,
        0 0 28px #00d4ff !important;

      transform: translateY(-50%) !important;
    }

    .orbit-runner {
      position: absolute !important;
      inset: 0 !important;
      border-radius: 50% !important;
      pointer-events: none !important;
      transform-origin: 50% 50% !important;
    }

    .orbit-runner::before {
      content: "" !important;
      position: absolute !important;
      top: -5px !important;
      left: 50% !important;

      width: 10px !important;
      height: 10px !important;

      border-radius: 50% !important;

      transform: translateX(-50%) !important;

      background: #006fd6 !important;

      box-shadow:
        0 0 10px #006fd6,
        0 0 24px #006fd6 !important;
    }

    .orbit-runner-1 {
      animation: runtimeOrbitSpin 14s linear infinite !important;
    }

    .orbit-runner-2 {
      animation: runtimeOrbitSpin 22s linear infinite reverse !important;
    }

    .orbit-runner-3 {
      animation: runtimeOrbitSpin 30s linear infinite !important;
    }

    .orbit-runner-2::before {
      background: #684cff !important;
      box-shadow:
        0 0 10px #684cff,
        0 0 24px #684cff !important;
    }

    .orbit-runner-3::before {
      background: #009f61 !important;
      box-shadow:
        0 0 10px #009f61,
        0 0 24px #009f61 !important;
    }

    .satellite {
      position: absolute !important;
      top: 50% !important;
      left: 50% !important;
      z-index: 50 !important;
      pointer-events: auto !important;
      will-change: transform !important;

      transition:
        box-shadow 0.25s ease,
        border-color 0.25s ease,
        background 0.25s ease !important;
    }

    .satellite:hover {
      border-color: var(--border-strong) !important;
      box-shadow:
        0 18px 40px rgba(0, 0, 0, 0.14),
        0 0 32px rgba(0, 111, 214, 0.22) !important;
    }

    html[data-theme="dark"] .runtime-profile-ring {
      background:
        conic-gradient(
          from 0deg,
          transparent 0deg,
          transparent 165deg,
          rgba(0, 212, 255, 0.18) 205deg,
          #00d4ff 240deg,
          #7b61ff 285deg,
          #00ff88 330deg,
          transparent 360deg
        ) !important;

      filter: drop-shadow(0 0 22px rgba(0, 212, 255, 0.5)) !important;
    }

    @keyframes runtimeProfileRingSpin {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    @keyframes runtimeProfileHaloPulse {
      0%,
      100% {
        opacity: 0.58;
        transform: scale(1);
      }

      50% {
        opacity: 1;
        transform: scale(1.08);
      }
    }

    @keyframes runtimeOrbitSpin {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    .agri-grid {
      display: grid !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      gap: 28px !important;
      align-items: stretch !important;
    }

    .agri-card-premium {
      min-height: 560px !important;
      height: auto !important;

      display: flex !important;
      flex-direction: column !important;

      border: 1px solid var(--border) !important;
      border-radius: var(--radius-xl) !important;

      background:
        linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.9),
          rgba(242, 248, 255, 0.78)
        ) !important;

      backdrop-filter: blur(18px) !important;
      -webkit-backdrop-filter: blur(18px) !important;

      box-shadow:
        0 26px 76px rgba(28, 68, 110, 0.14),
        inset 0 1px 0 rgba(255, 255, 255, 0.34) !important;

      overflow: hidden !important;
      cursor: pointer !important;

      transition:
        transform 0.28s ease,
        box-shadow 0.28s ease,
        border-color 0.28s ease !important;
    }

    html[data-theme="dark"] .agri-card-premium {
      background:
        linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.065),
          rgba(255, 255, 255, 0.025)
        ) !important;
    }

    .agri-card-premium:hover {
      transform: translateY(-10px) !important;
      border-color: var(--border-strong) !important;
      box-shadow:
        0 34px 90px rgba(28, 68, 110, 0.18),
        0 0 60px rgba(0, 111, 214, 0.15) !important;
    }

    .agri-card-premium .agri-img-wrap {
      position: relative !important;
      width: 100% !important;
      height: 250px !important;
      min-height: 250px !important;
      overflow: hidden !important;

      border-bottom: 1px solid var(--border) !important;

      background:
        linear-gradient(
          135deg,
          rgba(0, 111, 214, 0.12),
          rgba(104, 76, 255, 0.12)
        ) !important;
    }

    .agri-card-premium .agri-img {
      width: 100% !important;
      height: 100% !important;
      display: block !important;
      transition: transform 0.5s ease !important;
    }

    .agri-card-premium .agri-img.cover-img {
      object-fit: cover !important;
      object-position: center !important;
    }

    .agri-card-premium .agri-img.contain-img {
      object-fit: contain !important;
      object-position: center !important;
      padding: 34px !important;

      background:
        radial-gradient(
          circle at center,
          rgba(255, 255, 255, 0.98),
          rgba(228, 240, 255, 0.9)
        ) !important;
    }

    .agri-card-premium:hover .agri-img.cover-img {
      transform: scale(1.08) !important;
    }

    .agri-card-premium:hover .agri-img.contain-img {
      transform: scale(1.04) !important;
    }

    .agri-card-premium .agri-img-overlay {
      position: absolute !important;
      inset: 0 !important;

      display: flex !important;
      align-items: flex-end !important;
      justify-content: space-between !important;

      padding: 20px !important;

      background:
        linear-gradient(
          0deg,
          rgba(3, 7, 18, 0.86) 0%,
          rgba(3, 7, 18, 0.42) 45%,
          rgba(3, 7, 18, 0.04) 100%
        ) !important;

      opacity: 0 !important;
      pointer-events: none !important;
      transition: opacity 0.28s ease !important;
    }

    .agri-card-premium:hover .agri-img-overlay {
      opacity: 1 !important;
    }

    .agri-card-premium .agri-overlay-icon {
      width: 44px !important;
      height: 44px !important;

      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;

      border-radius: 50% !important;

      background: rgba(255, 255, 255, 0.18) !important;
      backdrop-filter: blur(12px) !important;

      font-size: 1.35rem !important;
    }

    .agri-card-premium .agri-img-overlay strong {
      padding: 10px 15px !important;

      border-radius: var(--radius-pill) !important;

      color: #020617 !important;
      background: rgba(255, 255, 255, 0.92) !important;

      font-size: 0.82rem !important;
      font-weight: 950 !important;
    }

    .agri-card-premium .agri-card-body {
      padding: 26px !important;

      display: flex !important;
      flex-direction: column !important;
      flex: 1 !important;
    }

    .agri-card-premium .agri-card-top {
      margin-bottom: 16px !important;

      display: flex !important;
      flex-wrap: wrap !important;
      gap: 8px !important;
    }

    .agri-card-premium .agri-category,
    .agri-card-premium .agri-role {
      padding: 8px 11px !important;

      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;

      border-radius: var(--radius-pill) !important;
      border: 1px solid var(--border) !important;

      font-size: 0.72rem !important;
      font-weight: 900 !important;
      line-height: 1 !important;
      white-space: nowrap !important;
    }

    .agri-card-premium .agri-category {
      color: var(--primary) !important;
      background: var(--primary-soft) !important;
    }

    .agri-card-premium .agri-role {
      color: var(--text-strong) !important;
      background: rgba(255, 255, 255, 0.55) !important;
    }

    .agri-card-premium h3 {
      margin: 0 0 8px !important;

      color: var(--text-strong) !important;

      font-size: 1.28rem !important;
      line-height: 1.18 !important;
      letter-spacing: -0.04em !important;
      font-weight: 950 !important;
    }

    .agri-card-premium .agri-original {
      margin: 0 0 16px !important;

      color: var(--primary) !important;

      font-size: 0.92rem !important;
      line-height: 1.45 !important;
      font-weight: 850 !important;
    }

    .agri-impact-chips {
      margin-bottom: 22px !important;

      display: flex !important;
      flex-wrap: wrap !important;
      gap: 8px !important;
    }

    .agri-impact-chips span {
      padding: 7px 10px !important;

      border-radius: var(--radius-pill) !important;
      border: 1px solid rgba(0, 159, 97, 0.2) !important;

      color: var(--accent) !important;
      background: var(--accent-soft) !important;

      font-size: 0.74rem !important;
      font-weight: 850 !important;
      line-height: 1.2 !important;
    }

    .agri-card-premium .view-project-btn {
      appearance: none !important;
      -webkit-appearance: none !important;

      margin-top: auto !important;
      width: 100% !important;
      min-height: 48px !important;
      padding: 13px 18px !important;

      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;

      border: 0 !important;
      border-radius: var(--radius-pill) !important;

      font-size: 0.92rem !important;
      font-weight: 950 !important;
      line-height: 1 !important;

      cursor: pointer !important;
      transition: 0.22s ease !important;
    }

    @media (max-width: 1100px) {
      .agri-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      }
    }

    @media (max-width: 760px) {
      .agri-grid {
        grid-template-columns: 1fr !important;
      }

      .agri-card-premium {
        min-height: auto !important;
      }

      .agri-card-premium .agri-img-wrap {
        height: 220px !important;
        min-height: 220px !important;
      }
    }
  `;

  document.head.appendChild(style);
}

/* -----------------------------
   Orbit Motion
----------------------------- */

function enhanceOrbitMotion() {
  injectOrbitMotionStyles();

  const profilePlanet = document.querySelector(".profile-planet");
  const profileImage = profilePlanet
    ? profilePlanet.querySelector("img")
    : null;

  if (profilePlanet && !profilePlanet.querySelector(".runtime-profile-ring")) {
    const halo = document.createElement("div");
    halo.className = "runtime-profile-halo";

    const ring = document.createElement("div");
    ring.className = "runtime-profile-ring";

    profilePlanet.insertBefore(halo, profileImage || profilePlanet.firstChild);
    profilePlanet.insertBefore(ring, profileImage || profilePlanet.firstChild);
  }

  const orbits = document.querySelectorAll(".orbit");

  orbits.forEach((orbit, index) => {
    if (orbit.querySelector(".orbit-runner")) return;

    const runner = document.createElement("div");
    runner.className = `orbit-runner orbit-runner-${index + 1}`;
    orbit.appendChild(runner);
  });

  animateSatelliteLabels();
}

function animateSatelliteLabels() {
  if (window.__satelliteLabelAnimationStarted) return;
  window.__satelliteLabelAnimationStarted = true;

  const orbitSystem = document.querySelector(".orbit-system");
  const satellites = Array.from(document.querySelectorAll(".satellite"));

  if (!orbitSystem || !satellites.length) return;

  const configs = [
    {
      selector: ".sat-1",
      angle: -140,
      radiusRatio: 0.86,
      speed: 1
    },
    {
      selector: ".sat-2",
      angle: -20,
      radiusRatio: 0.88,
      speed: 1
    },
    {
      selector: ".sat-3",
      angle: 165,
      radiusRatio: 0.84,
      speed: 1
    },
    {
      selector: ".sat-4",
      angle: 45,
      radiusRatio: 0.86,
      speed: 1
    }
  ];

  const duration = 28000;

  function tick() {
    const rect = orbitSystem.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height);
    const baseRadius = size / 2;

    const now = performance.now();
    const progress = (now % duration) / duration;
    const globalAngle = progress * Math.PI * 2;

    configs.forEach((config) => {
      const item = document.querySelector(config.selector);
      if (!item) return;

      const startAngle = (config.angle * Math.PI) / 180;
      const angle = startAngle + globalAngle * config.speed;
      const radius = baseRadius * config.radiusRatio;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      item.style.left = "50%";
      item.style.top = "50%";
      item.style.right = "auto";
      item.style.bottom = "auto";

      item.style.transform = `
        translate(-50%, -50%)
        translate(${x}px, ${y}px)
      `;

      item.style.zIndex = "60";
    });

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

/* -----------------------------
   Button Contrast Runtime Fix
----------------------------- */

function injectButtonContrastFix() {
  if (document.getElementById("buttonContrastRuntimeFix")) return;

  const style = document.createElement("style");
  style.id = "buttonContrastRuntimeFix";

  style.textContent = `
    .btn.primary,
    .view-project-btn,
    .agri-card-premium .view-project-btn,
    .agri-grid .view-project-btn,
    .agri-grid .agri-card .view-project-btn,
    body .agri-grid .agri-card .view-project-btn,
    .apps-grid .app-btn.primary,
    .app-btn.primary,
    .contact-form .btn.primary {
      color: #ffffff !important;

      background:
        linear-gradient(
          135deg,
          #0077ff 0%,
          #245cff 52%,
          #674cff 100%
        ) !important;

      border: 1px solid rgba(255, 255, 255, 0.32) !important;

      text-shadow:
        0 1px 2px rgba(0, 0, 0, 0.38) !important;

      box-shadow:
        0 16px 36px rgba(0, 111, 214, 0.28),
        0 0 28px rgba(104, 76, 255, 0.18),
        inset 0 1px 0 rgba(255, 255, 255, 0.34) !important;
    }

    .btn.primary *,
    .view-project-btn *,
    .agri-card-premium .view-project-btn *,
    .apps-grid .app-btn.primary *,
    .app-btn.primary * {
      color: #ffffff !important;
    }

    .btn.primary:hover,
    .view-project-btn:hover,
    .agri-card-premium .view-project-btn:hover,
    .agri-grid .view-project-btn:hover,
    .apps-grid .app-btn.primary:hover,
    .app-btn.primary:hover,
    .contact-form .btn.primary:hover {
      color: #ffffff !important;

      background:
        linear-gradient(
          135deg,
          #0090ff 0%,
          #336dff 52%,
          #7b61ff 100%
        ) !important;

      filter: none !important;

      box-shadow:
        0 20px 46px rgba(0, 111, 214, 0.36),
        0 0 42px rgba(104, 76, 255, 0.28),
        inset 0 1px 0 rgba(255, 255, 255, 0.42) !important;
    }

    .apps-grid .app-btn.ghost,
    .app-btn.ghost,
    .btn.secondary,
    .btn.ghost {
      color: #006fd6 !important;

      background:
        rgba(255, 255, 255, 0.84) !important;

      border: 1px solid rgba(0, 111, 214, 0.22) !important;

      text-shadow: none !important;

      box-shadow:
        0 10px 24px rgba(28, 68, 110, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.34) !important;
    }

    .apps-grid .app-btn.ghost:hover,
    .app-btn.ghost:hover,
    .btn.secondary:hover,
    .btn.ghost:hover {
      color: #ffffff !important;

      background:
        linear-gradient(
          135deg,
          #0077ff 0%,
          #684cff 100%
        ) !important;

      border-color: transparent !important;
    }

    html[data-theme="dark"] .btn.primary,
    html[data-theme="dark"] .view-project-btn,
    html[data-theme="dark"] .agri-card-premium .view-project-btn,
    html[data-theme="dark"] .agri-grid .view-project-btn,
    html[data-theme="dark"] .apps-grid .app-btn.primary,
    html[data-theme="dark"] .app-btn.primary,
    html[data-theme="dark"] .contact-form .btn.primary {
      color: #020617 !important;

      background:
        linear-gradient(
          135deg,
          #00d4ff 0%,
          #00ff88 100%
        ) !important;

      text-shadow: none !important;
    }

    html[data-theme="dark"] .apps-grid .app-btn.ghost,
    html[data-theme="dark"] .app-btn.ghost,
    html[data-theme="dark"] .btn.secondary,
    html[data-theme="dark"] .btn.ghost {
      color: #dbeafe !important;

      background:
        rgba(255, 255, 255, 0.065) !important;

      border-color: rgba(0, 212, 255, 0.2) !important;
    }

    html[data-theme="dark"] .apps-grid .app-btn.ghost:hover,
    html[data-theme="dark"] .app-btn.ghost:hover,
    html[data-theme="dark"] .btn.secondary:hover,
    html[data-theme="dark"] .btn.ghost:hover {
      color: #020617 !important;

      background:
        linear-gradient(
          135deg,
          #00d4ff,
          #00ff88
        ) !important;
    }
  `;

  document.head.appendChild(style);
}

/* -----------------------------
   Init
----------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  initStarsCanvas();

  renderApps();
  renderAgriProjects();

  initProjectModal();
  initThemeToggle();
  initContactForm();
  initNavigationHighlight();
  initRevealAnimations();

  enhanceOrbitMotion();

  /*
    En son çalışmalı.
    Çünkü runtime card/orbit CSS'lerinden sonra buton kontrastını override ediyor.
  */
  injectButtonContrastFix();

  setFooterYear();
});
