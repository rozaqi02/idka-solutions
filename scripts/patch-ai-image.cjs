const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const IG_DIR = path.join(__dirname, '..', 'public', 'marketing', 'ig-posts');
const SRC_IMG = path.join(IG_DIR, '31-tim-idka-ai.jpg');
const OUT_IMG = path.join(IG_DIR, 'post-hari-ini.jpg');

function fileToDataUri(filePath) {
  const b64 = fs.readFileSync(filePath).toString('base64');
  return `data:image/jpeg;base64,${b64}`;
}

async function main() {
  const bgDataUri = fileToDataUri(SRC_IMG);

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; }
    body { width: 864px; height: 1152px; overflow: hidden; }
    canvas { display: block; width: 864px; height: 1152px; }
  </style>
</head>
<body>
  <canvas id="cv" width="864" height="1152"></canvas>
  <script>
    window.renderDone = false;
    const img = new Image();
    img.src = "${bgDataUri}";
    img.onload = () => {
      const cv = document.getElementById('cv');
      const ctx = cv.getContext('2d');
      ctx.drawImage(img, 0, 0, 864, 1152);

      // Fill area over old "Faiz Abiyu Atha Fawas"
      const grad = ctx.createLinearGradient(480, 0, 840, 0);
      grad.addColorStop(0, '#dfd1f6');
      grad.addColorStop(0.5, '#dacbf4');
      grad.addColorStop(1, '#d5c6f3');

      ctx.fillStyle = grad;
      ctx.fillRect(475, 510, 365, 38);

      // Render "Fa'iz Abiyu Atha Fawas"
      ctx.font = '800 21.5px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.fillStyle = '#170d2b';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("Fa'iz Abiyu Atha Fawas", 657, 529);

      window.renderDone = true;
    };
  </script>
</body>
</html>`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 864, height: 1152 });
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => window.renderDone);
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await new Promise((r) => setTimeout(r, 800));

  await page.screenshot({ path: OUT_IMG, type: 'jpeg', quality: 96 });
  fs.copyFileSync(OUT_IMG, path.join(IG_DIR, '31-tim-idka-ai.jpg'));
  await browser.close();
  console.log('Successfully patched and copied images ->', OUT_IMG);
}

main().catch(console.error);
