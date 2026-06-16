import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { NavLinkPill } from "./NavLinkPill";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo-bc.webp";

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
      <div className="mx-auto flex h-14 max-w-[1400px] items-stretch gap-2 px-3 pt-4 lg:px-5">
        {/* Logo / retour accueil */}
        <Link
          to="/"
          aria-label="Le Bleu Créatif — accueil"
          className="flex shrink-0 items-center pr-2"
        >
          <img src={logo} alt="Le Bleu Créatif" className="h-12 w-auto drop-shadow" />
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
          className="flex shrink-0 items-center rounded-full bg-theme-bg-secondary px-4 font-poster text-sm uppercase text-theme-text-secondary transition-colors hover:bg-theme-accent hover:text-theme-bg-primary"
        >
          {lang === "fr" ? "EN" : "FR"}
        </button>

        {/* CTA Contact */}
        <Link
          to="/contact"
          className={cn(
            "flex shrink-0 items-center rounded-full px-5 font-poster text-sm",
            "bg-theme-accent text-theme-bg-primary transition-colors hover:opacity-90",
          )}
        >
          {t.nav.contact}
        </Link>
      </div>
    </header>
  );
}
