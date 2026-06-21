import { useEffect } from "react";
import Lenis from "lenis";

// Scroll fluide global (inertie douce), à l'image des sites studio modernes.
// On respecte la préférence "réduire les animations" de l'utilisateur.
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Sur mobile / tactile, on laisse le momentum scroll natif (iOS/Android)
    // faire son travail : Lenis avec syncTouch interceptait chaque geste et
    // donnait un effet "petit coup puis ca s'arrete". Lenis reste actif sur
    // desktop (molette + trackpad) ou rien ne change cote perfs.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      syncTouch: false,
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
