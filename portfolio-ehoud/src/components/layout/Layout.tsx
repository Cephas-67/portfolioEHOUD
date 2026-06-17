import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Entrepreneuriat from "@/pages/Entrepreneuriat";
import Articles from "@/pages/Articles";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

// Transition entre pages façon houseofhoney.com : au clic d'un lien de la nav, la
// NOUVELLE page monte depuis le bas et recouvre l'ancienne, exactement comme les
// cartes empilées de la page Offre. L'ancienne page reste en place et recule un peu
// (profondeur) le temps de la montée, donc on ne voit jamais le footer derrière. Pas
// d'écran de chargement : c'est la page elle-même qui glisse. La toute première
// arrivée (gérée par l'IntroLoader) ne joue pas cette montée.
const EASE = [0.76, 0, 0.24, 1] as const; // ease-in-out : glissé posé et chic, pas rapide
const DURATION = 1.15;

export function Layout() {
  useSmoothScroll();
  const location = useLocation();

  // Clé de la page « posée » : celle qui est en flux normal (donc scrollable). Tant
  // qu'une page est en train de monter, elle est en overlay au-dessus ; une fois
  // arrivée (onAnimationComplete), elle devient à son tour la page posée.
  const [settledKey, setSettledKey] = useState(location.key);
  const settled = settledKey === location.key;

  // Nouvelle page = on repart en haut.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);

  return (
    <div className="theme-marine min-h-screen bg-theme-bg-primary">
      <Header />
      {/* min-h-screen : même quand l'ancienne page se retire, `main` ne s'effondre
          pas, donc le footer reste sous la ligne de flottaison (jamais visible
          derrière la page qui monte). */}
      <main className="relative min-h-screen">
        <AnimatePresence initial={false}>
          <motion.div
            key={location.key}
            // Posée → en flux normal (scrollable, sticky OK). En cours de montée →
            // overlay plein écran qui glisse par-dessus la page précédente (sous le
            // header, qui reste visible). z-20 < header (z-30).
            className={
              settled
                ? "relative z-0"
                : "fixed inset-0 z-20 overflow-hidden bg-theme-bg-primary"
            }
            initial={settled ? false : { y: "100%" }}
            animate={{ y: 0 }}
            // L'ancienne page recule légèrement (profondeur) et reste montée toute la
            // durée → elle tient la hauteur de `main`, le footer ne remonte pas.
            exit={{ scale: 0.96 }}
            transition={{ duration: DURATION, ease: EASE }}
            onAnimationComplete={() => setSettledKey(location.key)}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/entrepreneuriat" element={<Entrepreneuriat />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
