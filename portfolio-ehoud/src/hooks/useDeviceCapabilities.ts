import { useEffect, useState } from "react";

// Heuristique low-end (mobile / vieux device) : sert à couper les effets coûteux
// (canvas interactif, séquences scroll lourdes) là où ils n'apportent rien ou
// rament. Principe repris d'amoussouportfolio.
function detectLowEnd(): boolean {
  if (typeof navigator === "undefined") return false;

  type NavExt = Navigator & { deviceMemory?: number };
  const nav = navigator as NavExt;

  // <= 4 Go de RAM (API Chrome) ou < 4 cœurs => device modeste.
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) return true;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency < 4) return true;

  // Tactile + petite fenêtre = mobile/tablette => low-end vraisemblable.
  if ("ontouchstart" in window && window.innerWidth <= 768) return true;

  return false;
}

type Capabilities = {
  isTouch: boolean;
  isMobile: boolean;
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
};

// Détecte les capacités du device pour adapter la richesse des animations.
// `isMobile` (largeur) pilote les bascules visuelles ; `isLowEnd` ajoute le cas
// des machines modestes même en grand écran ; `prefersReducedMotion` respecte
// le réglage système d'accessibilité.
export function useDeviceCapabilities(): Capabilities {
  const [caps, setCaps] = useState<Capabilities>({
    isTouch: false,
    isMobile: false,
    isLowEnd: false,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    const touchQuery = window.matchMedia("(hover: none)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setCaps({
        isTouch: touchQuery.matches,
        isMobile: mobileQuery.matches,
        isLowEnd: detectLowEnd(),
        prefersReducedMotion: reducedQuery.matches,
      });
    };

    update();
    touchQuery.addEventListener("change", update);
    mobileQuery.addEventListener("change", update);
    reducedQuery.addEventListener("change", update);

    return () => {
      touchQuery.removeEventListener("change", update);
      mobileQuery.removeEventListener("change", update);
      reducedQuery.removeEventListener("change", update);
    };
  }, []);

  return caps;
}
