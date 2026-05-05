/* =========================================================
   Mehmet Cam Portfolio - script.js
   Updated:
   - profile.jpeg
   - Mehmet-Cam-CV..pdf
   - Formspree: https://formspree.io/f/xpqbrwoa
   - TABIT AIM project experience
   ========================================================= */

const username = "mehmetcamofficial";

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
   TABIT AIM Projects
----------------------------- */

const tabitProjects = [
  {
    title: "Agricultural Solution Center",
    originalTitle: "Tarımsal Çözüm Merkezi",
    category: "Software",
    role: "Proje Yöneticisi",
    description:
      "A digital agriculture support concept focused on delivering practical agricultural solutions, advisory workflows and software-enabled farmer services.",
    impact: "Digital advisory • Farmer support • Agricultural software",
    icon: "🌱"
  },
  {
    title: "Smart OASIS",
    originalTitle: "Smart OASIS",
    category: "Digital Farm",
    role: "Araştırmacı",
    description:
      "A digital farming and smart agriculture initiative combining field-scale technology, production systems and innovation-oriented farm infrastructure.",
    impact: "Digital farm • Smart production • AgriTech infrastructure",
    icon: "🛰️"
  },
  {
    title: "Tabit Smart Village",
    originalTitle: "Tabit Akıllı Köy",
    category: "Smart Village",
    role: "Araştırmacı",
    description:
      "A smart village model designed around agricultural innovation, rural digital transformation and technology-enabled farming practices.",
    impact: "Smart village • Rural innovation • Digital transformation",
    icon: "🏡"
  },
  {
    title: "RIGEL",
    originalTitle: "Rapor ve İstatistik Geliştirme Uzayı",
    category: "Software",
    role: "Proje Yöneticisi",
    description:
      "A reporting and statistics-oriented software concept for transforming agricultural information into usable insights, structured outputs and decision-support reports.",
    impact: "Reporting • Statistics • Data-driven decisions",
    icon: "📊"
  },
  {
    title: "Azmud Smart Greenhouse Sensor",
    originalTitle: "Azmud Akıllı Sera",
    category: "Smart Greenhouse",
    role: "Araştırmacı",
    description:
      "A smart greenhouse sensor initiative focused on controlled environment agriculture, monitoring and data-supported greenhouse management.",
    impact: "Smart greenhouse • Sensors • Controlled agriculture",
    icon: "🌿"
  },
  {
    title: "Vodafone Farmers Club",
    originalTitle: "Vodafone Çiftçi Kulübü",
    category: "Business Model",
    role: "Katkı Sağlayan ve Eğitmen",
    description:
      "A farmer-oriented business model and service ecosystem designed to support agricultural communication, access, training and farmer engagement.",
    impact: "Farmer services • Business model • Training • Agricultural communication",
    icon: "📱"
  }
];

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
        <a href="${project.github}" target="_blank" rel="noopener">
          GitHub
        </a>

        <a href="${project.demo}" target="_blank" rel="noopener">
          Live Demo
        </a>
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
    appCard.setAttribute("aria-label", `Open ${app.title}`);

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
   Render TABIT AIM Projects
----------------------------- */

function renderTabitProjects() {
  const tabitGrid = document.getElementById("tabitGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (!tabitGrid) return;

  function createCards(filter = "All") {
    tabitGrid.innerHTML = "";

    const filteredProjects =
      filter === "All"
        ? tabitProjects
        : tabitProjects.filter((project) => project.category === filter);

    filteredProjects.forEach((project, index) => {
      const card = document.createElement("article");
      card.className = "tabit-card glass";
      card.style.animationDelay = `${index * 0.08}s`;

      card.innerHTML = `
        <div class="tabit-card-top">
          <div class="tabit-icon">${project.icon}</div>
          <span class="tabit-category">${safeText(project.category)}</span>
        </div>

        <h3>${safeText(project.title)}</h3>
        <p class="tabit-original">${safeText(project.originalTitle)}</p>

        <p class="tabit-description">
          ${safeText(project.description)}
        </p>

        <div class="tabit-impact">
          ${safeText(project.impact)}
        </div>

        <div class="tabit-role">
          <span>Role</span>
          <strong>${safeText(project.role)}</strong>
        </div>
      `;

      tabitGrid.appendChild(card);
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
    html.setAttribute("data-theme", "dark");
    themeToggle.textContent = "🌙";
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
   Contact Form - Formspree
----------------------------- */

function initContactForm() {
  const form = document.querySelector(".contact-form");

  if (!form) return;

  const status = document.createElement("div");
  status.className = "form-status";
  status.style.display = "none";
  status.style.marginTop = "12px";
  status.style.padding = "14px 16px";
  status.style.borderRadius = "14px";
  status.style.fontWeight = "700";
  status.style.lineHeight = "1.5";

  form.appendChild(status);

  form.addEventListener("submit", async (event) => {
    const actionUrl = form.getAttribute("action");

    if (!isValidFormspreeUrl(actionUrl)) {
      event.preventDefault();

      status.style.display = "block";
      status.style.color = "#facc15";
      status.style.background = "rgba(250, 204, 21, 0.12)";
      status.style.border = "1px solid rgba(250, 204, 21, 0.25)";
      status.textContent = "Formspree URL is not configured correctly.";
      return;
    }

    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
      submitButton.style.opacity = "0.75";
      submitButton.style.cursor = "not-allowed";
    }

    status.style.display = "block";
    status.style.color = "#38bdf8";
    status.style.background = "rgba(56, 189, 248, 0.12)";
    status.style.border = "1px solid rgba(56, 189, 248, 0.25)";
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

        status.style.color = "#22c55e";
        status.style.background = "rgba(34, 197, 94, 0.12)";
        status.style.border = "1px solid rgba(34, 197, 94, 0.25)";
        status.textContent =
          "Thank you! Your message has been sent successfully.";
      } else {
        status.style.color = "#fb7185";
        status.style.background = "rgba(251, 113, 133, 0.12)";
        status.style.border = "1px solid rgba(251, 113, 133, 0.25)";
        status.textContent =
          "Something went wrong. Please try again or contact me by email.";
      }
    } catch (error) {
      status.style.color = "#fb7185";
      status.style.background = "rgba(251, 113, 133, 0.12)";
      status.style.border = "1px solid rgba(251, 113, 133, 0.25)";
      status.textContent =
        "Network error. Please try again or contact me by email.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        submitButton.style.opacity = "1";
        submitButton.style.cursor = "pointer";
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
      root: null,
      threshold: 0.35
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/* -----------------------------
   Reveal Animations
----------------------------- */

function initRevealAnimations() {
  const revealItems = document.querySelectorAll(
    ".glass, .section-heading, .project-card, .app-card, .tabit-card"
  );

  if (!revealItems.length) return;

  revealItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(18px)";
    item.style.transition =
      "opacity 0.55s ease, transform 0.55s ease, border-color 0.25s ease, box-shadow 0.25s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

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
  renderTabitProjects();
  initThemeToggle();
  initContactForm();
  initNavigationHighlight();
  setFooterYear();
  initRevealAnimations();
});
