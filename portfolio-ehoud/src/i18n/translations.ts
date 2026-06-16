// Traductions FR/EN — solution maison légère (pas de dépendance i18n).
// On ajoute les clés section par section au fur et à mesure du clone.

export type Lang = "fr" | "en";

// Forme partagée par les deux langues : garantit que FR et EN ont les mêmes clés.
export type Translation = {
  nav: {
    about: string;
    services: string;
    portfolio: string;
    ventures: string;
    articles: string;
    contact: string;
    drive: string;
  };
  brand: {
    tagline: string;
    role: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPortfolio: string;
    ctaContact: string;
  };
  work: {
    eyebrow: string;
    title: string;
    cta: string;
  };
  space: {
    marquee: string;
    subtitle: string;
    blockTitle: string;
    blockText: string;
  };
};

export const translations: Record<Lang, Translation> = {
  fr: {
    nav: {
      about: "Studio",
      services: "Craft",
      portfolio: "Space",
      ventures: "Ventures",
      articles: "Journal",
      contact: "Get in Touch",
      drive: "Ressources",
    },
    brand: {
      tagline: "Le Bleu Créatif",
      role: "Social Media Manager & Designer Graphique",
    },
    hero: {
      eyebrow: "Le Bleu Créatif",
      title: "Je donne une voix visuelle à vos idées.",
      subtitle:
        "Social Media Manager & Designer Graphique au Bénin. Sept ans à transformer des marques en histoires que l'on retient.",
      ctaPortfolio: "Voir le portfolio",
      ctaContact: "Me contacter",
    },
    work: {
      eyebrow: "Travaux sélectionnés",
      title: "Des marques, des affiches, des campagnes.",
      cta: "Voir tout le portfolio",
    },
    space: {
      marquee: "Bienvenue dans l'Espace Création",
      subtitle: "Logos, identités, affiches et campagnes — pensés pour marquer.",
      blockTitle: "Chaque visuel raconte une histoire",
      blockText:
        "De l'idée à l'impression, je construis des identités qui se reconnaissent du premier coup d'œil et qui tiennent dans le temps. Chaque projet part d'une intention claire : créer de la confiance et laisser une trace.",
    },
  },
  en: {
    nav: {
      about: "Studio",
      services: "Craft",
      portfolio: "Space",
      ventures: "Ventures",
      articles: "Journal",
      contact: "Get in Touch",
      drive: "Resources",
    },
    brand: {
      tagline: "The Creative Blue",
      role: "Social Media Manager & Graphic Designer",
    },
    hero: {
      eyebrow: "The Creative Blue",
      title: "I give your ideas a visual voice.",
      subtitle:
        "Social Media Manager & Graphic Designer in Benin. Seven years turning brands into stories people remember.",
      ctaPortfolio: "View portfolio",
      ctaContact: "Get in touch",
    },
    work: {
      eyebrow: "Selected work",
      title: "Brands, posters, campaigns.",
      cta: "View full portfolio",
    },
    space: {
      marquee: "Welcome to Creation Space",
      subtitle: "Logos, identities, posters and campaigns — built to leave a mark.",
      blockTitle: "Every visual tells a story",
      blockText:
        "From idea to print, I build identities that are recognised at first glance and last over time. Each project starts from a clear intention: to build trust and leave a mark.",
    },
  },
};
