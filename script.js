const phrases = [
  "happy friday, what are you<br>looking forward to today?",
  "what’s a compliment you want<br>to share to someone today?",
  "hey you!did you<br>drink water today?"
];

const colorThemes = [
  { bg: "#2e4a90", text: "#f3cfe4", accent: "#8fa2f0" },
  { bg: "#964e27", text: "#fff0c1", accent: "#bc7961" },
  { bg: "#3b7030", text: "#f5d94f", accent: "#6fc96f" }
];

const randomIndex = Math.floor(Math.random() * phrases.length);
const selectedPhrase = phrases[randomIndex];
const selectedColors = colorThemes[randomIndex];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const phraseEl = document.getElementById("phrase");
  const titleEl = document.querySelector(".title");
  const btnEl = document.querySelector(".login-btn") || document.querySelector(".submit-btn");
  const noteEl = document.querySelector(".note");

  if (container) container.style.backgroundColor = selectedColors.bg;
  if (phraseEl) {
    phraseEl.innerHTML = selectedPhrase;  // changed from textContent to innerHTML
    phraseEl.style.color = selectedColors.text;
  }
  if (titleEl) titleEl.style.color = selectedColors.text;
  if (btnEl) {
    btnEl.style.backgroundColor = selectedColors.text;
    btnEl.style.color = selectedColors.bg;
  }
  if (noteEl) noteEl.style.color = selectedColors.text;
});
