// Extrait TOUTES les frames d'un curseur animé Windows (.ani) et les assemble
// en WebP animé via sharp. Le format .ani est un conteneur RIFF/ACON qui
// empaquette N fichiers .cur + un en-tête anih (durée par défaut en jiffies)
// + un chunk rate optionnel (durée par frame) + un chunk seq optionnel.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ANI_PATH = path.resolve(
  "src/assets/Michael Jackson Moonwalk Animated--cursor--SweezyCursors..ani",
);
const OUT_PATH = path.resolve("src/assets/mj-cursor.png");
const META_PATH = path.resolve("src/assets/mj-cursor.json");

const buf = await readFile(ANI_PATH);
if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "ACON") {
  throw new Error("Pas un fichier .ani RIFF/ACON valide.");
}

// Parcourt les chunks du conteneur racine et collecte ce qu'il nous faut.
function parseChunks(buffer, start, end) {
  const chunks = [];
  let p = start;
  while (p < end) {
    const id = buffer.toString("ascii", p, p + 4);
    const size = buffer.readUInt32LE(p + 4);
    const dataStart = p + 8;
    chunks.push({ id, size, dataStart });
    p = dataStart + size + (size & 1); // alignement octet pair
  }
  return chunks;
}

const root = parseChunks(buf, 12, buf.length);
const anih = root.find((c) => c.id === "anih");
if (!anih) throw new Error("anih introuvable");
const numFrames = buf.readUInt32LE(anih.dataStart + 4);
const defaultRate = buf.readUInt32LE(anih.dataStart + 32); // en jiffies (1/60s)
console.log(`Frames : ${numFrames}, rate défaut : ${defaultRate} jiffies (${Math.round((defaultRate * 1000) / 60)} ms)`);

// Le chunk 'rate' donne la durée de chaque step (en jiffies). Optionnel.
const rateChunk = root.find((c) => c.id === "rate");
const rates = [];
if (rateChunk) {
  const count = rateChunk.size / 4;
  for (let i = 0; i < count; i++) {
    rates.push(buf.readUInt32LE(rateChunk.dataStart + i * 4));
  }
}

// Liste de fram > contient N chunks 'icon', chacun étant un .cur complet.
const list = root.find((c) => c.id === "LIST" && buf.toString("ascii", c.dataStart, c.dataStart + 4) === "fram");
if (!list) throw new Error("LIST/fram introuvable");
const framChunks = parseChunks(buf, list.dataStart + 4, list.dataStart + list.size).filter((c) => c.id === "icon");
console.log(`.cur extraits : ${framChunks.length}`);

// Extrait le payload image d'un .cur. Peut être un PNG (signature 89 50) ou
// un DIB 32 bpp bottom-up à reconstruire manuellement.
async function curToRgba(cur) {
  const imgSize = cur.readUInt32LE(6 + 8);
  const imgOffset = cur.readUInt32LE(6 + 12);
  const imgData = cur.slice(imgOffset, imgOffset + imgSize);

  if (imgData[0] === 0x89 && imgData[1] === 0x50) {
    // PNG embarqué : on demande à sharp de le décoder en RGBA brut.
    const { data, info } = await sharp(imgData).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    return { raw: data, width: info.width, height: info.height };
  }

  const dibHeaderSize = imgData.readUInt32LE(0);
  const w = imgData.readInt32LE(4);
  const h = imgData.readInt32LE(8) / 2;
  const bpp = imgData.readUInt16LE(14);
  if (bpp !== 32) throw new Error(`bpp ${bpp} non géré`);

  const pixelStart = dibHeaderSize;
  const raw = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const srcY = h - 1 - y;
      const src = pixelStart + (srcY * w + x) * 4;
      const dst = (y * w + x) * 4;
      raw[dst] = imgData[src + 2];
      raw[dst + 1] = imgData[src + 1];
      raw[dst + 2] = imgData[src];
      raw[dst + 3] = imgData[src + 3];
    }
  }
  return { raw, width: w, height: h };
}

// Décode toutes les frames.
const frames = await Promise.all(
  framChunks.map(({ dataStart, size }) => curToRgba(buf.slice(dataStart, dataStart + size))),
);
const first = frames[0];
const width = first.width;
const height = first.height;
console.log(`Taille frame : ${width}x${height}`);

// Sprite sheet horizontal : les N frames côte à côte. Le composant React
// cycle via background-position, plus simple et plus perf qu'un WebP animé.
const spriteWidth = width * frames.length;
const sprite = Buffer.alloc(spriteWidth * height * 4);
for (let f = 0; f < frames.length; f++) {
  const src = frames[f].raw;
  for (let y = 0; y < height; y++) {
    const srcRow = y * width * 4;
    const dstRow = y * spriteWidth * 4 + f * width * 4;
    src.copy(sprite, dstRow, srcRow, srcRow + width * 4);
  }
}

const png = await sharp(sprite, { raw: { width: spriteWidth, height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toBuffer();

const delays = frames.map((_, i) => {
  const jiffies = rates[i] ?? defaultRate;
  return Math.max(20, Math.round((jiffies * 1000) / 60));
});

await writeFile(OUT_PATH, png);
await writeFile(
  META_PATH,
  JSON.stringify({ frames: frames.length, frameWidth: width, frameHeight: height, delays }, null, 2),
);
console.log(`Sprite PNG : ${(png.length / 1024).toFixed(1)} kB, ${frames.length}×${width}x${height}`);
console.log(`Délais : ${delays.join(" / ")} ms`);
