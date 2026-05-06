/* =========================================================
   Mehmet Cam Portfolio - script.js
   ========================================================= */

/* -----------------------------
   Stars Canvas
----------------------------- */

(function initStars() {
  const canvas = document.getElementById("starsCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 6000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2,
        o: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.3 + 0.05
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const theme = document.documentElement.getAttribute("data-theme");
    stars.forEach((s) => {
      s.o += Math.sin(Date.now() * s.speed * 0.001) * 0.005;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = theme === "dark"
        ? `rgba(180, 210, 255, ${Math.abs(s.o)})`
        : `rgba(21, 137, 232, ${Math.abs(s.o) * 0.3})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  createStars();
  draw();
  window.addEventListener("resize", () => { resize(); createStars(); });
})();

/* -----------------------------
   AI Apps
----------------------------- */

const apps = [
  {
    title: "AgriVision AI",
    description: "AI-powered agriculture intelligence application for data-driven insights, smart decision support and AgriTech innovation.",
    tags: ["AI", "AgriTech", "Streamlit"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://agrivision-ai09.streamlit.app/",
    badge: "AgriTech",
    icon: "🌾",
    gradient: "linear-gradient(135deg, #00c853 0%, #1aa3ff 100%)"
  },
  {
    title: "Food Regulatory Dashboard",
    description: "Interactive dashboard for food regulatory monitoring, compliance insights, analytics and visualization.",
    tags: ["FoodTech", "Regulatory", "Dashboard"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://food-regulatory-dashboard-09.streamlit.app/",
    badge: "FoodTech",
    icon: "🍽️",
    gradient: "linear-gradient(135deg, #ff6b35 0%, #ff1744 100%)"
  },
  {
    title: "GrantMirror AI",
    description: "AI-assisted grant discovery and project development tool for innovation funding opportunities and EU projects.",
    tags: ["AI", "EU Projects", "Grants"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://grantmirror-ai.streamlit.app/",
    badge: "EU Grants",
    icon: "🔍",
    gradient: "linear-gradient(135deg, #7b61ff 0%, #00d4ff 100%)"
  },
  {
    title: "MeetAlign",
    description: "Smart meeting alignment and collaboration assistant designed to improve productivity, planning and decision-making.",
    tags: ["Productivity", "AI", "Meetings"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://meetalign.streamlit.app/",
    badge: "Productivity",
    icon: "🤝",
    gradient: "linear-gradient(135deg, #00bfa5 0%, #1aa3ff 100%)"
  },
  {
    title: "OncoConnect Co-Creation",
    description: "Oncology-focused co-creation concept for stakeholder engagement, collaboration and healthcare innovation.",
    tags: ["HealthTech", "Oncology", "Co-Creation"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://oncoconnect-co-creation-app.streamlit.app/",
    badge: "HealthTech",
    icon: "💊",
    gradient: "linear-gradient(135deg, #e91e8c 0%, #7b61ff 100%)"
  }
];

/* -----------------------------
   Agricultural Projects
----------------------------- */

const agriProjects = [
  {
    title: "Agricultural Solution Center",
    originalTitle: "Tarımsal Çözüm Merkezi",
    category: "Software",
    role: "Project Manager",
    imageFile: "agricultural-solution-center.jpg",
    source: "https://tabitaim.com//projelerimiz",
    description: "A software-oriented agricultural solution concept designed to support stakeholders in the agriculture and food value chain through technology-enabled consulting, process management and decision support.",
    impact: "Digital advisory • Farmer support • Decision support software • Agricultural process management",
    icon: "🌱"
  },
  {
    title: "Smart OASIS",
    originalTitle: "Smart OASIS",
    category: "Digital Farm",
    role: "Researcher",
    imageFile: "smart-oasis.jpg",
    source: "https://tabitaim.com//projelerimiz",
    description: "An integrated digital farm initiative combining smart production infrastructure, IoT, data-driven monitoring and technology-oriented agricultural production concepts.",
    impact: "Digital farm • Smart production • IoT • AgriTech infrastructure",
    icon: "🛰️"
  },
  {
    title: "Tabit Smart Village",
    originalTitle: "Tabit Akıllı Köy",
    category: "Smart Village",
    role: "Researcher",
    imageFile: "smart-village.jpg",
    source: "https://tabitaim.com//projelerimiz",
    description: "A smart village model combining rural development, agricultural innovation, digital transformation and technology-enabled farming practices.",
    impact: "Smart village • Rural innovation • Digital transformation • Farmer-centered design",
    icon: "🏡"
  },
  {
    title: "RIGEL",
    originalTitle: "Rapor ve İstatistik Geliştirme Uzayı",
    category: "Software",
    role: "Project Manager",
    imageFile: "rigel.jpg",
    source: "https://tabitaim.com//projelerimiz",
    description: "A reporting and statistics-focused software concept designed to transform agricultural information into structured insights and decision-support outputs.",
    impact: "Reporting • Statistics • Data-driven decisions • Structured agricultural insights",
    icon: "📊"
  },
  {
    title: "Azmud Smart Greenhouse",
    originalTitle: "Azmud Akıllı Sera",
    category: "Smart Greenhouse",
    role: "Researcher",
    imageFile: "azmud.jpg",
    source: "https://tabitaim.com//projelerimiz",
    description: "A smart greenhouse sensor initiative focused on controlled agriculture, sensor technologies, monitoring and data-supported greenhouse management.",
    impact: "Smart greenhouse • Sensors • Controlled agriculture • Monitoring",
    icon: "🌿"
  },
  {
    title: "Vodafone Farmers Club",
    originalTitle: "Vodafone Çiftçi Kulübü",
    category: "Business Model",
    role: "Contributor and Trainer",
    imageFile: "vodafone-farmers-club.jpg",
    source: "https://tabitaim.com//projelerimiz",
    description: "A farmer-oriented service, communication, training and business model initiative focused on farmer engagement and knowledge transfer.",
    impact: "Farmer services • Business model • Training • Agricultural communication",
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
    img.alt = "Image not available";
  }
};

/* -----------------------------
   Helpers
----------------------------- */

function safeText(v) {
  return String(v)
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
  const grid = document.getElementById("appsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  apps.forEach((app) => {
    const card = document.createElement("article");
    card.className = "app-card-new";

    const tagsHtml = app.tags.map((t) => `<span>${safeText(t)}</span>`).join("");

    card.innerHTML = `
      <div class="app-card-top" style="background:${app.gradient}">
        <div class="app-card-top-glow"></div>
        <span class="app-big-icon">${app.icon}</span>
        <span class="app-badge-pill">${safeText(app.badge)}</span>
      </div>
      <div class="app-card-body">
        <h3>${safeText(app.title)}</h3>
        <p>${safeText(app.description)}</p>
        <div class="app-tags">${tagsHtml}</div>
        <div class="app-actions">
          <a href="${app.github}" target="_blank" rel="noopener" class="app-btn-ghost">GitHub</a>
          <a href="${app.demo}" target="_blank" rel="noopener" class="app-btn-primary">Open App →</a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* -----------------------------
   Render Agri Cards
----------------------------- */

function renderAgriProjects() {
  const agriGrid = document.getElementById("agriGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  if (!agriGrid) return;

  function createCards(filter = "All") {
    agriGrid.innerHTML = "";
    const filtered = filter === "All"
      ? agriProjects
      : agriProjects.filter((p) => p.category === filter);

    filtered.forEach((project) => {
      const card = document.createElement("article");
      card.className = "agri-card";
      const firstImage = getImageCandidates(project.imageFile)[0];

      card.innerHTML = `
        <div class="agri-img-wrap">
          <img
            src="${firstImage}"
            data-file="${project.imageFile}"
            data-step="0"
            onerror="handleImageError(this)"
            alt="${safeText(project.title)}"
            class="agri-img"
          />
          <div class="agri-img-overlay">
            <span>${project.icon}</span>
            <strong>View Details →</strong>
          </div>
        </div>
        <div class="agri-body">
          <div class="agri-top">
            <span class="agri-cat">${safeText(project.category)}</span>
            <span class="agri-role">${safeText(project.role)}</span>
          </div>
          <h3>${safeText(project.title)}</h3>
          <p class="agri-orig">${safeText(project.originalTitle)}</p>
          <p class="agri-impact">${safeText(project.impact)}</p>
        </div>
      `;

      card.addEventListener("click", () => openProjectModal(project));
      agriGrid.appendChild(card);
    });
  }

  createCards();

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      createCards(btn.dataset.filter);
    });
  });
}

/* -----------------------------
   Modal
----------------------------- */

function openProjectModal(project) {
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  const modalImage = document.getElementById("modalImage");
  const firstImage = getImageCandidates(project.imageFile)[0];

  modalImage.classList.remove("image-missing");
  modalImage.src = firstImage;
  modalImage.alt = project.title;
  modalImage.dataset.file = project.imageFile;
  modalImage.dataset.step = "0";
  modalImage.onerror = function () { handleImageError(this); };

  document.getElementById("modalCategory").textContent = project.category;
  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalOriginal").textContent = project.originalTitle;
  document.getElementById("modalRole").textContent = project.role;
  document.getElementById("modalDescription").textContent = project.description;
  document.getElementById("modalImpact").textContent = project.impact;
  document.getElementById("modalSource").href = project.source;

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
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProjectModal();
  });
}

/* -----------------------------
   Theme
----------------------------- */

function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  const html = document.documentElement;
  if (!btn) return;

  const saved = localStorage.getItem("theme") || "dark";
  html.setAttribute("data-theme", saved);
  btn.textContent = saved === "dark" ? "🌙" : "☀️";

  btn.addEventListener("click", () => {
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    btn.textContent = next === "dark" ? "🌙" : "☀️";
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

  form.addEventListener("submit", async (e) => {
    const actionUrl = form.getAttribute("action");

    if (!isValidFormspreeUrl(actionUrl)) {
      e.preventDefault();
      status.style.display = "block";
      status.className = "form-status warning";
      status.textContent = "Formspree URL is not configured correctly.";
      return;
    }

    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const origText = submitBtn?.textContent;
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending..."; }

    status.style.display = "block";
    status.className = "form-status info";
    status.textContent = "Sending...";

    try {
      const res = await fetch(actionUrl, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        form.reset();
        status.className = "form-status success";
        status.textContent = "Message sent successfully!";
      } else {
        status.className = "form-status error";
        status.textContent = "Something went wrong. Please try again.";
      }
    } catch {
      status.className = "form-status error";
      status.textContent = "Network error. Please try again.";
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = origText; }
    }
  });
}

/* -----------------------------
   Nav Highlight
----------------------------- */

function initNavHighlight() {
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
          if (link.getAttribute("href") === `#${id}`) link.classList.add("active-nav");
        });
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((s) => observer.observe(s));
}

/* -----------------------------
   Reveal
----------------------------- */

function initReveal() {
  const items = document.querySelectorAll(
    ".glass-card, .section-heading, .app-card-new, .agri-card, .stat-item"
  );

  items.forEach((item) => item.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  items.forEach((item) => observer.observe(item));
}

/* -----------------------------
   Footer Year
----------------------------- */

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
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
  initNavHighlight();
  setYear();
  initReveal();
});
