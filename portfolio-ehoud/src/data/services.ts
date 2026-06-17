// Services de l'Offre : une carte par prestation, empilées au scroll (lenis-like).
// Bilingue (fr/en). Couleur pleine (token HSL de la charte) + motif de croix
// noires qui tournent + une affiche réelle d'Ehoud posée à droite (exemple inédit
// en rapport avec le service). `bg`/`text` = noms de variables CSS.
import identityPoster from "@/assets/offers/offer-identity.webp";
import campaignPoster from "@/assets/offers/offer-campaign.webp";
import socialPoster from "@/assets/offers/offer-social.webp";
import printPoster from "@/assets/offers/offer-print.webp";
import eventPoster from "@/assets/offers/offer-event.webp";
import artPoster from "@/assets/offers/offer-art.webp";

type Copy = {
  eyebrow: string;
  title: string;
  text: string;
};

export type Service = {
  // Couleur de fond de la carte (nom de token, ex. "--blue").
  bg: string;
  // Couleur du texte sur cette carte (ex. "--white" ou "--navy").
  text: string;
  // Affiche d'exemple (déjà optimisée en webp) posée à droite de la carte.
  poster: string;
  // Légende courte de l'affiche (projet réel), bilingue.
  posterCaption: { fr: string; en: string };
  fr: Copy;
  en: Copy;
};

export const services: Service[] = [
  {
    bg: "--blue",
    text: "--white",
    poster: identityPoster,
    posterCaption: { fr: "Le Bleu Créatif · logotype", en: "Le Bleu Créatif · logotype" },
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
    bg: "--logo",
    text: "--white",
    poster: campaignPoster,
    posterCaption: { fr: "LAUDOS Slam · campagne 2026", en: "LAUDOS Slam · 2026 campaign" },
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
    bg: "--sky",
    text: "--navy",
    poster: socialPoster,
    posterCaption: { fr: "Boom Events · post social", en: "Boom Events · social post" },
    fr: {
      eyebrow: "Social",
      title: "Contenu social & motion",
      text: "Posts, carrousels et formats courts pensés pour les réseaux : une présence régulière, léchée, qui engage.",
    },
    en: {
      eyebrow: "Social",
      title: "Social & motion",
      text: "Posts, carousels and short formats made for social: a consistent, polished presence that engages.",
    },
  },
  {
    bg: "--svc-teal",
    text: "--navy",
    poster: printPoster,
    posterCaption: { fr: "Initiative Kaléidoscope · textile", en: "Kaléidoscope Initiative · apparel" },
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
    bg: "--svc-indigo",
    text: "--white",
    poster: eventPoster,
    posterCaption: { fr: "COJAS-Bénin · Assemblée Générale", en: "COJAS-Bénin · General Assembly" },
    fr: {
      eyebrow: "Événementiel",
      title: "Branding événementiel",
      text: "Une direction visuelle complète pour un événement : de l'affiche à la régie, tout parle d'une seule voix.",
    },
    en: {
      eyebrow: "Events",
      title: "Event branding",
      text: "A full visual direction for an event: from poster to on-site, everything speaks in one voice.",
    },
  },
  {
    bg: "--pale",
    text: "--navy",
    poster: artPoster,
    posterCaption: { fr: "Journée de la Sage-Femme", en: "Midwife's Day" },
    fr: {
      eyebrow: "Direction artistique",
      title: "Direction artistique",
      text: "Un regard qui tient l'ensemble : choix des images, du ton et des couleurs pour une marque qui se reconnaît.",
    },
    en: {
      eyebrow: "Art direction",
      title: "Art direction",
      text: "A vision that holds it all together: images, tone and colour for a brand you recognise anywhere.",
    },
  },
];
