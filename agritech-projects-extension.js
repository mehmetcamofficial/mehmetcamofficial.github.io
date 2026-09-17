/* =========================================================
   AgriTech AI Project Cards Extension
   Adds applied AI agriculture work without changing legacy project data.
   ========================================================= */

(() => {
  const isAbsoluteUrl = (value) => /^https?:\/\//i.test(String(value || ""));

  // Existing project renderer expects repository-local image filenames.
  // Preserve that behavior while allowing verified remote project screenshots.
  if (typeof getImageCandidates === "function") {
    const originalGetImageCandidates = getImageCandidates;

    getImageCandidates = function getImageCandidatesWithRemoteSupport(fileName) {
      if (isAbsoluteUrl(fileName)) return [fileName];
      return originalGetImageCandidates(fileName);
    };
  }

  // Make the AgriVision app description concrete and agriculture-focused.
  if (typeof apps !== "undefined" && Array.isArray(apps)) {
    const agriVisionApp = apps.find((app) => app.title === "AgriVision AI");

    if (agriVisionApp) {
      agriVisionApp.description =
        "AI-powered precision agriculture platform combining TensorFlow Lite and OpenCV for weed and crop detection, plant-level image analysis, weather-based spraying support, GPS field tracking and AI-assisted agricultural advisory.";
      agriVisionApp.tags = ["Computer Vision", "Weed Detection", "AgriTech"];
      agriVisionApp.github = "https://github.com/mehmetcamofficial/agrivision-ai";
      agriVisionApp.badge = "Precision Agriculture";
    }
  }

  if (typeof agriProjects !== "undefined" && Array.isArray(agriProjects)) {
    const newProjects = [
      {
        title: "AgriVision AI",
        originalTitle: "AI-Powered Weed & Crop Detection",
        category: "Applied AI",
        role: "AI Developer",
        imageFile:
          "https://raw.githubusercontent.com/mehmetcamofficial/agrivision-ai/main/screenshots/detection.png",
        imageMode: "cover",
        source: "https://github.com/mehmetcamofficial/agrivision-ai",
        description:
          "A precision-agriculture application that combines TensorFlow Lite object detection with OpenCV post-processing to identify weeds and crops at plant level. The platform also includes weather-aware spraying support, multi-photo and video analysis, GPS field tracking, analytics, field notes and AI-assisted agricultural advisory.",
        impact:
          "Computer vision • Weed detection • Precision agriculture • OpenCV • Field decision support",
        icon: "🌾"
      },
      {
        title: "Tomato Disease Detection",
        originalTitle: "CNN-Based Tomato Leaf Disease Prototype",
        category: "Applied AI",
        role: "Open-Source Adaptation",
        imageFile:
          "https://user-images.githubusercontent.com/21691211/171020296-97dcc7c1-8f43-430a-b2ea-1ddd60622334.png",
        imageMode: "cover",
        source: "https://github.com/mehmetcamofficial/tomato-disease-detection",
        description:
          "An open-source computer-vision adaptation exploring tomato plant disease classification from leaf images with a CNN-based TensorFlow workflow. The project demonstrates an end-to-end architecture spanning model serving, FastAPI, web/mobile interfaces and cloud deployment concepts.",
        impact:
          "Plant disease detection • CNN • TensorFlow • FastAPI • Image classification",
        icon: "🍅"
      }
    ];

    newProjects.forEach((project) => {
      const alreadyExists = agriProjects.some(
        (item) => item.title === project.title
      );

      if (!alreadyExists) agriProjects.push(project);
    });
  }

  // Add the filter before the legacy renderer captures the button collection.
  const filterBar = document.querySelector(".project-filter");

  if (filterBar && !filterBar.querySelector('[data-filter="Applied AI"]')) {
    const button = document.createElement("button");
    button.className = "filter-btn";
    button.dataset.filter = "Applied AI";
    button.textContent = "Applied AI";
    filterBar.appendChild(button);
  }
})();
