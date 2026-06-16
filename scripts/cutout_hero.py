"""Rend le fond blanc transparent SANS manger le t-shirt blanc.
Astuce : le fond est connecté aux bords de l'image, le t-shirt est une zone
blanche INTÉRIEURE isolée par le corps. On remplit donc depuis les bords."""
from PIL import Image, ImageDraw

SRC = r"d:\portfolioEHOUD\portfolio-ehoud\src\assets\ehoud-hero.png"
OUT = SRC  # on écrase la version web

img = Image.open(SRC).convert("RGB")
w, h = img.size

# Sentinelle = couleur improbable. On remplit le fond connecté aux bords.
SENT = (255, 0, 255)
seeds = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
         (w // 2, 0), (0, h // 2), (w - 1, h // 2), (w // 2, h - 1)]
for seed in seeds:
    ImageDraw.floodfill(img, seed, SENT, thresh=40)

# Là où on a peint la sentinelle → alpha 0 ; ailleurs → opaque.
rgba = img.convert("RGBA")
px = rgba.load()
for y in range(h):
    for x in range(w):
        r, g, b, _ = px[x, y]
        if (r, g, b) == SENT:
            px[x, y] = (0, 0, 0, 0)

rgba.save(OUT)
print("détouré ->", OUT, rgba.size)
