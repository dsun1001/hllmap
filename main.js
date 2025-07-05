const mapImages = {
  carentan: {
    axis: "/images/carentan_axis.webp",
    allies: "/images/carentan_allies.webp",
    axis_tanks: "/images/tanks/us_tanks.jpg",
    allies_tanks: "/images/tanks/germany_tanks.jpg"
  },
  driel: {
    axis: "/images/driel_axis.webp",
    allies: "/images/driel_allies.webp",
    axis_tanks: "/images/tanks/british_tanks.jpg",
    allies_tanks: "/images/tanks/germany_tanks.jpg"
  },
  "el-alamein": {
    axis: "/images/elalamein_axis.webp",
    allies: "/images/elalamein_allies.webp",
    axis_tanks: "/images/tanks/british_8th_tanks.jpg",
    allies_tanks: "/images/tanks/germany_tanks.jpg"
  },
  "elsenborn-ridge": {
    axis: "/images/elsenbornridge_axis.webp",
    allies: "/images/elsenbornridge_allies.webp",
    axis_tanks: "/images/tanks/us_winter_tanks.jpg",
    allies_tanks: "/images/tanks/germany_winter_tanks.jpg"
  },
  foy: {
    axis: "/images/foy_axis.webp",
    allies: "/images/foy_allies.webp",
    axis_tanks: "/images/tanks/us_winter_tanks.jpg",
    allies_tanks: "/images/tanks/germany_winter_tanks.jpg"
  },
  "hill-400": {
    axis: "/images/hill400_axis.webp",
    allies: "/images/hill400_allies.webp",
    axis_tanks: "/images/tanks/us_tanks.jpg",
    allies_tanks: "/images/tanks/germany_tanks.jpg"
  },
  "hurtgen-forest": {
    axis: "/images/hurtgenforest_axis.webp",
    allies: "/images/hurtgenforest_allies.webp",
    axis_tanks: "/images/tanks/us_tanks.jpg",
    allies_tanks: "/images/tanks/germany_tanks.jpg"
  },
  kharkov: {
    axis: "/images/kharkov_axis.webp",
    allies: "/images/kharkov_allies.webp",
    axis_tanks: "/images/tanks/soviet_winter_tanks.jpg",
    allies_tanks: "/images/tanks/germany_winter_tanks.jpg"
  },
  kursk: {
    axis: "/images/kursk_axis.webp",
    allies: "/images/kursk_allies.webp",
    axis_tanks: "/images/tanks/soviet_tanks.jpg",
    allies_tanks: "/images/tanks/germany_tanks.jpg"
  },
  mortain: {
    axis: "/images/mortain_axis.webp",
    allies: "/images/mortain_allies.webp",
    axis_tanks: "/images/tanks/us_tanks.jpg",
    allies_tanks: "/images/tanks/germany_tanks.jpg"
  },
  "omaha-beach": {
    axis: "/images/omahabeach_axis.webp",
    allies: "/images/omahabeach_allies.webp",
    axis_tanks: "/images/tanks/us_tanks.jpg",
    allies_tanks: "/images/tanks/germany_tanks.jpg"
  },
  "purple-heart-lane": {
    axis: "/images/purpleheartlane_axis.webp",
    allies: "/images/purpleheartlane_allies.webp",
    axis_tanks: "/images/tanks/us_tanks.jpg",
    allies_tanks: "/images/tanks/germany_tanks.jpg"
  },
  remagen: {
    axis: "/images/remagen_axis.webp",
    allies: "/images/remagen_allies.webp",
    axis_tanks: "/images/tanks/us_tanks.jpg",
    allies_tanks: "/images/tanks/germany_tanks.jpg"
  },
  "saint-marie-du-mont": {
    axis: "/images/saintmariedumont_axis.webp",
    allies: "/images/saintmariedumont_allies.webp",
    axis_tanks: "/images/tanks/us_tanks.jpg",
    allies_tanks: "/images/tanks/germany_tanks.jpg"
  },
  "saint-marie-egliese": {
    axis: "/images/saintmarieegliese_axis.webp",
    allies: "/images/saintmarieegliese_allies.webp",
    axis_tanks: "/images/tanks/us_tanks.jpg",
    allies_tanks: "/images/tanks/germany_tanks.jpg"
  },
  stalingrad: {
    axis: "/images/stalingrad_axis.webp",
    allies: "/images/stalingrad_allies.webp",
    axis_tanks: "/images/tanks/soviet_tanks.jpg",
    allies_tanks: "/images/tanks/germany_tanks.jpg"
  },
  tobruk: {
    axis: "/images/tobruk_axis.webp",
    allies: "/images/tobruk_allies.webp",
    axis_tanks: "/images/tanks/british_8th_tanks.jpg",
    allies_tanks: "/images/tanks/germany_tanks.jpg"
  },
  "utah-beach": {
    axis: "/images/utahbeach_axis.webp",
    allies: "/images/utahbeach_allies.webp",
    axis_tanks: "/images/tanks/us_tanks.jpg",
    allies_tanks: "/images/tanks/germany_tanks.jpg"
  }
};

const mapSelect = document.getElementById("mapSelect");
let isFullscreen = false;
let currentScale = 1;
const minScale = 1;
const maxScale = 3;
const scaleStep = 0.1;

const mapImage = document.getElementById('mapImage');
const fullscreenToggle = document.getElementById('fullscreenToggle');

let downPoint;
let downScrollPosition;
let dragMoved = false; // Track if a drag occurred

// Enable panning the image with click+drag when in fullscreen mode
mapImage.addEventListener("pointerdown", function(e) {
  if (!isFullscreen) return;
  mapImage.setPointerCapture(e.pointerId);
  downPoint = { x: e.clientX, y: e.clientY };
  dragMoved = false;
  // Use window scroll for panning if no dedicated viewer
  downScrollPosition = { 
    x: window.scrollX, 
    y: window.scrollY 
  };
});

mapImage.addEventListener("pointerup", function(e) {
  mapImage.releasePointerCapture(e.pointerId);
  downPoint = undefined;
  if (dragMoved) {
    // Prevent click from toggling fullscreen after a drag
    // dragMoved = false;
    return;
  }
  if (!mapImage.classList.contains("image-fullscreen")) {
    mapImage.classList.add("image-fullscreen");
    mapImage.style.cursor = 'grab';
    currentScale = 1;
    setImageScale(currentScale);
    isFullscreen = true;
  } else {
    mapImage.classList.remove("image-fullscreen");
    mapImage.style.cursor = '';
    setImageScale(1);
    isFullscreen = false;
  }
  if (document.fullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    isFullscreen = false;
  }
});
// Improved panning: use requestAnimationFrame and store translation state outside DOM
let panState = {
  x: 0,
  y: 0,
  lastX: 0,
  lastY: 0,
  animating: false
};

function applyPanTransform() {
  mapImage.style.transform = `scale(${currentScale}) translate(${panState.x}px, ${panState.y}px)`;
  panState.animating = false;
}

mapImage.addEventListener("pointermove", function(e) {
  if (!isFullscreen || !downPoint) return;

  // Calculate movement (no need to divide by scale, since we want pixel-accurate panning)
  const dx = e.clientX - downPoint.x;
  const dy = e.clientY - downPoint.y;

  // Only start drag if moved enough
  if (!dragMoved && (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1)) {
    dragMoved = true;
  }

  // Calculate image and viewport sizes
  const rect = mapImage.getBoundingClientRect();
  const imgWidth = rect.width;
  const imgHeight = rect.height;
  const scale = currentScale;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Scaled image size
  const scaledWidth = imgWidth * scale;
  const scaledHeight = imgHeight * scale;

  // Max pan (so the image edge never goes past the viewport edge)
  const maxPanX = Math.max(0, (scaledWidth - (viewportWidth * scale)) / 5);
  const maxPanY = Math.max(0, (scaledHeight - (viewportHeight * scale)) / 5);

  // Update pan state
  panState.x += dx;
  panState.y += dy;

  // Clamp translation
  panState.x = Math.max(-maxPanX, Math.min(maxPanX, panState.x));
  panState.y = Math.max(-maxPanY, Math.min(maxPanY, panState.y));

  // Only update transform once per animation frame
  if (!panState.animating) {
    panState.animating = true;
    requestAnimationFrame(applyPanTransform);
  }

  downPoint = { x: e.clientX, y: e.clientY };
});

// Reset pan on fullscreen toggle or zoom
function resetPan() {
  panState.x = 0;
  panState.y = 0;
  applyPanTransform();
}

// Call resetPan() when entering/exiting fullscreen or changing zoom
// (You should call resetPan() in your fullscreen toggle and zoom handlers)

// Prevent default drag behavior on the image (fixes ghost image drag)
mapImage.setAttribute("draggable", "false");
mapImage.addEventListener("dragstart", function(e) {
  e.preventDefault();
});

// Allow ESC to exit "fullscreen" mode
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mapImage.classList.contains("image-fullscreen")) {
    mapImage.classList.remove("image-fullscreen");
  }
});

document.getElementById("fullscreenToggle").addEventListener("click", () => {
  if (mapImage.requestFullscreen) {
    mapImage.requestFullscreen();
  } else if (mapImage.webkitRequestFullscreen) {
    mapImage.webkitRequestFullscreen();
  } else if (mapImage.msRequestFullscreen) {
    mapImage.msRequestFullscreen();
  }
  isFullscreen = true;
});

function setImageScale(scale) {
    mapImage.style.transform = `scale(${scale})`;
}

// Mouse wheel zoom in fullscreen
mapImage.addEventListener('wheel', (e) => {
    if (document.fullscreenElement) {
        console.log("In fullscreen mode");
    }
    if (!isFullscreen) return;
    e.preventDefault();
    if (e.deltaY < 0) {
        currentScale = Math.min(currentScale + scaleStep, maxScale);
    } else {
        currentScale = Math.max(currentScale - scaleStep, minScale);
    }
    setImageScale(currentScale);
}, { passive: false });

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

let showTanks = false;

const viewMap = document.getElementById("viewMap");
const viewTanks = document.getElementById("viewTanks");

viewMap.addEventListener("click", () => {
  showTanks = false;
  viewMap.classList.add("active");
  viewTanks.classList.remove("active");
  handleDropdownChange();
});
viewTanks.addEventListener("click", () => {
  showTanks = true;
  viewTanks.classList.add("active");
  viewMap.classList.remove("active");
  handleDropdownChange();
});

function updateImage(map, team) {
  let url;
  if (showTanks) {
    url = mapImages[map]?.[team + "_tanks"];
  } else {
    url = mapImages[map]?.[team];
  }
  if (url) {
    mapImage.src = url;
    mapImage.style.display = "block";
    mapImage.alt = showTanks
      ? `${capitalize(map)} - ${capitalize(team)} Tanks`
      : `${capitalize(map)} - ${capitalize(team)}`;
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

  // Update URL with map and team as query params
  // const params = new URLSearchParams(window.location.search);
  // params.set("map", selectedMap);
  // params.set("team", selectedTeam);
  // params.set("view", showTanks ? "tanks" : "map");
  // const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, '', `/${selectedMap}/${selectedTeam}/${showTanks ? 'tanks' : 'map'}`);
  // window.history.replaceState({}, "", newUrl);
  const [ , urlMap, urlTeam, urlView ] = window.location.pathname.split('/');
  const readableTitle = `${capitalize(urlMap)} ${urlView === 'tanks' ? 'Tanks' : 'Default Garrisons'}`;
  readableDesc = '';
  if (urlView === 'tanks') {
    readableDesc = `${capitalize(urlMap)} tank idenfication. Hell Let Loose tank idenfication for the ${capitalize(urlMap)} map. Use this map to find what the enemy tanks look like.`;
  }
  else {
    readableDesc = `${capitalize(urlMap)} default garrison locations. Use this map to find where the default garrison spawn locations are for the Offensive game mode in Hell Let Loose.`;
  }

  document.title = readableTitle;
  document.getElementById('dynamic-desc').setAttribute('content', readableDesc);

  if (urlView === 'tanks') {
    document.getElementById('pageHeader').textContent = `${capitalize(urlMap)} Tanks`;
  }
  else {
    document.getElementById('pageHeader').textContent = `${capitalize(urlMap)} Default Garrisons`;
  }
}

// On page load, check for map/team/view in URL and set them
(function syncFromUrl() {
  // const params = new URLSearchParams(window.location.search);
  // const urlMap = params.get("map");
  // const urlTeam = params.get("team");
  // const urlView = params.get("view");
  const [ , urlMap, urlTeam, urlView ] = window.location.pathname.split('/');
  let changed = false;
  if (urlMap && mapImages[urlMap] && urlView) {
    mapSelect.value = urlMap;
    localStorage.setItem("selectedMap", urlMap);
    localStorage.setItem("selectedView", urlView);
    changed = true;
  }
  if (urlTeam && (urlTeam === "axis" || urlTeam === "allies")) {
    setTeam(urlTeam);
    changed = true;
  }
  if (urlView === "tanks") {
    showTanks = true;
    viewTanks.classList.add("active");
    viewMap.classList.remove("active");
    changed = true;
  }
  handleDropdownChange();

})();

mapSelect.addEventListener("change", () => {
  localStorage.setItem("selectedMap", mapSelect.value);
  handleDropdownChange();
});

// Restore saved selections from localStorage
const savedMap = localStorage.getItem("selectedMap");
const savedTeam = localStorage.getItem("selectedTeam");

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
    .split('-')
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

const VISITOR_COUNT_KEY = "visitorCount";
const VISITOR_COUNT_TIME_KEY = "visitorCountTime";
const ONE_DAY_MS = 8 * 60 * 60 * 1000;

function showVisitorCount(count) {
  document.getElementById("visitor-count").textContent = `Visitors: ${Number(count).toLocaleString()}`;
}

function getStoredVisitorCount() {
  const count = localStorage.getItem(VISITOR_COUNT_KEY);
  const time = localStorage.getItem(VISITOR_COUNT_TIME_KEY);
  if (count && time) {
    const age = Date.now() - Number(time);
    if (age < ONE_DAY_MS) {
      return count;
    }
  }
  return null;
}

const storedCount = getStoredVisitorCount();
if (storedCount !== null) {
  showVisitorCount(storedCount);
} else {
  fetch("https://l9k8ekxqn3.execute-api.us-east-1.amazonaws.com/counter")
    .then(res => res.json())
    .then(data => {
      showVisitorCount(data.count);
      localStorage.setItem(VISITOR_COUNT_KEY, data.count);
      localStorage.setItem(VISITOR_COUNT_TIME_KEY, Date.now());
    });
}

syncFromUrl();