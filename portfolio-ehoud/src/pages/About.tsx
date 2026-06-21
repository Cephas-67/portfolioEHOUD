import { useRef } from "react";
import Marquee from "react-fast-marquee";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { PageHero } from "@/components/PageHero";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";

import heroImg from "@/assets/hero/pexels-steve-29708294.jpg";
import perspectiveImg from "@/assets/hero/perspective-dark.webp";
import ehoudSuit from "@/assets/ehoud-suit-centered.webp";
import ehoudLaptop from "@/assets/ehoud-laptop.webp";
import ehoudBomber from "@/assets/ehoud-bomber-cut.webp";

// Bouton "Download my resume" : mêmes mécaniques visuelles que le CTA "Envoyer"
// de Contact (trait au-dessus, voile bleu logo qui glisse du bord d'entrée).
// Sert de seul point d'action en bas de About → focalisation forte.
function DownloadResumeButton({ label, href }: { label: string; href: string }) {
  const fillRef = useRef<HTMLSpanElement>(null);

  function enter(e: React.MouseEvent<HTMLElement>) {
    const fill = fillRef.current;
    if (!fill) return;
    const r = e.currentTarget.getBoundingClientRect();
    const fromTop = e.clientY - r.top < r.height / 2;
    fill.style.transition = "none";
    fill.style.transform = `translateY(${fromTop ? "-101%" : "101%"})`;
    void fill.offsetHeight;
    fill.style.transition = "transform 0.7s cubic-bezier(0.19,1,0.22,1)";
    fill.style.transform = "translateY(0)";
  }
  function leave(e: React.MouseEvent<HTMLElement>) {
    const fill = fillRef.current;
    if (!fill) return;
    const r = e.currentTarget.getBoundingClientRect();
    const toTop = e.clientY - r.top < r.height / 2;
    fill.style.transition = "transform 0.7s cubic-bezier(0.19,1,0.22,1)";
    fill.style.transform = `translateY(${toTop ? "-101%" : "101%"})`;
  }

  return (
    <a
      href={href}
      download
      onMouseEnter={enter}
      onMouseLeave={leave}
      className="group relative isolate flex w-full items-center justify-between overflow-hidden rounded-md border-t border-white/30 px-4 py-4 text-left text-xl text-white"
    >
      <span
        ref={fillRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{ transform: "translateY(101%)", backgroundColor: "hsl(var(--logo))" }}
      />
      <span className="relative z-10 transition-colors duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:text-white">
        {label}
      </span>
      <ArrowDown className="relative z-10 h-5 w-5 transition-[color,transform] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-1 group-hover:text-white" />
    </a>
  );
}

// Path data de la flèche cursive descendante (Siméon, src/assets/arrow.svg).
// Une seule courbe Bézier complète qui décrit l'extérieur d'une flèche stylisée.
const ARROW_PATH =
  "M83.8275 2.83924C71.2259 10.0664 63.6462 14.9471 55.0809 21.3765C41.8223 31.3725 31.6613 40.3126 29.0565 44.3251C27.6954 46.4604 27.32 47.7744 27.4373 50.074C27.5546 52.4439 28.2821 53.9222 30.2533 55.729C33.8671 59.061 40.4143 61.2901 54.4943 63.9417C58.9764 64.7864 60.9476 65.42 60.9476 65.9831C60.9476 66.5463 58.6948 69.3151 56.6767 71.2392C54.0719 73.75 51.1855 76.0261 45.6239 79.9916C37.6687 85.6466 34.313 88.5797 31.3797 92.4984C29.2442 95.2907 28.2352 97.5433 28.1413 99.6551C28.0005 102.377 28.7983 104.067 30.8869 105.381C33.1397 106.812 34.2895 107 42.761 107.328C52.6873 107.704 53.0628 107.844 51.115 110.543C50.6223 111.247 47.9471 113.992 45.178 116.667C40.2501 121.407 38.0677 123.777 35.6037 127.062C33.7263 129.573 29.9248 135.439 26.5221 141.024C18.4027 154.399 16.5957 158.575 12.2309 173.804C11.48 176.432 10.7995 178.567 10.7056 178.567C10.424 178.567 10.0486 177.324 9.79044 175.447C9.3915 172.725 7.98349 167.375 7.30295 165.967C6.62242 164.535 5.87149 163.878 4.6043 163.55C2.72697 163.034 0.708845 164.23 0.145647 166.154C-0.112485 166.952 -0.0420511 167.75 0.474214 171.364C0.826212 173.71 1.20167 176.948 1.34247 178.567C1.92913 186.146 2.0934 187.648 2.39846 189.244C2.77393 191.285 3.36058 192.482 4.44004 193.514C6.05924 195.063 8.28857 195.415 10.3771 194.43C11.0342 194.148 12.536 192.975 13.7563 191.848C16.8773 188.986 20.3035 186.452 34.4303 176.573C43.066 170.542 45.9055 168.477 46.3983 167.914C46.7268 167.492 46.5156 167.07 46.0228 167.07C45.53 167.07 33.5386 171.786 29.6197 173.522C27.9301 174.273 25.0906 175.611 23.2837 176.549C21.4768 177.465 19.928 178.239 19.8341 178.286C19.7403 178.333 19.7637 178.075 19.8576 177.699C24.5509 162.94 26.0293 159.608 33.6324 146.726C41.8223 132.858 43.9812 129.807 50.7396 122.721C55.034 118.192 56.9348 115.775 58.1081 113.359C58.8121 111.857 58.9529 111.294 59.0233 109.534C59.1172 107.586 59.0937 107.375 58.3897 105.944C57.1694 103.456 54.9636 101.931 51.6314 101.251C50.7631 101.086 48.041 100.805 45.577 100.664C41.0949 100.406 37.2463 100.054 36.4954 99.8194C35.9557 99.6551 36.1669 99.2562 38.0677 96.7924C40.4613 93.7185 43.1364 91.3251 50.0356 86.1159C55.2687 82.1738 58.0612 79.8273 60.666 77.1993C67.0489 70.7465 68.9497 65.6546 66.2041 62.4399C64.5379 60.5158 62.778 59.8353 55.1983 58.2866C43.77 55.9636 37.7391 53.8753 34.9701 51.3176C33.304 49.7924 33.6325 48.713 36.7535 45.4044C44.6852 37.004 59.9855 24.4504 75.6142 13.4923C85.6814 6.42936 89.4595 3.47279 90.14 1.99451C90.5155 1.22017 90.5154 1.10285 90.1869 0.563162C89.9522 0.234654 89.5768 0 89.2717 0C88.9901 0 86.5496 1.29056 83.8275 2.83924Z";

// Trait bleu décoratif posé sous la section "L'auteur" : se DESSINE en pen-tool
// quand la section entre dans le viewport. Path importé du SVG de Siméon, on garde
// les proportions exactes (1746.5 × 127.5) pour que la marche centrale reste fidèle.
function ScrollDrawLine() {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 1746.5 127.5"
      preserveAspectRatio="none"
      className="block h-[60px] w-full md:h-[90px]"
      aria-hidden="true"
    >
      <motion.path
        d="M0 0L993.5 0L1173.5 126.5L1745.5 126.5"
        fill="none"
        stroke="hsl(var(--blue))"
        strokeWidth={1.2}
        strokeLinecap="round"
        transform="translate(0.5 0.5)"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
      />
    </motion.svg>
  );
}

// Flèche cursive descendante au-dessus de la séquence zoom. Même chorégraphie que
// le logo du loader : le contour se trace au stylo, puis le fill apparaît, puis
// la flèche fait un petit bounce vers le bas en boucle pour appeler le scroll.
function ScrollDrawArrow() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="flex justify-center text-white [will-change:transform]"
      initial={reduce ? false : { y: 0 }}
      // Bounce infini, déclenché à l'entrée dans le viewport, après le tracé+fill
      // (~1.7 s) pour ne pas écraser l'effet pen-tool. once:true → la séquence
      // d'apparition ne se rejoue pas si on remonte au scroll.
      whileInView={reduce ? undefined : { y: [0, 8, 0] }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ delay: 1.7, duration: 1.6, ease: "easeInOut", repeat: Infinity }}
    >
      <svg viewBox="0 0 91 195" className="h-24 w-auto md:h-32" aria-hidden="true">
        {/* Fill blanc TOUJOURS visible : la flèche est en permanence à l'écran,
            l'utilisateur ne peut pas la rater même s'il scrolle vite. */}
        <path d={ARROW_PATH} fill="currentColor" fillRule="evenodd" stroke="none" />
        {/* Stroke bleu qui se redessine en boucle PAR-DESSUS le fill blanc.
            Bleu accent → visible sur le fill blanc (contraste interne) ET sur
            le bg navy profond autour (contraste externe). pathLength 0→1
            trace, opacity [0,1,0] fait apparaître/disparaître pour redémarrer
            sans saut visible. */}
        <motion.path
          d={ARROW_PATH}
          fill="none"
          stroke="hsl(var(--blue))"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fillRule="evenodd"
          initial={reduce ? false : { pathLength: 0, opacity: 1 }}
          // Opacity 1 dès t=0 → le stroke est rendu à pleine opacité dès la
          // première frame. Comme pathLength=0 = ligne vide, ce qu'on voit
          // pousser c'est la pointe du stylo, depuis le début du tracé. Fade-out
          // uniquement sur la fin pour préparer le cycle suivant.
          animate={reduce ? undefined : { pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
          transition={
            reduce
              ? undefined
              : {
                  duration: 1.8,
                  times: [0, 0.75, 1],
                  ease: [0.65, 0, 0.35, 1],
                  repeat: Infinity,
                  repeatDelay: 0.4,
                }
          }
        />
      </svg>
    </motion.div>
  );
}

// Grands titres = Pinyon Script (font-script), casse normale (le script ne se met
// pas en capitales). Échelle reprise de House of Honey (title-*/body-* -> clamps),
// légèrement agrandie car un script lit plus petit.
const TITLE_BIG = "font-script leading-[1.05] text-[clamp(2.75rem,5.5vw,4.5rem)]";
const BODY_30 = "text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.6]";

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
      {/* Voile navy très léger : on veut voir l'image proprement. La lisibilité du
          texte est assurée par un text-shadow sur le bloc épinglé, pas par le voile. */}
      <div className="pointer-events-none absolute inset-0 -z-1 bg-navy/20" />

      {/* Bloc texte épinglé : se cale à 96px du haut (sous le nav) et y reste figé
          tant que la section défile ; il se relâche quand le bas de la section arrive. */}
      <div className="sticky top-24 text-white [text-shadow:0_1px_16px_rgba(0,0,0,0.55)]">
        {/* Filet horizontal animé (scaleX depuis la gauche). */}
        <motion.div
          className="mb-8 h-px origin-left bg-soft-white/40"
          style={reduce ? undefined : { scaleX: ruleScaleX }}
        />

        {/* Intitulé calé à gauche (col-span-8, comme le modèle). */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <p className={`uppercase tracking-[0.2em] lg:col-span-8 ${BODY_30}`}>
            {a.perspectiveEyebrow}
          </p>
        </div>

        {/* Manifeste calé à droite (col-start-8). Casse normale et poids normal
            (moins de gras sur le site), interligne un peu aéré. Le bloc doit TENIR
            dans la hauteur d'écran, sinon le `sticky` ne peut pas rester figé. */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-[0.5em] font-normal leading-[1.4] text-[clamp(1.125rem,1.8vw,1.6rem)] lg:col-span-5 lg:col-start-8">
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
function PortraitIntro({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
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
      {/* drop-shadow est posé sur un wrapper STATIQUE : framer-motion anime
          uniquement le transform (composited GPU), aucune re-rasterisation du
          filtre à chaque frame de scroll. */}
      <div className="drop-shadow-2xl">
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          width={712}
          height={826}
          style={reduce ? undefined : { x, y, opacity, willChange: "transform" }}
          className={`h-auto w-full max-w-[460px] object-contain ${className}`}
        />
      </div>
    </div>
  );
}

// Rideau « blocs » façon kevinkouakou.com : l'écran navy est fait de N colonnes
// verticales qui se retirent en DÉCALÉ (stagger), alternées haut/bas, pour révéler
// le blanc. Au scroll inverse elles reviennent (le rideau se referme).
const REVEAL_COLS = 6;

function RevealColumn({ index, progress }: { index: number; progress: MotionValue<number> }) {
  // Chaque colonne part un peu après la précédente (effet séquentiel).
  // Valeurs scalées × 0.7 pour matcher la compression de la séquence (cf. ScrollShowcase).
  const start = 0.49 + index * 0.0154;
  const y = useTransform(progress, [start, start + 0.126], ["0%", index % 2 === 0 ? "-101%" : "101%"]);
  return (
    <motion.div
      style={{ y, left: `${(index / REVEAL_COLS) * 100}%`, width: `calc(${100 / REVEAL_COLS}% + 1px)` }}
      className="absolute top-0 z-20 h-full bg-navy [backface-visibility:hidden] [will-change:transform]"
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
  // Séquence zoom servie partout (mobile inclus). On ne bascule sur la version
  // statique que si l'utilisateur demande explicitement moins d'animation.
  const lightMode = reduce;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Toutes les keyframes ont été compressées (× 0.7) sur le scrollYProgress.
  // Conséquence : la séquence (photo → zoom texte → rideau → statement) finit à
  // progress 0.693 au lieu de 0.99. Reste 30 % de progress (= ~228 vh de scroll)
  // pendant lesquels la sticky est encore active et le statement reste FIGÉ au
  // centre, opacity 1, scale 1. C'est ce "long pin" qui empêche le texte de
  // disparaître en sortie de section.
  // Phase 1 — photo qui s'installe d'abord (sur navy).
  const photoScale = useTransform(scrollYProgress, [0, 0.196], [1.18, 1]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.042, 0.182, 0.238], [0, 1, 1, 0]);
  // Phase 2 — le texte VIENT DE TRÈS LOIN, se rapproche, FONCE jusqu'à remplir
  // l'écran, tenu, puis disparaît. On anime font-size (re-rastérisation continue,
  // jamais de pixellisation, contrairement à transform: scale).
  const fontSizeVmin = useTransform(scrollYProgress, [0.056, 0.294, 0.462], [1.5, 10, 160]);
  const zoomFontSize = useTransform(fontSizeVmin, (v) => `${v}vmin`);
  const zoomOpacity = useTransform(scrollYProgress, [0.056, 0.168, 0.42, 0.476], [0, 1, 1, 0]);
  // Phase 3 — le blanc se cale (petit zoom qui se pose) pendant l'ouverture des blocs.
  const revealScale = useTransform(scrollYProgress, [0.49, 0.672], [1.1, 1]);
  // Phase 4 — statement (font-script) arrive en ZOOM IN et RESTE. À partir de
  // progress 0.693, il est à opacity 1 + scale 1 ; le sticky du showcase le
  // maintient en place jusqu'à progress ~1.0 (≈ 228 vh de scroll en plus).
  const statementOpacity = useTransform(scrollYProgress, [0.6755, 0.693], [0, 1]);
  const statementScale = useTransform(scrollYProgress, [0.6755, 0.693], [1.45, 1]);

  // Sans animation : on montre simplement la photo et le texte final, sans scroll-jacking.
  if (lightMode) {
    return (
      <section className="flex min-h-svh flex-col items-center justify-center gap-8 bg-grain px-4 py-24 text-center text-white lg:px-6">
        <img src={ehoudBomber} alt="Ehoud Emmanuel OTI-TOSSOU" className="h-[50vh] w-auto object-contain" />
        <p className="font-display text-[clamp(1.5rem,4vw,3rem)] uppercase leading-tight">
          {a.showcaseZoomA} {a.showcaseZoomB}
        </p>
      </section>
    );
  }

  return (
    <div className="relative">
      {/* Overlay au sommet : le trait suit la ligne du clip-path, la flèche pulse
          juste en dessous. Hors du flux et hors du `.zoom-clip` → pas clippé,
          le stroke reste plein. pointer-events-none → le scroll passe à travers. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-50">
        <ScrollDrawLine />
        <div className="mt-6 md:mt-10">
          <ScrollDrawArrow />
        </div>
      </div>
    <section ref={ref} className="zoom-clip bg-zoom-deep relative h-[760vh]">
      {/* sticky en h-lvh : la plus grande hauteur possible du viewport (chrome
          navigateur caché). Le sticky est TOUJOURS au moins aussi grand que la
          zone visible → jamais de vide en bas, même pendant les transitions
          de la barre d'adresse mobile. Le débordement éventuel sous le chrome
          ne se voit pas. */}
      <div className="sticky top-0 flex h-[100lvh] items-center justify-center overflow-hidden">
        {/* Plan du fond (révélé quand les panneaux s'ouvrent) : blanc + texte. */}
        <motion.div
          style={{ scale: revealScale }}
          className="absolute inset-0 z-0 flex items-center justify-center bg-soft-white [backface-visibility:hidden] [will-change:transform]"
        >
          {/* Statement title qui arrive en zoom-in à la fin du panneau blanc, puis
              reste. Visuellement prolongé par la section sticky juste en dessous. */}
          <motion.p
            style={{ opacity: statementOpacity, scale: statementScale }}
            className="absolute max-w-[20ch] px-4 text-center font-script leading-[1.05] text-navy text-[clamp(2.25rem,5.5vw,4.5rem)]"
          >
            {a.statementTitle}
          </motion.p>
        </motion.div>

        {/* Rideau « blocs » façon kevinkouakou : colonnes navy qui se retirent en
            décalé (alternées haut/bas) pour révéler le blanc. */}
        {Array.from({ length: REVEAL_COLS }).map((_, i) => (
          <RevealColumn key={i} index={i} progress={scrollYProgress} />
        ))}

        {/* Photo d'Ehoud, posée sur les panneaux navy fermés (phase 1).
            Mobile : la photo remplit l'écran (inset-0 + object-cover, ancrée
            en bas) → plus de bande de bg-zoom-deep autour ni de coupure en bas
            de la photo. Desktop (lg) : on revient au portrait posé en bas. */}
        <motion.img
          src={ehoudBomber}
          alt="Ehoud Emmanuel OTI-TOSSOU"
          decoding="async"
          style={{ scale: photoScale, opacity: photoOpacity }}
          className="absolute inset-0 z-30 h-full w-full object-cover object-bottom drop-shadow-2xl [backface-visibility:hidden] [will-change:transform] lg:inset-auto lg:bottom-0 lg:left-1/2 lg:h-[92vh] lg:w-auto lg:-translate-x-1/2 lg:object-contain"
        />

        {/* Texte qui vient de loin et se rapproche (phase 2). Wrapper plein écran
            centré → le zoom part du centre et remplit l'écran proprement.
            font-size animé (vmin) = re-rastérisation continue = aucune pixellisation. */}
        <motion.div
          style={{ opacity: zoomOpacity, fontSize: zoomFontSize }}
          className="absolute inset-0 z-40 flex items-center justify-center [will-change:font-size,opacity]"
        >
          {/* whitespace-nowrap = la disposition reste IDENTIQUE du début à la fin du
              zoom. Sans ça, à mi-zoom le mot devient trop large pour le conteneur
              et le navigateur le coupe au milieu (VISUAL → VIS / UAL), changeant
              la mise en page. Avec nowrap, le mot reste un bloc qui grossit
              simplement, et déborde de l'écran à la fin (effet voulu). */}
          <div className="px-4 text-center font-display uppercase leading-[0.95] text-white whitespace-nowrap">
            <span className="block">{a.showcaseZoomA}</span>
            <span className="block text-[hsl(var(--sky))]">{a.showcaseZoomB}</span>
          </div>
        </motion.div>
      </div>
    </section>
    </div>
  );
}

export default function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <div className="theme-marine bg-grain text-theme-text-primary">
      <PageHero image={heroImg} eyebrow={a.heroEyebrow} title={a.heroTitle} />

      {/* A — L'auteur : infos à gauche, portrait détouré à droite, posé sur le navy
          (cœur de la page studio HoH). Un pb généreux : la section "respire" plus
          longtemps en bas, et son navy clair occupe pleinement le coin haut-droit
          de l'escalier (qui appartient visuellement à la section zoom). */}
      <section className="bg-grain px-4 pt-24 pb-20 text-theme-text-primary lg:px-6 lg:pt-32 lg:pb-28">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <h2 className={TITLE_BIG}>{a.studioTitle}</h2>
            <p className={BODY_30}>{a.statementP1}</p>
            <p className={BODY_30}>{a.statementP2}</p>
          </Reveal>
          {/* Portrait détouré : arrive du bas en montant vers la gauche au scroll,
              avec un fondu en bas (mask-image) pour qu'il se confonde avec le navy
              au lieu d'être coupé net, comme le portrait du Home. */}
          <PortraitIntro src={ehoudSuit} alt="Ehoud Emmanuel OTI-TOSSOU" className="portrait-fade-suit" />
        </div>
      </section>

      {/* Séquence scroll (zoom texte → blanc qui s'élargit → texte épinglé), après
          la photo en veste bleue, façon lenis.dev. Le sommet de la section a la
          forme du trait (clip-path .zoom-clip), et le trait + la flèche sont
          rendus en overlay non-clippé au-dessus. */}
      <ScrollShowcase />

      {/* Notre perspective : manifeste sticky sur image sombre (clone fidèle HoH).
          Section B (citation studio en bleu) retirée → on enchaîne directement le
          zoom vers la perspective. */}
      <Perspective />

      {/* B2 — Après la perspective : PARCOURS réel d'Ehoud. Photo à gauche, à droite
          le titre + intro + liste des expériences (4 postes/projets clés). Même
          effet d'escalier en haut que la section zoom (clip-path + overlay trait). */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-50">
          <ScrollDrawLine />
        </div>
        <section className="zoom-clip bg-zoom-deep px-4 pt-32 pb-24 text-theme-text-primary lg:px-6 lg:pt-40 lg:pb-32">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <ParallaxImage
              src={ehoudLaptop}
              alt="Ehoud Emmanuel OTI-TOSSOU au travail"
              ratio={0.82}
            />
            <Reveal className="flex flex-col gap-8">
              <h2 className={TITLE_BIG}>{a.parcoursTitle}</h2>
              <p className={BODY_30}>{a.parcoursIntro}</p>
              {/* Liste des expériences. Séparateurs fins en haut de chaque entrée
                  pour le rythme vertical (signature éditoriale). */}
              <ul className="mt-2 flex flex-col">
                {a.parcoursItems.map((item) => (
                  <li
                    key={item.org}
                    className="flex flex-col gap-2 border-t border-white/15 py-5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <p className="text-base font-semibold text-white">{item.org}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                        {item.role}
                      </p>
                    </div>
                    <p className={`text-white/80 ${BODY_30}`}>{item.description}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </div>

      {/* D — Clôture : seul point d'action (téléchargement du CV) + marquee accent.
          Section C "Ce que je fais" retirée. Closing eyebrow + déclaration retirés,
          remplacés par le bouton télécharger qui reprend le design du CTA Contact
          (trait au-dessus, voile bleu logo au survol). */}
      <section className="overflow-hidden bg-grain px-4 pt-24 text-theme-text-primary lg:px-6 lg:pt-32">
        <Reveal className="mx-auto max-w-md">
          <DownloadResumeButton label="Download my resume" href="/cv-ehoud.pdf" />
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
