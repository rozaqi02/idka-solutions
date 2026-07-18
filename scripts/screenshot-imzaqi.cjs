const puppeteer = require('puppeteer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, '..', 'public', 'portfolio');
const URL = 'https://imzaqi.store';
const NAME = 'imzaqi-store';
const WAIT_MS = 4000;

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );

  console.log(`Opening ${URL}...`);
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  console.log(`Waiting ${WAIT_MS}ms...`);
  await new Promise((r) => setTimeout(r, WAIT_MS));

  // Dismiss flash-sale / promo modals if present
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
        } catch (_) {
          /* ignore */
        }
      }
    }
    // common close icon buttons
    document.querySelectorAll('[class*="close"], [class*="Close"]').forEach((el) => {
      try {
        el.click();
      } catch (_) {
        /* ignore */
      }
    });
  });
  await new Promise((r) => setTimeout(r, 600));

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
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 400));

  const pngPath = path.join(OUT_DIR, `${NAME}.png`);
  await page.screenshot({
    path: pngPath,
    type: 'png',
    clip: { x: 0, y: 0, width: 1280, height: 800 },
  });
  console.log('PNG', Math.round(fs.statSync(pngPath).size / 1024), 'KB');

  const webpPath = path.join(OUT_DIR, `${NAME}.webp`);
  await sharp(pngPath)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 85, effort: 4 })
    .toFile(webpPath);
  console.log('WebP', Math.round(fs.statSync(webpPath).size / 1024), 'KB');

  await browser.close();
  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
