// Visuels haute résolution du slideshow hero (plein écran, sans flou).
import soced from "@/assets/showcase/soced-notebook.webp";
import tshirt from "@/assets/showcase/jewelry-tshirt.webp";
import cap from "@/assets/showcase/cojas-cap.webp";
import merch from "@/assets/showcase/merch.webp";
import vobodo from "@/assets/showcase/vobodo-femmes.webp";
import boom from "@/assets/showcase/boom-events.webp";
import taka from "@/assets/showcase/taka-pro-league.webp";

export type Slide = {
  src: string;
  title: string;
  category: string;
};

export const slides: Slide[] = [
  { src: soced, title: "SOCED · Notebook", category: "Print" },
  { src: vobodo, title: "Vobodo · Droits des Femmes", category: "Campagnes" },
  { src: tshirt, title: "Jewelry Class · Merch", category: "Print" },
  { src: boom, title: "Boom Events", category: "Identité" },
  { src: cap, title: "COJAS · Casquette 28 Septembre", category: "Print" },
  { src: taka, title: "TAKA Pro League", category: "Affiches" },
  { src: merch, title: "Print · Goodies", category: "Print" },
];
