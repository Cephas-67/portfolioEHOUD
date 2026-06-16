import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { NavLinkPill } from "./NavLinkPill";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo-mark.png";

export function Header() {
  const { t, lang, toggle } = useLanguage();

  const links = [
    { to: "/a-propos", label: t.nav.about },
    { to: "/services", label: t.nav.services },
    { to: "/portfolio", label: t.nav.portfolio },
    { to: "/entrepreneuriat", label: t.nav.ventures },
    { to: "/articles", label: t.nav.articles },
  ];

  // Header en overlay (hauteur 0) : le contenu démarre tout en haut, la barre
  // flotte par-dessus, comme le modèle, pas de bande au-dessus du hero.
  return (
    <header className="sticky inset-x-0 top-0 z-30 h-0">
      <div className="flex h-16 items-center gap-3 px-4 pt-3 lg:px-6">
        {/* Logo à gauche, près du bord, sur la même ligne que la nav */}
        <Link to="/" aria-label="Le Bleu Créatif, accueil" className="mt-[6px] shrink-0">
          <img src={logo} alt="Le Bleu Créatif" className="h-14 w-auto md:h-20" />
        </Link>

        {/* Navigation principale (puces pilule), collée au logo, taille d'avant */}
        <nav className="hidden h-11 items-stretch overflow-hidden rounded-full lg:flex">
          {links.map((link) => (
            <NavLinkPill key={link.to} to={link.to}>
              {link.label}
            </NavLinkPill>
          ))}
        </nav>

        {/* Groupe d'actions repoussé tout à droite, par-dessus la photo */}
        <div className="ml-auto flex shrink-0 items-center gap-3">
          {/* Bascule de langue */}
          <button
            onClick={toggle}
            aria-label="Changer de langue"
            className="flex h-11 items-center rounded-full bg-theme-bg-secondary px-4 font-display text-sm uppercase text-theme-text-secondary transition-colors hover:bg-theme-accent hover:text-theme-bg-primary"
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>

          {/* CTA Contact */}
          <Link
            to="/contact"
            className={cn(
              "flex h-11 items-center rounded-full px-5 font-display text-sm",
              "cta-logo transition-opacity hover:opacity-90",
            )}
          >
            {t.nav.contact}
          </Link>
        </div>
      </div>
    </header>
  );
}
