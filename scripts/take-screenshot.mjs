import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";

const url = process.env.SCREENSHOT_URL || "http://localhost:3000";
const outputDir = path.resolve("public", "screenshots");
const outputName = process.env.SCREENSHOT_NAME || "homepage.png";
const outputPath = path.join(outputDir, outputName);

async function installChromium() {
  console.log("Chromium not found. Installing Playwright Chromium...");

  if (typeof Bun !== "undefined") {
    const result = Bun.spawnSync(["bunx", "playwright", "install", "chromium"], {
      stdio: "inherit",
    });

    const exitCode = result.exitCode ?? result.status;
    if (exitCode !== 0) {
      throw new Error("Failed to install Playwright Chromium with bunx.");
    }
    return;
  }

  const { spawnSync } = await import("child_process");
  const result = spawnSync("npx", ["playwright", "install", "chromium"], {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    throw new Error("Failed to install Playwright Chromium with npx.");
  }
}

await mkdir(outputDir, { recursive: true });

let browser;
try {
  browser = await chromium.launch();
} catch (error) {
  await installChromium();
  browser = await chromium.launch();
}

const page = await browser.newPage();

console.log(`Navigating to ${url}`);
await page.goto(url, { waitUntil: "networkidle" });

await page.evaluate(async () => {
  await new Promise((resolve) => {
    let totalHeight = 0;
    const distance = 300;
    const timer = setInterval(() => {
      const scrollHeight = document.body.scrollHeight;
      window.scrollBy(0, distance);
      totalHeight += distance;

      if (totalHeight >= scrollHeight) {
        clearInterval(timer);
        resolve();
      }
    }, 100);
  });
});

await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);

await page.screenshot({ path: outputPath, fullPage: true });
await browser.close();

console.log(`Saved screenshot: ${outputPath}`);
