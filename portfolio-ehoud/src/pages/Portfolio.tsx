import { useRef } from "react";
import Marquee from "react-fast-marquee";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { projects, type Project } from "@/data/projects";
import spaceHero from "@/assets/hero/space-hero.webp";

// Hero SPACE, clone fidèle du hero /spaces de HoHoney :
// section min-h-svh, image en fond avec PARALLAX subtil (≈80px) au scroll
// (même mécanisme --parallax-overflow que les affiches), teinte navy par-dessus,
// sous-titre + titre centrés, et marquee géant accent ancré en bas (translate-y-20%).
const PARALLAX = 80; // px de débordement haut/bas, comme --parallax-overflow-lg de HoH

function SpaceHero() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Progression de la section dans le viewport -> translateY du média.
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
      {/* Couche parallax (l'image déborde de PARALLAX px en haut/bas, translateY au scroll) */}
      <div className="absolute inset-0 -z-2 overflow-hidden">
        <motion.div
          className="absolute inset-x-0 -inset-y-20"
          style={reduce ? undefined : { y }}
        >
          <img src={spaceHero} alt="" aria-hidden="true" className="size-full object-cover" />
        </motion.div>
      </div>

      {/* Teinte navy par-dessus l'image pour la lisibilité du texte blanc */}
      <div className="pointer-events-none absolute inset-0 -z-1 bg-navy/50" />

      {/* Sous-titre centré (comme HoH, petit texte au-dessus du marquee) */}
      <div className="mx-auto flex max-w-[1054px] flex-col items-center gap-4 lg:gap-6">
        <p className="max-w-md text-center text-base uppercase tracking-[0.2em] sm:text-lg">
          {t.space.subtitle}
        </p>
      </div>

      {/* Marquee géant, exactement le style du nom qui défile sur Home, remonté un peu */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[8%] -z-1">
        <Marquee speed={80} gradient={false} autoFill>
          <span className="hero-name mx-12 font-bold uppercase leading-none text-white/60 text-[clamp(7rem,22vw,18rem)]">
            {t.space.marquee}
          </span>
        </Marquee>
      </div>
    </section>
  );
}

// Une affiche + sa légende (titre puis catégorie atténuée), comme le modèle.
function Poster({ project, ratio = 0.8 }: { project: Project; ratio?: number }) {
  return (
    <figure>
      <ParallaxImage src={project.src} alt={project.title} ratio={ratio} />
      <figcaption className="mt-4">
        <p className="truncate text-base text-theme-text-primary">{project.title}</p>
        <p className="truncate text-sm text-theme-text-primary/60">{project.category}</p>
      </figcaption>
    </figure>
  );
}

// Rangée de 3 affiches (comme l'ouverture et la clôture de /spaces).
function RowThree({ items }: { items: Project[] }) {
  return (
    <Section theme="marine" className="min-h-0">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 lg:gap-x-8">
        {items.map((p) => (
          <Poster key={p.title} project={p} />
        ))}
      </div>
    </Section>
  );
}

// Rangée texte + 2 affiches. `reverse` place le texte à droite et les images à gauche.
function RowTextTwo({
  title,
  text,
  items,
  reverse,
}: {
  title: string;
  text: string;
  items: Project[];
  reverse?: boolean;
}) {
  return (
    <Section theme="marine" className="min-h-0">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className={reverse ? "lg:order-2 lg:pl-8" : "lg:pr-8"}>
          <h2 className="font-script text-6xl leading-tight sm:text-7xl">{title}</h2>
          <p className="mt-5 max-w-md text-lg text-theme-text-primary/80">{text}</p>
        </Reveal>
        <div className={"grid grid-cols-2 gap-4 " + (reverse ? "lg:order-1" : "")}>
          <Poster project={items[0]} ratio={0.72} />
          <Poster project={items[1]} ratio={0.72} />
        </div>
      </div>
    </Section>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();

  return (
    <div className="theme-marine bg-theme-bg-primary text-theme-text-primary">
      {/* Hero plein écran qui se referme par le bas au scroll (effet HoHoney) */}
      <SpaceHero />

      {/* Séquence façon /spaces : 3 -> texte+2 -> 2+texte -> 3 */}
      <RowThree items={projects.slice(0, 3)} />
      <RowTextTwo title={t.space.blockTitle} text={t.space.blockText} items={projects.slice(3, 5)} />
      <RowTextTwo title={t.space.block2Title} text={t.space.block2Text} items={projects.slice(5, 7)} reverse />
      <RowThree items={projects.slice(7, 10)} />
    </div>
  );
}
