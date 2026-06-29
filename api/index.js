const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// ============================================
// AUTHOR: Rocky Chowdhury
// FCA Rocky Chowdhury Effect API
// ============================================

const AUTHOR = "Rocky Chowdhury";
const API_NAME = "FCA Rocky Chowdhury Effect API";
const VERSION = "1.0.0";
const START_TIME = Date.now();

// ---- Helper: uptime string ----
function getUptime() {
  const uptime = Math.floor((Date.now() - START_TIME) / 1000);
  const days = Math.floor(uptime / (3600 * 24));
  const hours = Math.floor((uptime % (3600 * 24)) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = uptime % 60;
  return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
}

// ---- Helper: ping ----
function getPing(req) {
  const start = req._startTime || Date.now();
  return Date.now() - start;
}

// ---- Middleware: track request start ----
app.use((req, res, next) => {
  req._startTime = Date.now();
  next();
});

// ============================================
// ROOT - Beautiful HTML Dashboard
// ============================================
app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>FCA Rocky Chowdhury Effect API</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background: #0a0a0a;
      color: #fff;
      font-family: 'Rajdhani', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* Animated fire background */
    body::before {
      content: '';
      position: fixed;
      bottom: 0; left: 0; right: 0;
      height: 200px;
      background: linear-gradient(to top, #ff4400aa, #ff880055, transparent);
      animation: fireFlicker 1.5s ease-in-out infinite alternate;
      z-index: 0;
      pointer-events: none;
    }

    @keyframes fireFlicker {
      0%   { opacity: 0.6; transform: scaleY(1); }
      50%  { opacity: 1;   transform: scaleY(1.08); }
      100% { opacity: 0.7; transform: scaleY(0.95); }
    }

    .particles {
      position: fixed;
      width: 100%; height: 100%;
      top: 0; left: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }

    .particle {
      position: absolute;
      bottom: -20px;
      width: 6px; height: 6px;
      border-radius: 50%;
      animation: rise linear infinite;
      opacity: 0;
    }

    @keyframes rise {
      0%   { bottom: -20px; opacity: 1; transform: translateX(0) scale(1); }
      80%  { opacity: 0.6; }
      100% { bottom: 100vh; opacity: 0; transform: translateX(var(--drift)) scale(0.3); }
    }

    .container {
      position: relative;
      z-index: 1;
      max-width: 900px;
      margin: 0 auto;
      padding: 30px 20px 100px;
    }

    /* Header */
    .header {
      text-align: center;
      margin-bottom: 40px;
    }

    .fire-ring {
      display: inline-block;
      font-size: 60px;
      animation: spin 3s linear infinite;
      filter: drop-shadow(0 0 20px #ff6600);
    }

    @keyframes spin {
      0%   { transform: rotate(0deg) scale(1); }
      50%  { transform: rotate(180deg) scale(1.1); }
      100% { transform: rotate(360deg) scale(1); }
    }

    .title {
      font-family: 'Orbitron', monospace;
      font-size: clamp(20px, 5vw, 38px);
      font-weight: 900;
      background: linear-gradient(90deg, #ff4400, #ff8800, #ffcc00, #ff8800, #ff4400);
      background-size: 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 2s linear infinite;
      margin: 15px 0 5px;
    }

    @keyframes shimmer {
      0%   { background-position: 0%; }
      100% { background-position: 200%; }
    }

    .subtitle {
      color: #ff8800aa;
      font-size: 16px;
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    /* Status bar */
    .status-bar {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
      margin: 30px 0;
    }

    .status-item {
      background: linear-gradient(135deg, #1a0a00, #2a1000);
      border: 1px solid #ff440044;
      border-radius: 12px;
      padding: 15px 25px;
      text-align: center;
      box-shadow: 0 0 20px #ff440022;
      min-width: 130px;
    }

    .status-label {
      font-size: 12px;
      color: #ff8800aa;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .status-value {
      font-family: 'Orbitron', monospace;
      font-size: 18px;
      font-weight: 700;
      color: #ffcc00;
      margin-top: 5px;
    }

    .online-dot {
      display: inline-block;
      width: 10px; height: 10px;
      background: #00ff88;
      border-radius: 50%;
      animation: blink 1s ease-in-out infinite;
      margin-right: 6px;
      box-shadow: 0 0 8px #00ff88;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.3; }
    }

    /* Section title */
    .section-title {
      font-family: 'Orbitron', monospace;
      font-size: 16px;
      color: #ff6600;
      text-transform: uppercase;
      letter-spacing: 3px;
      margin: 35px 0 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ff440033;
    }

    /* Endpoint cards */
    .endpoints {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .endpoint-card {
      background: linear-gradient(135deg, #110500, #1a0800);
      border: 1px solid #ff440033;
      border-left: 4px solid #ff6600;
      border-radius: 10px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 15px;
      flex-wrap: wrap;
      transition: all 0.3s ease;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
    }

    .endpoint-card:hover {
      border-left-color: #ffcc00;
      box-shadow: 0 0 25px #ff440033;
      transform: translateX(5px);
    }

    .method-badge {
      font-family: 'Orbitron', monospace;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      background: #ff440033;
      color: #ff8800;
      border: 1px solid #ff440055;
      min-width: 50px;
      text-align: center;
    }

    .endpoint-path {
      font-family: monospace;
      font-size: 15px;
      color: #ffcc00;
      flex: 1;
    }

    .endpoint-desc {
      font-size: 13px;
      color: #ff8800aa;
    }

    .effect-badge {
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 20px;
      background: #ff22001a;
      border: 1px solid #ff440044;
      color: #ff6644;
    }

    /* Footer */
    .footer {
      text-align: center;
      margin-top: 50px;
      padding: 20px;
      color: #ff440055;
      font-size: 13px;
      letter-spacing: 2px;
    }

    .footer span {
      color: #ff6600;
    }

    /* Live clock */
    #clock {
      font-family: 'Orbitron', monospace;
      font-size: 13px;
      color: #ff8800;
      text-align: center;
      margin-top: 10px;
      letter-spacing: 2px;
    }
  </style>
</head>
<body>

<div class="particles" id="particles"></div>

<div class="container">

  <div class="header">
    <div class="fire-ring">🔥</div>
    <div class="title">FCA ROCKY CHOWDHURY</div>
    <div class="subtitle">⚡ Effect API · v${VERSION} ⚡</div>
    <div id="clock"></div>
  </div>

  <div class="status-bar">
    <div class="status-item">
      <div class="status-label">Status</div>
      <div class="status-value"><span class="online-dot"></span>ONLINE</div>
    </div>
    <div class="status-item">
      <div class="status-label">Uptime</div>
      <div class="status-value" id="uptime">${getUptime()}</div>
    </div>
    <div class="status-item">
      <div class="status-label">Author</div>
      <div class="status-value">Rocky</div>
    </div>
    <div class="status-item">
      <div class="status-label">Version</div>
      <div class="status-value">${VERSION}</div>
    </div>
  </div>

  <div class="section-title">🔥 All Endpoints</div>

  <div class="endpoints">

    <a class="endpoint-card" href="/fire" target="_blank">
      <span class="method-badge">GET</span>
      <span class="endpoint-path">/fire</span>
      <span class="effect-badge">🔥 Fire</span>
      <span class="endpoint-desc">Fire effect text animation</span>
    </a>

    <a class="endpoint-card" href="/lightning" target="_blank">
      <span class="method-badge">GET</span>
      <span class="endpoint-path">/lightning</span>
      <span class="effect-badge">⚡ Lightning</span>
      <span class="endpoint-desc">Lightning electric effect</span>
    </a>

    <a class="endpoint-card" href="/flower" target="_blank">
      <span class="method-badge">GET</span>
      <span class="endpoint-path">/flower</span>
      <span class="effect-badge">🌸 Flower</span>
      <span class="endpoint-desc">Flower confetti effect</span>
    </a>

    <a class="endpoint-card" href="/galaxy" target="_blank">
      <span class="method-badge">GET</span>
      <span class="endpoint-path">/galaxy</span>
      <span class="effect-badge">💫 Galaxy</span>
      <span class="endpoint-desc">Galaxy star effect</span>
    </a>

    <a class="endpoint-card" href="/uptime" target="_blank">
      <span class="method-badge">GET</span>
      <span class="endpoint-path">/uptime</span>
      <span class="effect-badge">🕐 Status</span>
      <span class="endpoint-desc">Bot uptime & ping status</span>
    </a>

    <a class="endpoint-card" href="/all" target="_blank">
      <span class="method-badge">GET</span>
      <span class="endpoint-path">/all</span>
      <span class="effect-badge">✨ All</span>
      <span class="endpoint-desc">All effects combined</span>
    </a>

    <a class="endpoint-card" href="/effect?type=fire&text=Hello" target="_blank">
      <span class="method-badge">GET</span>
      <span class="endpoint-path">/effect?type=fire&amp;text=Hello</span>
      <span class="effect-badge">🎯 Custom</span>
      <span class="endpoint-desc">Custom text with any effect</span>
    </a>

  </div>

  <div class="footer">
    🔥 Powered by <span>FCA Rocky Chowdhury</span> · Made with ❤️
  </div>

</div>

<script>
  // Fire particles
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

  // Clock
  function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent =
      now.toLocaleTimeString('en-US', { hour12: false }) + ' · ' +
      now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Uptime
  let startMs = Date.now();
  setInterval(() => {
    const up = Math.floor((Date.now() - startMs) / 1000);
    const d = Math.floor(up / 86400);
    const h = Math.floor((up % 86400) / 3600);
    const m = Math.floor((up % 3600) / 60);
    const s = up % 60;
    document.getElementById('uptime').textContent = d + 'd ' + h + 'h ' + m + 'm ' + s + 's';
  }, 1000);
</script>
</body>
</html>`);
});

// ============================================
// /uptime - Bot status JSON
// ============================================
app.get("/uptime", (req, res) => {
  const ping = Date.now() - req._startTime;
  res.json({
    status: "online",
    author: AUTHOR,
    api: API_NAME,
    uptime: getUptime(),
    ping: ping + "ms",
    version: VERSION,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// /fire - Fire effect frames
// ============================================
app.get("/fire", (req, res) => {
  const text = req.query.text || "FCA Rocky Chowdhury";
  const frames = [
    "\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\n\uD83D\uDD25  " + text + "  \uD83D\uDD25\n\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25",
    "\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B\n\uD83D\uDD25  " + text + "  \uD83D\uDD25\n\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B",
    "\uD83D\uDCA5\uD83D\uDD25\uD83D\uDCA5\uD83D\uDD25\uD83D\uDCA5\uD83D\uDD25\uD83D\uDCA5\uD83D\uDD25\uD83D\uDCA5\uD83D\uDD25\uD83D\uDCA5\n\uD83D\uDD25  " + text + "  \uD83D\uDD25\n\uD83D\uDCA5\uD83D\uDD25\uD83D\uDCA5\uD83D\uDD25\uD83D\uDCA5\uD83D\uDD25\uD83D\uDCA5\uD83D\uDD25\uD83D\uDCA5\uD83D\uDD25\uD83D\uDCA5"
  ];
  res.json({ effect: "fire", frames, author: AUTHOR });
});

// ============================================
// /lightning - Lightning effect frames
// ============================================
app.get("/lightning", (req, res) => {
  const text = req.query.text || "FCA Rocky Chowdhury";
  const frames = [
    "\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\n\u26A1  " + text + "  \u26A1\n\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1",
    "\uD83D\uDD35\u26A1\uD83D\uDD35\u26A1\uD83D\uDD35\u26A1\uD83D\uDD35\u26A1\uD83D\uDD35\u26A1\uD83D\uDD35\n\u26A1  " + text + "  \u26A1\n\uD83D\uDD35\u26A1\uD83D\uDD35\u26A1\uD83D\uDD35\u26A1\uD83D\uDD35\u26A1\uD83D\uDD35\u26A1\uD83D\uDD35",
    "\u2604\uFE0F\u26A1\u2604\uFE0F\u26A1\u2604\uFE0F\u26A1\u2604\uFE0F\u26A1\u2604\uFE0F\u26A1\u2604\uFE0F\n\u26A1  " + text + "  \u26A1\n\u2604\uFE0F\u26A1\u2604\uFE0F\u26A1\u2604\uFE0F\u26A1\u2604\uFE0F\u26A1\u2604\uFE0F\u26A1\u2604\uFE0F"
  ];
  res.json({ effect: "lightning", frames, author: AUTHOR });
});

// ============================================
// /flower - Flower effect frames
// ============================================
app.get("/flower", (req, res) => {
  const text = req.query.text || "FCA Rocky Chowdhury";
  const frames = [
    "\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\n\uD83C\uDF38  " + text + "  \uD83C\uDF38\n\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38",
    "\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37\n\uD83C\uDF38  " + text + "  \uD83C\uDF38\n\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37",
    "\uD83C\uDF39\uD83C\uDF37\uD83C\uDF39\uD83C\uDF37\uD83C\uDF39\uD83C\uDF37\uD83C\uDF39\uD83C\uDF37\uD83C\uDF39\uD83C\uDF37\uD83C\uDF39\n\uD83C\uDF38  " + text + "  \uD83C\uDF38\n\uD83C\uDF39\uD83C\uDF37\uD83C\uDF39\uD83C\uDF37\uD83C\uDF39\uD83C\uDF37\uD83C\uDF39\uD83C\uDF37\uD83C\uDF39\uD83C\uDF37\uD83C\uDF39"
  ];
  res.json({ effect: "flower", frames, author: AUTHOR });
});

// ============================================
// /galaxy - Galaxy effect frames
// ============================================
app.get("/galaxy", (req, res) => {
  const text = req.query.text || "FCA Rocky Chowdhury";
  const frames = [
    "\uD83D\uDCAB\u2728\uD83D\uDCAB\u2728\uD83D\uDCAB\u2728\uD83D\uDCAB\u2728\uD83D\uDCAB\u2728\uD83D\uDCAB\n\u2728  " + text + "  \u2728\n\uD83D\uDCAB\u2728\uD83D\uDCAB\u2728\uD83D\uDCAB\u2728\uD83D\uDCAB\u2728\uD83D\uDCAB\u2728\uD83D\uDCAB",
    "\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C\n\uD83D\uDCAB  " + text + "  \uD83D\uDCAB\n\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C",
    "\u2B50\uD83C\uDF0C\u2B50\uD83C\uDF0C\u2B50\uD83C\uDF0C\u2B50\uD83C\uDF0C\u2B50\uD83C\uDF0C\u2B50\n\u2728  " + text + "  \u2728\n\u2B50\uD83C\uDF0C\u2B50\uD83C\uDF0C\u2B50\uD83C\uDF0C\u2B50\uD83C\uDF0C\u2B50\uD83C\uDF0C\u2B50"
  ];
  res.json({ effect: "galaxy", frames, author: AUTHOR });
});

// ============================================
// /all - All effects combined
// ============================================
app.get("/all", (req, res) => {
  const text = req.query.text || "FCA Rocky Chowdhury";
  res.json({
    author: AUTHOR,
    api: API_NAME,
    uptime: getUptime(),
    effects: {
      fire: {
        frames: [
          "\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\n\uD83D\uDD25  " + text + "  \uD83D\uDD25\n\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25",
          "\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B\n\uD83D\uDD25  " + text + "  \uD83D\uDD25\n\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B\uD83D\uDD25\uD83C\uDF0B"
        ]
      },
      lightning: {
        frames: [
          "\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\n\u26A1  " + text + "  \u26A1\n\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1\u26A1",
          "\u2604\uFE0F\u26A1\u2604\uFE0F\u26A1\u2604\uFE0F\u26A1\u2604\uFE0F\u26A1\u2604\uFE0F\u26A1\u2604\uFE0F\n\u26A1  " + text + "  \u26A1\n\u2604\uFE0F\u26A1\u2604\uFE0F\u26A1\u2604\uFE0F\u26A1\u2604\uFE0F\u26A1\u2604\uFE0F\u26A1\u2604\uFE0F"
        ]
      },
      flower: {
        frames: [
          "\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\n\uD83C\uDF38  " + text + "  \uD83C\uDF38\n\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38\uD83C\uDF38",
          "\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37\n\uD83C\uDF38  " + text + "  \uD83C\uDF38\n\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37\uD83C\uDF38\uD83C\uDF37"
        ]
      },
      galaxy: {
        frames: [
          "\uD83D\uDCAB\u2728\uD83D\uDCAB\u2728\uD83D\uDCAB\u2728\uD83D\uDCAB\u2728\uD83D\uDCAB\u2728\uD83D\uDCAB\n\u2728  " + text + "  \u2728\n\uD83D\uDCAB\u2728\uD83D\uDCAB\u2728\uD83D\uDCAB\u2728\uD83D\uDCAB\u2728\uD83D\uDCAB\u2728\uD83D\uDCAB",
          "\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C\n\uD83D\uDCAB  " + text + "  \uD83D\uDCAB\n\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C\uD83D\uDCAB\uD83C\uDF0C"
        ]
      }
    }
  });
});

// ============================================
// /effect?type=fire&text=Hello - Custom effect
// ============================================
app.get("/effect", (req, res) => {
  const type = req.query.type || "fire";
  const text = req.query.text || "FCA Rocky Chowdhury";
  const effectMap = {
    fire: ["\uD83D\uDD25", "\uD83C\uDF0B", "\uD83D\uDCA5"],
    lightning: ["\u26A1", "\uD83D\uDD35", "\u2604\uFE0F"],
    flower: ["\uD83C\uDF38", "\uD83C\uDF37", "\uD83C\uDF39"],
    galaxy: ["\uD83D\uDCAB", "\u2728", "\uD83C\uDF0C"]
  };
  const emojis = effectMap[type] || effectMap.fire;
  const frames = emojis.map(e =>
    e.repeat(11) + "\n" + e + "  " + text + "  " + e + "\n" + e.repeat(11)
  );
  res.json({ effect: type, text, frames, author: AUTHOR });
});

// ============================================
// 404 handler
// ============================================
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    author: AUTHOR,
    available: ["/", "/uptime", "/fire", "/lightning", "/flower", "/galaxy", "/all", "/effect?type=fire&text=Hello"]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("FCA Rocky Chowdhury Effect API running on port " + PORT);
});

module.exports = app;
