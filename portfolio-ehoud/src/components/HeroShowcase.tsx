import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { slides } from "@/data/showcase";

// Slideshow plein écran — mécanisme du modèle :
// - couche de FOND = visuel précédent (jamais de noir) ;
// - visuel courant dévoilé PAR-DESSUS par balayage clip-path depuis la droite ;
// - parallax au scroll : le média déborde et se révèle en montant/descendant ;
// - barre bleue pleine largeur SOUS l'image, sans titre. Décompte continu, boucle.
const DURATION = 5000; // ms par visuel
const REVEAL = 1.0; // s du balayage

function usePrevious<T>(value: T): T {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function HeroShowcase() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const prevIndex = usePrevious(index);
  const frameRef = useRef<HTMLDivElement>(null);

  // Parallax : progression du cadre dans le viewport -> translateY du média.
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9.5%", "9.5%"]);

  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % slides.length), DURATION);
    return () => clearTimeout(id);
  }, [index, reduce]);

  const current = slides[index];
  const base = slides[prevIndex];

  // Média débordant (haut/bas) pour laisser de la place au parallax.
  const mediaCls = "absolute inset-x-0 top-[-9.5%] h-[119%] w-full object-cover";

  return (
    <div>
      <div ref={frameRef} className="relative h-[78vh] min-h-[480px] w-full overflow-hidden bg-black">
        {/* Couche de fond : visuel précédent, fixe. */}
        <motion.img
          src={base.src}
          alt=""
          aria-hidden="true"
          className={mediaCls}
          style={reduce ? undefined : { y }}
        />

        {/* Couche du dessus : visuel courant dévoilé depuis la droite. */}
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={reduce ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: "inset(0% 0% 0% 100%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: REVEAL, ease: [0.83, 0, 0.17, 1] }}
        >
          <motion.img
            src={current.src}
            alt={current.title}
            className={mediaCls + " will-change-transform"}
            style={reduce ? undefined : { y }}
            initial={reduce ? { scale: 1, rotate: 0 } : { scale: 1.03, rotate: 0.2 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: REVEAL, ease: [0.83, 0, 0.17, 1] }}
          />
        </motion.div>
      </div>

      {/* Barre de progression bleue, pleine largeur, directement sous l'image. */}
      <div className="h-1.5 w-full bg-blue/15">
        {!reduce && (
          <motion.div
            key={index}
            className="h-full bg-blue"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: DURATION / 1000, ease: "linear" }}
          />
        )}
      </div>
    </div>
  );
}
