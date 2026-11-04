const lines = [
  "Never gets old, huh? Nope. It kind of makes you want to break into song. Yep.",
  "The world is full of wonderful things waiting to be discovered.",
  "Keep your hands relaxed and let your fingers find their rhythm.",
  "Every word you type is another step toward effortless fluency.",
  "Take a breath, focus on the next character, and keep moving.",
  "Practice turns small improvements into a skill you can rely on.",
  "There is always another story waiting for you to type.",
  "Great work. Replay this line or continue to the next one."
];
let practiceLines = lines;

const prompt = document.querySelector("#prompt");
const input = document.querySelector("#typingInput");
const lineStat = document.querySelector("#lineStat");
const wpmStat = document.querySelector("#wpmStat");
const accuracyStat = document.querySelector("#accuracyStat");
const progressBar = document.querySelector("#progressBar");
const toast = document.querySelector("#toast");
const videoScreen = document.querySelector(".video-screen");
const songModal = document.querySelector("#songModal");
const resultModal = document.querySelector("#resultModal");
const selectedSong = document.querySelector("#selectedSong");
let lineIndex = 0;
let startedAt = 0;
let timedLyrics = [];
let mediaFrame = null;
let isPlaying = false;
let waitingForLine = false;
let playbackSeconds = 0;
let playbackRunStartedAt = 0;
let totalCorrect = 0;
let totalTyped = 0;
let practiceStartedAt = 0;
let typingComplete = false;
let songEnded = false;
const builtInSongs = [
  { title: "Hook Step", artist: "Bheems Ceciroleo", language: "Telugu", videoId: "6KK5IPk7kB0" },
  { title: "Gira Gira Gingiraagirey", artist: "Mickey J. Meyer", language: "Telugu", videoId: "7Z5abg_C2dU" },
  { title: "Kadalalle", artist: "Sid Sriram, Aishwarya Ravichandran", language: "Telugu", videoId: "RXUPCUUk1oE" },
  { title: "Oosupodu", artist: "Fidaa", language: "Telugu", videoId: "e4N9al7vhVQ" },
  { title: "Panchadara Bomma", artist: "Magadheera", language: "Telugu", videoId: "qTE453yc1rc" },
  { title: "Shape of You", artist: "Ed Sheeran", language: "English", videoId: "JGwWNGJdvx8" },
  { title: "Someone Like You", artist: "Adele", language: "English", videoId: "hLQl3WQQoQ0" },
  { title: "Perfect", artist: "Ed Sheeran", language: "English", videoId: "2Vv-BfVoq4g" },
  { title: "Believer", artist: "Imagine Dragons", language: "English", videoId: "7wtfhZwyrcc" },
  { title: "Counting Stars", artist: "OneRepublic", language: "English", videoId: "hT_nvWreIhg" },
  { title: "Lovely", artist: "Billie Eilish, Khalid", language: "English", videoId: "V1Pl8CzNzCw" },
  { title: "Havana", artist: "Camila Cabello", language: "English", videoId: "BQ0mxQXmLsk" },
  { title: "A Thousand Years", artist: "Christina Perri", language: "English", videoId: "rtOvBOTyX00" },
  { title: "Faded", artist: "Alan Walker", language: "English", videoId: "60ItHLz5WEA" },
  { title: "Let Me Down Slowly", artist: "Alec Benjamin", language: "English", videoId: "50VNCymT-Cs" },
  { title: "Attention", artist: "Charlie Puth", language: "English", videoId: "nfs8NYg7yQM" },
  { title: "We Don't Talk Anymore", artist: "Charlie Puth, Selena Gomez", language: "English", videoId: "3AtDnEC4zak" },
  { title: "See You Again", artist: "Wiz Khalifa, Charlie Puth", language: "English", videoId: "RgKAFK5djSk" },
  { title: "Memories", artist: "Maroon 5", language: "English", videoId: "SlPhMPnQ58k" },
  { title: "Sugar", artist: "Maroon 5", language: "English", videoId: "09R8_2nJtjg" },
  { title: "Girls Like You", artist: "Maroon 5", language: "English", videoId: "aJOTlE1K90k" },
  { title: "Radioactive", artist: "Imagine Dragons", language: "English", videoId: "ktvTqknDobU" },
  { title: "Demons", artist: "Imagine Dragons", language: "English", videoId: "mWRsgZuwf_8" },
  { title: "Thunder", artist: "Imagine Dragons", language: "English", videoId: "fKopy74weus" },
  { title: "The Nights", artist: "Avicii", language: "English", videoId: "UtF6fm4zCEY" },
  { title: "Wake Me Up", artist: "Avicii", language: "English", videoId: "IcrbM1l_BoI" },
  { title: "Cheap Thrills", artist: "Sia", language: "English", videoId: "nYh-n7EOtMA" },
  { title: "Unstoppable", artist: "Sia", language: "English", videoId: "YaEG2aWJnZ8" },
  { title: "Dusk Till Dawn", artist: "ZAYN, Sia", language: "English", videoId: "tt2k8PGm-TI" },
  { title: "Love Yourself", artist: "Justin Bieber", language: "English", videoId: "oyEuk8j8imI" },
  { title: "Sorry", artist: "Justin Bieber", language: "English", videoId: "fRh_vgS2dFE" },
  { title: "Stay", artist: "The Kid LAROI, Justin Bieber", language: "English", videoId: "kTJczUoc26U" },
  { title: "Blinding Lights", artist: "The Weeknd", language: "English", videoId: "4NRXx6U8ABQ" },
  { title: "Save Your Tears", artist: "The Weeknd", language: "English", videoId: "XXYlFuWEuKI" },
  { title: "Closer", artist: "The Chainsmokers, Halsey", language: "English", videoId: "PT2_F-1esPk" },
  { title: "Something Just Like This", artist: "The Chainsmokers, Coldplay", language: "English", videoId: "FM7MFYoylVs" },
  { title: "Photograph", artist: "Ed Sheeran", language: "English", videoId: "nSDgHBxUbVQ" },
  { title: "Thinking Out Loud", artist: "Ed Sheeran", language: "English", videoId: "lp-EO5I60KA" },
  { title: "Dandelions", artist: "Ruth B.", language: "English", videoId: "W8a4sUabCUo" },
  { title: "Night Changes", artist: "One Direction", language: "English", videoId: "syFZfO_wfMQ" },
  { title: "Story of My Life", artist: "One Direction", language: "English", videoId: "W-TE_Ys4iwM" },
  { title: "Perfect", artist: "One Direction", language: "English", videoId: "Ho32Oh6b4jc" },
  { title: "Kesariya", artist: "Arijit Singh", language: "Hindi", videoId: "BddP6PYo2gs" },
  { title: "Tum Hi Ho", artist: "Arijit Singh", language: "Hindi", videoId: "Umqb9KENgmk" },
  { title: "Apna Bana Le", artist: "Arijit Singh", language: "Hindi", videoId: "ElZfdU54Cp8" },
  { title: "Samajavaragamana", artist: "Sid Sriram", language: "Telugu", videoId: "2Vv-BfVoq4g" },
  { title: "Inkem Inkem Inkem Kaavaale", artist: "Sid Sriram", language: "Telugu", videoId: "bFfG5d3Xz5w" },
  { title: "Vachindamma", artist: "Sid Sriram", language: "Telugu", videoId: "V1Pl8CzNzCw" },
  { title: "Ramuloo Ramulaa", artist: "Anurag Kulkarni, Mangli", language: "Telugu", videoId: "wIyKZc4f6xE" },
  { title: "ButtaBomma", artist: "Armaan Malik", language: "Telugu", videoId: "2mDCVzRUHmk" },
  { title: "Srivalli", artist: "Sid Sriram", language: "Telugu", videoId: "m4U232MuTG4" },
  { title: "Oo Antava Oo Oo Antava", artist: "Indravathi Chauhan", language: "Telugu", videoId: "1n1Yg4uQy7Q" },
  { title: "Mind Block", artist: "Blaaze, Ranina Reddy", language: "Telugu", videoId: "qTE453yc1rc" },
  { title: "Nee Kannu Neeli Samudram", artist: "Javed Ali", language: "Telugu", videoId: "RXUPCUUk1oE" },
  { title: "Inthandham", artist: "Vishal Chandrashekhar", language: "Telugu", videoId: "Fz7x0YJf0wY" },
  { title: "Naatu Naatu", artist: "Rahul Sipligunj, Kaala Bhairava", language: "Telugu", videoId: "OsU0CGZoV8E" },
  { title: "Why This Kolaveri Di", artist: "Dhanush", language: "Tamil", videoId: "YR12Z8f1Dh8" }
];

function setTimedLyrics(lyrics) {
  timedLyrics = lyrics;
}

function syncLyricsToPlayback(seconds) {
  if (!timedLyrics.length) return;
  const nextIndex = timedLyrics.reduce((selected, lyric, index) => lyric.time <= seconds ? index : selected, 0);
  const currentLine = practiceLines[lineIndex] || "";
  const lineIncomplete = input.value.length < currentLine.length;
  if (nextIndex > lineIndex && nextIndex < practiceLines.length && lineIncomplete) {
    pausePlaybackForTyping();
    waitingForLine = true;
  }
}

setInterval(() => {
  if (isPlaying) {
    const elapsed = playbackSeconds + (Date.now() - playbackRunStartedAt) / 1000;
    syncLyricsToPlayback(elapsed);
  }
}, 250);

function pausePlaybackForTyping() {
  if (!mediaFrame) return;
  mediaFrame.contentWindow.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "*");
  playbackSeconds += (Date.now() - playbackRunStartedAt) / 1000;
  isPlaying = false;
  document.querySelector("#playButton").textContent = "▶";
  showToast("Paused - finish the line to continue");
}

function resumePlaybackAfterLine() {
  if (!mediaFrame || !waitingForLine) return;
  mediaFrame.contentWindow.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: [] }), "*");
  waitingForLine = false;
  isPlaying = true;
  playbackRunStartedAt = Date.now();
  document.querySelector("#playButton").textContent = "Ⅱ";
}

function parseLrc(contents) {
  const entries = [];
  contents.split(/\r?\n/).forEach(line => {
    const timestamps = [...line.matchAll(/\[(\d+):(\d+(?:\.\d+)?)\]/g)];
    const text = line.replace(/\[(\d+):(\d+(?:\.\d+)?)\]/g, "").trim();
    if (!timestamps.length || !text || /^\w+:.+$/.test(text)) return;
    timestamps.forEach(match => {
      entries.push({
        time: Number(match[1]) * 60 + Number(match[2]),
        text
      });
    });
  });
  return entries.sort((a, b) => a.time - b.time);
}

const teluguConsonants = {
  "క":"k","ఖ":"kh","గ":"g","ఘ":"gh","ఙ":"ng","చ":"ch","ఛ":"chh","జ":"j","ఝ":"jh","ఞ":"ny",
  "ట":"t","ఠ":"th","డ":"d","ఢ":"dh","ణ":"n","త":"t","థ":"th","ద":"d","ధ":"dh","న":"n",
  "ప":"p","ఫ":"ph","బ":"b","భ":"bh","మ":"m","య":"y","ర":"r","ల":"l","వ":"v","శ":"sh",
  "ష":"sh","స":"s","హ":"h","ళ":"l","ఱ":"r"
};
const teluguVowels = {"అ":"a","ఆ":"aa","ఇ":"i","ఈ":"ee","ఉ":"u","ఊ":"oo","ఋ":"ru","ఎ":"e","ఏ":"ae","ఐ":"ai","ఒ":"o","ఓ":"oo","ఔ":"au"};
const teluguSigns = {"ా":"aa","ి":"i","ీ":"ee","ు":"u","ూ":"oo","ృ":"ru","ె":"e","ే":"ae","ై":"ai","ొ":"o","ో":"oo","ౌ":"au","ం":"m","ః":"h"};

function transliterateTelugu(text) {
  if (!/[ఀ-౿]/.test(text)) return text;
  let result = "";
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (teluguConsonants[character]) {
      let syllable = teluguConsonants[character] + "a";
      const next = text[index + 1];
      if (next === "్") {
        syllable = teluguConsonants[character];
        index += 1;
      } else if (teluguSigns[next]) {
        syllable = teluguConsonants[character] + teluguSigns[next];
        index += 1;
      }
      result += syllable;
    } else if (teluguVowels[character]) {
      result += teluguVowels[character];
    } else if (teluguSigns[character]) {
      result += teluguSigns[character];
    } else {
      result += character;
    }
  }
  return result.replace(/\s+/g, " ").trim();
}

function preparePracticeLyrics(lyrics) {
  return lyrics.map(item => ({ ...item, text: transliterateTelugu(item.text) }));
}

async function findLyricsForBuiltInSong(song) {
  const searchUrl = `https://lrclib.net/api/search?track_name=${encodeURIComponent(song.title)}&artist_name=${encodeURIComponent(song.artist)}`;
  const response = await fetch(searchUrl, { headers: { "Lrclib-Client": "typing-practice-local/1.0" } });
  if (!response.ok) throw new Error("Timed lyrics could not be found");
  const matches = await response.json();
  let match = matches.filter(item => item.syncedLyrics).sort((a, b) => b.syncedLyrics.length - a.syncedLyrics.length)[0];
  if (!match) {
    const titleResponse = await fetch(`https://lrclib.net/api/search?track_name=${encodeURIComponent(song.title)}`, { headers: { "Lrclib-Client": "typing-practice-local/1.0" } });
    if (titleResponse.ok) {
      const titleMatches = await titleResponse.json();
      match = titleMatches.filter(item => item.syncedLyrics).sort((a, b) => b.syncedLyrics.length - a.syncedLyrics.length)[0];
    }
  }
  if (!match) throw new Error("Timed lyrics are not available for this song");
  return preparePracticeLyrics(parseLrc(match.syncedLyrics));
}

async function startBuiltInSong(song) {
  songModal.hidden = true;
  showToast(`Loading ${song.title}...`);
  videoScreen.innerHTML = `<iframe title="${song.title}" src="https://www.youtube.com/embed/${song.videoId}?autoplay=1&enablejsapi=1&disablekb=1&origin=${encodeURIComponent(location.origin)}" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  videoScreen.classList.add("embedded");
  mediaFrame = videoScreen.querySelector("iframe");
  isPlaying = true;
  waitingForLine = false;
  typingComplete = false;
  songEnded = false;
  playbackSeconds = 0;
  playbackRunStartedAt = Date.now();
  startedAt = Date.now();
  mediaFrame.addEventListener("load", () => {
    const target = mediaFrame.contentWindow;
    target.postMessage(JSON.stringify({ event: "listening", id: 1 }), "*");
    target.postMessage(JSON.stringify({ event: "command", func: "addEventListener", args: ["onStateChange"] }), "*");
    target.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: [] }), "*");
  }, { once: true });
  try {
    const lyrics = await findLyricsForBuiltInSong(song);
    practiceLines = lyrics.map(item => item.text);
    lineIndex = 0;
    startedAt = 0;
    input.value = "";
    totalCorrect = 0;
    totalTyped = 0;
    practiceStartedAt = Date.now();
    resultModal.hidden = true;
    renderPrompt();
    setTimedLyrics(lyrics);
    selectedSong.textContent = `${song.title} (${lyrics.length} lines)`;
    showToast("Song playing - type with the beat");
    input.focus();
  } catch (error) {
    showToast(error.message);
  }
}

function renderPrompt() {
  const value = input.value;
  const text = transliterateTelugu(practiceLines[lineIndex]);
  practiceLines[lineIndex] = text;
  prompt.innerHTML = [...text].map((character, index) => {
    const typed = value[index];
    const className = typed === undefined ? (index === value.length ? "current" : "untyped") : typed === character ? "typed" : "wrong";
    return `<span class="${className}">${character === " " ? "&nbsp;" : character}</span>`;
  }).join("");
  lineStat.textContent = `${lineIndex + 1}/${practiceLines.length}`;
  const progress = Math.min(value.length / text.length, 1) * 100;
  progressBar.style.width = `${progress}%`;
  const correct = [...value].filter((character, index) => character === text[index]).length;
  accuracyStat.textContent = `${value.length ? Math.round(correct / value.length * 100) : 100}%`;
  const elapsed = startedAt ? (Date.now() - startedAt) / 60000 : 0;
  wpmStat.textContent = elapsed ? Math.max(0, Math.round(correct / 5 / elapsed)) : 0;
}

function nextLine() {
  if (lineIndex < practiceLines.length - 1) {
    lineIndex += 1;
    input.value = "";
    startedAt = 0;
    renderPrompt();
  } else showToast("Practice complete!");
}
function finishPractice() {
  if (!typingComplete) return;
  const elapsedMinutes = Math.max((Date.now() - practiceStartedAt) / 60000, 1 / 60);
  document.querySelector("#resultWpm").textContent = Math.round(totalCorrect / 5 / elapsedMinutes);
  document.querySelector("#resultAccuracy").textContent = `${totalTyped ? Math.round(totalCorrect / totalTyped * 100) : 100}%`;
  document.querySelector("#resultCharacters").textContent = totalTyped;
  document.querySelector("#resultSong").textContent = selectedSong.textContent;
  document.querySelector("#resultTitle").textContent = "Great work!";
  document.querySelector("#resultWait").hidden = true;
  document.querySelector("#resultGrid").hidden = false;
  document.querySelector("#resultSkip").hidden = true;
  isPlaying = false;
  if (mediaFrame && !songEnded) mediaFrame.contentWindow.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "*");
  resultModal.hidden = false;
}
function waitForSongFinish() {
  typingComplete = true;
  document.querySelector("#resultTitle").textContent = "Typing complete!";
  document.querySelector("#resultWait").hidden = false;
  document.querySelector("#resultGrid").hidden = true;
  document.querySelector("#resultSkip").hidden = false;
  resultModal.hidden = false;
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}
input.addEventListener("input", () => {
  if (!startedAt && input.value) startedAt = Date.now();
  renderPrompt();
  const currentText = practiceLines[lineIndex];
  if (input.value.length >= currentText.length) {
    totalTyped += input.value.length;
    totalCorrect += [...input.value].filter((character, index) => character === currentText[index]).length;
    const isFinalLine = lineIndex === practiceLines.length - 1;
    nextLine();
    if (isFinalLine) waitForSongFinish();
    else resumePlaybackAfterLine();
  }
});
input.addEventListener("keydown", event => {
  event.stopPropagation();
});
document.addEventListener("keydown", event => {
  if (document.activeElement === input && event.key.toLowerCase() === "f") {
    event.stopPropagation();
  }
}, true);
document.querySelector("#restartButton").addEventListener("click", () => {
  lineIndex = 0;
  input.value = "";
  waitingForLine = false;
  startedAt = Date.now();
  totalCorrect = 0;
  totalTyped = 0;
  typingComplete = false;
  songEnded = false;
  practiceStartedAt = Date.now();
  resultModal.hidden = true;
  playbackSeconds = 0;
  playbackRunStartedAt = Date.now();
  renderPrompt();
  if (mediaFrame) {
    mediaFrame.contentWindow.postMessage(JSON.stringify({ event: "command", func: "seekTo", args: [0, true] }), "*");
    mediaFrame.contentWindow.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: [] }), "*");
    isPlaying = true;
    document.querySelector("#playButton").textContent = "Ⅱ";
  }
  input.focus();
  showToast("Song restarted");
});
document.querySelector("#playButton").addEventListener("click", () => {
  if (mediaFrame && mediaFrame.src.includes("youtube.com/embed")) {
    mediaFrame.contentWindow.postMessage(JSON.stringify({ event: "command", func: isPlaying ? "pauseVideo" : "playVideo", args: [] }), "*");
    if (isPlaying) {
      playbackSeconds += (Date.now() - playbackRunStartedAt) / 1000;
    } else {
      playbackRunStartedAt = Date.now();
    }
    isPlaying = !isPlaying;
    document.querySelector("#playButton").textContent = isPlaying ? "Ⅱ" : "▶";
    if (isPlaying) {
      if (!startedAt) startedAt = Date.now();
      showToast("Song and lyrics started");
    }
  } else {
    input.focus();
    showToast("Use a YouTube link for synchronized playback");
  }
});
function addSongButton(container, song) {
  const button = document.createElement("button");
  button.className = "built-in-song";
  button.innerHTML = `<strong>${song.title}</strong><small>${song.artist} · ${song.language}</small>`;
  button.addEventListener("click", () => startBuiltInSong(song));
  container.appendChild(button);
}
const songGroups = {
  Telugu: document.querySelector("#teluguSongs"),
  English: document.querySelector("#englishSongs"),
  Other: document.querySelector("#otherSongs")
};
builtInSongs.forEach(song => {
  const group = songGroups[song.language] || songGroups.Other;
  addSongButton(group, song);
});
document.querySelector("#otherSongsSection").hidden = !songGroups.Other.children.length;
document.querySelector("#chooseButton").addEventListener("click", () => { songModal.hidden = false; });
document.querySelector("#closeSongs").addEventListener("click", () => { songModal.hidden = true; });
songModal.addEventListener("click", event => { if (event.target === songModal) songModal.hidden = true; });
document.querySelector("#resultRestart").addEventListener("click", () => {
  resultModal.hidden = true;
  document.querySelector("#restartButton").click();
});
document.querySelector("#resultSkip").addEventListener("click", finishPractice);
document.querySelector("#resultQuit").addEventListener("click", () => {
  resultModal.hidden = true;
  typingComplete = false;
  waitingForLine = false;
  isPlaying = false;
  if (mediaFrame) mediaFrame.contentWindow.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "*");
  practiceLines = lines;
  timedLyrics = [];
  lineIndex = 0;
  input.value = "";
  mediaFrame = null;
  videoScreen.classList.remove("embedded");
  videoScreen.innerHTML = '<div class="play-orb">▶</div><p>Video preview</p><small>Choose a video to start practicing</small>';
  selectedSong.textContent = "No song selected";
  renderPrompt();
  showToast("Practice ended");
});
document.querySelector(".typing-wrap").addEventListener("click", () => input.focus());
window.addEventListener("message", event => {
  if (!mediaFrame || event.source !== mediaFrame.contentWindow) return;
  let message;
  try {
    message = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
  } catch {
    return;
  }
  if (message?.event === "infoDelivery" && message.info?.playerState === 0) {
    songEnded = true;
    isPlaying = false;
    document.querySelector("#playButton").textContent = "▶";
    if (typingComplete) finishPractice();
  }
});
document.querySelector("#fullscreenButton").addEventListener("click", async () => {
  const stage = document.querySelector("#fullscreenStage");
  if (document.fullscreenElement) {
    await document.exitFullscreen();
    return;
  }
  await stage.requestFullscreen();
});
document.addEventListener("fullscreenchange", () => {
  const fullscreenButton = document.querySelector("#fullscreenButton");
  const isFullscreen = document.fullscreenElement === document.querySelector("#fullscreenStage");
  fullscreenButton.textContent = isFullscreen ? "⛶ Small screen" : "⛶ Full screen";
});
renderPrompt();
startBuiltInSong(builtInSongs.find(song => song.title === "Believer"));
