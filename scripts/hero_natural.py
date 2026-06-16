"""Hero au naturel : on repart de l'ORIGINAL p04 (aucune recolorisation).
Détourage du fond blanc par remplissage depuis les bords (préserve le t-shirt),
puis export WebP net pour le web."""
from PIL import Image, ImageDraw

SRC = r"d:\portfolioEHOUD\information sur Ehoud\extracted\images\p04_img003.jpeg"
OUT = r"d:\portfolioEHOUD\portfolio-ehoud\src\assets\ehoud-hero.webp"

img = Image.open(SRC).convert("RGB")
w, h = img.size

SENT = (255, 0, 255)
seeds = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
         (w // 2, 0), (0, h // 2), (w - 1, h // 2), (w // 2, h - 1)]
for seed in seeds:
    ImageDraw.floodfill(img, seed, SENT, thresh=40)

rgba = img.convert("RGBA")
px = rgba.load()
for y in range(h):
    for x in range(w):
        r, g, b, _ = px[x, y]
        if (r, g, b) == SENT:
            px[x, y] = (0, 0, 0, 0)

# Réduction nette puis WebP qualité élevée (le visage reste piqué).
nw = 820
nh = int(h * nw / w)
rgba = rgba.resize((nw, nh), Image.LANCZOS)
rgba.save(OUT, "WEBP", quality=88, method=6)
print("ecrit", OUT, rgba.size)
