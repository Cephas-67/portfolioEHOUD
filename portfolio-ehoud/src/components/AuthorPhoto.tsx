import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Portrait détouré (PNG transparent) flottant sur un panneau bleu arrondi (rappel
// de la charte + de la couverture du PDF), animé en parallax léger au scroll.
export function AuthorPhoto({ src, alt }: { src: string; alt: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <div ref={ref} className="relative flex justify-center lg:justify-end">
      {/* Panneau bleu arrondi derrière le portrait. */}
      <div className="absolute bottom-0 top-10 w-[min(92%,460px)] rounded-[2.5rem] bg-theme-accent/15" />
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={reduce ? undefined : { y }}
        className="relative z-10 w-[min(88%,420px)] select-none drop-shadow-2xl"
      />
    </div>
  );
}
