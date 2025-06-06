const mapImages = {
  carentan: {
    axis: "https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fcarentan-axis.jpg",
    allies: "https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fcarentan-allies.jpg"
  },
  omaha: {
    axis: "https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fomaha-axis.jpg",
    allies: "https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fomaha-allies.jpg"
  },
  kursk: {
    axis: "https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fkursk-axis.jpg",
    allies: "https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fkursk-allies.jpg"
  }
};

const mapSelect = document.getElementById("mapSelect");
const teamSelect = document.getElementById("teamSelect");
const mapImage = document.getElementById("mapImage");

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
  axisHalf.innerHTML = "🪶 Axis";
  axisHalf.onclick = () => {
    mapSelect.value = map;
    teamSelect.value = "axis";
    updateImage(map, "axis");
  };

  const alliesHalf = document.createElement("div");
  alliesHalf.className = "card-half allies";
  alliesHalf.innerHTML = "🛡 Allies";
  alliesHalf.onclick = () => {
    mapSelect.value = map;
    teamSelect.value = "allies";
    updateImage(map, "allies");
  };

  body.appendChild(axisHalf);
  body.appendChild(alliesHalf);
  card.appendChild(header);
  card.appendChild(body);
  cardList.appendChild(card);
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
  const selectedTeam = teamSelect.value;
  updateImage(selectedMap, selectedTeam);
}

mapSelect.addEventListener("change", handleDropdownChange);
teamSelect.addEventListener("change", handleDropdownChange);

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
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

document.getElementById("menuToggle").addEventListener("click", () => {
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
const hideSidebarBtn = document.getElementById("hideSidebarBtn");

// Hide sidebar and show button
hideSidebarBtn.addEventListener("click", () => {
  sidebar.classList.add("closed");
  showSidebarBtn.style.display = "block";
});

// Show sidebar and hide button
showSidebarBtn.addEventListener("click", () => {
  sidebar.classList.remove("closed");
  showSidebarBtn.style.display = "none";
});

// Optionally, hide the showSidebarBtn if sidebar is visible on load
if (!sidebar.classList.contains("closed")) {
  showSidebarBtn.style.display = "none";
}

mapSelect.selectedIndex = 0;
teamSelect.selectedIndex = 0;
handleDropdownChange();