import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";

const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const outputDir = path.resolve("public", "screenshots");
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
try {
  for (const pageDef of pages) {
    const page = await browser.newPage();
    const url = `${baseUrl}${pageDef.path}`;
    console.log(`Capturing page: ${url}`);

    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    await page.evaluate(async () => {
      const step = 250;
      const delay = 125;
      const height = document.body.scrollHeight - window.innerHeight;
      for (let current = 0; current <= height; current += step) {
        window.scrollTo(0, current);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      window.scrollTo(0, 0);
    });

    const screenshotPath = path.join(outputDir, `${pageDef.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Saved screenshot: ${screenshotPath}`);
    await page.close();
  }
} finally {
  await browser.close();
}
