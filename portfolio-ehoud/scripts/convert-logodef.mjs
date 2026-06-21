// Extrait l'image PNG embarquée en base64 dans logodef.svg et la convertit en
// webp optimisé. Le SVG d'origine fait 1.8 MB et ralentit le chargement du
// footer sur chaque page.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SVG_PATH = path.resolve("src/assets/logodef.svg");
const OUT_PATH = path.resolve("src/assets/logodef.webp");

const svg = await readFile(SVG_PATH, "utf8");
const match = svg.match(/href="data:image\/(png|jpe?g);base64,([^"]+)"/);
if (!match) {
  console.error("Aucune image base64 trouvée dans le SVG.");
  process.exit(1);
}

const pngBuffer = Buffer.from(match[2], "base64");
console.log(`PNG décodé : ${(pngBuffer.length / 1024).toFixed(1)} kB`);

// Le logo s'affiche au maximum à 640px de large dans le footer.
// On garde une marge x2 pour le retina (1280px) puis webp qualité 82.
const webp = await sharp(pngBuffer)
  .resize({ width: 1280, withoutEnlargement: true })
  .webp({ quality: 82 })
  .toBuffer();

await writeFile(OUT_PATH, webp);
console.log(`webp écrit : ${(webp.length / 1024).toFixed(1)} kB → ${OUT_PATH}`);
