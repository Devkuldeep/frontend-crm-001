import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";

const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const outputDir = path.resolve("public", "videos");
const outputName = process.env.VIDEO_NAME || "site-scroll.webm";
const pages = [
  // Marketing pages
  { path: "/", name: "marketing-home" },
  { path: "/about", name: "marketing-about" },
  { path: "/pricing", name: "marketing-pricing" },
  { path: "/contact", name: "marketing-contact" },

  // Auth pages
  { path: "/login", name: "auth-login" },
  { path: "/register", name: "auth-register" },
  { path: "/forgot-password", name: "auth-forgot-password" },
  { path: "/reset-password", name: "auth-reset-password" },

  // Dashboard pages
  { path: "/dashboard", name: "dashboard-home" },
  { path: "/analytics", name: "dashboard-analytics" },
  { path: "/campaigns", name: "dashboard-campaigns" },
  { path: "/inbox", name: "dashboard-inbox" },
  { path: "/leads", name: "dashboard-leads" },
  { path: "/settings", name: "dashboard-settings" },
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  recordVideo: {
    dir: outputDir,
    size: { width: 1280, height: 720 },
  },
});
const page = await context.newPage();

for (const pageDef of pages) {
  const url = `${baseUrl}${pageDef.path}`;
  console.log(`Navigating to ${url}`);
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.style.scrollBehavior = "smooth";
  });

  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportHeight = await page.evaluate(() => window.innerHeight);
  const step = 200;
  const delay = 180;

  for (let current = 0; current <= scrollHeight - viewportHeight; current += step) {
    await page.evaluate((position) => window.scrollTo(0, position), current);
    await page.waitForTimeout(delay);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
}

await page.close();
await context.close();
await browser.close();

// Rename the generated video to the requested filename.
const fs = await import("fs/promises");
const generatedVideos = await fs.readdir(outputDir);
const generatedVideo = generatedVideos.find((file) => file.endsWith(".webm") || file.endsWith(".mp4"));
if (!generatedVideo) {
  throw new Error("No video was generated.");
}

const outputPath = path.join(outputDir, outputName);
await fs.rename(path.join(outputDir, generatedVideo), outputPath);
console.log(`Saved video: ${outputPath}`);
