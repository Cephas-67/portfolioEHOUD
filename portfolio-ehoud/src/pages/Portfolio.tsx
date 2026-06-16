import Marquee from "react-fast-marquee";
import { Section } from "@/components/layout/Section";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { projects, type Project } from "@/data/projects";
import spaceHero from "@/assets/hero/space-hero.webp";

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
          <h2 className="font-poster uppercase text-3xl leading-tight sm:text-4xl">{title}</h2>
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
      {/* Hero plein écran : image bleutée + petit texte centré haut + titre géant bleu */}
      <section className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden">
        <img src={spaceHero} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
        {/* Léger dégradé bas uniquement, pour le petit texte — l'image reste nette. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/40 to-transparent" />

        <p className="absolute inset-x-0 top-[20%] mx-auto max-w-md px-6 text-center text-base text-white/90 sm:text-lg">
          {t.space.subtitle}
        </p>

        {/* Titre géant qui défile — bleu clair lisible, Bristone Bold (police payante) */}
        <div className="absolute inset-x-0">
          <Marquee speed={80} gradient={false} autoFill>
            <span className="mx-12 font-poster uppercase leading-[0.85] text-navy text-[clamp(5rem,19vw,30rem)]">
              {t.space.marquee}
            </span>
          </Marquee>
        </div>
      </section>

      {/* Séquence façon /spaces : 3 -> texte+2 -> 2+texte -> 3 */}
      <RowThree items={projects.slice(0, 3)} />
      <RowTextTwo title={t.space.blockTitle} text={t.space.blockText} items={projects.slice(3, 5)} />
      <RowTextTwo title={t.space.block2Title} text={t.space.block2Text} items={projects.slice(5, 7)} reverse />
      <RowThree items={projects.slice(7, 10)} />
    </div>
  );
}
