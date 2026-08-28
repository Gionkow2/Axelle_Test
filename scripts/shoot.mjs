// Visual-check helper: full-page screenshots at 3 widths + river progress frames.
// Usage: node scripts/shoot.mjs [baseUrl]
import puppeteer from "puppeteer-core";
import { mkdirSync } from "fs";

const BASE = process.argv[2] || "http://localhost:3000";
const CHROME =
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = "screenshots";
mkdirSync(OUT, { recursive: true });

const widths = [
  { name: "desktop", w: 1440, h: 900 },
  { name: "tablet", w: 768, h: 1024 },
  { name: "mobile", w: 390, h: 844 },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--hide-scrollbars", "--force-color-profile=srgb"],
});

try {
  for (const { name, w, h } of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: `${OUT}/${name}-full.png`, fullPage: true });
    console.log(`${name}-full.png`);
    await page.close();
  }

  // river progress frames (desktop)
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);

  const geom = await page.evaluate(() => {
    const el = document.querySelector(".journey-ribbon")?.parentElement;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top + scrollY, height: r.height, docH: document.body.scrollHeight };
  });
  if (geom) {
    for (const p of [0, 0.25, 0.5, 0.75, 1]) {
      const VH = 900;
      const y = Math.max(
        0,
        geom.top - VH * 0.8 + p * (geom.height + VH * 0.6),
      );
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await new Promise((r) => setTimeout(r, 700));
      const tag = String(Math.round(p * 100)).padStart(3, "0");
      await page.screenshot({ path: `${OUT}/river-${tag}.png` });
      console.log(`river-${tag}.png`);
    }
  } else {
    console.log("!! .journey-ribbon wrapper not found");
  }
  await page.close();
} finally {
  await browser.close();
}
