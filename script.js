/* Romantic Love Website */

// ================================
// PERSONALIZATION
// ================================
// Change everything below. You should not need to edit the rest of this file.

const SECRET_PIN = "0918";

const PARTNER_NAME = "My Loveyyy";

const LOVE_LETTER = `I love you so much my honeybunch sugarplump gumdrum gummybear. Every moment with you I cherish. Day after day, I wake up everyday with you in my mind kay sayo kaayo ka mangasaba nako haha and I love you for that (ayaw lang pasobra ):. Loveyyy Happy Birthday, I want you to know how much I love you. Loveyyy I'm so lucky to find someone as perfect as you.`;

const FINAL_MESSAGE = "I love you to the moon and back ❤️";

const FINAL_SUBTITLE = "Forever yours.";

const SOCIAL_USERNAME = "@yourusername";

const SOCIAL_URL = "https://instagram.com/";

const BACKGROUND_MUSIC = "growold.mp3";

const PHOTOS = [
  {
    image: "a1.jpg",
    caption: "Our first memory",
    rotation: "-6deg",
    alt: "Our first memory"
  },
  {
    image: "a2.jpg",
    caption: "A beautiful day",
    rotation: "5deg",
    alt: "A beautiful day together"
  },
  {
    image: "a3.jpg",
    caption: "Together ❤️",
    rotation: "-4deg",
    alt: "Together"
  },
  {
    image: "a4.jpg",
    caption: "Forever",
    rotation: "7deg",
    alt: "Forever"
  }
];

const SONGS = [
  {
    title: "Those eyes",
    artist: "New West",
    image: "c1.jpg",
    url: "https://open.spotify.com/track/50x1Ic8CaXkYNvjmxe3WXy?si=18c10e13297d416b"
  },
  {
    title: "Fall On Me",
    artist: "Andrea Bocelli, Matteo Bocelli",
    image: "c2.png",
    url: "https://open.spotify.com/track/3iOqivy61CFqjcvAbcAU9u?si=8338bf0093f34905"
  },
  {
    title: "Invisible String",
    artist: "Taylor Swift",
    image: "c3.jpg",
    url: "https://open.spotify.com/track/6VsvKPJ4xjVNKpI8VVZ3SV?si=44488ed0fa3141e4",
  }
];

// ================================
// APP
// ================================

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const screens = {
  pin: document.getElementById("screen-pin"),
  bloom: document.getElementById("screen-bloom"),
  memories: document.getElementById("screen-memories"),
  letter: document.getElementById("screen-letter"),
  songs: document.getElementById("screen-songs"),
  final: document.getElementById("screen-final"),
  social: document.getElementById("screen-social")
};

let currentScreen = "pin";
let transitioning = false;
let pinValue = "";
let pinLocked = false;
let letterTimer = null;
let bloomTimer = null;
let finalTimer = null;

function prefersLessMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function showScreen(name) {
  if (transitioning || name === currentScreen) return;
  transitioning = true;

  const from = screens[currentScreen];
  const to = screens[name];
  if (!from || !to) {
    transitioning = false;
    return;
  }

  const finish = () => {
    from.classList.remove("is-active", "is-leaving", "is-success");
    from.hidden = true;
    to.hidden = false;
    to.classList.add("is-active");
    currentScreen = name;
    transitioning = false;
    onScreenEnter(name);
  };

  if (prefersLessMotion()) {
    finish();
    return;
  }

  from.classList.add("is-leaving");
  window.setTimeout(finish, 480);
}

function onScreenEnter(name) {
  if (name === "bloom") startBloom();
  if (name === "memories") renderPhotos();
  if (name === "letter") startLetter();
  if (name === "songs") renderSongs();
  if (name === "final") startFinal();
  if (name === "social") {
    fillHearts(screens.social.querySelector(".heart-field"));
  }
}

document.querySelectorAll("[data-next]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (bloomTimer) {
      window.clearTimeout(bloomTimer);
      bloomTimer = null;
    }
    if (finalTimer) {
      window.clearTimeout(finalTimer);
      finalTimer = null;
    }
    showScreen(btn.getAttribute("data-next"));
  });
});

// ---------- PIN ----------
const pinDots = document.getElementById("pin-dots");
const pinError = document.getElementById("pin-error");
const keypad = document.getElementById("keypad");
const pinLength = SECRET_PIN.length;

function renderDots() {
  pinDots.innerHTML = "";
  for (let i = 0; i < pinLength; i += 1) {
    const dot = document.createElement("span");
    dot.className = "pin-dot";
    if (i < pinValue.length) dot.classList.add("is-filled");
    pinDots.appendChild(dot);
  }
  pinDots.setAttribute(
    "aria-label",
    pinValue.length + " of " + pinLength + " digits entered"
  );
}

function setPinError(message) {
  pinError.textContent = message || "";
}

function flashIncorrect() {
  pinDots.classList.add("is-shake");
  pinDots.querySelectorAll(".pin-dot.is-filled").forEach((dot) => {
    dot.classList.add("is-error");
  });
  setPinError("That code isn’t right. Try again.");
  window.setTimeout(
  () => {
    PHOTO_DIRS.forEach((dir) => figure.classList.remove(dir));

    // Keep the photo visible when switching to floating animation
    figure.style.opacity = "1";
    figure.classList.add("is-float");
  },
  prefersLessMotion() ? 0 : 1100 + index * 180
);
}

function unlockPin() {
  pinLocked = true;
  pinDots.querySelectorAll(".pin-dot").forEach((dot) => {
    dot.classList.add("is-success");
  });
  screens.pin.classList.add("is-success");
  revealMusicButton();
  window.setTimeout(
    () => {
      screens.pin.classList.remove("is-success");
      showScreen("bloom");
    },
    prefersLessMotion() ? 200 : 850
  );
}

function checkPin() {
  if (pinValue === SECRET_PIN) {
    unlockPin();
    return;
  }
  flashIncorrect();
}

function pressKey(key) {
  if (pinLocked) return;

  if (key === "back") {
    pinValue = pinValue.slice(0, -1);
    setPinError("");
    renderDots();
    return;
  }

  if (key === "clear") {
    pinValue = "";
    setPinError("");
    renderDots();
    return;
  }

  if (key === "submit") {
    if (pinValue.length < pinLength) {
      pinDots.classList.add("is-shake");
      setPinError("Enter the full code.");
      window.setTimeout(() => pinDots.classList.remove("is-shake"), 450);
      return;
    }
    checkPin();
    return;
  }

  if (pinValue.length >= pinLength) return;
  pinValue += key;
  renderDots();
  if (pinValue.length === pinLength) {
    checkPin();
  }
}

function buildKeypad() {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "back", "0", "submit"];
  keys.forEach((key) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "key";
    if (key === "back") {
      btn.textContent = "⌫";
      btn.setAttribute("aria-label", "Delete last digit");
    } else if (key === "submit") {
      btn.textContent = "✓";
      btn.setAttribute("aria-label", "Submit code");
    } else {
      btn.textContent = key;
      btn.setAttribute("aria-label", "Digit " + key);
    }
    btn.addEventListener("click", () => pressKey(key));
    if (key === "back") {
      let hold;
      btn.addEventListener("pointerdown", () => {
        hold = window.setTimeout(() => pressKey("clear"), 500);
      });
      ["pointerup", "pointerleave", "pointercancel"].forEach((evt) => {
        btn.addEventListener(evt, () => window.clearTimeout(hold));
      });
    }
    keypad.appendChild(btn);
  });
}

document.addEventListener("keydown", (event) => {
  if (currentScreen !== "pin" || pinLocked) return;
  if (event.key >= "0" && event.key <= "9") {
    pressKey(event.key);
  } else if (event.key === "Backspace") {
    event.preventDefault();
    pressKey("back");
  } else if (event.key === "Escape") {
    pressKey("clear");
  } else if (event.key === "Enter") {
    pressKey("submit");
  }
});

// ---------- FLOWERS ----------
const FLOWER_COLORS = ["#f7b6c8", "#e63946", "#f4a261", "#e9c46a", "#9b5de5", "#4cc9f0", "#fff7f0"];

function flowerSvg(color, kind) {
  if (kind === 1) {
    return (
      '<svg viewBox="0 0 80 80" aria-hidden="true">' +
      [0, 1, 2, 3, 4, 5]
        .map(
          (i) =>
            '<ellipse cx="40" cy="24" rx="10" ry="20" fill="' +
            color +
            '" opacity="0.9" transform="rotate(' +
            i * 60 +
            ' 40 40)"/>'
        )
        .join("") +
      '<circle cx="40" cy="40" r="8" fill="#fff4c2"/></svg>'
    );
  }
  if (kind === 2) {
    return (
      '<svg viewBox="0 0 80 80" aria-hidden="true">' +
      [0, 1, 2, 3, 4]
        .map(
          (i) =>
            '<path d="M40 14 C48 24 52 34 40 42 C28 34 32 24 40 14 Z" fill="' +
            color +
            '" transform="rotate(' +
            i * 72 +
            ' 40 40)"/>'
        )
        .join("") +
      '<circle cx="40" cy="40" r="7" fill="#ffe08a"/></svg>'
    );
  }
  return (
    '<svg viewBox="0 0 80 80" aria-hidden="true">' +
    [0, 1, 2, 3, 4, 5, 6, 7]
      .map(
        (i) =>
          '<ellipse cx="40" cy="22" rx="7" ry="18" fill="' +
          color +
          '" opacity="0.85" transform="rotate(' +
          i * 45 +
          ' 40 40)"/>'
      )
      .join("") +
    '<circle cx="40" cy="40" r="6" fill="#fff1a8"/></svg>'
  );
}

function startBloom() {
  const field = document.getElementById("bloom-field");
  field.innerHTML = "";

  const center = document.createElement("div");
  center.className = "flower flower--center";
  center.innerHTML = flowerSvg("#e63946", 0);
  field.appendChild(center);

  const count = prefersLessMotion() ? 8 : 26;
  for (let i = 0; i < count; i += 1) {
    const el = document.createElement("div");
    el.className = "flower";
    const size = 36 + ((i * 17) % 72);
    el.style.left = 8 + ((i * 37) % 84) + "%";
    el.style.top = 6 + ((i * 53) % 82) + "%";
    el.style.width = size + "px";
    el.style.height = size + "px";
    el.style.setProperty("--rot", (i * 23) % 360 + "deg");
    el.style.animationDelay = prefersLessMotion() ? "0s" : 0.2 + (i % 10) * 0.18 + "s";
    el.innerHTML = flowerSvg(FLOWER_COLORS[i % FLOWER_COLORS.length], i % 3);
    field.appendChild(el);
  }

  const duration = prefersLessMotion() ? 700 : 6200;
  bloomTimer = window.setTimeout(() => {
    bloomTimer = null;
    showScreen("memories");
  }, duration);
}

// ---------- PHOTOS ----------
const PHOTO_DIRS = ["from-left", "from-right", "from-top", "from-bottom"];

function handleImgError(img) {
  img.style.display = "none";
  const fallback = document.createElement("div");
  const inSong = img.closest(".song-card");
  fallback.className = inSong ? "song-fallback" : "photo-fallback";
  img.parentNode.insertBefore(fallback, img);
}

function renderPhotos() {
  const table = document.getElementById("photo-table");
  table.innerHTML = "";
  PHOTOS.forEach((photo, index) => {
    const figure = document.createElement("figure");
    figure.className = "polaroid " + PHOTO_DIRS[index % PHOTO_DIRS.length];
    figure.style.setProperty("--tilt", photo.rotation || "0deg");
    figure.style.animationDelay = prefersLessMotion() ? "0s" : 0.15 + index * 0.18 + "s";

    const img = document.createElement("img");
    img.src = photo.image;
    img.alt = photo.alt || photo.caption || "A shared memory";
    img.width = 480;
    img.height = 640;
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("error", () => handleImgError(img));

    const caption = document.createElement("figcaption");
    caption.textContent = photo.caption || "";

    figure.appendChild(img);
    figure.appendChild(caption);
    table.appendChild(figure);

    window.setTimeout(
      () => {
        PHOTO_DIRS.forEach((dir) => figure.classList.remove(dir));
        figure.classList.add("is-float");
      },
      prefersLessMotion() ? 0 : 1100 + index * 180
    );
  });
}

// ---------- LETTER ----------
function startLetter() {
  const el = document.getElementById("letter-text");
  const full = document.getElementById("letter-full");
  const text = LOVE_LETTER;
  full.textContent = text;
  if (letterTimer) window.clearInterval(letterTimer);

  if (prefersLessMotion()) {
    el.textContent = text;
    return;
  }

  el.textContent = "";
  const caret = document.createElement("span");
  caret.className = "caret";
  caret.textContent = "▍";
  let i = 0;
  letterTimer = window.setInterval(() => {
    i += 2;
    el.textContent = text.slice(0, i);
    el.appendChild(caret);
    if (i >= text.length) {
      window.clearInterval(letterTimer);
      letterTimer = null;
      caret.remove();
    }
  }, 16);
}

// ---------- SONGS ----------
function renderSongs() {
  const list = document.getElementById("song-list");
  list.innerHTML = "";
  SONGS.forEach((song, index) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.className = "song-card";
    link.href = song.url || "https://open.spotify.com/";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.animationDelay = 0.12 * index + "s";
    link.setAttribute("aria-label", "Open " + song.title + " by " + song.artist);

    const img = document.createElement("img");
    img.src = song.image;
    img.alt = "";
    img.width = 64;
    img.height = 64;
    img.addEventListener("error", () => handleImgError(img));

    const meta = document.createElement("div");
    meta.className = "song-meta";
    meta.innerHTML = "<strong>" + escapeHtml(song.title) + "</strong><span>" + escapeHtml(song.artist) + "</span>";

    const play = document.createElement("span");
    play.className = "song-play";
    play.setAttribute("aria-hidden", "true");
    play.textContent = "▶";

    const note = document.createElement("span");
    note.className = "song-note";
    note.setAttribute("aria-hidden", "true");
    note.textContent = "♪";

    link.appendChild(img);
    link.appendChild(meta);
    link.appendChild(play);
    link.appendChild(note);
    item.appendChild(link);
    list.appendChild(item);
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---------- HEARTS ----------
function fillHearts(container) {
  if (!container || container.dataset.ready === "1") return;
  container.innerHTML = "";
  const count = prefersLessMotion() ? 8 : 42;
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.className = "float-heart";
    heart.textContent = "♥";
    heart.style.left = (i * 17) % 100 + "%";
    heart.style.fontSize = 10 + ((i * 13) % 22) + "px";
    heart.style.setProperty("--o", String(0.18 + ((i * 7) % 40) / 100));
    heart.style.setProperty("--drift", 8 + (i % 12) + "px");
    heart.style.animationDuration = 8 + (i % 8) + "s";
    heart.style.animationDelay = (i % 10) * 0.35 + "s";
    container.appendChild(heart);
  }
  container.dataset.ready = "1";
}

function startFinal() {
  document.getElementById("final-heading").textContent = FINAL_MESSAGE;
  document.getElementById("final-subtitle").textContent = FINAL_SUBTITLE;
  fillHearts(screens.final.querySelector(".heart-field"));
  finalTimer = window.setTimeout(
    () => {
      finalTimer = null;
      showScreen("social");
    },
    prefersLessMotion() ? 1600 : 4200
  );
}

// ---------- SOCIAL + MUSIC ----------
function setupSocial() {
  const link = document.getElementById("social-link");
  link.href = SOCIAL_URL;
  link.setAttribute("aria-label", "Open Instagram profile " + SOCIAL_USERNAME);
  document.getElementById("social-username").textContent = SOCIAL_USERNAME;
  document.getElementById("made-for").textContent = "Made with love for " + PARTNER_NAME;
}

function revealMusicButton() {
  const toggle = document.getElementById("music-toggle");
  const audio = document.getElementById("bg-audio");
  if (!BACKGROUND_MUSIC) return;
  audio.src = BACKGROUND_MUSIC;
  toggle.hidden = false;

  audio.addEventListener("error", () => {
    toggle.hidden = true;
  });

  toggle.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        toggle.classList.add("is-playing");
        toggle.setAttribute("aria-pressed", "true");
        toggle.setAttribute("aria-label", "Pause background music");
      } else {
        audio.pause();
        toggle.classList.remove("is-playing");
        toggle.setAttribute("aria-pressed", "false");
        toggle.setAttribute("aria-label", "Play background music");
      }
    } catch (err) {
      toggle.classList.remove("is-playing");
    }
  });
}

// ---------- START ----------
buildKeypad();
renderDots();
setupSocial();
