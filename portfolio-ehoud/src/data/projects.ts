// Visuels du portfolio d'Ehoud (extraits de la charte, convertis pour le web).
// On pourra enrichir titres/catégories quand Ehoud fournira les détails clients.
import vobodoFemmes from "@/assets/portfolio/vobodo-femmes.webp";
import boomEvents from "@/assets/portfolio/boom-events.webp";
import takaProLeague from "@/assets/portfolio/taka-pro-league.webp";
import social01 from "@/assets/portfolio/social-square-01.webp";
import social02 from "@/assets/portfolio/social-square-02.webp";
import social03 from "@/assets/portfolio/social-square-03.webp";
import social04 from "@/assets/portfolio/social-square-04.webp";
import afficheValentin from "@/assets/portfolio/affiche-valentin.webp";
import affiche02 from "@/assets/portfolio/affiche-poster-02.webp";
import affiche03 from "@/assets/portfolio/affiche-poster-03.webp";
import affiche04 from "@/assets/portfolio/affiche-poster-04.webp";
import printNotebook from "@/assets/portfolio/print-soced-notebook.webp";
import printSquare from "@/assets/portfolio/print-square.webp";
import printTshirt from "@/assets/portfolio/print-jewelry-tshirt.webp";
import printCap from "@/assets/portfolio/print-cojas-cap.webp";
import printMerch from "@/assets/portfolio/print-merch.webp";

export type ProjectCategory = "Identité" | "Affiches" | "Campagnes" | "Print";

export type Project = {
  src: string;
  title: string;
  category: ProjectCategory;
  // Ratio largeur/hauteur de l'image (comme le modèle : chaque visuel garde le sien).
  ratio: number;
};

export const projects: Project[] = [
  { src: vobodoFemmes, title: "Vobodo — Droits des Femmes", category: "Campagnes", ratio: 900 / 899 },
  { src: boomEvents, title: "Boom Events", category: "Identité", ratio: 1 },
  { src: takaProLeague, title: "TAKA Pro League", category: "Affiches", ratio: 1 },
  { src: afficheValentin, title: "Cœurs Libres — Anti-Valentin", category: "Affiches", ratio: 623 / 874 },
  { src: printNotebook, title: "SOCED — Notebook", category: "Print", ratio: 900 / 506 },
  { src: printTshirt, title: "Jewelry Class — Merch", category: "Print", ratio: 900 / 600 },
  { src: printCap, title: "COJAS — Casquette 28 Septembre", category: "Print", ratio: 900 / 600 },
  { src: social01, title: "Social — Campagne", category: "Campagnes", ratio: 1 },
  { src: affiche02, title: "Affiche événement", category: "Affiches", ratio: 623 / 874 },
  { src: social02, title: "Social — Post", category: "Campagnes", ratio: 1 },
  { src: affiche03, title: "Affiche campagne", category: "Affiches", ratio: 619 / 745 },
  { src: printSquare, title: "Print — Édition", category: "Print", ratio: 900 / 888 },
  { src: social03, title: "Social — Visuel", category: "Campagnes", ratio: 1 },
  { src: affiche04, title: "Affiche campagne", category: "Affiches", ratio: 636 / 745 },
  { src: social04, title: "Social — Visuel", category: "Campagnes", ratio: 1 },
  { src: printMerch, title: "Print — Goodies", category: "Print", ratio: 900 / 600 },
];
