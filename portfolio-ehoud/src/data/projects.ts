// Réalisations d'Ehoud, extraites du Portfolio Ehoud.pdf et converties pour le web.
// Regroupées par nature (logos, identités, affiches, vœux, institutionnel, campagnes,
// print). `projects` est la liste à plat (utilisée par les composants marquee/grid).

// Logos (cartes sombres, format large)
import logoOjas from "@/assets/portfolio/logo-ojas.webp";
import logoQuanty from "@/assets/portfolio/logo-quanty-mind.webp";
import logoEquilibre from "@/assets/portfolio/logo-equilibre30.webp";
import logoHealth from "@/assets/portfolio/logo-health-development.webp";
import logoLabonne from "@/assets/portfolio/logo-labonne-adresse.webp";
import logoMakeAfrica from "@/assets/portfolio/logo-make-africa.webp";
import logoO2 from "@/assets/portfolio/logo-o2-couture.webp";
import logoMaison from "@/assets/portfolio/logo-maison-tissus.webp";
import logoTaka from "@/assets/portfolio/logo-taka.webp";

// Identités de marque (planches)
import brandGoshen from "@/assets/portfolio/brand-goshen.webp";
import brandBoom from "@/assets/portfolio/brand-boom-events.webp";
import brandRenaitre from "@/assets/portfolio/brand-renaitre.webp";

// Affiches (single)
import affVobodo from "@/assets/portfolio/affiche-vobodo-femmes.webp";
import affJewelry24 from "@/assets/portfolio/affiche-jewelry-24h.webp";
import affBoom from "@/assets/portfolio/affiche-boom-event.webp";
import affTaka from "@/assets/portfolio/affiche-taka-journee.webp";

// Vœux Nouvel An 2026
import nyLbc from "@/assets/portfolio/ny-lbc-2026.webp";
import nyVobodo from "@/assets/portfolio/ny-vobodo-2026.webp";
import nyJewelry from "@/assets/portfolio/ny-jewelry-2026.webp";
import nyLaudis from "@/assets/portfolio/ny-laudis.webp";
import nyTous from "@/assets/portfolio/ny-2026-tous.webp";
import nyHeureuse from "@/assets/portfolio/ny-heureuse-2026.webp";

// Institutionnel
import instFamilles from "@/assets/portfolio/inst-15mai-familles.webp";
import instAtelier from "@/assets/portfolio/inst-atelier-doc.webp";
import instSageFemme from "@/assets/portfolio/inst-sage-femme.webp";
import instAssemblee from "@/assets/portfolio/inst-assemblee.webp";

// Campagne « Cœurs Libres » (anti-Valentin, décompte)
import val05 from "@/assets/portfolio/valentin-05.webp";
import val04 from "@/assets/portfolio/valentin-04.webp";
import val03 from "@/assets/portfolio/valentin-03.webp";
import val02 from "@/assets/portfolio/valentin-02.webp";
import val01 from "@/assets/portfolio/valentin-01.webp";
import valTeaser from "@/assets/portfolio/valentin-teaser.webp";

// Campagne plaidoyer (série portraits)
import camp01 from "@/assets/portfolio/campagne-portrait-01.webp";
import camp02 from "@/assets/portfolio/campagne-portrait-02.webp";
import camp03 from "@/assets/portfolio/campagne-portrait-03.webp";
import camp04 from "@/assets/portfolio/campagne-portrait-04.webp";
import camp05 from "@/assets/portfolio/campagne-portrait-05.webp";
import camp06 from "@/assets/portfolio/campagne-portrait-06.webp";
import camp07 from "@/assets/portfolio/campagne-portrait-07.webp";
import camp08 from "@/assets/portfolio/campagne-portrait-08.webp";

// Print (mockups)
import printNotebook from "@/assets/portfolio/print-soced-notebook.webp";
import printTshirt from "@/assets/portfolio/print-jewelry-tshirt.webp";
import printCap from "@/assets/portfolio/print-cojas-cap.webp";
import printPolo from "@/assets/portfolio/print-cojas-polo.webp";
import printKeyring from "@/assets/portfolio/print-soced-keyring.webp";

export type ProjectCategory =
  | "Logos"
  | "Identité"
  | "Affiches"
  | "Vœux"
  | "Institutionnel"
  | "Campagne"
  | "Print";

export type Project = {
  src: string;
  title: string;
  category: ProjectCategory;
  ratio: number; // largeur / hauteur de l'image (chaque visuel garde le sien)
};

const WIDE = 1600 / 484; // cartes logos
const BRAND = 1600 / 901; // planches identité
const SQUARE = 1;
const VAL = 623 / 874; // affiches portrait
const CAMP = 0.85; // portraits campagne

export const logos: Project[] = [
  { src: logoOjas, title: "OJAS", category: "Logos", ratio: WIDE },
  { src: logoQuanty, title: "Quanty Mind", category: "Logos", ratio: WIDE },
  { src: logoEquilibre, title: "Équilibre 30", category: "Logos", ratio: WIDE },
  { src: logoHealth, title: "Health & Development", category: "Logos", ratio: WIDE },
  { src: logoLabonne, title: "LaBonne Adresse", category: "Logos", ratio: WIDE },
  { src: logoMakeAfrica, title: "Make Africa Borderless", category: "Logos", ratio: WIDE },
  { src: logoO2, title: "O² Couture", category: "Logos", ratio: WIDE },
  { src: logoMaison, title: "La Maison des Tissus", category: "Logos", ratio: WIDE },
  { src: logoTaka, title: "TAKA Pro League", category: "Logos", ratio: WIDE },
];

export const brands: Project[] = [
  { src: brandGoshen, title: "Goshen Foods", category: "Identité", ratio: BRAND },
  { src: brandBoom, title: "Boom Events", category: "Identité", ratio: BRAND },
  { src: brandRenaitre, title: "Re-Naître en scène", category: "Identité", ratio: BRAND },
];

export const affiches: Project[] = [
  { src: affVobodo, title: "Vobodo · Droits des Femmes", category: "Affiches", ratio: SQUARE },
  { src: affJewelry24, title: "Jewelry Class · 24H TikTok", category: "Affiches", ratio: SQUARE },
  { src: affBoom, title: "Boom Event · Régie pub", category: "Affiches", ratio: SQUARE },
  { src: affTaka, title: "TAKA Pro League · 6e Journée", category: "Affiches", ratio: SQUARE },
];

export const voeux: Project[] = [
  { src: nyLbc, title: "Le Bleu Créatif · Vœux 2026", category: "Vœux", ratio: SQUARE },
  { src: nyVobodo, title: "Vobodo · Vœux 2026", category: "Vœux", ratio: SQUARE },
  { src: nyJewelry, title: "Jewelry Class · Vœux 2026", category: "Vœux", ratio: SQUARE },
  { src: nyLaudis, title: "Laudis · Heureuse année", category: "Vœux", ratio: SQUARE },
  { src: nyTous, title: "2026 · À tous et à toutes", category: "Vœux", ratio: SQUARE },
  { src: nyHeureuse, title: "Heureuse année 2026", category: "Vœux", ratio: SQUARE },
];

export const institutionnel: Project[] = [
  { src: instFamilles, title: "15 Mai · Journée des familles", category: "Institutionnel", ratio: SQUARE },
  { src: instAtelier, title: "Atelier · Documents stratégiques", category: "Institutionnel", ratio: SQUARE },
  { src: instSageFemme, title: "Journée de la Sage-Femme", category: "Institutionnel", ratio: SQUARE },
  { src: instAssemblee, title: "Assemblée Générale", category: "Institutionnel", ratio: SQUARE },
];

export const valentin: Project[] = [
  { src: val05, title: "Cœurs Libres · Teaser", category: "Campagne", ratio: VAL },
  { src: val04, title: "Cœurs Libres · J-5", category: "Campagne", ratio: VAL },
  { src: val03, title: "Cœurs Libres · J-4", category: "Campagne", ratio: VAL },
  { src: val02, title: "Cœurs Libres · J-3", category: "Campagne", ratio: VAL },
  { src: val01, title: "Cœurs Libres · J-2", category: "Campagne", ratio: VAL },
  { src: valTeaser, title: "Cœurs Libres · J-1", category: "Campagne", ratio: VAL },
];

export const campagnes: Project[] = [
  { src: camp01, title: "Plaidoyer · 01", category: "Campagne", ratio: CAMP },
  { src: camp02, title: "Plaidoyer · 02", category: "Campagne", ratio: CAMP },
  { src: camp03, title: "Plaidoyer · 03", category: "Campagne", ratio: CAMP },
  { src: camp04, title: "Plaidoyer · 04", category: "Campagne", ratio: CAMP },
  { src: camp05, title: "Plaidoyer · 05", category: "Campagne", ratio: CAMP },
  { src: camp06, title: "Plaidoyer · 06", category: "Campagne", ratio: CAMP },
  { src: camp07, title: "Plaidoyer · 07", category: "Campagne", ratio: CAMP },
  { src: camp08, title: "Plaidoyer · 08", category: "Campagne", ratio: CAMP },
];

export const prints: Project[] = [
  { src: printNotebook, title: "SOCED · Carnet", category: "Print", ratio: 1600 / 900 },
  { src: printTshirt, title: "Jewelry Class · T-shirt", category: "Print", ratio: 1600 / 1067 },
  { src: printCap, title: "COJAS · Casquette", category: "Print", ratio: 1417 / 945 },
  { src: printPolo, title: "COJAS · Polo", category: "Print", ratio: 1460 / 974 },
  { src: printKeyring, title: "SOCED · Porte-clés", category: "Print", ratio: 1600 / 1580 },
];

// Liste à plat (composants ProjectMarquee / ProjectGrid).
export const projects: Project[] = [
  ...affiches,
  ...voeux,
  ...institutionnel,
  ...logos,
  ...brands,
  ...valentin,
  ...campagnes,
  ...prints,
];
