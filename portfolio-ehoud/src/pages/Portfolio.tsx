import Marquee from "react-fast-marquee";
import { Section } from "@/components/layout/Section";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import spaceHero from "@/assets/hero/space-hero.webp";
import imgA from "@/assets/portfolio/affiche-valentin.webp";
import imgB from "@/assets/portfolio/taka-pro-league.webp";

export default function Portfolio() {
  const { t } = useLanguage();

  return (
    <div className="theme-marine bg-theme-bg-primary text-theme-text-primary">
      {/* Hero plein écran : image bleutée + petit texte centré haut + titre géant bleu */}
      <section className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden">
        <img src={spaceHero} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-navy/55 mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 bg-blue/20 mix-blend-screen" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/60" />

        {/* Petit texte centré, en haut */}
        <p className="absolute inset-x-0 top-[20%] mx-auto max-w-md px-6 text-center text-base text-white/85 sm:text-lg">
          {t.space.subtitle}
        </p>

        {/* Titre géant qui défile — bleu, police payante (Bristone Display) */}
        <div className="absolute inset-x-0">
          <Marquee speed={80} gradient={false} autoFill>
            <span className="mx-12 font-poster uppercase leading-[0.85] text-blue text-[clamp(5rem,19vw,30rem)]">
              {t.space.marquee}
            </span>
          </Marquee>
        </div>
      </section>

      {/* Section : deux images à gauche + texte à droite, sur bleu */}
      <Section theme="marine" className="min-h-0">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="grid grid-cols-2 gap-4">
            <ParallaxImage src={imgA} alt="" ratio={0.72} />
            <ParallaxImage src={imgB} alt="" ratio={0.72} className="mt-10" />
          </div>
          <Reveal className="lg:pl-8">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">{t.space.blockTitle}</h2>
            <p className="mt-5 max-w-md text-lg text-theme-text-primary/80">{t.space.blockText}</p>
          </Reveal>
        </div>
      </Section>

      {/* Grille décalée 3 colonnes sur fond bleu, parallax au scroll */}
      <Section theme="marine" className="min-h-0 pt-0">
        <ProjectGrid />
      </Section>
    </div>
  );
}
