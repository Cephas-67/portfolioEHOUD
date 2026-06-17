import { useEffect } from "react";
import Lenis from "lenis";

// Scroll fluide global (inertie douce), à l'image des sites studio modernes.
// On respecte la préférence "réduire les animations" de l'utilisateur.
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Config alignée sur lenis.dev (leur propre site) : mode `lerp` (interpolation
    // image par image) à 0.1, easing expo par défaut. Plus doux et continu que le
    // mode `duration`, c'est ce qui donne le glissé caractéristique de Lenis.
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
