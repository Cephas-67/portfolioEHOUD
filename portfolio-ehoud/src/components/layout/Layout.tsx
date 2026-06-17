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
// NOUVELLE page monte depuis le bas et recouvre l'ancienne (qui reste en place
// derrière), exactement comme les cartes empilées de la page Offre. Pas d'écran de
// chargement : c'est la page elle-même qui glisse. La toute première arrivée (gérée
// par l'IntroLoader) ne joue pas cette montée.
const EASE = [0.16, 1, 0.3, 1] as const; // expo out, le glissé Lenis du projet
const DURATION = 0.9;

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
      <main className="relative">
        <AnimatePresence initial={false}>
          <motion.div
            key={location.key}
            // Posée → en flux normal (scrollable, sticky OK). En cours de montée →
            // overlay plein écran qui glisse par-dessus la page précédente.
            className={
              settled
                ? "relative z-0"
                : "fixed inset-0 z-20 overflow-hidden bg-theme-bg-primary"
            }
            initial={settled ? false : { y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: 0 }} // l'ancienne page reste en place derrière le temps de la montée
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
