/* =========================================================
   Mehmet Cam Portfolio - Final Premium CV Version
   script.js
   ========================================================= */

/* -----------------------------
   Stars Canvas
----------------------------- */

(function initStarsCanvas() {
  const canvas = document.getElementById("starsCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let stars = [];
  let animationFrame;

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
        radius: Math.random() * 1.2 + 0.25,
        alpha: Math.random() * 0.65 + 0.15,
        speed: Math.random() * 0.22 + 0.04,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";

    const time = Date.now() * 0.001;

    stars.forEach((star) => {
      const pulse = Math.sin(time * star.speed + star.phase) * 0.18;
      const alpha = Math.max(0.05, star.alpha + pulse);

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

      ctx.fillStyle = isDark
        ? `rgba(190, 220, 255, ${alpha})`
        : `rgba(0, 80, 160, ${alpha * 0.28})`;

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
    cancelAnimationFrame(animationFrame);
  });
})();

/* -----------------------------
   AI Apps & Applied Prototypes
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
   Agricultural Project Experience
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
   Image Fallback
----------------------------- */

const repoBase =
  "https://cdn.jsdelivr.net/gh/mehmetcamofficial/mehmetcamofficial.github.io@main";

function getImageCandidates(fileName) {
  return [
    `./${fileName}`,
    `/${fileName}`,
    `${repoBase}/${fileName}`,
    `https://raw.githubusercontent.com/mehmetcamofficial/mehmetcamofficial.github.io/main/${fileName}`
  ];
}

window.handleImageError = function (img) {
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

/* -----------------------------
   Helpers
----------------------------- */

function safeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidFormspreeUrl(url) {
  return (
    typeof url === "string" &&
    url.startsWith("https://formspree.io/f/") &&
    !url.includes("your-form-id")
  );
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
        <span class="app-icon">${app.icon}</span>
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

  function createCards(filter = "All") {
    agriGrid.innerHTML = "";

    const filtered =
      filter === "All"
        ? agriProjects
        : agriProjects.filter((project) => project.category === filter);

    filtered.forEach((project) => {
      const card = document.createElement("article");
      card.className = "agri-card";

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
            <span>${project.icon}</span>
            <strong>View Details →</strong>
          </div>
        </div>

        <div class="agri-card-body">
          <div class="agri-card-top">
            <span class="agri-category">${safeText(project.category)}</span>
            <span class="agri-role">${safeText(project.role)}</span>
          </div>

          <h3>${safeText(project.title)}</h3>
          <p class="agri-original">${safeText(project.originalTitle)}</p>
          <p class="agri-impact">${safeText(project.impact)}</p>
        </div>
      `;

      card.addEventListener("click", () => openProjectModal(project));
      agriGrid.appendChild(card);
    });
  }

  createCards();

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      createCards(button.dataset.filter || "All");
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
    modalImage.classList.remove("image-missing");
    modalImage.classList.remove("modal-contain");

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

function initModal() {
  document.querySelectorAll("[data-close-modal]").forEach((item) => {
    item.addEventListener("click", closeProjectModal);
  });

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
      status.textContent = "Formspree URL is not configured correctly.";
      status.className = "form-status warning";

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
      threshold: 0.35
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/* -----------------------------
   Reveal Animation
----------------------------- */

function initRevealAnimations() {
  const revealItems = document.querySelectorAll(
    ".section-heading, .glass-panel, .stat-card, .agri-card, .app-card, .focus-card, .timeline-item, .training-card, .skill-column, .education-card"
  );

  revealItems.forEach((item) => {
    item.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        /*
          CSS tarafında .reveal.visible kullanıldığı için
          burada .visible ekliyoruz.
        */
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1
    }
  );

  revealItems.forEach((item) => observer.observe(item));
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
   Init
----------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  renderApps();
  renderAgriProjects();
  initModal();
  initThemeToggle();
  initContactForm();
  initNavigationHighlight();
  initRevealAnimations();
  setFooterYear();
});
