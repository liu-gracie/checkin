const phrases = [
  "happy friday, what are you<br>looking forward to today?",
  "what’s a compliment you want<br>to share to someone today?",
  "hey you! did you<br>drink water today?", 
  "what was the highlight<br>of your day today?", 
  "what was a surprise<br>for you today?",
  "what are you grateful for today?", 
  "what was something annoying<br>that happened today?", 
  "what did you do that<br>was just for yourself today?",
  "who is on your mind today",
  "did you rest enough today?",
  "what helped you<br>feel grounded today?",
  "did you touch grass today?",
  "what challenged you and<br>how did you respond today?",
  "what are your top 3<br>favorite moments from today?",
  "what did you learn<br>about yourself today?",
  "did anyone or anything<br>make you smile today?"
];

const colorThemes = [
  { bg: "#2e4a90", text: "#f3cfe4", accent: "#8fa2f0" },
  { bg: "#964e27", text: "#fff0c1", accent: "#bc7961" },
  { bg: "#3b7030", text: "#f5d94f", accent: "#6fc96f" }, 
  { bg: "#f3cfe4", text: "#2e4a90", accent: "#8fa2f0" },
  { bg: "#2e4a90", text: "#f3cfe4", accent: "#8fa2f0" },
  { bg: "#964e27", text: "#fff0c1", accent: "#bc7961" },
  { bg: "#3b7030", text: "#f5d94f", accent: "#6fc96f" }, 
  { bg: "#f3cfe4", text: "#2e4a90", accent: "#8fa2f0" },
  { bg: "#2e4a90", text: "#f3cfe4", accent: "#8fa2f0" },
  { bg: "#964e27", text: "#fff0c1", accent: "#bc7961" },
  { bg: "#3b7030", text: "#f5d94f", accent: "#6fc96f" }, 
  { bg: "#f3cfe4", text: "#2e4a90", accent: "#8fa2f0" },
  { bg: "#2e4a90", text: "#f3cfe4", accent: "#8fa2f0" },
  { bg: "#964e27", text: "#fff0c1", accent: "#bc7961" },
  { bg: "#3b7030", text: "#f5d94f", accent: "#6fc96f" }, 
  { bg: "#f3cfe4", text: "#2e4a90", accent: "#8fa2f0" }
];

// const randomIndex = Math.floor(Math.random() * phrases.length);
// const selectedPhrase = phrases[randomIndex];
// const selectedColors = colorThemes[randomIndex];

const navType = performance.getEntriesByType("navigation")[0].type;
const isFirstLoad = sessionStorage.getItem("phraseIndex") === null || navType === "reload";

if (isFirstLoad) {
  const index = Math.floor(Math.random() * phrases.length);
  sessionStorage.setItem("phraseIndex", index);
}

const randomIndex = parseInt(sessionStorage.getItem("phraseIndex"));
const selectedPhrase = phrases[randomIndex];
const selectedColors = colorThemes[randomIndex];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const phraseEl = document.getElementById("phrase");
  const titleEl = document.querySelector(".title");
  const btnEl = document.querySelector(".login-btn") || document.querySelector(".submit-btn");
  const noteEl = document.querySelector(".note");
  const textAreaEl = document.querySelector(".text-area");
  const headerLinks = document.querySelectorAll(".header-link");
  const submitBtn = document.querySelector(".submit-btn");
  const inputBox = document.querySelector(".input-box");
  const confirmationBox = document.getElementById("response-confirmation");
  const aboutTitle = document.querySelector(".about");
  const subtitles = document.querySelectorAll(".subtitle");
  const textBlocks = document.querySelectorAll(".text");
  const shareBtn = document.querySelector('.icon-btn[title="Share"]');
  const shareModal = document.getElementById("share-modal");
  const confirmBtn = document.querySelector(".modal-confirm");
  const cancelBtn = document.querySelector(".modal-cancel");
  const calendarBtn = document.querySelector('.icon-btn[title="Calendar"]');
  const communityBtn = document.querySelector('.icon-btn[title="Community"]');
  const calendarGrid = document.getElementById("calendar-grid");
  const noteBoard = document.getElementById("note-board");
  

  if (communityBtn) {
    communityBtn.addEventListener("click", () => {
      window.location.href = "board.html";
    });
  }

  // If returning from past.html, simulate submit
  const params = new URLSearchParams(window.location.search);
  const fromCalendar = params.get("fromCalendar") === "true";

  if (fromCalendar && inputBox && confirmationBox) {
    inputBox.style.display = "none";
    confirmationBox.style.display = "flex";

    const iconBtns = confirmationBox.querySelectorAll(".icon-btn");
    iconBtns.forEach(btn => {
      btn.style.backgroundColor = selectedColors.text;
      btn.style.color = selectedColors.bg;
    });
  }

  
  if (calendarGrid) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.className = "calendar-day";
      dayDiv.textContent = i;
      dayDiv.style.borderColor = selectedColors.text;
      dayDiv.style.color = selectedColors.text;
      calendarGrid.appendChild(dayDiv);
    }
  }
  
  if (calendarBtn) {
    calendarBtn.addEventListener("click", () => {
      window.location.href = "past.html";
    });
  }

  if (shareBtn && shareModal && confirmBtn && cancelBtn) {
    shareBtn.addEventListener("click", () => {
      shareModal.style.display = "flex";
    });

    confirmBtn.addEventListener("click", () => {
      shareModal.style.display = "none";
      alert("Pretend we're opening Instagram... 🎉"); // Replace with real logic if needed
    });

    cancelBtn.addEventListener("click", () => {
      shareModal.style.display = "none";
    });
  }


  // Apply background color to the whole page
  document.body.style.backgroundColor = selectedColors.bg;
  document.documentElement.style.backgroundColor = selectedColors.bg;

  if (aboutTitle) aboutTitle.style.color = selectedColors.text;
  if (subtitles.length > 0) {
    subtitles.forEach(sub => sub.style.color = selectedColors.text);
  }
  if (textBlocks.length > 0) {
    textBlocks.forEach(p => p.style.color = selectedColors.text);
  }

  if (submitBtn && inputBox && confirmationBox) {
    submitBtn.addEventListener("click", () => {
      inputBox.style.display = "none";
      confirmationBox.style.display = "flex";

      // Match icon buttons to theme
      const iconBtns = confirmationBox.querySelectorAll(".icon-btn");
      iconBtns.forEach(btn => {
        btn.style.backgroundColor = selectedColors.text;
        btn.style.color = selectedColors.bg;
      });
    });
  }

  if (container) container.style.backgroundColor = selectedColors.bg;
  if (phraseEl) {
    phraseEl.innerHTML = selectedPhrase;
    phraseEl.style.color = selectedColors.text;
  }
  if (titleEl) titleEl.style.color = selectedColors.text;
  if (btnEl) {
    btnEl.style.backgroundColor = selectedColors.text;
    btnEl.style.color = selectedColors.bg;
  }
  if (noteEl) noteEl.style.color = selectedColors.text;

  if (textAreaEl) {
    textAreaEl.style.borderColor = selectedColors.text;
    textAreaEl.style.borderWidth = "4px";
    textAreaEl.style.borderStyle = "solid";
    textAreaEl.style.color = selectedColors.text;

    const styleTag = document.createElement("style");
    styleTag.textContent = `
      .text-area::placeholder {
        color: ${selectedColors.text};
      }
    `;
    document.head.appendChild(styleTag);
  }

  if (headerLinks.length > 0) {
    headerLinks.forEach(link => {
      link.style.color = selectedColors.text;
    });
  }


  if (noteBoard) {
    const placeholderTexts = [
      "Lorem ipsum dolor sit amet.",
      "Consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt.",
      "Ut labore et dolore magna aliqua.",
      "Enim ad minim veniam.",
      "Quis nostrud exercitation ullamco.",
      "Laboris nisi ut aliquip ex ea.",
      "Duis aute irure dolor in reprehenderit.",
      "In voluptate velit esse cillum.",
      "Excepteur sint occaecat cupidatat non proident."
    ];

    placeholderTexts.forEach(text => {
      const note = document.createElement("div");
      note.className = "note";
      note.textContent = text;

      // Random start position
      note.style.top = Math.random() * 60 + "vh";
      note.style.left = Math.random() * 80 + "vw";

      makeDraggable(note);
      noteBoard.appendChild(note);
    });
  }

  // Helper to make notes draggable
  function makeDraggable(element) {
    let offsetX = 0, offsetY = 0, isDragging = false;

    element.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - element.offsetLeft;
      offsetY = e.clientY - element.offsetTop;
      element.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      element.style.left = e.clientX - offsetX + "px";
      element.style.top = e.clientY - offsetY + "px";
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      element.style.cursor = "grab";
    });
  }

});
