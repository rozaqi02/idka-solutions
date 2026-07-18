const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '..', 'public', 'portfolio');
const OUTPUT_DIR = INPUT_DIR;
const deletePng = process.argv.includes('--delete-png');

const files = fs.readdirSync(INPUT_DIR).filter((f) => f.endsWith('.png'));

if (files.length === 0) {
  console.log('Tidak ada file PNG ditemukan di public/portfolio/');
  process.exit(0);
}

async function compress(file) {
  const inputPath = path.join(INPUT_DIR, file);
  const baseName = path.basename(file, '.png');
  const outputPath = path.join(OUTPUT_DIR, `${baseName}.webp`);

  const beforeSize = Math.round(fs.statSync(inputPath).size / 1024);

  await sharp(inputPath)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(outputPath);

  const afterSize = Math.round(fs.statSync(outputPath).size / 1024);
  const saving = Math.round((1 - afterSize / beforeSize) * 100);

  console.log(`  ${file} -> ${baseName}.webp  |  ${beforeSize} KB -> ${afterSize} KB  (-${saving}%)`);

  if (deletePng) {
    fs.unlinkSync(inputPath);
    console.log(`    (PNG dihapus: ${file})`);
  }
}

async function main() {
  console.log(`Mengompresi ${files.length} gambar ke WebP...`);
  if (!deletePng) {
    console.log('PNG sumber dipertahankan. Gunakan --delete-png untuk menghapus setelah konversi.\n');
  } else {
    console.log('Mode --delete-png aktif: PNG akan dihapus setelah WebP berhasil.\n');
  }

  for (const file of files) {
    try {
      await compress(file);
    } catch (err) {
      console.error(`  GAGAL: ${file} - ${err.message}`);
    }
  }

  console.log('\nSelesai!');
}

main();
