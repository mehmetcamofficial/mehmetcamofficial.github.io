/* =========================================================
   Mehmet Cam Portfolio - script.js
   ========================================================= */

/* -----------------------------
   AI Apps & Tools (Birleştirildi)
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
    color: "linear-gradient(135deg, #1aa3ff 0%, #20c878 100%)"
  },
  {
    title: "Food Regulatory Dashboard",
    description: "Interactive dashboard for food regulatory monitoring, compliance insights, analytics and visualization.",
    tags: ["FoodTech", "Regulatory", "Dashboard"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://food-regulatory-dashboard-09.streamlit.app/",
    badge: "FoodTech",
    icon: "🍽️",
    color: "linear-gradient(135deg, #ff9a3c 0%, #ff6b6b 100%)"
  },
  {
    title: "GrantMirror AI",
    description: "AI-assisted grant discovery and project development tool for innovation funding opportunities and EU projects.",
    tags: ["AI", "EU Projects", "Grants"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://grantmirror-ai.streamlit.app/",
    badge: "EU Grants",
    icon: "🔍",
    color: "linear-gradient(135deg, #8b75ff 0%, #1aa3ff 100%)"
  },
  {
    title: "MeetAlign",
    description: "Smart meeting alignment and collaboration assistant designed to improve productivity, planning and decision-making.",
    tags: ["Productivity", "AI", "Meetings"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://meetalign.streamlit.app/",
    badge: "Productivity",
    icon: "🤝",
    color: "linear-gradient(135deg, #00d2ff 0%, #20c878 100%)"
  },
  {
    title: "OncoConnect Co-Creation App",
    description: "Oncology-focused co-creation concept for stakeholder engagement, collaboration and healthcare innovation.",
    tags: ["HealthTech", "Oncology", "Co-Creation"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://oncoconnect-co-creation-app.streamlit.app/",
    badge: "HealthTech",
    icon: "💊",
    color: "linear-gradient(135deg, #ff6b9d 0%, #8b75ff 100%)"
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
    description:
      "A software-oriented agricultural solution concept designed to support stakeholders in the agriculture and food value chain through technology-enabled consulting, process management and decision support.",
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
    description:
      "An integrated digital farm initiative combining smart production infrastructure, IoT, data-driven monitoring and technology-oriented agricultural production concepts.",
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
    description:
      "A smart village model combining rural development, agricultural innovation, digital transformation and technology-enabled farming practices.",
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
    description:
      "A reporting and statistics-focused software concept designed to transform agricultural information into structured insights and decision-support outputs.",
    impact: "Reporting • Statistics • Data-driven decisions • Structured agricultural insights",
    icon: "📊"
  },
  {
    title: "Azmud Smart Greenhouse Sensor",
    originalTitle: "Azmud Akıllı Sera",
    category: "Smart Greenhouse",
    role: "Researcher",
    imageFile: "azmud.jpg",
    source: "https://tabitaim.com//projelerimiz",
    description:
      "A smart greenhouse sensor initiative focused on controlled agriculture, sensor technologies, monitoring and data-supported greenhouse management.",
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
    description:
      "A farmer-oriented service, communication, training and business model initiative focused on farmer engagement and knowledge transfer.",
    impact: "Farmer services • Business model • Training • Agricultural communication",
    icon: "📱"
  }
];

/* -----------------------------
   Image Fallback System
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
  return String(value)
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
   Render AI Apps & Tools
----------------------------- */

function renderApps() {
  const appsGrid = document.getElementById("appsGrid");
  if (!appsGrid) return;

  appsGrid.innerHTML = "";

  apps.forEach((app) => {
    const card = document.createElement("article");
    card.className = "app-tool-card glass";

    const tagsHtml = app.tags
      .map((tag) => `<span>${safeText(tag)}</span>`)
      .join("");

    card.innerHTML = `
      <div class="app-tool-banner" style="background: ${app.color}">
        <span class="app-tool-icon">${app.icon}</span>
        <span class="app-tool-badge-top">${safeText(app.badge)}</span>
        <div class="app-tool-glow"></div>
      </div>
      <div class="app-tool-body">
        <h3>${safeText(app.title)}</h3>
        <p>${safeText(app.description)}</p>
        <div class="app-tool-tags">${tagsHtml}</div>
        <div class="app-tool-actions">
          <a href="${app.github}" target="_blank" rel="noopener" class="btn-tool ghost">
            GitHub
          </a>
          <a href="${app.demo}" target="_blank" rel="noopener" class="btn-tool primary">
            Open App →
          </a>
        </div>
      </div>
    `;

    appsGrid.appendChild(card);
  });
}

/* -----------------------------
   Render Agricultural Project Cards
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
        : agriProjects.filter((p) => p.category === filter);

    filtered.forEach((project) => {
      const card = document.createElement("article");
      card.className = "agri-card glass";
      const firstImage = getImageCandidates(project.imageFile)[0];

      card.innerHTML = `
        <div class="agri-image-wrap">
          <img
            src="${firstImage}"
            data-file="${project.imageFile}"
            data-step="0"
            onerror="handleImageError(this)"
            alt="${safeText(project.title)}"
            class="agri-image"
          />
          <div class="agri-image-overlay">
            <span>${project.icon}</span>
            <strong>View Details</strong>
          </div>
        </div>
        <div class="agri-card-body">
          <div class="agri-card-top">
            <span class="agri-category">${safeText(project.category)}</span>
            <span class="agri-role-mini">${safeText(project.role)}</span>
          </div>
          <h3>${safeText(project.title)}</h3>
          <p class="agri-original">${safeText(project.originalTitle)}</p>
          <p class="agri-short">${safeText(project.impact)}</p>
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
      createCards(button.dataset.filter);
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
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;
  if (!themeToggle || !html) return;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    html.setAttribute("data-theme", savedTheme);
    themeToggle.textContent = savedTheme === "dark" ? "🌙" : "☀️";
  } else {
    html.setAttribute("data-theme", "light");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    themeToggle.textContent = next === "dark" ? "🌙" : "☀️";
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
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        form.reset();
        status.className = "form-status success";
        status.textContent = "Thank you! Your message has been sent successfully.";
      } else {
        status.className = "form-status error";
        status.textContent = "Something went wrong. Please try again or contact me by email.";
      }
    } catch {
      status.className = "form-status error";
      status.textContent = "Network error. Please try again or contact me by email.";
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
    { threshold: 0.35 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* -----------------------------
   Reveal Animation
----------------------------- */

function initRevealAnimations() {
  const items = document.querySelectorAll(
    ".glass, .section-heading, .app-tool-card, .agri-card, .stat-card"
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
    { threshold: 0.1 }
  );

  items.forEach((item) => observer.observe(item));
}

/* -----------------------------
   Footer Year
----------------------------- */

function setFooterYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
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
  setFooterYear();
  initRevealAnimations();
});
