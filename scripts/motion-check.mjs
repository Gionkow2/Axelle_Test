// Scrolls the whole page and reports every scene's --sp/--sc plus screenshots.
import puppeteer from "puppeteer-core";
import { mkdirSync } from "fs";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.argv[2] || "http://localhost:3005";
const W = Number(process.argv[3] || 1440);
const REDUCE = process.argv[4] === "reduce";
const DIR = `screenshots/motion-${W}${REDUCE ? "-reduce" : ""}`;
mkdirSync(DIR, { recursive: true });

const b = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--hide-scrollbars"] });
const p = await b.newPage();
if (REDUCE) await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await p.setViewport({ width: W, height: 900 });
const errs = [];
p.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
p.on("pageerror", e => errs.push("pageerror: " + e.message));
await p.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 400));

const total = await p.evaluate(() => document.body.scrollHeight);
console.log(`viewport ${W}  page ${total}px  scenes:`,
  await p.evaluate(() => document.querySelectorAll("[data-scene]").length));

const steps = 12;
for (let i = 0; i <= steps; i++) {
  const y = Math.round((i / steps) * (total - 900));
  await p.evaluate(v => window.scrollTo(0, v), y);
  await new Promise(r => setTimeout(r, 520));
  const info = await p.evaluate(() => {
    const out = [];
    document.querySelectorAll("[data-scene]").forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const cs = getComputedStyle(el);
      const name = el.id || el.className.split(" ")[0] || el.tagName.toLowerCase();
      out.push(`${name}:sp=${(+cs.getPropertyValue("--sp")).toFixed(2)},sc=${(+cs.getPropertyValue("--sc")).toFixed(2)}`);
    });
    return { out, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth };
  });
  console.log(`  ${String(i * (100 / steps) | 0).padStart(3)}%  y=${String(y).padStart(6)}  ovf=${info.overflow}  ${info.out.join("  ")}`);
  await p.screenshot({ path: `${DIR}/s${String(i).padStart(2, "0")}.png` });
}
console.log("console errors:", errs.length, errs.slice(0, 5));
await b.close();
