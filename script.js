const username = "mehmetcamofficial";

const projects = [
  {
    title: "AgriVision AI",
    description: "AI-powered agriculture intelligence application for data-driven insights and decision support.",
    tags: ["AI", "AgriTech", "Streamlit"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://agrivision-ai09.streamlit.app/"
  },
  {
    title: "Food Regulatory Dashboard",
    description: "Interactive dashboard for food regulatory monitoring, compliance insights and data visualization.",
    tags: ["FoodTech", "Regulatory", "Dashboard"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://food-regulatory-dashboard-09.streamlit.app/"
  },
  {
    title: "GrantMirror AI",
    description: "AI-assisted grant discovery and project development tool for innovation funding opportunities.",
    tags: ["AI", "EU Projects", "Grants"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://grantmirror-ai.streamlit.app/"
  },
  {
    title: "MeetAlign",
    description: "A smart meeting alignment and collaboration tool designed to improve productivity and decision-making.",
    tags: ["Productivity", "AI", "Meetings"],
    github: "https://github.com/mehmetcamofficial",
    demo: "https://meetalign.streamlit.app/"
  },
  {
    title: "OncoConnect Co-Creation App",
    description: "Co-creation platform concept for oncology-related collaboration, stakeholder engagement and innovation.",
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

const projectGrid = document.getElementById("projectGrid");

function renderProjects() {
  if (!projectGrid) return;

  projectGrid.innerHTML = "";

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card glass";

    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>

      <div class="project-meta">
        ${project.tags.map(tag => `<span>${tag}</span>`).join("")}
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
  const frame = document.getElementById("streamlitFrame");
  const activeTitle = document.getElementById("activeAppTitle");
  const openExternal = document.getElementById("openAppExternal");

  if (!appGrid || !frame || !activeTitle || !openExternal) return;

  appGrid.innerHTML = "";

  streamlitApps.forEach((app, index) => {
    const appCard = document.createElement("button");
    appCard.className = index === 0 ? "app-card glass active" : "app-card glass";
    appCard.type = "button";

    appCard.innerHTML = `
      <span class="app-badge">${app.badge}</span>
      <h3>${app.title}</h3>
      <p>${app.description}</p>
    `;

    appCard.addEventListener("click", () => {
      document.querySelectorAll(".app-card").forEach(card => {
        card.classList.remove("active");
      });

      appCard.classList.add("active");
      frame.src = app.url;
      activeTitle.textContent = app.title;
      openExternal.href = app.url;
    });

    appGrid.appendChild(appCard);
  });
}

renderProjects();
renderStreamlitApps();

// Dark mode toggle
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "🌙" : "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);

    themeToggle.textContent = nextTheme === "dark" ? "🌙" : "☀️";
  });
}

// Footer year
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
