// === Load team list from Google Sheets JSON API ===
const sheetURL = "https://script.google.com/macros/s/AKfycbx_sMyEm3n7Q3nMdWzM7UjDDIMZsiZZ4Vk_ZhZ6yDU-tUpR-25EWkjkmE2xDuvelu_dkQ/exec";

async function loadTeams() {
  const res = await fetch(sheetURL);
  const teams = await res.json();
  const team1Select = document.getElementById("team1-select");
  const team2Select = document.getElementById("team2-select");

  teams.forEach(team => {
    const opt1 = new Option(team.name, team.name);
    const opt2 = new Option(team.name, team.name);
    team1Select.appendChild(opt1);
    team2Select.appendChild(opt2);
  });

  team1Select.addEventListener("change", () => {
    localStorage.setItem("team1", team1Select.value);
    document.getElementById("c-team1-name").textContent = team1Select.value;
  });

  team2Select.addEventListener("change", () => {
    localStorage.setItem("team2", team2Select.value);
    document.getElementById("c-team2-name").textContent = team2Select.value;
  });

  // Load from LocalStorage
  team1Select.value = localStorage.getItem("team1") || "";
  team2Select.value = localStorage.getItem("team2") || "";
  document.getElementById("c-team1-name").textContent = team1Select.value;
  document.getElementById("c-team2-name").textContent = team2Select.value;
}

// === Score Controls ===
function changePoints(team, delta) {
  const key = team + "_points";
  let points = parseInt(localStorage.getItem(key) || "0");
  points = Math.max(0, points + delta);
  localStorage.setItem(key, points);
}

function changeSets(team, delta) {
  const key = team + "_sets";
  let sets = parseInt(localStorage.getItem(key) || "0");
  sets = Math.max(0, sets + delta);
  localStorage.setItem(key, sets);
}

function resetPoints() {
  localStorage.setItem("team1_points", 0);
  localStorage.setItem("team2_points", 0);
}

function toggleScoreboard() {
  const show = localStorage.getItem("show") !== "true";
  localStorage.setItem("show", show);
}

// === Scoreboard Display (index.html) ===
function updateDisplay() {
  const t1 = localStorage.getItem("team1") || "Team A";
  const t2 = localStorage.getItem("team2") || "Team B";
  const p1 = localStorage.getItem("team1_points") || "0";
  const p2 = localStorage.getItem("team2_points") || "0";
  const s1 = localStorage.getItem("team1_sets") || "0";
  const s2 = localStorage.getItem("team2_sets") || "0";
  const show = localStorage.getItem("show") === "true";

  const team1El = document.getElementById("team1-name");
  const team2El = document.getElementById("team2-name");
  const point1El = document.getElementById("team1-point");
  const point2El = document.getElementById("team2-point");
  const set1El = document.getElementById("team1-set");
  const set2El = document.getElementById("team2-set");
  const wrapper = document.getElementById("scoreboard");

  if (team1El && team2El) {
    team1El.textContent = t1;
    team2El.textContent = t2;
    point1El.textContent = p1;
    point2El.textContent = p2;
    set1El.textContent = s1;
    set2El.textContent = s2;
    wrapper.style.display = show ? "flex" : "none";
  }
}

// === Auto-refresh display ===
setInterval(updateDisplay, 200);

// === Init for Control Panel ===
if (document.getElementById("team1-select")) {
  loadTeams();
}
