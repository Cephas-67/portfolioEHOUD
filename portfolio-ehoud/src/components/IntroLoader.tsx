import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "@/assets/logo-mark.png";

// Écran de chargement d'arrivée (façon kevinkouakou.com) : logo qui tourne en 3D +
// « Le Bleu Créatif » (police display, comme le footer) au centre, petite barre de
// progression en bas (< 2 s). Puis l'écran navy, fait de colonnes verticales, s'OUVRE
// en décalé de GAUCHE → DROITE et révèle le hero derrière. `onDone` est appelé à la
// fin du loading (la chorégraphie de la Home ne démarre qu'à ce moment-là).
const COLS = 7;
const BAR_MS = 1400; // durée de la barre (< 2 s)
const COL_STAGGER = 0.07; // décalage entre colonnes (s)
const COL_DURATION = 0.7; // glissé d'une colonne (s)
const EASE = [0.16, 1, 0.3, 1] as const; // expo out, smooth façon lenis

export function IntroLoader({ onDone }: { onDone?: () => void }) {
  const reduce =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [phase, setPhase] = useState<"loading" | "opening">("loading");
  const [done, setDone] = useState(reduce);

  useEffect(() => {
    if (reduce) {
      onDone?.();
      return;
    }
    const toOpen = window.setTimeout(() => {
      setPhase("opening");
      onDone?.(); // fin du loading → la chorégraphie de la Home peut démarrer
    }, BAR_MS + 150);
    const total = BAR_MS + 150 + (COLS - 1) * COL_STAGGER * 1000 + COL_DURATION * 1000 + 80;
    const toEnd = window.setTimeout(() => setDone(true), total);
    return () => {
      window.clearTimeout(toOpen);
      window.clearTimeout(toEnd);
    };
  }, [reduce, onDone]);

  if (done) return null;

  const opening = phase === "opening";

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Colonnes navy : couvrent l'écran, puis glissent vers le haut en décalé
          de gauche à droite pour révéler le hero. */}
      {Array.from({ length: COLS }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 h-full bg-navy"
          style={{ left: `${(i / COLS) * 100}%`, width: `calc(${100 / COLS}% + 1px)` }}
          initial={{ y: 0 }}
          animate={{ y: opening ? "-101%" : 0 }}
          transition={{ duration: COL_DURATION, ease: EASE, delay: opening ? i * COL_STAGGER : 0 }}
        />
      ))}

      {/* Logo (rotation 3D continue) + nom de marque, au centre, sur les colonnes. */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div style={{ perspective: 800 }}>
          <motion.img
            src={logo}
            alt="Le Bleu Créatif"
            className="h-24 w-auto md:h-28 [transform-style:preserve-3d]"
            animate={{ rotateY: 360 }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
          />
        </div>
        <p className="mt-5 font-display text-3xl text-white">Le Bleu Créatif</p>
      </motion.div>

      {/* Barre de chargement, bas-centre. */}
      <motion.div
        className="pointer-events-none absolute bottom-12 left-1/2 z-10 h-[3px] w-40 -translate-x-1/2 overflow-hidden rounded-full bg-white/20"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="h-full rounded-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: BAR_MS / 1000, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
