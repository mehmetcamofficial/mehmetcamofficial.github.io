/* =========================================================
   Mehmet Cam Portfolio - script.js
   Updated image fallback system for GitHub Pages + Raw GitHub
   ========================================================= */

/* -----------------------------
   AI / Streamlit Project Cards
----------------------------- */

const projects = [
  {
    title: "AgriVision AI",
    description:
      "AI-powered agriculture intelligence application for data-driven insights, smart decision support and AgriTech innovation.",
    tags: ["AI", "AgriTech", "Streamlit"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://agrivision-ai09.streamlit.app/"
  },
  {
    title: "Food Regulatory Dashboard",
    description:
      "Interactive dashboard for food regulatory monitoring, compliance insights, analytics and visualization.",
    tags: ["FoodTech", "Regulatory", "Dashboard"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://food-regulatory-dashboard-09.streamlit.app/"
  },
  {
    title: "GrantMirror AI",
    description:
      "AI-assisted grant discovery and project development tool for innovation funding opportunities and EU projects.",
    tags: ["AI", "EU Projects", "Grants"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://grantmirror-ai.streamlit.app/"
  },
  {
    title: "MeetAlign",
    description:
      "Smart meeting alignment and collaboration assistant designed to improve productivity, planning and decision-making.",
    tags: ["Productivity", "AI", "Meetings"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://meetalign.streamlit.app/"
  },
  {
    title: "OncoConnect Co-Creation App",
    description:
      "Oncology-focused co-creation concept for stakeholder engagement, collaboration and healthcare innovation.",
    tags: ["HealthTech", "Oncology", "Co-Creation"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://oncoconnect-co-creation-app.streamlit.app/"
  }
];

/* -----------------------------
   Streamlit App Selector
----------------------------- */

const streamlitApps = [
  {
    title: "AgriVision AI",
    description: "AI-powered agriculture intelligence and decision support.",
    url: "https://agrivision-ai09.streamlit.app/",
    badge: "AgriTech"
  },
  {
    title: "Food Regulatory Dashboard",
    description: "Food regulation, compliance and dashboard analytics.",
    url: "https://food-regulatory-dashboard-09.streamlit.app/",
    badge: "FoodTech"
  },
  {
    title: "GrantMirror AI",
    description: "AI-assisted grant and funding opportunity discovery.",
    url: "https://grantmirror-ai.streamlit.app/",
    badge: "EU Grants"
  },
  {
    title: "MeetAlign",
    description: "Smart meeting alignment and collaboration assistant.",
    url: "https://meetalign.streamlit.app/",
    badge: "Productivity"
  },
  {
    title: "OncoConnect Co-Creation App",
    description: "Oncology-focused co-creation and stakeholder engagement tool.",
    url: "https://oncoconnect-co-creation-app.streamlit.app/",
    badge: "HealthTech"
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
    source: "https://tabitaim.com//projelerimiz",
    description:
      "A reporting and statistics-focused software concept designed to transform agricultural information into structured insights and decision-support outputs. As project manager, I contributed to process planning, output tracking and data-driven structure development.",
    impact:
      "Reporting • Statistics • Data-driven decisions • Structured agricultural insights",
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
    source: "https://tabitaim.com//projelerimiz",
    description:
      "A farmer-oriented service, communication, training and business model initiative. I contributed to farmer engagement, training processes and field-oriented knowledge transfer activities.",
    impact:
      "Farmer services • Business model • Training • Agricultural communication",
    icon: "📱"
  }
];

/* -----------------------------
   Image Fallback System
----------------------------- */

const repoRawBase =
  "https://raw.githubusercontent.com/mehmetcamofficial/mehmetcamofficial.github.io/main";

function getImageCandidates(fileName) {
  return [
    `./assets/${fileName}?v=20260505`,
    `assets/${fileName}?v=20260505`,
    `./${fileName}?v=20260505`,
    `${repoRawBase}/assets/${fileName}`,
    `${repoRawBase}/${fileName}`
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
   Render AI Project Cards
----------------------------- */

function renderProjects() {
  const projectGrid = document.getElementById("projectGrid");
  if (!projectGrid) return;

  projectGrid.innerHTML = "";

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card glass";

    const tagsHtml = project.tags
      .map((tag) => `<span>${safeText(tag)}</span>`)
      .join("");

    card.innerHTML = `
      <h3>${safeText(project.title)}</h3>
      <p>${safeText(project.description)}</p>

      <div class="project-meta">
        ${tagsHtml}
      </div>

      <div class="project-actions">
        <a href="${project.github}" target="_blank" rel="noopener">GitHub</a>
        <a href="${project.demo}" target="_blank" rel="noopener">Live Demo</a>
      </div>
    `;

    projectGrid.appendChild(card);
  });
}

/* -----------------------------
   Render Streamlit App Cards
----------------------------- */

function renderStreamlitApps() {
  const appGrid = document.getElementById("appGrid");
  const activeTitle = document.getElementById("activeAppTitle");
  const activeDescription = document.getElementById("activeAppDescription");
  const openExternal = document.getElementById("openAppExternal");

  if (!appGrid || !activeTitle || !activeDescription || !openExternal) return;

  appGrid.innerHTML = "";

  streamlitApps.forEach((app, index) => {
    const appCard = document.createElement("button");
    appCard.className = index === 0 ? "app-card glass active" : "app-card glass";
    appCard.type = "button";

    appCard.innerHTML = `
      <span class="app-badge">${safeText(app.badge)}</span>
      <h3>${safeText(app.title)}</h3>
      <p>${safeText(app.description)}</p>
    `;

    appCard.addEventListener("click", () => {
      document.querySelectorAll(".app-card").forEach((card) => {
        card.classList.remove("active");
      });

      appCard.classList.add("active");
      activeTitle.textContent = app.title;
      activeDescription.textContent = app.description;
      openExternal.href = app.url;
    });

    appGrid.appendChild(appCard);
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

    const filteredProjects =
      filter === "All"
        ? agriProjects
        : agriProjects.filter((project) => project.category === filter);

    filteredProjects.forEach((project) => {
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
  modalImage.onerror = function () {
    handleImageError(this);
  };

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

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProjectModal();
    }
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
    const originalButtonText = submitButton ? submitButton.textContent : "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    status.style.display = "block";
    status.className = "form-status info";
    status.textContent = "Sending your message...";

    try {
      const formData = new FormData(form);

      const response = await fetch(actionUrl, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        form.reset();
        status.className = "form-status success";
        status.textContent = "Thank you! Your message has been sent successfully.";
      } else {
        status.className = "form-status error";
        status.textContent =
          "Something went wrong. Please try again or contact me by email.";
      }
    } catch (error) {
      status.className = "form-status error";
      status.textContent =
        "Network error. Please try again or contact me by email.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
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
    ".glass, .section-heading, .project-card, .app-card, .agri-card"
  );

  revealItems.forEach((item) => {
    item.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12
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
  renderProjects();
  renderStreamlitApps();
  renderAgriProjects();
  initModal();
  initThemeToggle();
  initContactForm();
  initNavigationHighlight();
  setFooterYear();
  initRevealAnimations();
});
