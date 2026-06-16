import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { NavLinkPill } from "./NavLinkPill";
import { cn } from "@/lib/utils";

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
  // flotte par-dessus — comme le modèle, pas de bande au-dessus du hero.
  return (
    <header className="sticky inset-x-0 top-0 z-30 h-0">
      <div className="mx-auto flex h-11 max-w-[1400px] items-stretch gap-1.5 px-3 pt-3 lg:px-4">
        {/* Logo / retour accueil */}
        <Link
          to="/"
          aria-label="Le Bleu Créatif — accueil"
          className="flex shrink-0 items-center rounded-full bg-theme-bg-secondary px-4 font-display text-sm italic leading-none text-theme-text-secondary"
        >
          Le Bleu Créatif
        </Link>

        {/* Navigation principale (puces pilule) */}
        <nav className="hidden flex-1 items-stretch overflow-hidden rounded-full lg:flex">
          {links.map((link) => (
            <NavLinkPill key={link.to} to={link.to}>
              {link.label}
            </NavLinkPill>
          ))}
        </nav>

        {/* Bascule de langue */}
        <button
          onClick={toggle}
          aria-label="Changer de langue"
          className="flex shrink-0 items-center rounded-full bg-theme-bg-secondary px-3 text-xs font-medium uppercase text-theme-text-secondary transition-colors hover:bg-theme-accent hover:text-theme-bg-primary"
        >
          {lang === "fr" ? "EN" : "FR"}
        </button>

        {/* CTA Contact */}
        <Link
          to="/contact"
          className={cn(
            "flex shrink-0 items-center rounded-full px-4 text-xs font-medium",
            "bg-theme-accent text-theme-bg-primary transition-colors hover:opacity-90",
          )}
        >
          {t.nav.contact}
        </Link>
      </div>
    </header>
  );
}
