/**
 * Render only post-04 (4.jpg) from ig-posts.html
 */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const HTML = path.join(__dirname, 'ig-posts.html');
const OUT = path.join(__dirname, '..', 'public', 'marketing', 'ig-posts');
const W = 1080;
const H = 1350;

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: W + 80, height: H + 80, deviceScaleFactor: 1 });

  const fileUrl = 'file:///' + HTML.replace(/\\/g, '/');
  console.log('Opening', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 60000 });

  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await new Promise((r) => setTimeout(r, 2000));

  const el = await page.$('#post-04');
  if (!el) {
    console.error('post-04 tidak ditemukan!');
    await browser.close();
    process.exit(1);
  }

  const named = path.join(OUT, '04-harga.jpg');
  const numbered = path.join(OUT, '4.jpg');

  await el.screenshot({ path: named, type: 'jpeg', quality: 92 });
  fs.copyFileSync(named, numbered);

  const kb = Math.round(fs.statSync(numbered).size / 1024);
  console.log(`OK 04-harga.jpg → 4.jpg (${kb} KB)`);

  await browser.close();
  console.log('Selesai → public/marketing/ig-posts/4.jpg');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
