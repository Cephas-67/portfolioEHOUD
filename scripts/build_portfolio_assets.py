"""Prépare les visuels du marquee : CMYK -> RGB, redimension, export WebP.
Source = images extraites du PDF. Sortie = src/assets/portfolio/."""
import os
from PIL import Image

SRC_DIR = r"d:\portfolioEHOUD\information sur Ehoud\extracted\images"
OUT_DIR = r"d:\portfolioEHOUD\portfolio-ehoud\src\assets\portfolio"
os.makedirs(OUT_DIR, exist_ok=True)

# (fichier source, nom de sortie) — sélection curée, variée.
ITEMS = [
    ("p17_img005.png", "vobodo-femmes"),
    ("p18_img006.png", "boom-events"),
    ("p20_img008.jpeg", "taka-pro-league"),
    ("p19_img007.jpeg", "social-square-01"),
    ("p22_img016.jpeg", "social-square-02"),
    ("p21_img014.jpeg", "social-square-03"),
    ("p22_img017.jpeg", "social-square-04"),
    ("p23_img019.jpeg", "affiche-valentin"),
    ("p23_img021.jpeg", "affiche-poster-02"),
    ("p24_img025.jpeg", "affiche-poster-03"),
    ("p24_img027.jpeg", "affiche-poster-04"),
    ("p25_img033.jpeg", "print-soced-notebook"),
    ("p25_img034.jpeg", "print-square"),
    ("p26_img035.jpeg", "print-jewelry-tshirt"),
    ("p27_img036.jpeg", "print-cojas-cap"),
    ("p27_img037.jpeg", "print-merch"),
]

MAXW = 900
for src, name in ITEMS:
    path = os.path.join(SRC_DIR, src)
    im = Image.open(path)
    # CMYK -> RGB pour des couleurs correctes sur le web.
    if im.mode != "RGB":
        im = im.convert("RGB")
    w, h = im.size
    if w > MAXW:
        im = im.resize((MAXW, int(h * MAXW / w)), Image.LANCZOS)
    out = os.path.join(OUT_DIR, name + ".webp")
    im.save(out, "WEBP", quality=82, method=6)
    print(name, im.size)

print("total:", len(ITEMS))
