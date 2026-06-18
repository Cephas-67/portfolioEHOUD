import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";
import { cn } from "@/lib/utils";

type ParallaxImageProps = {
  src: string;
  alt: string;
  ratio?: number; // ratio largeur/hauteur du cadre (0.8 = portrait, comme le modèle)
  className?: string;
};

// Image avec parallax au scroll (le média déborde et se révèle en montant/
// descendant) + léger zoom au survol. Reprend le mécanisme du modèle :
// couche interne 19% plus haute, décalée vers le haut, translateY piloté au scroll.
export function ParallaxImage({ src, alt, ratio = 0.8, className }: ParallaxImageProps) {
  // Sur mobile / reduced-motion : image figée (le parallax scroll-lié est un
  // déclencheur de jank tactile pour un gain visuel mineur).
  const { isMobile, prefersReducedMotion } = useDeviceCapabilities();
  const staticImage = isMobile || prefersReducedMotion;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9.5%", "9.5%"]);

  return (
    <div
      ref={ref}
      className={cn("group/item relative overflow-hidden rounded-xl", className)}
      style={{ aspectRatio: ratio }}
    >
      {/* Couche parallax (translateY au scroll) */}
      <motion.div
        className="absolute inset-x-0 top-[-9.5%] h-[119%]"
        style={staticImage ? undefined : { y, willChange: "transform" }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="size-full object-cover transition-transform duration-600 ease-in-out group-hover/item:scale-[1.03]"
        />
      </motion.div>
    </div>
  );
}
