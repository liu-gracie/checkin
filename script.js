// ------------------------------
// PHRASES AND COLOR THEMES
// ------------------------------
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
  { bg: "#2e4a90", text: "#f5d94f", accent: "#8fa2f0" },
  { bg: "#f3cfe4", text: "#3b7030", accent: "#bc7961" },
  { bg: "#6fc96f", text: "#2e4a90", accent: "#f3cfe4" }, 
  { bg: "#964e27", text: "#8fa2f0", accent: "#fff0c1" },
  { bg: "#3b7030", text: "#f3cfe4", accent: "#f5d94f" },
  { bg: "#f5d94f", text: "#2e4a90", accent: "#3b7030" },
  { bg: "#8fa2f0", text: "#964e27", accent: "#f3cfe4" },
  { bg: "#fff0c1", text: "#3b7030", accent: "#bc7961" },
  { bg: "#bc7961", text: "#f5d94f", accent: "#2e4a90" },
  { bg: "#2e4a90", text: "#fff0c1", accent: "#6fc96f" },
  { bg: "#f3cfe4", text: "#964e27", accent: "#8fa2f0" }, 
  { bg: "#3b7030", text: "#f5d94f", accent: "#fff0c1" },
  { bg: "#964e27", text: "#6fc96f", accent: "#f3cfe4" },
  { bg: "#f5d94f", text: "#2e4a90", accent: "#bc7961" },
  { bg: "#8fa2f0", text: "#fff0c1", accent: "#3b7030" }, 
  { bg: "#fff0c1", text: "#2e4a90", accent: "#964e27" }
];

// ------------------------------
// DETERMINE PHRASE INDEX ON FIRST LOAD
// ------------------------------
const navType = performance.getEntriesByType("navigation")[0].type;
const isFirstLoad = sessionStorage.getItem("phraseIndex") === null || navType === "reload";

if (isFirstLoad) {
  const index = Math.floor(Math.random() * phrases.length);
  sessionStorage.setItem("phraseIndex", index);
}

const randomIndex = parseInt(sessionStorage.getItem("phraseIndex"));
const selectedPhrase = phrases[randomIndex];
const selectedColors = colorThemes[randomIndex];

// ------------------------------
// DOM CONTENT LOADED SETUP
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // DOM element references
  const container = document.getElementById("container");
  const phraseEl = document.getElementById("phrase");
  const titleEl = document.querySelector(".title");
  const btnEl = document.querySelector(".login-btn") || document.querySelector(".submit-btn");
  const noteEl = document.querySelector(".info");
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

  // BUTTON LOGIC 
  // if (shareBtn) {
  //   shareBtn.innerHTML = `<img src="images/share.png" alt="Share" class="icon-img">`;
  //   shareBtn.style.backgroundColor = selectedColors.text;
  // }
  // if (calendarBtn) {
  //   calendarBtn.innerHTML = `<img src="images/calendar.png" alt="Calendar" class="icon-img">`;
  //   calendarBtn.style.backgroundColor = selectedColors.text;
  // }
  // if (communityBtn) {
  //   communityBtn.innerHTML = `<img src="images/community.png" alt="Community" class="icon-img">`;
  //   communityBtn.style.backgroundColor = selectedColors.text;
  // }
  // if (submitBtn) {
  //   submitBtn.innerHTML = `<img src="images/check.png" alt="Submit" class="icon-img">`;
  //   submitBtn.style.backgroundColor = selectedColors.text;
  //   submitBtn.style.color = selectedColors.bg;
  // }

  // // Update icon styles globally
  // const iconBtns = document.querySelectorAll(".icon-btn");
  // iconBtns.forEach(btn => {
  //   btn.style.border = "none";
  //   btn.style.padding = "0.5em";
  //   btn.style.borderRadius = "0.5em";
  //   btn.style.backgroundColor = selectedColors.text;
  // });

  // const iconImgs = document.querySelectorAll(".icon-img");
  // iconImgs.forEach(img => {
  //   img.style.width = "1.2em";
  //   img.style.height = "1.2em";
  //   img.style.filter = "brightness(0) invert(0)";
  // });

  // COMMUNITY BUTTON NAVIGATION
  if (communityBtn) {
    communityBtn.addEventListener("click", () => {
      window.location.href = "board.html";
    });
  }

  // CHECK IF COMING BACK FROM CALENDAR
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

  // RENDER CALENDAR IF PRESENT
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

  // CALENDAR NAVIGATION
  if (calendarBtn) {
    calendarBtn.addEventListener("click", () => {
      window.location.href = "past.html";
    });
  }

  // SHARE MODAL LOGIC
  if (shareBtn && shareModal && confirmBtn && cancelBtn) {
    shareBtn.addEventListener("click", () => {
      shareModal.style.display = "flex";
    });

    confirmBtn.addEventListener("click", () => {
      shareModal.style.display = "none";
      alert("Pretend we're opening Instagram... 🎉");
    });

    cancelBtn.addEventListener("click", () => {
      shareModal.style.display = "none";
    });
  }

  // APPLY SELECTED COLOR THEME
  document.body.style.backgroundColor = selectedColors.bg;
  document.documentElement.style.backgroundColor = selectedColors.bg;

  if (aboutTitle) aboutTitle.style.color = selectedColors.text;
  subtitles.forEach(sub => sub.style.color = selectedColors.text);
  textBlocks.forEach(p => p.style.color = selectedColors.text);

  if (submitBtn && inputBox && confirmationBox) {
    submitBtn.addEventListener("click", () => {
      inputBox.style.display = "none";
      confirmationBox.style.display = "flex";

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

  headerLinks.forEach(link => {
    link.style.color = selectedColors.text;
  });

  // CREATE NOTE BOARD IF PRESENT
  if (noteBoard) {
    const placeholderTexts = [
      "Today I taught my favorite class of juniors and that made me happy :)",
      "today i found a penny on the street",
      "Today, I ate lunch with my grandmother.",
      "today i bought bananas",
      "Today I slept really well :)",
    ];

    placeholderTexts.forEach(text => {
      const note = document.createElement("div");
      note.className = "note";
      note.textContent = text;

      note.style.top = Math.random() * 60 + "vh";
      note.style.left = Math.random() * 80 + "vw";

      makeDraggable(note);
      noteBoard.appendChild(note);
    });
  }

  // HELPER: MAKE NOTES DRAGGABLE
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
