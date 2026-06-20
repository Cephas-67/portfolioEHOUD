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
    story: { title: string; text: string }[];
  };
  journal: {
    heroEyebrow: string;
    heroTitle: string;
    intro: string;
    readMore: string;
    allOnMedium: string;
  };
  contact: {
    heroTitle: string;
    hint: string;
    work: string;
    feedback: string;
    workHeading: string;
    workIntro: string;
    feedbackHeading: string;
    feedbackIntro: string;
    panelToFeedbackTitle: string;
    panelToFeedbackText: string;
    panelToWorkTitle: string;
    panelToWorkText: string;
    name: string;
    namePh: string;
    email: string;
    emailPh: string;
    message: string;
    messagePhWork: string;
    messagePhFeedback: string;
    send: string;
    errName: string;
    errEmail: string;
    errMessage: string;
    success: string;
    sent: string;
    sentHint: string;
    sendAnother: string;
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
    perspectiveEyebrow: string;
    perspectiveP1: string;
    perspectiveP2: string;
    perspectiveP3: string;
    perspectiveP4: string;
    atelierTitle: string;
    parcoursTitle: string;
    parcoursIntro: string;
    parcoursItems: Array<{ role: string; org: string; description: string }>;
    showcaseZoomA: string;
    showcaseZoomB: string;
    showcasePinned: string;
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
      story: [
        {
          title: "Une identité qui se reconnaît",
          text: "Un logo n'est pas un décor : c'est le premier mot d'une marque. Je cherche la forme la plus simple qui dise le plus de choses.",
        },
        {
          title: "Du sens avant le style",
          text: "Chaque projet part d'une intention claire. Le style vient ensuite, au service du message, jamais l'inverse.",
        },
        {
          title: "Marquer les esprits",
          text: "Une bonne affiche s'arrête dans le scroll : la couleur juste, une hiérarchie nette, une idée forte qui reste.",
        },
        {
          title: "Une voix, tous les formats",
          text: "Du carré social au grand format imprimé, je décline une même idée pour que la marque parle d'une seule voix.",
        },
        {
          title: "Des campagnes qui engagent",
          text: "Sensibiliser, c'est faire ressentir avant de faire lire. Je construis des séries qui tiennent le regard et le propos.",
        },
        {
          title: "Le détail qui change tout",
          text: "Alignements, contrastes, respirations : c'est dans les petits réglages que se joue la différence entre correct et mémorable.",
        },
        {
          title: "Penser pour l'impression",
          text: "Un visuel ne vit pas que sur un écran. Je travaille pour que la couleur et la matière tiennent aussi sur le papier.",
        },
        {
          title: "Raconter une histoire",
          text: "Derrière chaque réalisation : une marque, un public, un objectif. Le design relie les trois en une seule image.",
        },
        {
          title: "Créer de la confiance",
          text: "Une identité cohérente rassure. C'est ce qui fait qu'on se souvient d'une marque et qu'on y revient.",
        },
      ],
    },
    journal: {
      heroEyebrow: "Réflexions, terrains et engagements",
      heroTitle: "Journal",
      intro:
        "J'écris pour donner du sens : société, santé, droits, culture et innovation, vus depuis le Bénin. Articles publiés sur Medium.",
      readMore: "Lire sur Medium",
      allOnMedium: "Tous les articles sur Medium",
    },
    contact: {
      heroTitle: "Travaillons ensemble",
      hint: "Bougez la souris pour révéler",
      work: "Travaillons",
      feedback: "Feedback",
      workHeading: "Parlons de votre projet",
      workIntro:
        "Une idée, une marque à lancer, un visuel à créer ? Dites-m'en plus, je reviens vers vous rapidement.",
      feedbackHeading: "Votre retour compte",
      feedbackIntro:
        "Un avis sur mon travail, une remarque, une suggestion ? Cet espace est à vous.",
      panelToFeedbackTitle: "Une remarque à partager ?",
      panelToFeedbackText: "Passez en mode feedback et dites-moi tout.",
      panelToWorkTitle: "Un projet en tête ?",
      panelToWorkText: "Revenez parler de votre projet ensemble.",
      name: "Votre nom",
      namePh: "Comment vous appelez-vous ?",
      email: "Votre email",
      emailPh: "vous@exemple.com",
      message: "Votre message",
      messagePhWork: "Décrivez votre projet en quelques lignes...",
      messagePhFeedback: "Partagez votre retour...",
      send: "Envoyer le message",
      errName: "Indiquez votre nom (2 caractères minimum).",
      errEmail: "Adresse email invalide.",
      errMessage: "Votre message est un peu court (10 caractères minimum).",
      success: "Merci ! Votre messagerie s'ouvre pour envoyer le message.",
      sent: "Message envoyé !",
      sentHint: "Merci, je reviens vers vous très vite.",
      sendAnother: "Envoyer un autre message",
    },
    about: {
      heroEyebrow: "Stratège & Designer",
      heroTitle: "About Me",
      statementTitle: "Je transforme des marques en histoires que l'on retient.",
      statementP1:
        "Depuis plus de sept ans, j'évolue dans le graphisme, la communication visuelle et le marketing digital, avec une conviction forte : une bonne image ne sert pas seulement à embellir une marque, elle doit raconter une histoire, créer de la confiance et produire un impact.",
      statementP2:
        "Titulaire d'une licence en Administration générale et territoriale, je construis un profil à la croisée de la réflexion stratégique, de la gestion de projets et de la création digitale, et m'apprête à intégrer un cycle de Master pour consolider ce que je développe sur le terrain.",
      studioEyebrow: "Le studio",
      studioTitle: "Le Bleu Créatif",
      studioText:
        "Le Bleu Créatif, c'est l'atelier d'Ehoud Emmanuel OTI-TOSSOU. Une signature visuelle née d'une conviction simple : une bonne identité raconte quelque chose avant même qu'on la lise.",
      studioQuote: "Le bleu n'est pas qu'une couleur. C'est une manière de voir : claire, franche, qui marque.",
      perspectiveEyebrow: "Ma perspective",
      perspectiveP1: "Une bonne identité se lit avant les mots.",
      perspectiveP2: "On dessine pour la vie réelle des marques, pas pour la galerie.",
      perspectiveP3: "Le détail n'est pas un luxe : c'est ce qui fait tenir l'ensemble.",
      perspectiveP4: "Le bleu est notre fil : clair, franc, reconnaissable entre tous.",
      atelierTitle: "L'atelier, au quotidien",
      parcoursTitle: "Parcours",
      parcoursIntro:
        "Stratégie, création et entrepreneuriat — un profil hybride forgé sur le terrain depuis plus de sept ans.",
      parcoursItems: [
        {
          role: "Responsable communication",
          org: "COJAS Bénin",
          description:
            "Deux ans à piloter la communication d'enjeux sociaux et communautaires sensibles : une parole accessible, responsable et orientée impact.",
        },
        {
          role: "Co-fondateur",
          org: "Decade Games Solutions",
          description:
            "Entreprise en plein développement qui propose des concepts pour se déconnecter des écrans et renouer avec la réalité, le rire et les échanges authentiques.",
        },
        {
          role: "Initiateur",
          org: "Digital Meet Tour",
          description:
            "Programme qui rapproche les jeunes des compétences numériques essentielles. Déployé au nord du Bénin, en préparation d'une phase sous-régionale.",
        },
        {
          role: "CMO & Co-fondateur",
          org: "Clario",
          description:
            "Entreprise spécialisée dans la démystification de l'IA et des concepts liés au digital, pour les rendre lisibles et actionnables.",
        },
      ],
      showcaseZoomA: "On ne décore pas.",
      showcaseZoomB: "On fait parler.",
      showcasePinned: "Conçu pour être vu, pensé pour rester.",
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
      story: [
        {
          title: "An identity you recognise",
          text: "A logo isn't decoration: it's a brand's first word. I look for the simplest shape that says the most.",
        },
        {
          title: "Meaning before style",
          text: "Every project starts from a clear intention. Style comes after, serving the message, never the other way around.",
        },
        {
          title: "Made to leave a mark",
          text: "A good poster stops the scroll: the right colour, a clear hierarchy, one strong idea that stays.",
        },
        {
          title: "One voice, every format",
          text: "From the social square to large-format print, I carry one idea so the brand speaks with a single voice.",
        },
        {
          title: "Campaigns that engage",
          text: "Raising awareness means making people feel before they read. I build series that hold both the eye and the point.",
        },
        {
          title: "The detail that changes everything",
          text: "Alignment, contrast, breathing room: the small adjustments are where correct becomes memorable.",
        },
        {
          title: "Designed for print",
          text: "A visual doesn't only live on a screen. I make sure colour and texture hold up on paper too.",
        },
        {
          title: "Telling a story",
          text: "Behind each piece: a brand, an audience, a goal. Design ties the three together in one image.",
        },
        {
          title: "Building trust",
          text: "A consistent identity reassures. That's what makes a brand memorable and worth coming back to.",
        },
      ],
    },
    journal: {
      heroEyebrow: "Reflections, fieldwork and advocacy",
      heroTitle: "Journal",
      intro:
        "I write to make sense of things: society, health, rights, culture and innovation, seen from Benin. Articles published on Medium.",
      readMore: "Read on Medium",
      allOnMedium: "All articles on Medium",
    },
    contact: {
      heroTitle: "Let's work together",
      hint: "Move your mouse to reveal",
      work: "Let's work",
      feedback: "Feedback",
      workHeading: "Tell me about your project",
      workIntro:
        "An idea, a brand to launch, a visual to create? Tell me more, I'll get back to you quickly.",
      feedbackHeading: "Your feedback matters",
      feedbackIntro: "Thoughts on my work, a remark, a suggestion? This space is yours.",
      panelToFeedbackTitle: "Something to share?",
      panelToFeedbackText: "Switch to feedback mode and tell me all about it.",
      panelToWorkTitle: "Got a project in mind?",
      panelToWorkText: "Come back to talk about your project together.",
      name: "Your name",
      namePh: "What's your name?",
      email: "Your email",
      emailPh: "you@example.com",
      message: "Your message",
      messagePhWork: "Describe your project in a few lines...",
      messagePhFeedback: "Share your feedback...",
      send: "Send message",
      errName: "Please enter your name (min 2 characters).",
      errEmail: "Invalid email address.",
      errMessage: "Your message is a bit short (min 10 characters).",
      success: "Thanks! Your mail app is opening to send the message.",
      sent: "Message sent!",
      sentHint: "Thank you, I'll get back to you very soon.",
      sendAnother: "Send another message",
    },
    about: {
      heroEyebrow: "Strategist & Designer",
      heroTitle: "About Me",
      statementTitle: "I turn brands into stories people remember.",
      statementP1:
        "For over seven years, I've worked in graphic design, visual communication and digital marketing — with one strong conviction: a good image doesn't just decorate a brand, it must tell a story, build trust and create impact.",
      statementP2:
        "I hold a bachelor's in General and Territorial Administration, and I sit at the crossroads of strategic thinking, project management and digital creation. I'm now preparing to start a Master's to consolidate what I've been building on the ground.",
      studioEyebrow: "The studio",
      studioTitle: "The Creative Blue",
      studioText:
        "The Creative Blue is the studio of Ehoud Emmanuel OTI-TOSSOU. A visual signature born from a simple belief: a good identity says something before you even read it.",
      studioQuote: "Blue isn't just a colour. It's a way of seeing: clear, direct, and made to leave a mark.",
      perspectiveEyebrow: "My perspective",
      perspectiveP1: "A good identity reads before the words do.",
      perspectiveP2: "We design for the real life of brands, not for the gallery.",
      perspectiveP3: "Detail isn't a luxury: it's what holds the whole thing together.",
      perspectiveP4: "Blue is our thread: clear, honest, recognisable anywhere.",
      atelierTitle: "The studio, day to day",
      parcoursTitle: "Career",
      parcoursIntro:
        "Strategy, design and entrepreneurship — a hybrid profile, built on the ground for over seven years.",
      parcoursItems: [
        {
          role: "Communication lead",
          org: "COJAS Bénin",
          description:
            "Two years leading the communication of sensitive social and community issues — an accessible, responsible, impact-driven voice.",
        },
        {
          role: "Co-founder",
          org: "Decade Games Solutions",
          description:
            "A growing company that offers concepts to step away from screens and reconnect with the real world: laughter, presence, authentic exchange.",
        },
        {
          role: "Initiator",
          org: "Digital Meet Tour",
          description:
            "A programme bringing essential digital skills to young people. Deployed in northern Benin, preparing a sub-regional second phase.",
        },
        {
          role: "CMO & Co-founder",
          org: "Clario",
          description:
            "A company dedicated to demystifying AI and digital concepts so that they become readable and actionable.",
        },
      ],
      showcaseZoomA: "We don't decorate.",
      showcaseZoomB: "We make it speak.",
      showcasePinned: "Made to be seen, built to last.",
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
