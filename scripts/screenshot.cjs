const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const sites = [
  { name: 'imzaqi-store', url: 'https://imzaqi.store' },
  { name: 'pentagon-kontraktor', url: 'https://pentagonkontraktor.netlify.app' },
  { name: 'cidika-travel', url: 'https://cidikatravel.com' },
  { name: 'nutri-bunga', url: 'https://nutribunga.netlify.app' },
  { name: 'jamu-sugih-waras', url: 'https://jamu-sugih-waras.netlify.app' },
  { name: 'jakora', url: 'https://jakora.netlify.app' },
];

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'portfolio');
const VIEWPORT = { width: 1280, height: 800 };

async function screenshot(browser, site) {
  const page = await browser.newPage();
  try {
    await page.setViewport(VIEWPORT);
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log(`  -> Membuka ${site.url}...`);
    await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Scroll ke atas + tunggu hero background / lazy images
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 6000));
    await page.evaluate(async () => {
      const imgs = Array.from(document.images);
      await Promise.all(
        imgs.map((img) => {
          if (img.complete && img.naturalWidth > 0) return Promise.resolve();
          return new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
            setTimeout(resolve, 4000);
          });
        })
      );
    });
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 500));

    const outPath = path.join(OUTPUT_DIR, `${site.name}.png`);
    await page.screenshot({ path: outPath, type: 'png', clip: { x: 0, y: 0, width: 1280, height: 800 } });

    const size = Math.round(fs.statSync(outPath).size / 1024);
    console.log(`  OK: ${site.name}.png (${size} KB)`);
  } catch (err) {
    console.error(`  GAGAL: ${site.name} - ${err.message}`);
  } finally {
    await page.close();
  }
}

async function main() {
  console.log('Memulai screenshot portofolio...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  for (const site of sites) {
    console.log(`[${site.name}]`);
    await screenshot(browser, site);
  }

  await browser.close();
  console.log('\nSelesai! Screenshot tersimpan di public/portfolio/');
}

main().catch(err => {
  console.error('Error fatal:', err.message);
  process.exit(1);
});
