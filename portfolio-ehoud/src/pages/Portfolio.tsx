import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  logos,
  brands,
  affiches,
  voeux,
  institutionnel,
  valentin,
  campagnes,
  prints,
  type Project,
} from "@/data/projects";
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
      className="relative isolate flex min-h-[100lvh] flex-col items-center justify-center overflow-hidden px-6 py-40 text-white lg:py-56"
    >
      {/* Couche parallax (l'image déborde de PARALLAX px en haut/bas, translateY au scroll).
          Hero = LCP : eager + fetchpriority high pour démarrer la requête au plus tôt,
          decoding async pour ne pas bloquer le 1er paint, dimensions explicites pour
          que le navigateur réserve la zone sans CLS. */}
      <div className="absolute inset-0 -z-2 overflow-hidden">
        <motion.div
          className="absolute inset-x-0 -inset-y-20"
          style={reduce ? undefined : { y, willChange: "transform" }}
        >
          <img
            src={spaceHero}
            alt=""
            aria-hidden="true"
            loading="eager"
            // fetchpriority est valide HTML mais pas encore dans les types React stricts
            // → @ts-expect-error tolère l'attribut DOM.
            // @ts-expect-error fetchpriority non typé
            fetchpriority="high"
            decoding="async"
            width={1920}
            height={2879}
            className="size-full object-cover"
          />
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

// Seules les affiches (et déclinaisons) s'agrandissent au clic. Les logos et
// identités sont déjà parfaitement lisibles : pas de prévisualisation pour eux.
function isZoomable(p: Project) {
  return p.category !== "Logos" && p.category !== "Identité";
}

// Une affiche + sa légende (titre puis catégorie atténuée), comme le modèle.
// Chaque visuel garde son propre ratio (un logo large n'est pas rogné comme un carré).
function Poster({ project, onOpen }: { project: Project; onOpen?: (p: Project) => void }) {
  const zoom = onOpen && isZoomable(project);
  return (
    <figure>
      {zoom ? (
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`Agrandir : ${project.title}`}
          className="group/zoom block w-full cursor-zoom-in text-left"
        >
          <ParallaxImage src={project.src} alt={project.title} ratio={project.ratio} />
        </button>
      ) : (
        <ParallaxImage src={project.src} alt={project.title} ratio={project.ratio} />
      )}
      <figcaption className="mt-4">
        <p className="truncate text-base text-theme-text-primary">{project.title}</p>
        <p className="truncate text-sm text-theme-text-primary/60">{project.category}</p>
      </figcaption>
    </figure>
  );
}

// Rangée de 3 affiches (comme l'ouverture et la clôture de /spaces).
function RowThree({ items, onOpen }: { items: Project[]; onOpen?: (p: Project) => void }) {
  return (
    <Section theme="marine" className="min-h-0">
      <div className="grid grid-cols-1 items-start gap-y-16 lg:grid-cols-3 lg:gap-x-8">
        {items.map((p) => (
          <Poster key={p.title} project={p} onOpen={onOpen} />
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
  onOpen,
}: {
  title: string;
  text: string;
  items: Project[];
  reverse?: boolean;
  onOpen?: (p: Project) => void;
}) {
  return (
    <Section theme="marine" className="min-h-0">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className={reverse ? "lg:order-2 lg:pl-8" : "lg:pr-8"}>
          <h2 className="font-script text-6xl leading-tight sm:text-7xl">{title}</h2>
          <p className="mt-5 max-w-md text-lg text-theme-text-primary/80">{text}</p>
        </Reveal>
        <div className={"grid grid-cols-2 items-start gap-4 " + (reverse ? "lg:order-1" : "")}>
          <Poster project={items[0]} onOpen={onOpen} />
          <Poster project={items[1]} onOpen={onOpen} />
        </div>
      </div>
    </Section>
  );
}

// Aperçu plein écran d'une affiche : fond sombre, image entière, fermeture au clic
// hors image, au bouton ou via Échap. Le scroll de la page est bloqué pendant l'aperçu.
function Lightbox({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-navy/90 p-4 backdrop-blur-sm md:p-10"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer l'aperçu"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white transition-colors hover:bg-white/20 md:right-8 md:top-8"
          >
            ×
          </button>
          <motion.figure
            className="flex max-h-full flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={project.src}
              alt={project.title}
              decoding="async"
              className="max-h-[82vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />
            <figcaption className="text-center text-white">
              <span className="text-base">{project.title}</span>
              <span className="ml-2 text-sm text-white/60">{project.category}</span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();
  const s = t.space.story;
  // Affiche en aperçu plein écran (null = aucun). Les logos ne sont pas concernés.
  const [active, setActive] = useState<Project | null>(null);
  const open = setActive;

  return (
    <div className="theme-marine bg-grain text-theme-text-primary">
      {/* Hero plein écran qui se referme par le bas au scroll (effet HoHoney) */}
      <SpaceHero />

      {/* Même rythme que /spaces, prolongé sur toute la collection : 3 affiches en
          ouverture, blocs « 2 + description » en alternance, 3 affiches en clôture. */}
      <RowThree items={[affiches[0], affiches[1], affiches[2]]} onOpen={open} />

      <RowTextTwo title={s[0].title} text={s[0].text} items={[affiches[3], voeux[3]]} onOpen={open} />
      <RowTextTwo title={s[1].title} text={s[1].text} items={[voeux[4], voeux[5]]} reverse onOpen={open} />

      <RowThree items={[logos[0], logos[1], logos[2]]} onOpen={open} />

      <RowTextTwo title={s[2].title} text={s[2].text} items={[valentin[0], valentin[1]]} onOpen={open} />

      <RowThree items={[brands[0], brands[1], brands[2]]} onOpen={open} />

      <RowTextTwo title={s[3].title} text={s[3].text} items={[valentin[2], valentin[3]]} reverse onOpen={open} />

      <RowThree items={[logos[3], logos[4], logos[5]]} onOpen={open} />

      <RowTextTwo title={s[4].title} text={s[4].text} items={[institutionnel[0], institutionnel[1]]} onOpen={open} />

      <RowThree items={[campagnes[2], campagnes[3], campagnes[4]]} onOpen={open} />

      <RowTextTwo title={s[5].title} text={s[5].text} items={[institutionnel[2], institutionnel[3]]} reverse onOpen={open} />

      <RowThree items={[logos[6], logos[7], logos[8]]} onOpen={open} />

      <RowTextTwo title={s[6].title} text={s[6].text} items={[valentin[4], valentin[5]]} onOpen={open} />

      <RowThree items={[campagnes[5], campagnes[6], campagnes[7]]} onOpen={open} />

      <RowTextTwo title={s[7].title} text={s[7].text} items={[campagnes[0], campagnes[1]]} reverse onOpen={open} />

      <RowThree items={[prints[0], prints[1], prints[2]]} onOpen={open} />

      <RowTextTwo title={s[8].title} text={s[8].text} items={[prints[3], prints[4]]} onOpen={open} />

      {/* Clôture : 3 affiches (vœux), comme l'ouverture. */}
      <RowThree items={[voeux[0], voeux[1], voeux[2]]} onOpen={open} />

      <Lightbox project={active} onClose={() => setActive(null)} />
    </div>
  );
}
