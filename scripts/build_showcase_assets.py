"""Showcase hero : re-export HAUTE RÉSOLUTION (fini le flou).
On privilégie les visuels larges/grands pour un plein écran net.
Pas d'upscale : on prend la résolution native, plafonnée à 1600px de large."""
import os
from PIL import Image

SRC_DIR = r"d:\portfolioEHOUD\information sur Ehoud\extracted\images"
OUT_DIR = r"d:\portfolioEHOUD\portfolio-ehoud\src\assets\showcase"
os.makedirs(OUT_DIR, exist_ok=True)

# Sélection curée : formats larges (mockups print) + carrés haute résolution.
ITEMS = [
    ("p25_img033.jpeg", "soced-notebook"),   # 1852x1042 paysage
    ("p26_img035.jpeg", "jewelry-tshirt"),   # 2372x1582 paysage
    ("p27_img036.jpeg", "cojas-cap"),        # 1417x945  paysage
    ("p27_img037.jpeg", "merch"),            # 1460x974  paysage
    ("p17_img005.png",  "vobodo-femmes"),    # 1773 carré
    ("p18_img006.png",  "boom-events"),      # 2250 carré
    ("p20_img008.jpeg", "taka-pro-league"),  # 1000 carré
]

MAXW = 1600
for src, name in ITEMS:
    im = Image.open(os.path.join(SRC_DIR, src))
    if im.mode != "RGB":
        im = im.convert("RGB")
    w, h = im.size
    if w > MAXW:
        im = im.resize((MAXW, int(h * MAXW / w)), Image.LANCZOS)
    out = os.path.join(OUT_DIR, name + ".webp")
    im.save(out, "WEBP", quality=88, method=6)
    print(name, im.size, f"{os.path.getsize(out)//1024} Ko")
