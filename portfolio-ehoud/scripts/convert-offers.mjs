// Conversion ponctuelle des affiches « Offre » (dossier source PDF extrait) en
// webp optimisés pour le web. Lancer une fois : `node scripts/convert-offers.mjs`.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "..", "information sur Ehoud", "extracted", "images");
const OUT = join(root, "src", "assets", "offers");

// source -> nom de sortie sémantique (1 affiche inédite par service).
const jobs = [
  ["p21_img011.jpeg", "offer-identity"], // Le Bleu Créatif 2026 (logotype)
  ["p21_img012.jpeg", "offer-campaign"], // LAUDOS Slam · Heureuse Année 2026
  ["p18_img006.png", "offer-social"], // Boom Events · Booking / Média
  ["p27_img037.jpeg", "offer-print"], // Polo Initiative Kaléidoscope
  ["p22_img017.jpeg", "offer-event"], // COJAS · Assemblée Générale élective
  ["p27_img036.jpeg", "offer-art"], // Journée de la Sage-Femme
];

await mkdir(OUT, { recursive: true });

for (const [src, name] of jobs) {
  const out = join(OUT, `${name}.webp`);
  await sharp(join(SRC, src))
    .resize({ width: 1100, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);
  console.log(`✓ ${name}.webp`);
}

console.log("Terminé.");
