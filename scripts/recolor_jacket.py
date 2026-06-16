"""Bascule la veste rouge du portrait p04 vers le bleu de la charte.
On cible uniquement les pixels rouges TRÈS saturés (la veste) pour épargner
la peau (rouge-orangé peu saturé) et le reste de l'image."""
import numpy as np
from PIL import Image

SRC = r"d:\portfolioEHOUD\information sur Ehoud\extracted\images\p04_img003.jpeg"
OUT = r"d:\portfolioEHOUD\portfolio-ehoud\src\assets\ehoud-hero.png"

img = Image.open(SRC).convert("RGB")
hsv = np.array(img.convert("HSV"), dtype=np.int16)
h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]

# Rouge ET rouge-violacé (magenta) = teinte proche de 0 et son wrap large
# vers le haut (215-255), forte saturation. Couvre aussi les reflets roses du tissu.
red_mask = ((h < 18) | (h > 215)) & (s > 95)

# Cible : bleu charte #1178B7 ≈ teinte 203° → 203/360*255 ≈ 144 sur l'échelle PIL.
TARGET_H = 144
hsv[..., 0] = np.where(red_mask, TARGET_H, h)
# On garde la saturation/valeur (le tissu garde ses plis et son volume),
# juste un léger plafond de saturation pour coller au bleu plus profond.
hsv[..., 1] = np.where(red_mask, np.minimum(s, 205), s)

out = Image.fromarray(hsv.astype("uint8"), "HSV").convert("RGB")
out.save(OUT)
print("pixels recolorisés:", int(red_mask.sum()), "/", red_mask.size)
print("écrit:", OUT, out.size)
