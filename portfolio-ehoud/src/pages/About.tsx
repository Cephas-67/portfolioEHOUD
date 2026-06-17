import { useRef } from "react";
import Marquee from "react-fast-marquee";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { PageHero } from "@/components/PageHero";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";

import heroImg from "@/assets/hero/pexels-steve-29708294.jpg";
import perspectiveImg from "@/assets/hero/perspective-dark.webp";
import ehoudSuit from "@/assets/ehoud-suit-centered.png";
import ehoudLaptop from "@/assets/ehoud-laptop.webp";
import ehoudBomber from "@/assets/ehoud-bomber-cut.webp";
import doIdentity from "@/assets/portfolio/cojas-bleu.webp";
import doPosters from "@/assets/portfolio/cojas-magenta.webp";
import doSocial from "@/assets/portfolio/cojas-violet.webp";

// Grands titres = Pinyon Script (font-script), casse normale (le script ne se met
// pas en capitales). Échelle reprise de House of Honey (title-*/body-* -> clamps),
// légèrement agrandie car un script lit plus petit.
const TITLE_BIG = "font-script leading-[1.05] text-[clamp(2.75rem,5.5vw,4.5rem)]";
const TITLE_MED = "font-script leading-[1.1] text-[clamp(2rem,3.5vw,3.25rem)]";
const TITLE_SMALL = "font-script leading-[1.1] text-[clamp(1.75rem,2.6vw,2.5rem)]";
const QUOTE = "font-script leading-[1.2] text-[clamp(1.5rem,2.4vw,2.1rem)]";
const BODY_30 = "text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.6]";
const EYEBROW = "text-sm uppercase tracking-[0.2em] text-theme-accent";

// « Notre perspective » : reproduction exacte de la section studio HoH.
// Structure HoH : section `min-h-svh lg:min-h-[150svh]` avec padding vertical 96px,
// image de fond en parallax sur toute la section, et un bloc texte `sticky top-96px`
// qui se cale en haut du viewport puis y reste pendant toute la traversée de la
// section (haute). C'est la section qui défile derrière le texte épinglé qui donne
// la sensation de scroll. Le filet se dessine en scaleX, les lignes se calent une à une.
function Perspective() {
  const { t } = useLanguage();
  const a = t.about;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Suivi du scroll sur la SECTION entière : le fond défile en continu pendant
  // tout le pin (le texte, lui, reste figé via `sticky`).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Parallax du fond, assez marqué pour bien sentir « la page qui continue à défiler ».
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const ruleScaleX = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);

  const lines = [a.perspectiveP1, a.perspectiveP2, a.perspectiveP3, a.perspectiveP4];

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[160svh] px-4 py-24 text-white lg:px-6"
    >
      {/* Image de fond en parallax, sur toute la hauteur de la section. */}
      <div className="absolute inset-0 -z-2 overflow-hidden">
        <motion.div className="absolute inset-x-0 -inset-y-16" style={reduce ? undefined : { y: bgY }}>
          <img src={perspectiveImg} alt="" aria-hidden="true" className="size-full object-cover" />
        </motion.div>
      </div>
      {/* Voile navy léger : l'image est déjà sombre (assombrie en amont), comme HoH. */}
      <div className="pointer-events-none absolute inset-0 -z-1 bg-navy/40" />

      {/* Bloc texte épinglé : se cale à 96px du haut (sous le nav) et y reste figé
          tant que la section défile ; il se relâche quand le bas de la section arrive. */}
      <div className="sticky top-24 text-white">
        {/* Filet horizontal animé (scaleX depuis la gauche). */}
        <motion.div
          className="mb-8 h-px origin-left bg-white/40"
          style={reduce ? undefined : { scaleX: ruleScaleX }}
        />

        {/* Intitulé calé à gauche (col-span-8, comme le modèle). */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <p className={`uppercase tracking-[0.2em] lg:col-span-8 ${BODY_30}`}>
            {a.perspectiveEyebrow}
          </p>
        </div>

        {/* Manifeste calé à droite (col-start-8), display en capitales. Police et
            interligne resserrés + colonne un peu plus large : le bloc doit TENIR
            dans la hauteur d'écran, sinon le `sticky` ne peut pas rester figé. */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-[0.4em] font-display uppercase leading-[1.15] text-[clamp(1.125rem,1.8vw,1.6rem)] lg:col-span-5 lg:col-start-8">
            {lines.map((line, i) => (
              <motion.p
                key={line}
                initial={reduce ? undefined : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Entrée du portrait au sortir du hero : il arrive du bas en montant vers la
// gauche, jusqu'à sa position finale, piloté par le scroll (entrée de carte).
function PortraitIntro({ src, alt }: { src: string; alt: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [0, 1]);

  return (
    <div ref={ref} className="flex items-end justify-center lg:order-last">
      <motion.img
        src={src}
        alt={alt}
        style={reduce ? undefined : { x, y, opacity }}
        className="h-auto w-full max-w-[460px] object-contain drop-shadow-2xl"
      />
    </div>
  );
}

// Rideau « blocs » façon kevinkouakou.com : l'écran navy est fait de N colonnes
// verticales qui se retirent en DÉCALÉ (stagger), alternées haut/bas, pour révéler
// le blanc. Au scroll inverse elles reviennent (le rideau se referme).
const REVEAL_COLS = 6;

function RevealColumn({ index, progress }: { index: number; progress: MotionValue<number> }) {
  // Chaque colonne part un peu après la précédente (effet séquentiel).
  const start = 0.7 + index * 0.022;
  const y = useTransform(progress, [start, start + 0.18], ["0%", index % 2 === 0 ? "-101%" : "101%"]);
  return (
    <motion.div
      style={{ y, left: `${(index / REVEAL_COLS) * 100}%`, width: `calc(${100 / REVEAL_COLS}% + 1px)` }}
      className="absolute top-0 z-20 h-full bg-navy"
    />
  );
}

// Séquence scroll façon lenis.dev : section très haute, panneau épinglé. Au scroll :
// 1) photo, 2) le texte vient de très loin et fonce jusqu'à remplir l'écran,
// 3) le rideau « blocs » s'ouvre et révèle le blanc, 4) texte ÉPINGLÉ.
function ScrollShowcase() {
  const { t } = useLanguage();
  const a = t.about;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Plages très étalées (~760vh) : tout glisse lentement, façon lenis.
  // Phase 1 — photo qui s'installe d'abord (sur navy).
  const photoScale = useTransform(scrollYProgress, [0, 0.28], [1.18, 1]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.06, 0.26, 0.34], [0, 1, 1, 0]);
  // Phase 2 — le texte VIENT DE TRÈS LOIN (0.16), se rapproche lentement jusqu'à la
  // taille lisible (1.1), puis FONCE jusqu'à remplir l'écran (10), tenu, puis
  // disparaît seulement une fois tout près.
  const zoomScale = useTransform(scrollYProgress, [0.08, 0.42, 0.66], [0.16, 1.1, 16]);
  const zoomOpacity = useTransform(scrollYProgress, [0.08, 0.24, 0.6, 0.68], [0, 1, 1, 0]);
  // Phase 3 — le blanc se cale (petit zoom qui se pose) pendant l'ouverture des blocs.
  const revealScale = useTransform(scrollYProgress, [0.7, 0.96], [1.1, 1]);
  // Phase 4 — texte sur le blanc.
  const pinnedOpacity = useTransform(scrollYProgress, [0.9, 0.99], [0, 1]);
  const pinnedY = useTransform(scrollYProgress, [0.9, 0.99], [40, 0]);

  // Sans animation : on montre simplement la photo et le texte final, sans scroll-jacking.
  if (reduce) {
    return (
      <section className="flex min-h-svh flex-col items-center justify-center gap-8 bg-navy px-4 py-24 text-center text-white lg:px-6">
        <img src={ehoudBomber} alt="Ehoud Emmanuel OTI-TOSSOU" className="h-[50vh] w-auto object-contain" />
        <p className="font-display text-[clamp(1.5rem,4vw,3rem)] uppercase leading-tight">
          {a.showcaseZoomA} {a.showcaseZoomB}
        </p>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[760vh] bg-navy">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        {/* Plan du fond (révélé quand les panneaux s'ouvrent) : blanc + texte. */}
        <motion.div
          style={{ scale: revealScale }}
          className="absolute inset-0 z-0 flex items-center justify-center bg-white"
        >
          <motion.p
            style={{ opacity: pinnedOpacity, y: pinnedY }}
            className="max-w-[18ch] px-4 text-center font-display uppercase leading-[1.05] text-navy text-[clamp(1.75rem,5vw,4rem)]"
          >
            {a.showcasePinned}
          </motion.p>
        </motion.div>

        {/* Rideau « blocs » façon kevinkouakou : colonnes navy qui se retirent en
            décalé (alternées haut/bas) pour révéler le blanc. */}
        {Array.from({ length: REVEAL_COLS }).map((_, i) => (
          <RevealColumn key={i} index={i} progress={scrollYProgress} />
        ))}

        {/* Photo d'Ehoud, posée sur les panneaux navy fermés (phase 1). */}
        <motion.img
          src={ehoudBomber}
          alt="Ehoud Emmanuel OTI-TOSSOU"
          style={{ scale: photoScale, opacity: photoOpacity }}
          className="absolute bottom-0 z-30 h-[78vh] w-auto object-contain drop-shadow-2xl"
        />

        {/* Texte qui vient de loin et se rapproche (phase 2). Wrapper plein écran
            centré → le zoom part du centre et remplit l'écran proprement. */}
        <motion.div
          style={{ scale: zoomScale, opacity: zoomOpacity }}
          className="absolute inset-0 z-40 flex items-center justify-center"
        >
          <div className="px-4 text-center font-display uppercase leading-[0.95] text-white text-[clamp(2.5rem,9vw,8rem)]">
            <span className="block">{a.showcaseZoomA}</span>
            <span className="block text-[hsl(var(--sky))]">{a.showcaseZoomB}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function About() {
  const { t } = useLanguage();
  const a = t.about;

  const doItems = [
    { title: a.do1, img: doIdentity },
    { title: a.do2, img: doPosters },
    { title: a.do3, img: doSocial },
  ];

  return (
    <div className="theme-marine bg-theme-bg-primary text-theme-text-primary">
      <PageHero image={heroImg} eyebrow={a.heroEyebrow} title={a.heroTitle} />

      {/* A — L'auteur : infos à gauche, portrait détouré à droite, posé sur le navy
          (cœur de la page studio HoH). Fond navy, même bleu que Home/Space. */}
      <section className="bg-theme-bg-primary px-4 py-24 text-theme-text-primary lg:px-6 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <p className={EYEBROW}>{a.studioEyebrow}</p>
            <h2 className={TITLE_BIG}>{a.studioTitle}</h2>
            <p className={BODY_30}>{a.statementP1}</p>
            <p className={BODY_30}>{a.statementP2}</p>
          </Reveal>
          {/* Portrait détouré qui arrive du bas en montant vers la gauche au scroll
              (entrée au sortir du hero), puis se pose à sa position finale. */}
          <PortraitIntro src={ehoudSuit} alt="Ehoud Emmanuel OTI-TOSSOU" />
        </div>
      </section>

      {/* Séquence scroll (zoom texte → blanc qui s'élargit → texte épinglé), après
          la photo en veste bleue, façon lenis.dev. */}
      <ScrollShowcase />

      {/* B — Déclaration sur FOND BLANC : enchaîne directement le blanc plein écran
          de la fin de séquence. Texte navy, citation en bleu. */}
      <section className="bg-white px-4 py-24 text-navy lg:px-6 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <Reveal className="lg:col-span-8">
            <h2 className={TITLE_BIG}>{a.statementTitle}</h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className={`text-[hsl(var(--blue))] ${QUOTE}`}>« {a.studioQuote} »</p>
          </Reveal>
        </div>
      </section>

      {/* Notre perspective : manifeste sticky sur image sombre (clone fidèle HoH). */}
      <Perspective />

      {/* B2 — Après la perspective : photo au travail à gauche, texte à droite
          (deuxième photo du studio, schéma image+texte comme la page studio HoH). */}
      <section className="bg-theme-bg-primary px-4 py-24 text-theme-text-primary lg:px-6 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ParallaxImage
            src={ehoudLaptop}
            alt="Ehoud Emmanuel OTI-TOSSOU au travail"
            ratio={0.82}
          />
          <Reveal className="flex flex-col gap-6">
            <p className={EYEBROW}>{a.studioEyebrow}</p>
            <h2 className={TITLE_BIG}>{a.atelierTitle}</h2>
            <p className={BODY_30}>{a.studioText}</p>
          </Reveal>
        </div>
      </section>

      {/* C — « Ce que je fais » : rangée d'images titrées (titre script centré par visuel). */}
      <section className="bg-theme-bg-primary px-4 pb-24 text-theme-text-primary lg:px-6 lg:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className={`mb-12 text-center ${EYEBROW}`}>{a.doEyebrow}</p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {doItems.map((item) => (
              <Reveal key={item.title} className="flex flex-col">
                <h3 className={`mb-5 text-center ${TITLE_SMALL}`}>{item.title}</h3>
                <ParallaxImage src={item.img} alt={item.title} ratio={0.82} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* D — Clôture : déclaration centrée (script) + grand marquee accent (fond navy). */}
      <section className="overflow-hidden bg-theme-bg-primary px-4 pt-24 text-theme-text-primary lg:px-6 lg:pt-32">
        <Reveal className="mx-auto max-w-[1054px]">
          <p className={`text-center ${EYEBROW}`}>{a.closingEyebrow}</p>
          <p className={`mx-auto mt-6 text-center ${TITLE_MED}`}>{a.closingStatement}</p>
        </Reveal>
        <div className="pointer-events-none mt-16">
          <Marquee speed={80} gradient={false} autoFill>
            <span className="hero-name mx-12 font-bold uppercase leading-none text-theme-accent text-[clamp(5rem,19vw,18rem)]">
              {a.closingMarquee}
            </span>
          </Marquee>
        </div>
      </section>
    </div>
  );
}
