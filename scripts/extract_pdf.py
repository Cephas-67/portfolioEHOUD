"""Extrait pages (PNG 200dpi) et images embarquees du PDF Ehoud."""
import sys
from pathlib import Path
import pymupdf

PDF = Path(r"d:\portfolioEHOUD\information sur Ehoud\Portfolio Ehoud.pdf")
OUT = Path(r"d:\portfolioEHOUD\information sur Ehoud\extracted")
PAGES = OUT / "pages"
IMAGES = OUT / "images"
PAGES.mkdir(parents=True, exist_ok=True)
IMAGES.mkdir(parents=True, exist_ok=True)

doc = pymupdf.open(PDF)
print(f"Pages: {doc.page_count}")

# Rendu pages
zoom = 200 / 72
mat = pymupdf.Matrix(zoom, zoom)
for i, page in enumerate(doc, 1):
    pix = page.get_pixmap(matrix=mat, alpha=False)
    pix.save(PAGES / f"page_{i:02d}.png")

# Images embarquees
seen = set()
count = 0
for i, page in enumerate(doc, 1):
    for img in page.get_images(full=True):
        xref = img[0]
        if xref in seen:
            continue
        seen.add(xref)
        try:
            data = doc.extract_image(xref)
            ext = data["ext"]
            with open(IMAGES / f"p{i:02d}_img{count:03d}.{ext}", "wb") as f:
                f.write(data["image"])
            count += 1
        except Exception as e:
            print(f"skip xref {xref}: {e}")

print(f"Pages rendues: {doc.page_count}")
print(f"Images extraites: {count}")
