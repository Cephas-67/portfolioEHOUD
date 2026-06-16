import { useEffect } from "react";
import Lenis from "lenis";

// Scroll fluide global (inertie douce), à l'image des sites studio modernes.
// On respecte la préférence "réduire les animations" de l'utilisateur.
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // duration plus courte = scroll plus réactif (moins d'inertie « lente »).
    const lenis = new Lenis({ duration: 0.9, smoothWheel: true, wheelMultiplier: 1 });

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
