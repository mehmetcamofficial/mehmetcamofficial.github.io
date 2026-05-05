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

const agriProjects = [
  {
    title: "Agricultural Solution Center",
    originalTitle: "Tarımsal Çözüm Merkezi",
    category: "Software",
    role: "Proje Yöneticisi",
    image: "agricultural-solution-center.jpg",
    source: "https://tabitaim.com//projelerimiz",
    description:
      "Tarım ve gıda sektöründe tedarik zincirindeki paydaşlara teknoloji destekli danışmanlık, süreç yönetimi ve karar destek yaklaşımı sunan bir yazılım konsepti. Projede çiftçilere bilgiye erişim, doğru karar alma, verimlilik ve dijital danışmanlık süreçleri açısından katkı sağladım.",
    impact:
      "Digital advisory • Farmer support • Decision support software • Agricultural process management",
    icon: "🌱"
  },
  {
    title: "Smart OASIS",
    originalTitle: "Smart OASIS",
    category: "Digital Farm",
    role: "Araştırmacı",
    image: "smart-oasis.jpg",
    source: "https://tabitaim.com//projelerimiz",
    description:
      "Dijital tarım, akıllı üretim altyapısı, IoT yaklaşımı, veri destekli izleme ve teknoloji odaklı üretim konseptleri üzerine kurgulanan entegre bir dijital çiftlik projesidir. Araştırmacı rolümle proje tasarımı, bilgi toplama, analiz ve inovasyon süreçlerine katkı sağladım.",
    impact:
      "Digital farm • Smart production • IoT • AgriTech infrastructure",
    icon: "🛰️"
  },
  {
    title: "Tabit Smart Village",
    originalTitle: "Tabit Akıllı Köy",
    category: "Smart Village",
    role: "Araştırmacı",
    image: "smart-village.jpg",
    source: "https://tabitaim.com//projelerimiz",
    description:
      "Kırsal kalkınma, tarımsal inovasyon, dijital dönüşüm ve teknoloji destekli üretim pratiklerini bir araya getiren akıllı köy modelidir. Araştırmacı olarak tarım teknolojileri, kullanıcı ihtiyaçları ve saha odaklı öğrenme süreçlerine katkı verdim.",
    impact:
      "Smart village • Rural innovation • Digital transformation • Farmer-centered design",
    icon: "🏡"
  },
  {
    title: "RIGEL",
    originalTitle: "Rapor ve İstatistik Geliştirme Uzayı",
    category: "Software",
    role: "Proje Yöneticisi",
    image: "rigel.jpg",
    source: "https://tabitaim.com//projelerimiz",
    description:
      "Tarımsal bilgi, raporlama, istatistik ve veri odaklı çıktıların düzenli şekilde geliştirilebilmesi için tasarlanan yazılım ve karar destek yaklaşımıdır. Proje yöneticisi olarak süreç planlama, çıktı takibi ve veri odaklı yapının geliştirilmesinde rol aldım.",
    impact:
      "Reporting • Statistics • Data-driven decisions • Structured agricultural insights",
    icon: "📊"
  },
  {
    title: "Azmud Smart Greenhouse Sensor",
    originalTitle: "Azmud Akıllı Sera",
    category: "Smart Greenhouse",
    role: "Araştırmacı",
    image: "azmud.jpg",
    source: "https://tabitaim.com//projelerimiz",
    description:
      "Kontrollü tarım, sera içi sensör teknolojileri, izleme ve veri destekli sera yönetimi üzerine odaklanan akıllı sera sensör projesidir. Araştırmacı olarak teknik ihtiyaç analizi, kullanım senaryoları ve tarımsal teknoloji değerlendirme süreçlerine katkı sağladım.",
    impact:
      "Smart greenhouse • Sensors • Controlled agriculture • Monitoring",
    icon: "🌿"
  },
  {
    title: "Vodafone Farmers Club",
    originalTitle: "Vodafone Çiftçi Kulübü",
    category: "Business Model",
    role: "Katkı Sağlayan ve Eğitmen",
    image: "vodafone-farmers-club.jpg",
    source: "https://tabitaim.com//projelerimiz",
    description:
      "Çiftçilere yönelik hizmet, iletişim, eğitim ve iş modeli geliştirme yaklaşımı üzerine kurgulanan bir tarımsal etkileşim ve destek projesidir. Katkı sağlayan ve eğitmen olarak çiftçi iletişimi, eğitim süreçleri ve saha odaklı bilgi aktarımı tarafında rol aldım.",
    impact:
      "Farmer services • Business model • Training • Agricultural communication",
    icon: "📱"
  }
];

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

    filteredProjects.forEach((project, index) => {
      const card = document.createElement("article");
      card.className = "agri-card glass";
      card.style.animationDelay = `${index * 0.07}s`;

      card.innerHTML = `
        <div class="agri-image-wrap">
          <img src="${project.image}" alt="${safeText(project.title)}" class="agri-image" />
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

          <p class="agri-short">
            ${safeText(project.impact)}
          </p>
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

function openProjectModal(project) {
  const modal = document.getElementById("projectModal");
  const modalImage = document.getElementById("modalImage");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalOriginal = document.getElementById("modalOriginal");
  const modalRole = document.getElementById("modalRole");
  const modalDescription = document.getElementById("modalDescription");
  const modalImpact = document.getElementById("modalImpact");
  const modalSource = document.getElementById("modalSource");

  if (!modal) return;

  modalImage.src = project.image;
  modalImage.alt = project.title;
  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalOriginal.textContent = project.originalTitle;
  modalRole.textContent = project.role;
  modalDescription.textContent = project.description;
  modalImpact.textContent = project.impact;
  modalSource.href = project.source;

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
        status.textContent = "Something went wrong. Please try again or contact me by email.";
      }
    } catch (error) {
      status.className = "form-status error";
      status.textContent = "Network error. Please try again or contact me by email.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}

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

function initRevealAnimations() {
  const revealItems = document.querySelectorAll(
    ".glass, .section-heading, .project-card, .app-card, .agri-card"
  );

  if (!revealItems.length) return;

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

function setFooterYear() {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

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
