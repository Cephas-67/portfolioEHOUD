import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FillButton } from "@/components/FillButton";
import { useLanguage } from "@/i18n/LanguageContext";
import { PageHero } from "@/components/PageHero";
import { services, type Service } from "@/data/services";
import heroImg from "@/assets/hero/pexels-steve-29808916.jpg";

// Page Offre : hero image + titre, puis empilement de cartes façon lenis.dev.
// Chaque carte est `sticky` : au scroll, la suivante monte et se pose par-dessus
// la précédente, qui se réduit légèrement (profondeur). Plus d'image : chaque
// carte a sa couleur pleine (charte) + un motif de croix noires qui tournent.

const STACK_OFFSET = 32; // px de décalage vertical entre deux cartes empilées.

// Motif réutilisé : grande croix épaisse, stroke = couleur courante (currentColor),
// pour pouvoir la teinter via le parent. Inspiré du motif "crosses".
function Cross({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 130" fill="none" aria-hidden="true" className={className}>
      <path d="M11 11L118.899 119M11.101 119L119 11" stroke="currentColor" strokeWidth={31} />
    </svg>
  );
}

function StackingCard({
  service,
  index,
  total,
  scrollProgress,
}: {
  service: Service;
  index: number;
  total: number;
  scrollProgress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();

  // Échelle finale une fois recouverte : plus la carte est profonde, plus elle
  // rétrécit. La dernière ne rétrécit jamais.
  const targetScale = 1 - (total - index) * 0.04;
  const scale = useTransform(scrollProgress, [index / total, 1], [1, targetScale]);

  if (reduce) {
    return (
      <div className="mb-6">
        <Card service={service} index={index} />
      </div>
    );
  }

  return (
    <div className="pointer-events-none sticky top-0 flex h-svh items-center justify-center">
      <motion.div
        style={{ scale, top: `${index * STACK_OFFSET}px` }}
        className="relative w-full origin-top transform-gpu will-change-transform [backface-visibility:hidden]"
      >
        <Card service={service} index={index} />
      </motion.div>
    </div>
  );
}

// Visuel de la carte : couleur pleine + croix tournantes en fond. Deux colonnes :
// texte éditorial à gauche, affiche réelle d'Ehoud posée à droite. Mêmes dimensions.
function Card({ service, index }: { service: Service; index: number }) {
  const { lang } = useLanguage();
  const copy = service[lang];
  const number = String(index + 1).padStart(2, "0");
  const cta = lang === "fr" ? "Travailler ensemble" : "Work together";

  return (
    <article
      className="pointer-events-auto relative mx-auto grid min-h-[72svh] w-full max-w-[1200px] grid-cols-1 gap-5 overflow-hidden rounded-[2rem] p-6 shadow-2xl lg:h-[72svh] lg:min-h-[460px] lg:grid-cols-[1fr_minmax(0,42%)] lg:items-stretch lg:gap-10 lg:p-12"
      style={{ backgroundColor: `hsl(var(${service.bg}))`, color: `hsl(var(${service.text}))` }}
    >
      {/* Motif : croix « encre » qui tournent, en fond. Couleur = celle du texte de
          la carte (currentColor) pour rester visible sur fond clair comme foncé.
          GPU-promues (will-change) pour que la rotation reste sur le compositor. */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Cross className="absolute -left-16 -top-16 w-56 opacity-[0.12] animate-spin [animation-duration:9s] will-change-transform motion-reduce:animate-none" />
        <Cross className="absolute -bottom-12 left-1/4 w-48 opacity-10 animate-spin [animation-duration:11s] will-change-transform motion-reduce:animate-none" />
      </div>

      {/* Colonne texte. */}
      <div className="relative z-10 flex min-w-0 flex-col justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-80">
          {number} · {copy.eyebrow}
        </p>

        <div className="mt-6 lg:mt-0">
          <h2 className="service-title text-[clamp(2rem,4.5vw,4rem)] uppercase leading-[0.95]">
            {copy.title}
          </h2>
          <p className="mt-5 max-w-md text-base opacity-85 lg:text-lg">{copy.text}</p>

          <FillButton to="/contact" color="hsl(var(--blue))" className="mt-7 h-12 rounded-lg px-6 font-bold">
            {cta}
          </FillButton>
        </div>
      </div>

      {/* Colonne affiche : visible dès le desktop. Cadre légèrement incliné qui se
          redresse au survol, ombre portée pour le détacher du fond coloré. */}
      <figure className="group/poster relative z-10 flex flex-col justify-center lg:justify-center">
        {/* Taille d'avant conservée. Effet Space : l'image glisse au scroll. */}
        <div
          className="overflow-hidden rounded-xl shadow-2xl ring-1 ring-[hsl(var(--svc-ink))]/10 transition-transform duration-500 ease-out [transform:rotate(-2deg)] group-hover/poster:[transform:rotate(0deg)_scale(1.02)]"
        >
          <img
            src={service.poster}
            alt={service.posterCaption[lang]}
            loading="lazy"
            decoding="async"
            className="h-full max-h-[30svh] w-full object-cover lg:max-h-[52svh]"
          />
        </div>
        <figcaption className="mt-3 text-xs uppercase tracking-[0.15em] opacity-70">
          {service.posterCaption[lang]}
        </figcaption>
      </figure>
    </article>
  );
}

export default function Services() {
  const { lang } = useLanguage();
  const stackRef = useRef<HTMLDivElement>(null);
  const hero =
    lang === "fr"
      ? { eyebrow: "Ce que je propose", title: "L'Offre" }
      : { eyebrow: "What I offer", title: "Services" };

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="theme-marine bg-grain text-theme-text-primary">
      {/* Hero image + titre, même format que les autres pages (/a-propos, /portfolio). */}
      <PageHero image={heroImg} eyebrow={hero.eyebrow} title={hero.title} />

      {/* Pile de cartes : une section `sticky` par service. */}
      <section ref={stackRef} className="relative px-4 pb-24 pt-4 lg:px-6">
        {services.map((service, index) => (
          <StackingCard
            key={service.fr.title}
            service={service}
            index={index}
            total={services.length}
            scrollProgress={scrollYProgress}
          />
        ))}
      </section>
    </div>
  );
}
