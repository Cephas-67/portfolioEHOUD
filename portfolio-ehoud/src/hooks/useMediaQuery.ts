import { useEffect, useState } from "react";

// Renvoie true tant que la media query CSS passée est satisfaite.
// Utile pour n'activer certaines animations (ex: panneau coulissant) que sur desktop.
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const onChange = () => setMatches(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
