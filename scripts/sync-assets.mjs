// Runs before `npm run dev` and `npm run build`.
// 0. Résumé preview: renders site-pages/resume.pdf to page images (src/assets/resume/) for the
//    Résumé page, so it shows as a clean "sheet of paper" instead of a browser PDF viewer.
// 1. Privacy: strips EXIF metadata (GPS location, device info) from any photo in projects/ that carries it
//    (phone photos embed your location). Rotation is baked in first so nothing turns sideways.
// 2. Copies files Astro doesn't process (PDFs, MP4s, résumé) into public/files/ so they're served as-is.
//    public/files/ is generated — never edit it by hand.
import { globSync, mkdirSync, copyFileSync, rmSync, existsSync, statSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import sharp from 'sharp';
import { pdf } from 'pdf-to-img';

const OUT = 'public/files';

// --- 1. strip location metadata -------------------------------------------
const images = globSync('projects/**/*.{jpg,jpeg,JPG,JPEG,png,PNG,heic,HEIC}');
let stripped = 0;
for (const file of images) {
  const meta = await sharp(file).metadata();
  if (!meta.exif) continue; // EXIF can hold GPS location, device serials, timestamps
  const tmp = `${file}.tmp`;
  const img = sharp(file).rotate(); // apply EXIF orientation, then drop all metadata
  if (meta.format === 'jpeg') await img.jpeg({ quality: 92, mozjpeg: true }).toFile(tmp);
  else await img.toFile(tmp);
  renameSync(tmp, file);
  stripped++;
  console.log(`[sync-assets] removed EXIF/location metadata: ${file}`);
}

// --- 0. render résumé pages (only when the PDF changed) -------------------
const RESUME = 'site-pages/resume.pdf';
const PAGES_DIR = 'src/assets/resume';
if (existsSync(RESUME)) {
  const first = join(PAGES_DIR, 'page-1.png');
  if (!existsSync(first) || statSync(first).mtimeMs < statSync(RESUME).mtimeMs) {
    rmSync(PAGES_DIR, { recursive: true, force: true });
    mkdirSync(PAGES_DIR, { recursive: true });
    let n = 0;
    for await (const png of await pdf(RESUME, { scale: 3 })) {
      writeFileSync(join(PAGES_DIR, `page-${++n}.png`), png);
    }
    console.log(`[sync-assets] rendered résumé preview: ${n} page(s)`);
  }
}

// --- 2. copy static files -------------------------------------------------
rmSync(OUT, { recursive: true, force: true });
const copies = [
  ...globSync('projects/*/docs/*.pdf'),
  ...globSync('projects/*/media/videos/*.mp4'),
];
for (const src of copies) {
  const dest = join(OUT, src.replace(/^projects\//, '').replace('/media/videos/', '/videos/'));
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  if (statSync(src).size > 95 * 1024 * 1024) {
    console.warn(`[sync-assets] WARNING ${src} is over 95 MB — GitHub rejects files over 100 MB. Compress it or use YouTube.`);
  }
}
if (existsSync('site-pages/resume.pdf')) {
  mkdirSync(OUT, { recursive: true });
  copyFileSync('site-pages/resume.pdf', join(OUT, 'Anne-Jumper-Resume.pdf'));
}
console.log(`[sync-assets] ${copies.length} files copied, ${stripped} photos cleaned`);
