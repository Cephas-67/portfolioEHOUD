import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Écran de chargement d'arrivée. Séquence (façon Adobe Illustrator) :
//   1) Le logo se DESSINE comme avec l'outil pen (stroke-dashoffset via pathLength)
//   2) Il se REMPLIT de bleu
//   3) Il fait UNE rotation 3D contemplée
//   4) Le texte « Le Bleu Créatif » monte d'en bas en douceur
//   Pendant tout ça, la barre de chargement progresse.
// Puis l'écran navy (colonnes verticales) s'ouvre en décalé de gauche à droite.

// ---- Timings (s) — addition = durée totale du loader ----
const DRAW_DURATION = 1.8;     // pen-tool : tracé du contour
const FILL_DELAY = 1.55;       // fill bleu démarre un cheveu avant la fin du tracé
const FILL_DURATION = 0.55;
const ROTATE_DELAY = 2.15;     // juste après le fill
const ROTATE_DURATION = 1.5;
const TEXT_DELAY = 3.7;        // après la rotation
const TEXT_DURATION = 0.75;
const TOTAL_MS = (TEXT_DELAY + TEXT_DURATION + 0.15) * 1000; // ~4.6 s

// ---- Ouverture des colonnes après le loader ----
const COLS = 7;
const COL_STAGGER = 0.07;
const COL_DURATION = 0.7;

const EASE = [0.16, 1, 0.3, 1] as const;
const BLUE = "#0464fe"; // bleu du logo (issu du SVG vectorisé)

// Path principal du logo (hexagone + creux B/C), issu de la vectorisation
// Adobe MCP. Un seul path = tout le tracé pen-tool se déroule d'un seul geste.
const LOGO_PATH =
  "M2.87637,360.295 C3.06675,359.696 2.97908,359.027 1.99864,358.67 C1.99864,358.67 2.01015,260.086 2.01015,260.086 C2.01027,259.085 1.49873,258.907 0.992302,258.712 C0.992302,258.712 32.6024,227.195 32.6024,227.195 C32.6024,227.195 15.0792,209.008 15.0792,209.008 C10.8268,204.595 7.6861,198.55 1.16938,195.855 C1.16938,195.855 1.1324,87.9136 1.1324,87.9136 C1.1324,87.9136 14.5931,81.4335 14.5931,81.4335 C14.5931,81.4335 194.303,1.93205 194.303,1.93205 C194.303,1.93205 235.003,42.4174 235.003,42.4174 C235.003,42.4174 275.651,1.7713 275.651,1.7713 C275.651,1.7713 428.783,69.1393 428.783,69.1393 C428.783,69.1393 469.919,87.7265 469.919,87.7265 C469.919,87.7265 470.024,173.075 470.024,173.075 C470.024,173.075 435.883,187.868 435.883,187.868 C435.883,187.868 383.077,211.311 383.077,211.311 C383.077,211.311 382.743,140.414 382.743,140.414 C382.743,140.414 279.985,94.819 279.985,94.819 C279.985,94.819 280.026,193.602 280.026,193.602 C280.026,193.602 245.913,227.419 245.913,227.419 C245.913,227.419 279.95,260.301 279.95,260.301 C279.95,260.301 280.067,352.541 280.067,352.541 C280.067,352.541 382.924,306.665 382.924,306.665 C382.924,306.665 383.194,241.935 383.194,241.935 C383.194,241.935 469.985,280.166 469.985,280.166 C469.985,280.166 470.027,359.238 470.027,359.238 C470.027,359.238 355.814,409.715 355.814,409.715 C355.814,409.715 275.902,444.462 275.902,444.462 C275.902,444.462 235.12,403.656 235.12,403.656 C235.12,403.656 194.783,443.851 194.783,443.851 C192.156,444.473 190.495,443.315 187.785,442.078 C187.785,442.078 2.87637,360.295 2.87637,360.295 Z M88.4069,182.831 C88.4069,182.831 191.641,183.017 191.641,183.017 C191.972,182.783 192.816,181.735 192.962,181.493 C193.099,181.267 192.601,180.859 192.269,180.925 C192.269,180.925 192.163,94.7826 192.163,94.7826 C192.163,94.7826 88.0863,140.822 88.0863,140.822 C88.0863,140.822 88.4069,182.831 88.4069,182.831 Z M95.9829,310.187 C95.9829,310.187 192.251,352.411 192.251,352.411 C192.251,352.411 192.251,266.15 192.251,266.15 C192.624,266.229 193.148,265.713 192.967,265.505 C192.967,265.505 191.655,264.002 191.655,264.002 C191.655,264.002 87.1588,264.063 87.1588,264.063 C87.1588,264.063 86.9795,306.844 86.9795,306.844 C86.9795,306.844 95.0038,311.151 95.0038,311.151 C95.9267,311.064 96.1136,310.416 95.9829,310.187 Z";

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
      onDone?.();
    }, TOTAL_MS);
    const total = TOTAL_MS + (COLS - 1) * COL_STAGGER * 1000 + COL_DURATION * 1000 + 80;
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
      {/* Colonnes navy qui couvrent l'écran puis glissent vers le haut en décalé. */}
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

      {/* Bloc central : logo + texte. */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-7"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Wrapper 3D : perspective sur le parent, rotateY sur l'enfant. */}
        <div style={{ perspective: 900 }} className="h-28 md:h-32">
          <motion.div
            className="h-full [transform-style:preserve-3d] [will-change:transform]"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{ delay: ROTATE_DELAY, duration: ROTATE_DURATION, ease: [0.7, 0, 0.3, 1] }}
          >
            <svg viewBox="0 0 471 445" className="h-full w-auto" aria-label="Le Bleu Créatif">
              {/* (1) Le pen-tool : trait blanc qui se dessine via pathLength.
                  fill-rule:evenodd → les creux B/C apparaissent dès qu'on remplit ensuite. */}
              <motion.path
                d={LOGO_PATH}
                fill="none"
                stroke="#ffffff"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                fillRule="evenodd"
                initial={{ pathLength: 0, opacity: 0.95 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: DRAW_DURATION, ease: [0.65, 0, 0.35, 1] }}
              />
              {/* (2) Le fill bleu : 2e path superposé, fade-in une fois le contour fini. */}
              <motion.path
                d={LOGO_PATH}
                fill={BLUE}
                fillRule="evenodd"
                stroke="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: FILL_DELAY, duration: FILL_DURATION, ease: "easeOut" }}
              />
            </svg>
          </motion.div>
        </div>

        {/* « Le Bleu Créatif » : monte d'en bas en douceur après la rotation. */}
        <motion.p
          className="font-display text-3xl text-white"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: TEXT_DELAY, duration: TEXT_DURATION, ease: EASE }}
        >
          Le Bleu Créatif
        </motion.p>
      </motion.div>

      {/* Barre de chargement : sa durée = durée totale du loader pour que
          l'utilisateur perçoive la fin de la barre = fin du chargement. */}
      <motion.div
        className="pointer-events-none absolute bottom-12 left-1/2 z-10 h-[3px] w-40 -translate-x-1/2 overflow-hidden rounded-full bg-white/20"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="h-full rounded-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: TOTAL_MS / 1000, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
