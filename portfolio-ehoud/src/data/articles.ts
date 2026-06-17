// Articles d'Ehoud publiés sur Medium (@otitossouemmanuel). Les vignettes sont
// rapatriées en local (src/assets/articles) pour rester cohérentes avec le reste du
// site et éviter le hotlink. Triés du plus récent au plus ancien.
import a01 from "@/assets/articles/article-01.webp";
import a02 from "@/assets/articles/article-02.webp";
import a03 from "@/assets/articles/article-03.webp";
import a04 from "@/assets/articles/article-04.webp";
import a05 from "@/assets/articles/article-05.webp";
import a06 from "@/assets/articles/article-06.webp";
import a07 from "@/assets/articles/article-07.webp";
import a08 from "@/assets/articles/article-08.webp";
import a09 from "@/assets/articles/article-09.webp";
import a10 from "@/assets/articles/article-10.webp";

export type Article = {
  title: string;
  excerpt: string;
  date: string; // ISO, formatée selon la langue à l'affichage
  tag: string;
  href: string;
  image: string;
};

export const MEDIUM_PROFILE = "https://medium.com/@otitossouemmanuel";

export const articles: Article[] = [
  {
    title: "Des milliers d'initiatives sur le continent, un écho qui meurt dans les médias",
    excerpt:
      "Les innovations africaines font le buzz puis s'éteignent faute de soutien. Plaidoyer pour mobiliser collectivement expertise, réseaux et capitaux.",
    date: "2026-06-07",
    tag: "Tribune",
    href: "https://medium.com/@otitossouemmanuel/des-milliers-dinitiatives-par-milliers-sur-le-continent-qui-n-ont-d-%C3%A9cho-que-dans-les-m%C3%A9dias-f4f1d543f67b",
    image: a01,
  },
  {
    title: "Comprendre le Vodun au-delà des clichés : une théologie vivante",
    excerpt:
      "Le Vodun n'est pas une superstition : c'est un système spirituel cohérent, fait d'équilibre, de responsabilité et de respect du vivant.",
    date: "2026-01-08",
    tag: "Culture",
    href: "https://medium.com/@otitossouemmanuel/comprendre-le-vodun-au-del%C3%A0-des-clich%C3%A9s-une-th%C3%A9ologie-vivante-au-c%C5%93ur-des-vodun-days-ac97b3a18f48",
    image: a02,
  },
  {
    title: "Mon Corps, Mes Règles : la dignité menstruelle, un combat collectif",
    excerpt:
      "Documenter le lancement de « Mon Corps, Mes Règles » : créer des espaces sûrs pour parler des règles et briser les tabous.",
    date: "2025-11-14",
    tag: "Engagement",
    href: "https://medium.com/@otitossouemmanuel/mon-corps-mes-r%C3%A8gles-quand-la-dignit%C3%A9-menstruelle-devient-un-combat-collectif-2b2792b222e1",
    image: a03,
  },
  {
    title: "Aguégués : la jeunesse et les femmes dansent pour la paix",
    excerpt:
      "Un flash mob pour la paix : plus de 160 jeunes femmes mobilisées dans onze communes à l'approche des élections de 2026.",
    date: "2025-10-21",
    tag: "Société",
    href: "https://medium.com/@otitossouemmanuel/agu%C3%A9gu%C3%A9s-la-jeunesse-et-les-femmes-dansent-pour-la-paix-%C3%A0-lapproche-des-%C3%A9lections-270bc3c40969",
    image: a04,
  },
  {
    title: "5 choses que vous ne saviez pas sur l'accès à l'avortement au Bénin",
    excerpt:
      "La loi béninoise de 2021 a ouvert des droits, mais l'accès réel reste un parcours. Cinq vérités, et la plateforme safe2choose.",
    date: "2025-08-04",
    tag: "Santé & droits",
    href: "https://medium.com/@otitossouemmanuel/5-choses-que-vous-ne-saviez-pas-sur-lacc%C3%A8s-%C3%A0-l-avortement-au-b%C3%A9nin-75ba1e9094d5",
    image: a05,
  },
  {
    title: "Au-delà du baby blues : comprendre et prévenir la dépression post-partum",
    excerpt:
      "Distinguer le baby blues passager de la vraie dépression post-partum : symptômes, facteurs de risque et prévention.",
    date: "2025-06-22",
    tag: "Santé",
    href: "https://medium.com/@otitossouemmanuel/au-del%C3%A0-du-baby-blues-comprendre-et-pr%C3%A9venir-la-d%C3%A9pression-post-partum-9965bc95deb1",
    image: a06,
  },
  {
    title: "Avortement : au-delà du débat, garantir un vrai choix",
    excerpt:
      "Sortir l'avortement du débat idéologique pour le ramener à l'essentiel : l'autonomie et la dignité des femmes.",
    date: "2025-04-01",
    tag: "Santé & droits",
    href: "https://medium.com/@otitossouemmanuel/avortement-au-del%C3%A0-du-d%C3%A9bat-garantir-un-vrai-choix-2701e26b407e",
    image: a07,
  },
  {
    title: "Il était une fois le renforcement des OSC du FODDEB à Bohicon",
    excerpt:
      "Retour sur un atelier de quatre jours pour renforcer les OSC sur la réforme territoriale et le rôle des collectivités.",
    date: "2023-12-28",
    tag: "Gouvernance",
    href: "https://medium.com/@otitossouemmanuel/il-%C3%A9tait-une-fois-le-renforcement-des-osc-membre-du-foddeb-%C3%A0-bohicon-ef9611cb5b03",
    image: a08,
  },
  {
    title: "Repenser la sexualité au-delà de la performance",
    excerpt:
      "Quand la quête de performance pousse à l'usage abusif d'aphrodisiaques : risques, dérives et pistes plus saines.",
    date: "2023-11-27",
    tag: "Bien-être",
    href: "https://medium.com/@otitossouemmanuel/repenser-la-sexualit%C3%A9-au-del%C3%A0-de-la-performance-face-aux-risques-que-repr%C3%A9sente-lusage-abusif-des-90a64bf10a57",
    image: a09,
  },
  {
    title: "Les différents types de contraceptifs et comment choisir",
    excerpt:
      "Hormonaux, mécaniques, naturels : un guide clair pour choisir la contraception adaptée à chaque situation.",
    date: "2023-06-12",
    tag: "Santé",
    href: "https://medium.com/@otitossouemmanuel/les-diff%C3%A9rents-types-de-contraceptifs-et-comment-choisir-celui-qui-convient-le-mieux-%C3%A0-chaque-2438f845c3b",
    image: a10,
  },
];
