/**
 * Render IG feed posts (1080×1350) from scripts/ig-posts.html
 * Output: public/marketing/ig-posts/
 */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const HTML = path.join(__dirname, 'ig-posts.html');
const OUT = path.join(__dirname, '..', 'public', 'marketing', 'ig-posts');
const W = 1080;
const H = 1350;

async function main() {
  if (!fs.existsSync(HTML)) {
    console.error('Missing scripts/ig-posts.html');
    process.exit(1);
  }
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

  // Wait fonts + images
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await new Promise((r) => setTimeout(r, 1500));

  const posts = await page.$$('.post');
  console.log(`Found ${posts.length} posts`);

  for (let i = 0; i < posts.length; i++) {
    const el = posts[i];
    const file = await el.evaluate((node) => node.getAttribute('data-file') || `post-${i + 1}.jpg`);
    const outPath = path.join(OUT, file);
    await el.screenshot({
      path: outPath,
      type: 'jpeg',
      quality: 92,
    });
    const kb = Math.round(fs.statSync(outPath).size / 1024);
    console.log(`  OK ${file} (${kb} KB)`);
  }

  // Also write numbered 1.jpg–10.jpg for easy reference
  const files = fs.readdirSync(OUT).filter((f) => /^\d{2}-/.test(f)).sort();
  files.forEach((f, idx) => {
    const n = String(idx + 1);
    fs.copyFileSync(path.join(OUT, f), path.join(OUT, `${n}.jpg`));
  });

  await browser.close();
  console.log('\nSelesai → public/marketing/ig-posts/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
