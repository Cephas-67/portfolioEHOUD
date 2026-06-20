// Convertit les 4 photos détourées (PNG transparents) en WebP optimisés
// pour le portfolio. Sortie : src/assets/ avec les noms attendus par le code.
//
// Lancer depuis la racine portfolio-ehoud :
//   node scripts/convert-portraits.mjs

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, "..", "..");

const sourceDir = join(repoRoot, "information sur Ehoud", "photoreecouper");
const outDir = join(repoRoot, "portfolio-ehoud", "src", "assets");

const MAX_LONG_EDGE = 1400;
const QUALITY = 82;

// (fichier source) -> (fichier de sortie attendu par les imports React)
// Le hero du Home doit garder la même empreinte d'affichage que l'ancienne
// photo (820x1799, ratio 0.456). On force ce canevas et on centre le sujet,
// avec du transparent autour → la hauteur rendue à l'écran reste identique.
const HERO_W = 820;
const HERO_H = 1799;
// Empreinte exacte de l'ancien portrait costume (About / PortraitIntro).
const SUIT_W = 712;
const SUIT_H = 826;

const jobs = [
  { src: "edited-photo (9).png",            out: "ehoud-hero.webp",         label: "Home / hero", canvas: { w: HERO_W, h: HERO_H } },
  { src: "envato-labs-image-edit (100).png", out: "ehoud-suit-centered.png", label: "About / suit",  keepPng: true, canvas: { w: SUIT_W, h: SUIT_H } },
  { src: "edited-photo (7).png",            out: "ehoud-laptop.webp",       label: "About / laptop" },
  { src: "edited-photo (8).png",            out: "ehoud-bomber-cut.webp",   label: "About / bomber" },
];

await mkdir(outDir, { recursive: true });

for (const job of jobs) {
  const inPath = join(sourceDir, job.src);
  const outPath = join(outDir, job.out);

  let pipeline = sharp(inPath).rotate();

  if (job.canvas) {
    // Canevas imposé pour matcher l'empreinte d'affichage de l'ancienne photo.
    // 1) trim() retire le transparent autour du sujet (= bounding box réelle).
    // 2) fit:"cover" met le sujet à l'échelle pour REMPLIR (w, h), en croppant
    //    juste ce qu'il faut sur les côtés → même taille visuelle qu'avant.
    pipeline = pipeline
      .trim()
      .resize({ width: job.canvas.w, height: job.canvas.h, fit: "cover", position: "top" });
  } else {
    pipeline = pipeline.resize({
      width: MAX_LONG_EDGE,
      height: MAX_LONG_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  if (job.keepPng) {
    // ehoud-suit-centered reste en PNG (l'import dans About.tsx attend .png).
    // PNG avec palette + compression max, alpha préservé.
    await pipeline.png({ quality: QUALITY, compressionLevel: 9, palette: true }).toFile(outPath);
  } else {
    await pipeline.webp({ quality: QUALITY, alphaQuality: 90, effort: 6 }).toFile(outPath);
  }

  const meta = await sharp(outPath).metadata();
  const sizeKb = (meta.size ?? 0) / 1024;
  console.log(`✓ ${job.label.padEnd(20)} ${job.out.padEnd(28)} ${meta.width}×${meta.height}  ${sizeKb.toFixed(1)} KB`);
}

console.log("\n✅ Portraits convertis.");
