// Traductions FR/EN, solution maison légère (pas de dépendance i18n).
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
    block2Title: string;
    block2Text: string;
  };
  about: {
    heroEyebrow: string;
    heroTitle: string;
    statementTitle: string;
    statementP1: string;
    statementP2: string;
    studioEyebrow: string;
    studioTitle: string;
    studioText: string;
    studioQuote: string;
    doEyebrow: string;
    do1: string;
    do2: string;
    do3: string;
    closingEyebrow: string;
    closingStatement: string;
    closingMarquee: string;
  };
};

export const translations: Record<Lang, Translation> = {
  fr: {
    nav: {
      about: "À propos",
      services: "Offre",
      portfolio: "Espace",
      ventures: "Entrepreneuriat",
      articles: "Articles",
      contact: "Contact",
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
      title: "Le pinceau bleu qui éblouit par sa créativité.",
      cta: "Voir tout le portfolio",
    },
    space: {
      marquee: "Bienvenue dans l'Espace Création",
      subtitle: "Logos, identités, affiches et campagnes, pensés pour marquer.",
      blockTitle: "Chaque visuel raconte une histoire",
      blockText:
        "De l'idée à l'impression, je construis des identités qui se reconnaissent du premier coup d'œil et qui tiennent dans le temps. Chaque projet part d'une intention claire : créer de la confiance et laisser une trace.",
      block2Title: "Du concept à la réalité",
      block2Text:
        "Affiches, campagnes sociales, supports imprimés : je décline une même idée forte sur tous les formats, pour que la marque parle d'une seule voix, partout.",
    },
    about: {
      heroEyebrow: "Designer graphique · Social Media Manager",
      heroTitle: "About Me",
      statementTitle: "Je transforme des marques en histoires que l'on retient.",
      statementP1:
        "Depuis sept ans, j'accompagne des marques, des événements et des entrepreneurs à Cotonou et au-delà. Logos, identités, affiches, campagnes : chaque projet part d'une intention claire et d'un même fil bleu.",
      statementP2:
        "Mon approche mêle rigueur graphique et sens du récit. Je ne dessine pas seulement ce qui est beau : je construis ce qui se reconnaît et se retient.",
      studioEyebrow: "Le studio",
      studioTitle: "Le Bleu Créatif",
      studioText:
        "Le Bleu Créatif, c'est l'atelier d'Ehoud Emmanuel OTI-TOSSOU. Une signature visuelle née d'une conviction simple : une bonne identité raconte quelque chose avant même qu'on la lise.",
      studioQuote: "Le bleu n'est pas qu'une couleur. C'est une manière de voir : claire, franche, qui marque.",
      doEyebrow: "Ce que je fais",
      do1: "Identité de marque",
      do2: "Affiches & campagnes",
      do3: "Contenu social",
      closingEyebrow: "Travaillons ensemble",
      closingStatement: "Une idée forte, déclinée d'une seule voix, sur tous les formats.",
      closingMarquee: "Le Bleu Créatif",
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
      title: "The blue brush that dazzles with its creativity.",
      cta: "View full portfolio",
    },
    space: {
      marquee: "Welcome to Creation Space",
      subtitle: "Logos, identities, posters and campaigns, built to leave a mark.",
      blockTitle: "Every visual tells a story",
      blockText:
        "From idea to print, I build identities that are recognised at first glance and last over time. Each project starts from a clear intention: to build trust and leave a mark.",
      block2Title: "From concept to reality",
      block2Text:
        "Posters, social campaigns, printed material: I carry one strong idea across every format, so the brand speaks with a single voice, everywhere.",
    },
    about: {
      heroEyebrow: "Graphic Designer · Social Media Manager",
      heroTitle: "About Me",
      statementTitle: "I turn brands into stories people remember.",
      statementP1:
        "For seven years I've worked with brands, events and entrepreneurs in Cotonou and beyond. Logos, identities, posters, campaigns: every project starts from a clear intention and a single blue thread.",
      statementP2:
        "My approach blends graphic rigor with a sense of narrative. I don't just draw what looks good: I build what gets recognised and remembered.",
      studioEyebrow: "The studio",
      studioTitle: "The Creative Blue",
      studioText:
        "The Creative Blue is the studio of Ehoud Emmanuel OTI-TOSSOU. A visual signature born from a simple belief: a good identity says something before you even read it.",
      studioQuote: "Blue isn't just a colour. It's a way of seeing: clear, direct, and made to leave a mark.",
      doEyebrow: "What I do",
      do1: "Brand identity",
      do2: "Posters & campaigns",
      do3: "Social content",
      closingEyebrow: "Let's work together",
      closingStatement: "One strong idea, carried in a single voice, across every format.",
      closingMarquee: "The Creative Blue",
    },
  },
};
