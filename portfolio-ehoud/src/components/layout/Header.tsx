import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { NavLinkPill } from "./NavLinkPill";
import { FillButton } from "@/components/FillButton";
import { useIntroReady } from "@/components/IntroContext";
import logo from "@/assets/logo-mark.png";

// Courbe « expo out » : départ rapide, arrivée qui se pose en douceur (glissé Lenis).
const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const { t, lang, toggle } = useLanguage();
  const reduce = useReducedMotion();
  const ready = useIntroReady(); // la chorégraphie n'enclenche qu'à la fin du loading

  const links = [
    { to: "/a-propos", label: t.nav.about },
    { to: "/services", label: t.nav.services },
    { to: "/portfolio", label: t.nav.portfolio },
    { to: "/entrepreneuriat", label: t.nav.ventures },
    { to: "/articles", label: t.nav.articles },
  ];

  // Chorégraphie de chargement : la barre descend du haut, puis le logo glisse
  // depuis la gauche, l'un après l'autre. Désactivée si « réduire les animations ».
  const fromTop = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: -80, opacity: 0 },
          animate: ready ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 },
          transition: { delay, duration: 1.3, ease: EASE },
        };
  const fromLeft = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { x: -120, opacity: 0 },
          animate: ready ? { x: 0, opacity: 1 } : { x: -120, opacity: 0 },
          transition: { delay, duration: 1.3, ease: EASE },
        };

  // Header en overlay (hauteur 0) : le contenu démarre tout en haut, la barre
  // flotte par-dessus, comme le modèle, pas de bande au-dessus du hero.
  return (
    <header className="sticky inset-x-0 top-0 z-30 h-0">
      <div className="flex h-16 items-center gap-3 px-4 pt-3 lg:px-6">
        {/* Logo à gauche : glisse depuis la gauche, APRÈS la barre (delay 1.1s) */}
        <motion.div className="mt-[6px] shrink-0" {...fromLeft(1.1)}>
          <Link to="/" aria-label="Le Bleu Créatif, accueil">
            <img src={logo} alt="Le Bleu Créatif" className="h-14 w-auto md:h-20" />
          </Link>
        </motion.div>

        {/* Navigation principale (puces pilule) : descend du haut en premier */}
        <motion.nav
          className="hidden h-11 items-stretch overflow-hidden rounded-full lg:flex"
          {...fromTop(0.2)}
        >
          {links.map((link) => (
            <NavLinkPill key={link.to} to={link.to}>
              {link.label}
            </NavLinkPill>
          ))}
        </motion.nav>

        {/* Groupe d'actions repoussé tout à droite, par-dessus la photo */}
        <motion.div className="ml-auto flex shrink-0 items-center gap-3" {...fromTop(0.35)}>
          {/* Bascule de langue */}
          <button
            onClick={toggle}
            aria-label="Changer de langue"
            className="flex h-11 items-center rounded-full bg-theme-bg-secondary px-4 font-display text-sm uppercase text-theme-text-secondary transition-colors hover:bg-theme-accent hover:text-theme-bg-primary"
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>

          {/* CTA Contact : effet lenis.dev (remplissage blanc directionnel, texte
              qui passe au bleu du logo). */}
          <FillButton to="/contact" color="hsl(var(--logo))" className="h-11 px-5 font-display text-sm">
            {t.nav.contact}
          </FillButton>
        </motion.div>
      </div>
    </header>
  );
}
