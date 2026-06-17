import { useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Bouton avec l'effet de survol de lenis.dev : un fond blanc se remplit depuis le
// bord par lequel le curseur entre (haut ou bas) et repart vers le bord par lequel
// il sort. Au survol, le texte prend la couleur de repos du bouton (`color`).
//
// `color` = couleur de fond au repos ET couleur du texte une fois rempli en blanc.
// `to`    = si fourni, rend un <Link> react-router, sinon un <button>.
type FillButtonProps = {
  children: React.ReactNode;
  className?: string;
  color?: string;
  to?: string; // route interne (react-router)
  href?: string; // lien externe (nouvelle fenêtre)
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">;

export function FillButton({
  children,
  className,
  color = "hsl(var(--blue))",
  to,
  href,
  ...rest
}: FillButtonProps) {
  const fillRef = useRef<HTMLSpanElement>(null);

  // Place le voile blanc juste au-delà du bord d'entrée, puis le fait glisser à 0.
  function enter(e: React.MouseEvent<HTMLElement>) {
    const fill = fillRef.current;
    if (!fill) return;
    const r = e.currentTarget.getBoundingClientRect();
    const fromTop = e.clientY - r.top < r.height / 2;
    fill.style.transition = "none";
    fill.style.transform = `translateY(${fromTop ? "-101%" : "101%"})`;
    void fill.offsetHeight; // reflow : la position de départ est appliquée avant l'anim
    fill.style.transition = "transform 0.7s cubic-bezier(0.19,1,0.22,1)";
    fill.style.transform = "translateY(0)";
  }

  // Renvoie le voile vers le bord par lequel le curseur sort.
  function leave(e: React.MouseEvent<HTMLElement>) {
    const fill = fillRef.current;
    if (!fill) return;
    const r = e.currentTarget.getBoundingClientRect();
    const toTop = e.clientY - r.top < r.height / 2;
    fill.style.transition = "transform 0.7s cubic-bezier(0.19,1,0.22,1)";
    fill.style.transform = `translateY(${toTop ? "-101%" : "101%"})`;
  }

  const classes = cn(
    "group relative isolate inline-flex items-center justify-center overflow-hidden",
    "rounded-full font-semibold text-white",
    className,
  );
  const style = { backgroundColor: color, ["--fb" as string]: color };

  const content = (
    <>
      {/* Voile blanc qui se remplit/se vide selon la direction du curseur. */}
      <span
        ref={fillRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-white"
        style={{ transform: "translateY(101%)" }}
      />
      {/* Texte : passe à la couleur de repos quand le fond devient blanc. */}
      <span className="relative z-10 transition-colors duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:text-[var(--fb)]">
        {children}
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} style={style} onMouseEnter={enter} onMouseLeave={leave}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        style={style}
        onMouseEnter={enter}
        onMouseLeave={leave}
      >
        {content}
      </a>
    );
  }
  return (
    <button className={classes} style={style} onMouseEnter={enter} onMouseLeave={leave} {...rest}>
      {content}
    </button>
  );
}
