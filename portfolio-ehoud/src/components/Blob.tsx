import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// Formes organiques "blob" — élément signature de la charte d'Ehoud.
// Trois silhouettes différentes, flottement lent et discret.
const SHAPES = [
  "M44.8,-58.3C56.7,-49.5,64.3,-34.8,67.6,-19.4C70.9,-4,69.9,12.1,63.4,25.6C56.9,39.1,44.9,50,31,57.4C17.1,64.8,1.3,68.7,-15.6,67.1C-32.5,65.5,-50.6,58.4,-60.8,45.3C-71,32.2,-73.3,13.1,-70.5,-4.6C-67.7,-22.3,-59.8,-38.6,-47.6,-47.7C-35.4,-56.8,-18.7,-58.7,-1.2,-57.1C16.3,-55.5,32.9,-50.4,44.8,-58.3Z",
  "M39.5,-51.6C52.9,-44.3,66.4,-34.3,70.8,-21.2C75.2,-8.1,70.5,8.1,63,22.6C55.5,37.1,45.2,49.9,32,57.8C18.8,65.7,2.7,68.7,-13.4,66.4C-29.5,64.1,-45.6,56.5,-56.6,44.1C-67.6,31.7,-73.5,14.5,-72.3,-2.1C-71.1,-18.7,-62.8,-34.7,-50.4,-42.7C-38,-50.7,-21.5,-50.7,-4.6,-44.6C12.3,-38.5,26.1,-58.9,39.5,-51.6Z",
];

type BlobProps = {
  className?: string;
  variant?: 0 | 1;
  color?: string; // utilitaire de couleur Tailwind, ex "text-sky"
  delay?: number;
};

export function Blob({ className, variant = 0, color = "text-sky", delay = 0 }: BlobProps) {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      viewBox="-80 -80 160 160"
      aria-hidden="true"
      className={cn("pointer-events-none absolute -z-0", color, className)}
      animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, 4, 0] }}
      transition={{ duration: 9, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <path fill="currentColor" d={SHAPES[variant]} />
    </motion.svg>
  );
}
