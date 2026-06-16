// Services de l'Offre : visuels plein écran + texte, façon storytelling.
// Bilingue (fr/en) comme le reste du site ; images tirées du showcase HD.
import boom from "@/assets/showcase/boom-events.webp";
import taka from "@/assets/showcase/taka-pro-league.webp";
import merch from "@/assets/showcase/merch.webp";
import vobodo from "@/assets/showcase/vobodo-femmes.webp";

type Copy = {
  eyebrow: string;
  title: string;
  text: string;
};

export type Service = {
  src: string;
  fr: Copy;
  en: Copy;
};

export const services: Service[] = [
  {
    src: boom,
    fr: {
      eyebrow: "Identité",
      title: "Identité de marque",
      text: "Logos, chartes et systèmes visuels qui rendent une marque reconnaissable au premier regard et cohérente partout.",
    },
    en: {
      eyebrow: "Identity",
      title: "Brand identity",
      text: "Logos, guidelines and visual systems that make a brand recognisable at first glance and consistent everywhere.",
    },
  },
  {
    src: taka,
    fr: {
      eyebrow: "Campagnes",
      title: "Affiches & campagnes",
      text: "Des visuels qui arrêtent le scroll et remplissent les salles. Une idée forte, déclinée sur chaque support.",
    },
    en: {
      eyebrow: "Campaigns",
      title: "Posters & campaigns",
      text: "Visuals that stop the scroll and fill the room. One strong idea, carried across every format.",
    },
  },
  {
    src: merch,
    fr: {
      eyebrow: "Print",
      title: "Print & supports",
      text: "Goodies, éditions, packaging : la marque prend forme dans la main, soignée jusqu'au moindre détail.",
    },
    en: {
      eyebrow: "Print",
      title: "Print & merch",
      text: "Merch, editions, packaging: the brand takes shape in your hand, refined down to the last detail.",
    },
  },
  {
    src: vobodo,
    fr: {
      eyebrow: "Social",
      title: "Contenu social",
      text: "Une présence régulière et léchée sur les réseaux, pensée pour engager et fidéliser une communauté.",
    },
    en: {
      eyebrow: "Social",
      title: "Social content",
      text: "A consistent, polished presence on social media, built to engage and grow a loyal community.",
    },
  },
];
