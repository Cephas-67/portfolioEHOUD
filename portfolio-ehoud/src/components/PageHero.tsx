import { useRef } from "react";
import Marquee from "react-fast-marquee";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Hero de page réutilisable, identique au hero SPACE : image de fond avec
// parallax subtil (≈80px), teinte navy, sous-titre centré, et grand marquee
// (style .hero-name, blanc 60%) ancré en bas. Sert pour /portfolio, /a-propos, etc.
const PARALLAX = 80;

type PageHeroProps = {
  image: string;
  eyebrow: string;
  title: string; // texte du grand marquee (ex. "ABOUT ME")
};

export function PageHero({ image, eyebrow, title }: PageHeroProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [PARALLAX, -PARALLAX]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-40 text-white lg:py-56"
    >
      {/* Couche parallax : l'image déborde de PARALLAX px en haut/bas. */}
      <div className="absolute inset-0 -z-2 overflow-hidden">
        <motion.div className="absolute inset-x-0 -inset-y-20" style={reduce ? undefined : { y }}>
          <img src={image} alt="" aria-hidden="true" className="size-full object-cover" />
        </motion.div>
      </div>

      {/* Teinte navy pour la lisibilité du texte blanc. */}
      <div className="pointer-events-none absolute inset-0 -z-1 bg-navy/50" />

      {/* Sous-titre centré (petit texte au-dessus du marquee). */}
      <div className="mx-auto flex max-w-[1054px] flex-col items-center gap-4 lg:gap-6">
        <p className="max-w-md text-center text-base uppercase tracking-[0.2em] sm:text-lg">{eyebrow}</p>
      </div>

      {/* Grand marquee ancré en bas, même style que SPACE/Home. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[8%] -z-1">
        <Marquee speed={80} gradient={false} autoFill>
          <span className="hero-name mx-12 transform-gpu font-bold uppercase leading-none text-white/60 [will-change:transform] text-[clamp(7rem,22vw,18rem)]">
            {title}
          </span>
        </Marquee>
      </div>
    </section>
  );
}
