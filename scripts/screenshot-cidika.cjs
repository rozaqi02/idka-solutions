/**
 * Re-screenshot Cidika Travel hero — wait longer for background images.
 */
const puppeteer = require('puppeteer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, '..', 'public', 'portfolio');
const URL = 'https://cidikatravel.com';
const NAME = 'cidika-travel';
const WAIT_MS = 7000; // 4–8s as requested

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log('Launch browser...');
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

  // Scroll top + wait for hero images/fonts/animations
  await page.evaluate(() => window.scrollTo(0, 0));
  console.log(`Waiting ${WAIT_MS}ms for hero background...`);
  await new Promise((r) => setTimeout(r, WAIT_MS));

  // Wait for images to complete loading
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    await Promise.all(
      imgs.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
          setTimeout(resolve, 5000);
        });
      })
    );
    // also try background-image on hero-ish sections
    await new Promise((r) => setTimeout(r, 500));
  });

  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 800));

  const pngPath = path.join(OUT_DIR, `${NAME}.png`);
  await page.screenshot({
    path: pngPath,
    type: 'png',
    clip: { x: 0, y: 0, width: 1280, height: 800 },
  });

  const pngKb = Math.round(fs.statSync(pngPath).size / 1024);
  console.log(`PNG OK: ${pngPath} (${pngKb} KB)`);

  const webpPath = path.join(OUT_DIR, `${NAME}.webp`);
  await sharp(pngPath)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 85, effort: 4 })
    .toFile(webpPath);

  const webpKb = Math.round(fs.statSync(webpPath).size / 1024);
  console.log(`WebP OK: ${webpPath} (${webpKb} KB)`);

  await browser.close();
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
