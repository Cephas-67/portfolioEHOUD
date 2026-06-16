import Marquee from "react-fast-marquee";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "@/components/Reveal";
import { HeroShowcase } from "@/components/HeroShowcase";
import DotField from "@/components/DotField";
import portrait from "@/assets/ehoud-hero.webp";

const fullName = "Ehoud Emmanuel OTI-TOSSOU";

export default function Home() {
  const { t } = useLanguage();

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
          <Marquee speed={80} gradient={false} autoFill>
            {/* transform-gpu + will-change : le texte est mis en cache comme texture,
                il glisse sans se re-mélanger au DotField à chaque frame (fluidité scroll). */}
            <span className="hero-name mx-12 transform-gpu font-bold uppercase leading-none text-white/60 [will-change:transform] text-[clamp(7rem,22vw,18rem)]">
              {fullName}
            </span>
          </Marquee>
        </h1>

        {/* Portrait détouré, au-dessus du nom */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] justify-center px-4 md:justify-end lg:px-6">
          <img
            src={portrait}
            alt="Ehoud Emmanuel OTI-TOSSOU"
            className="h-auto w-[min(80%,460px)] drop-shadow-2xl md:mr-[18px]"
            loading="eager"
          />
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
