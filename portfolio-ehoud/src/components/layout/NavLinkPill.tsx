import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

type NavLinkPillProps = {
  to: string;
  children: React.ReactNode;
};

// Signature visuelle reprise du modèle : chaque lien est une puce qui passe
// de rectangle à pilule au survol (transition douce), et reste en pilule
// pleine quand sa route est active.
export function NavLinkPill({ to, children }: NavLinkPillProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex h-full items-center justify-center px-6 font-display text-sm",
          "rounded-none transition-all duration-400 ease-in-out",
          "bg-theme-bg-secondary text-theme-text-secondary",
          "hover:rounded-full hover:bg-theme-accent hover:text-theme-bg-primary",
          isActive && "rounded-full bg-theme-accent text-theme-bg-primary",
        )
      }
    >
      {children}
    </NavLink>
  );
}
