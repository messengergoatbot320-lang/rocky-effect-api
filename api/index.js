const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

// ============================================
// AUTHOR: Rocky Chowdhury
// Rocky Chowdhury Effect API
// All Messenger Send Effects
// ============================================

const AUTHOR = "Rocky Chowdhury";
const API_NAME = "Rocky Chowdhury Effect API";
const VERSION = "2.0.0";
const BASE_URL = "https://rocky-effect-api.vercel.app";
const START_TIME = Date.now();

function getUptime() {
  const uptime = Math.floor((Date.now() - START_TIME) / 1000);
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = uptime % 60;
  return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
}

app.use((req, res, next) => {
  req._startTime = Date.now();
  next();
});

// ============================================
// EFFECTS DATA — All Messenger Send Effects
// ============================================
const EFFECTS = {
  fire: {
    name: "Fire",
    emoji: "🔥",
    desc: "Fire effect — like Messenger 🔥",
    frames: (text) => [
      "🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n🔥  " + text + "  🔥\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥",
      "🌋🔥🌋🔥🌋🔥🌋🔥🌋🔥🌋\n🔥  " + text + "  🔥\n🌋🔥🌋🔥🌋🔥🌋🔥🌋🔥🌋",
      "💥🔥💥🔥💥🔥💥🔥💥🔥💥\n🔥  " + text + "  🔥\n💥🔥💥🔥💥🔥💥🔥💥🔥💥"
    ]
  },
  love: {
    name: "Love",
    emoji: "❤️",
    desc: "Love hearts effect — like Messenger ❤️",
    frames: (text) => [
      "❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️\n❤️  " + text + "  ❤️\n❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️",
      "💕❤️💕❤️💕❤️💕❤️💕❤️💕\n❤️  " + text + "  ❤️\n💕❤️💕❤️💕❤️💕❤️💕❤️💕",
      "💖💝💖💝💖💝💖💝💖💝💖\n❤️  " + text + "  ❤️\n💖💝💖💝💖💝💖💝💖💝💖"
    ]
  },
  poop: {
    name: "Poop",
    emoji: "💩",
    desc: "Poop emoji effect — like Messenger 💩",
    frames: (text) => [
      "💩💩💩💩💩💩💩💩💩💩💩\n💩  " + text + "  💩\n💩💩💩💩💩💩💩💩💩💩💩",
      "💩✨💩✨💩✨💩✨💩✨💩\n💩  " + text + "  💩\n💩✨💩✨💩✨💩✨💩✨💩",
      "🤎💩🤎💩🤎💩🤎💩🤎💩🤎\n💩  " + text + "  💩\n🤎💩🤎💩🤎💩🤎💩🤎💩🤎"
    ]
  },
  confetti: {
    name: "Confetti",
    emoji: "🎉",
    desc: "Confetti celebration effect — like Messenger 🎉",
    frames: (text) => [
      "🎉🎊🎉🎊🎉🎊🎉🎊🎉🎊🎉\n🎊  " + text + "  🎊\n🎉🎊🎉🎊🎉🎊🎉🎊🎉🎊🎉",
      "✨🎉✨🎉✨🎉✨🎉✨🎉✨\n🎉  " + text + "  🎉\n✨🎉✨🎉✨🎉✨🎉✨🎉✨",
      "🎆🎇🎆🎇🎆🎇🎆🎇🎆🎇🎆\n🎉  " + text + "  🎉\n🎆🎇🎆🎇🎆🎇🎆🎇🎆🎇🎆"
    ]
  },
  lightning: {
    name: "Lightning",
    emoji: "⚡",
    desc: "Lightning electric effect — like Messenger ⚡",
    frames: (text) => [
      "⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡\n⚡  " + text + "  ⚡\n⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡",
      "🔵⚡🔵⚡🔵⚡🔵⚡🔵⚡🔵\n⚡  " + text + "  ⚡\n🔵⚡🔵⚡🔵⚡🔵⚡🔵⚡🔵",
      "🌩️⚡🌩️⚡🌩️⚡🌩️⚡🌩️⚡🌩️\n⚡  " + text + "  ⚡\n🌩️⚡🌩️⚡🌩️⚡🌩️⚡🌩️⚡🌩️"
    ]
  },
  witch: {
    name: "Witch",
    emoji: "👻",
    desc: "Witch & ghost Halloween effect — like Messenger 👻",
    frames: (text) => [
      "👻🦇👻🦇👻🦇👻🦇👻🦇👻\n👻  " + text + "  👻\n👻🦇👻🦇👻🦇👻🦇👻🦇👻",
      "🎃👻🎃👻🎃👻🎃👻🎃👻🎃\n👻  " + text + "  👻\n🎃👻🎃👻🎃👻🎃👻🎃👻🎃",
      "🧙‍♀️👻🧙‍♀️👻🧙‍♀️👻🧙‍♀️👻🧙‍♀️👻🧙‍♀️\n👻  " + text + "  👻\n🧙‍♀️👻🧙‍♀️👻🧙‍♀️👻🧙‍♀️👻🧙‍♀️👻🧙‍♀️"
    ]
  },
  sakura: {
    name: "Sakura (Flower)",
    emoji: "🌸",
    desc: "Sakura cherry blossom effect — like Messenger 🌸",
    frames: (text) => [
      "🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸\n🌸  " + text + "  🌸\n🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸",
      "🌷🌸🌷🌸🌷🌸🌷🌸🌷🌸🌷\n🌸  " + text + "  🌸\n🌷🌸🌷🌸🌷🌸🌷🌸🌷🌸🌷",
      "🌹🌷🌹🌷🌹🌷🌹🌷🌹🌷🌹\n🌸  " + text + "  🌸\n🌹🌷🌹🌷🌹🌷🌹🌷🌹🌷🌹"
    ]
  },
  floating: {
    name: "Floating",
    emoji: "🌊",
    desc: "Floating wave balloon effect — like Messenger 🌊",
    frames: (text) => [
      "🌊🫧🌊🫧🌊🫧🌊🫧🌊🫧🌊\n🌊  " + text + "  🌊\n🌊🫧🌊🫧🌊🫧🌊🫧🌊🫧🌊",
      "🎈🌊🎈🌊🎈🌊🎈🌊🎈🌊🎈\n🌊  " + text + "  🌊\n🎈🌊🎈🌊🎈🌊🎈🌊🎈🌊🎈",
      "💨🎈💨🎈💨🎈💨🎈💨🎈💨\n🌊  " + text + "  🌊\n💨🎈💨🎈💨🎈💨🎈💨🎈💨"
    ]
  },
  butterflies: {
    name: "Butterflies",
    emoji: "🦋",
    desc: "Butterflies flying effect — like Messenger 🦋",
    frames: (text) => [
      "🦋🦋🦋🦋🦋🦋🦋🦋🦋🦋🦋\n🦋  " + text + "  🦋\n🦋🦋🦋🦋🦋🦋🦋🦋🦋🦋🦋",
      "🌺🦋🌺🦋🌺🦋🌺🦋🌺🦋🌺\n🦋  " + text + "  🦋\n🌺🦋🌺🦋🌺🦋🌺🦋🌺🦋🌺",
      "🌸🦋🌸🦋🌸🦋🌸🦋🌸🦋🌸\n🦋  " + text + "  🦋\n🌸🦋🌸🦋🌸🦋🌸🦋🌸🦋🌸"
    ]
  },
  ram: {
    name: "Ram (Goat)",
    emoji: "🐐",
    desc: "Ram goat effect — like Messenger 🐐",
    frames: (text) => [
      "🐐🐐🐐🐐🐐🐐🐐🐐🐐🐐🐐\n🐐  " + text + "  🐐\n🐐🐐🐐🐐🐐🐐🐐🐐🐐🐐🐐",
      "🌿🐐🌿🐐🌿🐐🌿🐐🌿🐐🌿\n🐐  " + text + "  🐐\n🌿🐐🌿🐐🌿🐐🌿🐐🌿🐐🌿",
      "🏔️🐐🏔️🐐🏔️🐐🏔️🐐🏔️🐐🏔️\n🐐  " + text + "  🐐\n🏔️🐐🏔️🐐🏔️🐐🏔️🐐🏔️🐐🏔️"
    ]
  },
  fireworks: {
    name: "Fireworks",
    emoji: "🎆",
    desc: "New Year fireworks effect — like Messenger 🎆",
    frames: (text) => [
      "🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆\n🎆  " + text + "  🎆\n🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆",
      "🎇✨🎇✨🎇✨🎇✨🎇✨🎇\n🎆  " + text + "  🎆\n🎇✨🎇✨🎇✨🎇✨🎇✨🎇",
      "🌟🎆🌟🎆🌟🎆🌟🎆🌟🎆🌟\n🎆  " + text + "  🎆\n🌟🎆🌟🎆🌟🎆🌟🎆🌟🎆🌟"
    ]
  },
  galaxy: {
    name: "Galaxy",
    emoji: "💫",
    desc: "Galaxy stars effect — bonus ✨",
    frames: (text) => [
      "💫✨💫✨💫✨💫✨💫✨💫\n✨  " + text + "  ✨\n💫✨💫✨💫✨💫✨💫✨💫",
      "🌌💫🌌💫🌌💫🌌💫🌌💫🌌\n💫  " + text + "  💫\n🌌💫🌌💫🌌💫🌌💫🌌💫🌌",
      "⭐🌌⭐🌌⭐🌌⭐🌌⭐🌌⭐\n✨  " + text + "  ✨\n⭐🌌⭐🌌⭐🌌⭐🌌⭐🌌⭐"
    ]
  }
};

const EFFECT_KEYS = Object.keys(EFFECTS);

// ============================================
// ROOT — HTML Dashboard
// ============================================
app.get("/", (req, res) => {
  const endpointCards = EFFECT_KEYS.map(key => {
    const e = EFFECTS[key];
    return `
    <a class="endpoint-card" href="/${key}" target="_blank">
      <span class="method-badge">GET</span>
      <span class="effect-icon">${e.emoji}</span>
      <span class="endpoint-path">/${key}</span>
      <span class="endpoint-desc">${e.desc}</span>
    </a>`;
  }).join("\n");

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Rocky Chowdhury Effect API</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0a0a0a; color: #fff; font-family: 'Rajdhani', sans-serif; min-height: 100vh; overflow-x: hidden; }
    body::before { content: ''; position: fixed; bottom: 0; left: 0; right: 0; height: 200px; background: linear-gradient(to top, #ff4400aa, #ff880055, transparent); animation: fireFlicker 1.5s ease-in-out infinite alternate; z-index: 0; pointer-events: none; }
    @keyframes fireFlicker { 0% { opacity:0.6; transform:scaleY(1); } 50% { opacity:1; transform:scaleY(1.08); } 100% { opacity:0.7; transform:scaleY(0.95); } }
    .particles { position:fixed; width:100%; height:100%; top:0; left:0; pointer-events:none; z-index:0; overflow:hidden; }
    .particle { position:absolute; bottom:-20px; width:6px; height:6px; border-radius:50%; animation:rise linear infinite; opacity:0; }
    @keyframes rise { 0% { bottom:-20px; opacity:1; transform:translateX(0) scale(1); } 80% { opacity:0.6; } 100% { bottom:100vh; opacity:0; transform:translateX(var(--drift)) scale(0.3); } }
    .container { position:relative; z-index:1; max-width:900px; margin:0 auto; padding:30px 20px 100px; }
    .header { text-align:center; margin-bottom:40px; }
    .logo-img { width:90px; height:90px; border-radius:50%; object-fit:cover; border:3px solid #ff6600; box-shadow:0 0 25px #ff660099; animation:spin 6s linear infinite; }
    .fire-ring { display:inline-block; font-size:60px; animation:spin 3s linear infinite; filter:drop-shadow(0 0 20px #ff6600); }
    @keyframes spin { 0% { transform:rotate(0deg) scale(1); } 50% { transform:rotate(180deg) scale(1.1); } 100% { transform:rotate(360deg) scale(1); } }
    .title { font-family:'Orbitron',monospace; font-size:clamp(20px,5vw,38px); font-weight:900; background:linear-gradient(90deg,#ff4400,#ff8800,#ffcc00,#ff8800,#ff4400); background-size:200%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 2s linear infinite; margin:15px 0 5px; }
    @keyframes shimmer { 0% { background-position:0%; } 100% { background-position:200%; } }
    .subtitle { color:#ff8800aa; font-size:16px; letter-spacing:3px; text-transform:uppercase; }
    .status-bar { display:flex; justify-content:center; gap:20px; flex-wrap:wrap; margin:30px 0; }
    .status-item { background:linear-gradient(135deg,#1a0a00,#2a1000); border:1px solid #ff440044; border-radius:12px; padding:12px 20px; text-align:center; box-shadow:0 0 20px #ff440022; min-width:120px; }
    .status-label { font-size:11px; color:#ff8800aa; text-transform:uppercase; letter-spacing:2px; }
    .status-value { font-family:'Orbitron',monospace; font-size:16px; font-weight:700; color:#ffcc00; margin-top:4px; }
    .online-dot { display:inline-block; width:10px; height:10px; background:#00ff88; border-radius:50%; animation:blink 1s ease-in-out infinite; margin-right:6px; box-shadow:0 0 8px #00ff88; }
    @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
    .section-title { font-family:'Orbitron',monospace; font-size:15px; color:#ff6600; text-transform:uppercase; letter-spacing:3px; margin:30px 0 15px; padding-bottom:10px; border-bottom:1px solid #ff440033; }
    .endpoints { display:flex; flex-direction:column; gap:10px; }
    .endpoint-card { background:linear-gradient(135deg,#110500,#1a0800); border:1px solid #ff440033; border-left:4px solid #ff6600; border-radius:10px; padding:14px 18px; display:flex; align-items:center; gap:12px; flex-wrap:wrap; transition:all 0.3s ease; cursor:pointer; text-decoration:none; color:inherit; }
    .endpoint-card:hover { border-left-color:#ffcc00; box-shadow:0 0 25px #ff440033; transform:translateX(5px); }
    .method-badge { font-family:'Orbitron',monospace; font-size:10px; font-weight:700; padding:3px 8px; border-radius:6px; background:#ff440033; color:#ff8800; border:1px solid #ff440055; min-width:45px; text-align:center; }
    .effect-icon { font-size:20px; }
    .endpoint-path { font-family:monospace; font-size:14px; color:#ffcc00; flex:1; }
    .endpoint-desc { font-size:12px; color:#ff8800aa; }
    .extra-endpoints { margin-top:20px; }
    .footer { text-align:center; margin-top:50px; padding:20px; color:#ff440055; font-size:13px; letter-spacing:2px; }
    .footer span { color:#ff6600; }
    #clock { font-family:'Orbitron',monospace; font-size:13px; color:#ff8800; text-align:center; margin-top:10px; letter-spacing:2px; }
  </style>
</head>
<body>
<div class="particles" id="particles"></div>
<div class="container">
  <div class="header">
    <img class="logo-img" src="https://i.imgur.com/rT6KV8r.jpeg" alt="Rocky Chowdhury" onerror="this.style.display='none';document.getElementById('fallback-fire').style.display='inline-block'"/>
    <div class="fire-ring" id="fallback-fire" style="display:none">🔥</div>
    <div class="title">ROCKY CHOWDHURY</div>
    <div class="subtitle">⚡ All Messenger Effects API · v${VERSION} ⚡</div>
    <div id="clock"></div>
  </div>
  <div class="status-bar">
    <div class="status-item"><div class="status-label">Status</div><div class="status-value"><span class="online-dot"></span>ONLINE</div></div>
    <div class="status-item"><div class="status-label">Uptime</div><div class="status-value" id="uptime">${getUptime()}</div></div>
    <div class="status-item"><div class="status-label">Effects</div><div class="status-value">${EFFECT_KEYS.length}</div></div>
    <div class="status-item"><div class="status-label">Author</div><div class="status-value">Rocky</div></div>
  </div>
  <div class="section-title">📨 All Messenger Send Effects</div>
  <div class="endpoints">
    ${endpointCards}
  </div>
  <div class="extra-endpoints">
    <div class="section-title">🎯 Extra Endpoints</div>
    <div class="endpoints">
      <a class="endpoint-card" href="/uptime" target="_blank">
        <span class="method-badge">GET</span><span class="effect-icon">🕐</span>
        <span class="endpoint-path">/uptime</span>
        <span class="endpoint-desc">Bot uptime & ping status</span>
      </a>
      <a class="endpoint-card" href="/effects" target="_blank">
        <span class="method-badge">GET</span><span class="effect-icon">📋</span>
        <span class="endpoint-path">/effects</span>
        <span class="endpoint-desc">List all available effects</span>
      </a>
      <a class="endpoint-card" href="/all?text=Hello" target="_blank">
        <span class="method-badge">GET</span><span class="effect-icon">✨</span>
        <span class="endpoint-path">/all?text=Hello</span>
        <span class="endpoint-desc">All effects combined in one response</span>
      </a>
      <a class="endpoint-card" href="/effect?type=fire&text=Hello" target="_blank">
        <span class="method-badge">GET</span><span class="effect-icon">🎯</span>
        <span class="endpoint-path">/effect?type=fire&text=Hello</span>
        <span class="endpoint-desc">Custom effect with any type & text</span>
      </a>
      <a class="endpoint-card" href="/random?text=Hello" target="_blank">
        <span class="method-badge">GET</span><span class="effect-icon">🎲</span>
        <span class="endpoint-path">/random?text=Hello</span>
        <span class="endpoint-desc">Random effect — surprise!</span>
      </a>
    </div>
  </div>
  <div class="footer">🔥 Powered by <span>Rocky Chowdhury</span> · All Messenger Effects · Made with ❤️</div>
</div>
<script>
  const container = document.getElementById('particles');
  const colors = ['#ff2200','#ff4400','#ff6600','#ff8800','#ffaa00','#ffcc00','#ffee44'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.width = p.style.height = (4 + Math.random() * 8) + 'px';
    p.style.setProperty('--drift', (Math.random() * 100 - 50) + 'px');
    p.style.animationDuration = (3 + Math.random() * 5) + 's';
    p.style.animationDelay = (Math.random() * 5) + 's';
    container.appendChild(p);
  }
  function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent =
      now.toLocaleTimeString('en-US', { hour12: false }) + ' · ' +
      now.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric', year:'numeric' });
  }
  setInterval(updateClock, 1000); updateClock();
  let startMs = Date.now();
  setInterval(() => {
    const up = Math.floor((Date.now() - startMs) / 1000);
    const d = Math.floor(up / 86400), h = Math.floor((up % 86400) / 3600),
          m = Math.floor((up % 3600) / 60), s = up % 60;
    document.getElementById('uptime').textContent = d+'d '+h+'h '+m+'m '+s+'s';
  }, 1000);
</script>
</body>
</html>`);
});

// ============================================
// /uptime
// ============================================
app.get("/uptime", (req, res) => {
  const ping = Date.now() - req._startTime;
  res.json({
    status: "online", author: AUTHOR, api: API_NAME,
    uptime: getUptime(), ping: ping + "ms", version: VERSION,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// /effects — list all effects
// ============================================
app.get("/effects", (req, res) => {
  const list = EFFECT_KEYS.map(key => ({
    key,
    name: EFFECTS[key].name,
    emoji: EFFECTS[key].emoji,
    desc: EFFECTS[key].desc,
    endpoint: BASE_URL + "/" + key,
    custom: BASE_URL + "/effect?type=" + key + "&text=YourText"
  }));
  res.json({ author: AUTHOR, version: VERSION, total: EFFECT_KEYS.length, effects: list });
});

// ============================================
// Dynamic routes for each effect
// e.g. /fire, /love, /poop, /confetti ...
// ============================================
EFFECT_KEYS.forEach(key => {
  app.get("/" + key, (req, res) => {
    const text = req.query.text || "Rocky Chowdhury";
    const e = EFFECTS[key];
    res.json({
      effect: key,
      name: e.name,
      emoji: e.emoji,
      text,
      frames: e.frames(text),
      author: AUTHOR
    });
  });
});

// ============================================
// /effect?type=fire&text=Hello — custom effect
// ============================================
app.get("/effect", (req, res) => {
  const type = req.query.type || "fire";
  const text = req.query.text || "Rocky Chowdhury";
  if (!EFFECTS[type]) {
    return res.status(400).json({
      error: "Unknown effect type: " + type,
      available: EFFECT_KEYS,
      author: AUTHOR
    });
  }
  const e = EFFECTS[type];
  res.json({
    effect: type,
    name: e.name,
    emoji: e.emoji,
    text,
    frames: e.frames(text),
    author: AUTHOR
  });
});

// ============================================
// /random?text=Hello — random effect
// ============================================
app.get("/random", (req, res) => {
  const text = req.query.text || "Rocky Chowdhury";
  const randomKey = EFFECT_KEYS[Math.floor(Math.random() * EFFECT_KEYS.length)];
  const e = EFFECTS[randomKey];
  res.json({
    effect: randomKey,
    name: e.name,
    emoji: e.emoji,
    text,
    frames: e.frames(text),
    author: AUTHOR,
    note: "Random effect picked!"
  });
});

// ============================================
// /all?text=Hello — all effects combined
// ============================================
app.get("/all", (req, res) => {
  const text = req.query.text || "Rocky Chowdhury";
  const combined = {};
  EFFECT_KEYS.forEach(key => {
    const e = EFFECTS[key];
    combined[key] = { name: e.name, emoji: e.emoji, frames: e.frames(text) };
  });
  res.json({
    author: AUTHOR,
    api: API_NAME,
    version: VERSION,
    uptime: getUptime(),
    text,
    total: EFFECT_KEYS.length,
    effects: combined
  });
});

// ============================================
// 404
// ============================================
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    author: AUTHOR,
    available: ["/", "/uptime", "/effects", "/all", "/effect?type=fire&text=Hello", "/random", ...EFFECT_KEYS.map(k => "/" + k)]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Rocky Chowdhury Effect API v" + VERSION + " running on port " + PORT);
});

module.exports = app;
