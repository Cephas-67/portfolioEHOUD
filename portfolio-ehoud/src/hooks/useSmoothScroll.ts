import { useEffect } from "react";
import Lenis from "lenis";

// Scroll fluide global (inertie douce), à l'image des sites studio modernes.
// On respecte la préférence "réduire les animations" de l'utilisateur.
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Config inspirée de lenis.dev : mode `lerp` (interpolation image par image).
    // - lerp 0.08 (au lieu de 0.1) : un peu plus de retard = plus de glissé,
    //   mieux pour les pages denses comme /portfolio où le scroll natif peut
    //   donner une sensation hachée à cause des nombreuses images en parallax.
    // - wheelMultiplier 0.85 : amortit les tics de molette → moins de saccades
    //   sur les molettes mécaniques (pas de différence sur trackpad).
    // - syncTouch true : applique le même easing au touch (mobile aussi smooth).
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      syncTouch: true,
    });

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
