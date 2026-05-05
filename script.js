const username = "mehmetcamofficial";

const projects = [
  {
    title: "AI Agriculture Assistant",
    description: "AI-powered decision support system for agriculture and sustainability.",
    tags: ["AI", "AgriTech", "Python"],
    github: "https://github.com/mehmetcamofficial",
    demo: "#"
  },
  {
    title: "Data Science Dashboard",
    description: "Interactive analytics dashboard for data-driven insights and reporting.",
    tags: ["Data Science", "Dashboard", "Analytics"],
    github: "https://github.com/mehmetcamofficial",
    demo: "#"
  },
  {
    title: "EU Project Toolkit",
    description: "A digital toolkit for EU project development, impact planning and innovation management.",
    tags: ["EU Projects", "Innovation", "Impact"],
    github: "https://github.com/mehmetcamofficial",
    demo: "#"
  }
];

const projectGrid = document.getElementById("projectGrid");

function renderProjects() {
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

renderProjects();

// Dark mode toggle
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "🌙" : "☀️";
}

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);

  themeToggle.textContent = nextTheme === "dark" ? "🌙" : "☀️";
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
