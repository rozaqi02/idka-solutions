/**
 * Retake portfolio screenshots:
 * - imzaqi.store → wait 0.9s after load
 * - pentagonkontraktor → wait 5s after load
 */
const puppeteer = require('puppeteer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, '..', 'public', 'portfolio');

const sites = [
  {
    name: 'imzaqi-store',
    url: 'https://imzaqi.store',
    waitMs: 900,
    dismissModals: true,
  },
  {
    name: 'pentagon-kontraktor',
    url: 'https://pentagonkontraktor.netlify.app',
    waitMs: 5000,
    dismissModals: false,
  },
];

async function dismissModals(page) {
  await page.evaluate(() => {
    const candidates = Array.from(
      document.querySelectorAll('button, [role="button"], a, span, div')
    );
    for (const el of candidates) {
      const t = (el.textContent || '').trim().toLowerCase();
      const aria = (el.getAttribute('aria-label') || '').toLowerCase();
      if (
        t === '×' ||
        t === 'x' ||
        t === 'nanti aja' ||
        t.includes('tutup') ||
        aria.includes('close') ||
        aria.includes('tutup')
      ) {
        try {
          el.click();
        } catch {
          /* ignore */
        }
      }
    }
    document.querySelectorAll('[class*="close"], [class*="Close"]').forEach((el) => {
      try {
        el.click();
      } catch {
        /* ignore */
      }
    });
  });
  await new Promise((r) => setTimeout(r, 400));
}

async function waitImages(page) {
  await page.evaluate(async () => {
    await Promise.all(
      Array.from(document.images).map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
          setTimeout(resolve, 3000);
        });
      })
    );
  });
}

async function shot(browser, site) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    console.log(`[${site.name}] Opening ${site.url}...`);
    await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.evaluate(() => window.scrollTo(0, 0));

    console.log(`[${site.name}] Waiting ${site.waitMs}ms before screenshot...`);
    await new Promise((r) => setTimeout(r, site.waitMs));

    // Dismiss after wait (imzaqi flash-sale modal often appears around load)
    if (site.dismissModals) {
      await dismissModals(page);
    }

    await waitImages(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 200));

    const pngPath = path.join(OUT_DIR, `${site.name}.png`);
    await page.screenshot({
      path: pngPath,
      type: 'png',
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    });
    console.log(`[${site.name}] PNG ${Math.round(fs.statSync(pngPath).size / 1024)} KB`);

    const webpPath = path.join(OUT_DIR, `${site.name}.webp`);
    await sharp(pngPath)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 85, effort: 4 })
      .toFile(webpPath);
    console.log(`[${site.name}] WebP ${Math.round(fs.statSync(webpPath).size / 1024)} KB`);
  } finally {
    await page.close();
  }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  for (const site of sites) {
    await shot(browser, site);
  }

  await browser.close();
  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
