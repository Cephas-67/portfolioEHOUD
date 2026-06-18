import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { slides } from "@/data/showcase";

// Slideshow plein écran, clone de la home House of Honey :
// - TOUS les visuels sont empilés (absolute inset-0) et restent montés ;
// - inactif : clip-path inset(0 0 0 100%) + opacity 0 + z 0 ;
// - actif : balaie depuis la gauche vers inset(0) + opacity 1 + z 2 ;
// - le précédent garde clip 0 + opacity 1 (z 1) : il reste visible SOUS le
//   nouveau pendant le balayage, puis se cache une fois recouvert (jamais de noir).
// Un seul rythme : balayage et indicateur changent à la MÊME frontière.
// Indicateurs segmentés (un par visuel), comme HoH.
const DURATION = 5000; // ms d'affichage par visuel (ajustable)
const REVEAL = 0.9; // s du balayage

function usePrevious<T>(value: T): T {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function HeroShowcase() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const index = step % slides.length;
  const prevIndex = usePrevious(index);
  const frameRef = useRef<HTMLDivElement>(null);

  // Parallax léger : progression du cadre dans le viewport -> translateY du média.
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9.5%", "9.5%"]);

  // Précharge tous les visuels une fois : cache chaud, rien à décoder au balayage.
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
    });
  }, []);

  // Un seul intervalle : avance d'un visuel toutes les DURATION ms.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setStep((s) => s + 1), DURATION);
    return () => clearInterval(id);
  }, [reduce]);

  const mediaCls = "absolute inset-x-0 top-[-9.5%] h-[119%] w-full object-cover will-change-transform";

  return (
    <div>
      <div
        ref={frameRef}
        className="relative h-[56vh] min-h-[340px] w-full overflow-hidden bg-theme-bg-primary md:h-[78vh] md:min-h-[480px]"
      >
        {slides.map((slide, i) => {
          const isActive = i === index;
          const isUnder = i === prevIndex && prevIndex !== index;
          const visible = isActive || isUnder;

          return (
            <motion.div
              key={slide.src}
              className="absolute inset-0"
              style={{ zIndex: isActive ? 2 : isUnder ? 1 : 0 }}
              // initial={false} : quand un slide passe de caché (clip 100%) à actif,
              // framer anime depuis ce dernier état -> balayage gauche automatique.
              initial={false}
              animate={{
                clipPath: visible ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 100%)",
                opacity: visible ? 1 : 0,
              }}
              transition={{ duration: reduce ? 0 : REVEAL, ease: [0.7, 0, 0.25, 1] }}
            >
              <motion.img
                src={slide.src}
                alt={slide.title}
                className={mediaCls}
                style={reduce ? undefined : { y }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Indicateurs segmentés : un par visuel. Passé = plein, actif = se remplit
          sur DURATION, futur = vide. Le remplissage actif est keyé sur `step` :
          il repart toujours de 0, y compris au bouclage. */}
      <div className="flex w-full gap-2">
        {slides.map((slide, i) => (
          <div key={slide.src} className="h-1.5 flex-1 overflow-hidden bg-blue/15">
            {i < index && <div className="h-full bg-blue" />}
            {i === index && (
              <motion.div
                key={step}
                className="h-full origin-left bg-blue"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduce ? 0 : DURATION / 1000, ease: "linear" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
