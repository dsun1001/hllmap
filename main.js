const mapImages = {
  carentan: {
    axis: "images/carentan_axis.webp",
    allies: "images/carentan_allies.webp"
  },
  driel: {
    axis: "images/driel_axis.webp",
    allies: "images/driel_allies.webp"
  },
  "el alamein": {
    axis: "images/elalamein_axis.webp",
    allies: "images/elalamein_allies.webp"
  },
  "elsenborn ridge": {
    axis: "images/elsenbornridge_axis.webp",
    allies: "images/elsenbornridge_allies.webp"
  },
  foy: {
    axis: "images/foy_axis.webp",
    allies: "images/foy_allies.webp"
  },
  "hill 400": {
    axis: "images/hill400_axis.webp",
    allies: "images/hill400_allies.webp"
  },
  "hurtgen forest": {
    axis: "images/hurtgenforest_axis.webp",
    allies: "images/hurtgenforest_allies.webp"
  },
  kharkov: {
    axis: "images/kharkov_axis.webp",
    allies: "images/kharkov_allies.webp"
  },
  kursk: {
    axis: "images/kursk_axis.webp",
    allies: "images/kursk_allies.webp"
  },
  mortain: {
    axis: "images/mortain_axis.webp",
    allies: "images/mortain_allies.webp"
  },
  "omaha beach": {
    axis: "images/omahabeach_axis.webp",
    allies: "images/omahabeach_allies.webp"
  },
  "purple heart lane": {
    axis: "images/purpleheartlane_axis.webp",
    allies: "images/purpleheartlane_allies.webp"
  },
  remagen: {
    axis: "images/remagen_axis.webp",
    allies: "images/remagen_allies.webp"
  },
  "saint marie du mont": {
    axis: "images/saintmariedumont_axis.webp",
    allies: "images/saintmariedumont_allies.webp"
  },
  "saint marie egliese": {
    axis: "images/saintmarieegliese_axis.webp",
    allies: "images/saintmarieegliese_allies.webp"
  },
  stalingrad: {
    axis: "images/stalingrad_axis.webp",
    allies: "images/stalingrad_allies.webp"
  },
  tobruk: {
    axis: "images/tobruk_axis.webp",
    allies: "images/tobruk_allies.webp"
  },
  "utah beach": {
    axis: "images/utahbeach_axis.webp",
    allies: "images/utahbeach_allies.webp"
  }
};

const mapSelect = document.getElementById("mapSelect");
const mapImage = document.getElementById("mapImage");

// Team card toggles
const teamAxis = document.getElementById("teamAxis");
const teamAllies = document.getElementById("teamAllies");
let selectedTeam = "axis";

function setTeam(team) {
  selectedTeam = team;
  localStorage.setItem("selectedTeam", team);
  if (team === "axis") {
    teamAxis.classList.add("active");
    teamAllies.classList.remove("active");
  } else {
    teamAxis.classList.remove("active");
    teamAllies.classList.add("active");
  }
  handleDropdownChange();
}

teamAxis.addEventListener("click", () => setTeam("axis"));
teamAllies.addEventListener("click", () => setTeam("allies"));

mapImage.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    if (mapImage.requestFullscreen) {
      mapImage.requestFullscreen();
    } else if (mapImage.webkitRequestFullscreen) {
      mapImage.webkitRequestFullscreen();
    } else if (mapImage.msRequestFullscreen) {
      mapImage.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
});

// Show "fullscreen" image on click (works on mobile and desktop)
mapImage.addEventListener("click", () => {
  if (!mapImage.classList.contains("image-fullscreen")) {
    mapImage.classList.add("image-fullscreen");
  } else {
    mapImage.classList.remove("image-fullscreen");
  }
});

// Allow ESC to exit "fullscreen" mode
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mapImage.classList.contains("image-fullscreen")) {
    mapImage.classList.remove("image-fullscreen");
  }
});

const fullscreenToggle = document.getElementById("fullscreenToggle");

fullscreenToggle.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    if (mapImage.requestFullscreen) {
      mapImage.requestFullscreen();
    } else if (mapImage.webkitRequestFullscreen) {
      mapImage.webkitRequestFullscreen();
    } else if (mapImage.msRequestFullscreen) {
      mapImage.msRequestFullscreen();
    }
    mapImage.classList.add("image-fullscreen");
  }
});

// Exit fullscreen on image click if currently fullscreen
mapImage.addEventListener("click", () => {
  if (document.fullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
});

const cardList = document.getElementById("cardList");

for (const map in mapImages) {
  const option = document.createElement("option");
  option.value = map;
  option.textContent = capitalize(map);
  mapSelect.appendChild(option);

  const card = document.createElement("div");
  card.className = "card";

  const header = document.createElement("div");
  header.className = "card-header";
  header.textContent = capitalize(map);

  const body = document.createElement("div");
  body.className = "card-body";

  const axisHalf = document.createElement("div");
  axisHalf.className = "card-half axis";
  axisHalf.innerHTML = "Axis";
  axisHalf.onclick = () => {
    mapSelect.value = map;
    setTeam("axis");
    highlightCardTeam(card, "axis");
  };

  const alliesHalf = document.createElement("div");
  alliesHalf.className = "card-half allies";
  alliesHalf.innerHTML = "Allies";
  alliesHalf.onclick = () => {
    mapSelect.value = map;
    setTeam("allies");
    highlightCardTeam(card, "allies");
  };
  
  body.appendChild(alliesHalf);
  body.appendChild(axisHalf);

  card.appendChild(header);
  card.appendChild(body);
  cardList.appendChild(card);

  // Initial highlight
  highlightCardTeam(card, selectedTeam);

  // Keep highlight in sync when dropdown or team changes
  mapSelect.addEventListener("change", () => {
    if (mapSelect.value === map) {
      highlightCardTeam(card, selectedTeam);
    } else {
      highlightCardTeam(card, null);
    }
  });
  teamAxis.addEventListener("click", () => {
    if (mapSelect.value === map) highlightCardTeam(card, "axis");
  });
  teamAllies.addEventListener("click", () => {
    if (mapSelect.value === map) highlightCardTeam(card, "allies");
  });
}

// Highlight function for card team halves
function highlightCardTeam(card, team) {
  const axisHalf = card.querySelector(".card-half.axis");
  const alliesHalf = card.querySelector(".card-half.allies");
  if (!team) {
    axisHalf.classList.remove("active");
    alliesHalf.classList.remove("active");
    return;
  }
  if (team === "axis") {
    axisHalf.classList.add("active");
    alliesHalf.classList.remove("active");
  } else if (team === "allies") {
    axisHalf.classList.remove("active");
    alliesHalf.classList.add("active");
  }
}

function updateImage(map, team) {
  const url = mapImages[map]?.[team];
  if (url) {
    mapImage.src = url;
    mapImage.style.display = "block";
    mapImage.alt = `${capitalize(map)} - ${capitalize(team)}`;
  }
}

function handleDropdownChange() {
  const selectedMap = mapSelect.value;
  localStorage.setItem("selectedMap", selectedMap);
  updateImage(selectedMap, selectedTeam);

  // Highlight only the selected card/team, remove highlight from others
  const cards = cardList.querySelectorAll(".card");
  cards.forEach(card => {
    const cardHeader = card.querySelector(".card-header");
    if (cardHeader && cardHeader.textContent.trim().toLowerCase() === capitalize(selectedMap).toLowerCase()) {
      highlightCardTeam(card, selectedTeam);
    } else {
      highlightCardTeam(card, null);
    }
  });
}

mapSelect.addEventListener("change", () => {
  localStorage.setItem("selectedMap", mapSelect.value);
  handleDropdownChange();
});

// Restore saved selections from localStorage
const savedMap = localStorage.getItem("selectedMap");
const savedTeam = localStorage.getItem("selectedTeam");

// console.log('Saved map:', savedMap);
// console.log('Saved team:', savedTeam);

if (savedMap && mapImages[savedMap]) {
  mapSelect.value = savedMap;
}
if (savedTeam && (savedTeam === "axis" || savedTeam === "allies")) {
  setTeam(savedTeam);
} else {
  setTeam("allies");
}

function capitalize(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const body = document.body;
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "light") {
  body.classList.add("light");
}

document.getElementById("themeToggle").addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem("theme", body.classList.contains("light") ? "light" : "dark");
});

document.getElementById("showSidebarBtn").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("closed");
});

document.getElementById("fullscreenToggle").addEventListener("click", () => {
  if (mapImage.requestFullscreen) {
    mapImage.requestFullscreen();
  } else if (mapImage.webkitRequestFullscreen) {
    mapImage.webkitRequestFullscreen();
  } else if (mapImage.msRequestFullscreen) {
    mapImage.msRequestFullscreen();
  }
});

const sidebar = document.getElementById("sidebar");
const showSidebarBtn = document.getElementById("showSidebarBtn");

function closeSidebarOnSmallScreen() {
  if (window.innerWidth <= 900) {
    sidebar.classList.add("closed");
    showSidebarBtn.style.display = "block";
  } else {
    sidebar.classList.remove("closed");
    showSidebarBtn.style.display = "none";
  }
}

// Run on load
closeSidebarOnSmallScreen();
// And on resize
window.addEventListener("resize", closeSidebarOnSmallScreen);

const cardSearch = document.getElementById("cardSearch");
cardSearch.addEventListener("input", function () {
    const query = cardSearch.value.toLowerCase();
    const cards = cardList.querySelectorAll(".card");
    cards.forEach(card => {
    const header = card.querySelector(".card-header");
    if (header && header.textContent.toLowerCase().includes(query)) {
        card.style.display = "";
    } else {
        card.style.display = "none";
    }
    });
});

function addSidebarOverlayClose() {
  const sidebar = document.getElementById("sidebar");
  const showSidebarBtn = document.getElementById("showSidebarBtn");

  // Create overlay if it doesn't exist
  let overlay = document.getElementById("sidebarOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "sidebarOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.01)";
    overlay.style.zIndex = "999";
    overlay.style.display = "none";
    document.body.appendChild(overlay);
  }

  function showOverlay() {
    if (window.innerWidth <= 900 && !sidebar.classList.contains("closed")) {
      overlay.style.display = "block";
    }
  }

  function hideOverlay() {
    overlay.style.display = "none";
  }

  // Show overlay when sidebar is open on small screens
  const observer = new MutationObserver(showOverlay);
  observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });

  // Also check on resize
  window.addEventListener("resize", showOverlay);

  // Hide sidebar and overlay when overlay is clicked
  overlay.addEventListener("click", () => {
    sidebar.classList.add("closed");
    showSidebarBtn.style.display = "block";
    hideOverlay();
  });

  // Hide overlay when sidebar is closed
  document.getElementById("hideSidebarBtn").addEventListener("click", () => {
    sidebar.classList.add("closed");
    showSidebarBtn.style.display = "block";
    hideOverlay();
  });
  if (showSidebarBtn) {
    showSidebarBtn.addEventListener("click", showOverlay);
  }
}

addSidebarOverlayClose();