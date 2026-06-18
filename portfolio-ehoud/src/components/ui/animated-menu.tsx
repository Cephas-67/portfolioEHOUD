import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// TextRoll (repris de amoussouportfolio) : chaque caractere du label a 2 copies
// superposees. Au repos, la couche du haut est visible ; quand `active` passe a
// true (ou au hover), les lettres roulent vers le haut, la couche du bas prend la
// place. Stagger par caractere pour un dephasage propre.
const STAGGER = 0.035;

type TextRollProps = {
  children: string;
  className?: string;
  center?: boolean;
  /** Force l'animation sans hover (mobile / ouverture du menu). */
  active?: boolean;
};

export const TextRoll: React.FC<TextRollProps> = ({ children, className, center = false, active }) => {
  const chars = children.split("");
  const computeDelay = (i: number) =>
    center ? STAGGER * Math.abs(i - (chars.length - 1) / 2) : STAGGER * i;

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      animate={active === undefined ? undefined : active ? "hovered" : "initial"}
      className={cn("relative block overflow-hidden", className)}
      style={{ lineHeight: 0.85 }}
    >
      <span className="block">
        {chars.map((l, i) => (
          <motion.span
            key={`top-${i}`}
            variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
            transition={{ ease: "easeInOut", delay: computeDelay(i) }}
            className="inline-block"
          >
            {l === " " ? " " : l}
          </motion.span>
        ))}
      </span>

      <span className="absolute inset-0">
        {chars.map((l, i) => (
          <motion.span
            key={`bot-${i}`}
            variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
            transition={{ ease: "easeInOut", delay: computeDelay(i) }}
            className="inline-block"
          >
            {l === " " ? " " : l}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
};
