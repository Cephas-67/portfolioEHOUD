import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "@/components/Reveal";
import { HeroShowcase } from "@/components/HeroShowcase";
import { Clock } from "@/components/Clock";
import { useIntroReady } from "@/components/IntroContext";
import DotField from "@/components/DotField";
import portrait from "@/assets/ehoud-hero.webp";

const fullName = "Ehoud Emmanuel OTI-TOSSOU";
const EASE = [0.16, 1, 0.3, 1] as const; // expo out : foncé puis arrivée qui se pose

// Lignes de vitesse (« effet sonic ») derrière le portrait quand il arrive.
const SPEED_LINES = [
  { top: "30%", w: "60%", h: 3, delay: 2.15 },
  { top: "42%", w: "85%", h: 5, delay: 2.1 },
  { top: "52%", w: "70%", h: 4, delay: 2.2 },
  { top: "63%", w: "90%", h: 6, delay: 2.12 },
  { top: "74%", w: "55%", h: 3, delay: 2.22 },
];

export default function Home() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const ready = useIntroReady(); // la chorégraphie n'enclenche qu'à la fin du loading
  // Le nom de fond ne démarre qu'après la chorégraphie d'arrivée du portrait.
  const [textRunning, setTextRunning] = useState(!!reduce);

  useEffect(() => {
    if (reduce || !ready) return;
    const id = window.setTimeout(() => setTextRunning(true), 2900);
    return () => window.clearTimeout(id);
  }, [reduce, ready]);

  return (
    <div className="theme-marine relative bg-theme-bg-primary text-theme-text-primary">
      {/* Fond interactif : champ de points qui réagit au curseur (React Bits).
          `fixed` = la grille ne couvre qu'un écran (perf), mais reste derrière toutes
          les sections au scroll. Le footer (relative z-10) passe par-dessus. */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <DotField
          dotRadius={1.5}
          dotSpacing={18}
          cursorRadius={220}
          bulgeStrength={60}
          sparkle={false}
          waveAmplitude={0}
          glowColor="transparent"
        />
      </div>

      <section className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
        {/* Nom complet qui défile en fond, H1, Bristone Hollow, même vitesse que SPACE (speed 80) */}
        <h1
          aria-label={fullName}
          className="pointer-events-none absolute inset-0 z-0 m-0 flex select-none items-center [contain:paint]"
        >
          <Marquee speed={80} gradient={false} autoFill play={textRunning}>
            {/* transform-gpu + will-change : le texte est mis en cache comme texture,
                il glisse sans se re-mélanger au DotField à chaque frame (fluidité scroll). */}
            <span className="hero-name mx-12 transform-gpu font-bold uppercase leading-none text-white/60 [will-change:transform] text-[clamp(7rem,22vw,18rem)]">
              {fullName}
            </span>
          </Marquee>
        </h1>

        {/* Horloge style iOS : placée dans la bande haute, entre le bas de la
            navbar (top-20) et le centre du hero (bottom-1/2), donc au-dessus du
            nom qui défile au lieu de se superposer à lui. */}
        <div className="pointer-events-none absolute inset-x-0 top-20 bottom-1/2 z-20 flex items-center justify-center px-4">
          {/* Sort d'une fente et monte vers sa place : un masque overflow-hidden
              (la fente) + l'horloge qui remonte depuis le bas (y 100% → 0).
              Chorégraphie : navbar (0.2) → logo (1.1) → horloge (1.5) → photo (2.2). */}
          <div className="-translate-x-[170px] -translate-y-10 overflow-hidden">
            <motion.div
              initial={reduce ? false : { y: "100%" }}
              animate={reduce ? undefined : ready ? { y: 0 } : { y: "100%" }}
              transition={{ delay: 1.5, duration: 1.3, ease: EASE }}
            >
              <Clock />
            </motion.div>
          </div>
        </div>

        {/* Portrait détouré, au-dessus du nom. Il arrive de la droite à vitesse
            fluide, avec des lignes de vitesse derrière, puis se pose. */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] justify-center px-4 md:justify-end lg:px-6">
          <div className="relative w-[min(80%,460px)] md:mr-[18px]">
            {/* Lignes de vitesse (« effet sonic ») derrière le portrait. */}
            {!reduce &&
              SPEED_LINES.map((line, i) => (
                <motion.span
                  key={i}
                  className="absolute right-0 -z-10 rounded-full bg-gradient-to-l from-[hsl(var(--sky))] to-transparent"
                  style={{ top: line.top, width: line.w, height: line.h }}
                  initial={{ opacity: 0, x: "30%" }}
                  animate={ready ? { opacity: [0, 1, 0], x: ["30%", "-120%"] } : { opacity: 0, x: "30%" }}
                  transition={{ delay: line.delay, duration: 0.6, ease: EASE }}
                />
              ))}
            <motion.img
              src={portrait}
              alt="Ehoud Emmanuel OTI-TOSSOU"
              className="h-auto w-full drop-shadow-2xl"
              loading="eager"
              initial={reduce ? false : { x: "120%", opacity: 0 }}
              animate={reduce ? undefined : ready ? { x: 0, opacity: 1 } : { x: "120%", opacity: 0 }}
              transition={{ delay: 2.2, duration: 1.3, ease: EASE }}
            />
          </div>
        </div>
      </section>

      {/* Galerie animée, aperçu des travaux qui défilent (signature HoH) */}
      <section className="relative z-10 py-16">
        <div className="mx-auto mb-10 max-w-[1400px] px-4 lg:px-6">
          <Reveal>
            <h2 className="max-w-3xl font-script text-4xl leading-tight sm:text-5xl lg:text-6xl">
              {t.work.title}
            </h2>
          </Reveal>
        </div>
        <HeroShowcase />
      </section>
    </div>
  );
}
