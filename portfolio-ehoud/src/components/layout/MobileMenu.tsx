import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FillButton } from "@/components/FillButton";
import { TextRoll } from "@/components/ui/animated-menu";
import { useLanguage } from "@/i18n/LanguageContext";

// Menu plein ecran (mobile / tablette), repris du drawer de amoussouportfolio :
// reveal en cercle depuis le coin haut-droit (origine du bouton « menu »), liens
// qui montent en cascade (staggerChildren) puis roulent lettre par lettre
// (TextRoll). Trait `border-b` sous chaque lien, padding `py-7`, fond navy graine.
const EASE = [0.83, 0, 0.17, 1] as const;

type NavLink = { to: string; label: string };

export function MobileMenu({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}) {
  const { t, lang, toggle } = useLanguage();
  // Le roulis des lettres ne s'enclenche qu'apres l'ouverture du drawer.
  const [rollActive, setRollActive] = useState(false);

  useEffect(() => {
    if (!open) {
      setRollActive(false);
      return;
    }
    const id = window.setTimeout(() => setRollActive(true), 950);
    return () => window.clearTimeout(id);
  }, [open]);

  // Bloque le scroll de la page tant que le menu est ouvert.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-drawer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // Fermeture rapide (0.2s) : le menu disparaît vite pour laisser voir la
          // montée de la page au clic d'un lien (pas l'exit lent du modèle).
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 p-3 lg:hidden"
        >
          {/* Tapis qui se deroule en cercle depuis le coin haut-droit. */}
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2rem) 2rem)" }}
            exit={{
              clipPath: "circle(0% at calc(100% - 2rem) 2rem)",
              transition: { duration: 0.65, ease: EASE, delay: 0.45 },
            }}
            transition={{ duration: 0.65, ease: EASE }}
            className="bg-grain relative flex h-full w-full flex-col overflow-hidden rounded-[28px] p-5 text-white shadow-2xl"
          >
            <div className="grain-overlay" aria-hidden />

            {/* Contenu : fade-in apres le deroule du tapis. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.25, delay: 0.35 }}
              className="relative flex h-full flex-col"
            >
              {/* Haut : carre accent + bouton Fermer. */}
              <div className="flex items-start justify-between">
                <span className="mt-3 h-2 w-2 bg-logo" />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Fermer le menu"
                  className="rounded-full bg-white px-5 py-2.5 font-display text-sm font-medium text-navy transition-transform active:scale-95"
                >
                  Close
                </button>
              </div>

              {/* Liens : cascade slide-up (staggerChildren) + roulis TextRoll. */}
              <motion.nav
                className="mt-6 flex flex-1 flex-col gap-2"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  show: { transition: { staggerChildren: 0.07, delayChildren: 0.5 } },
                  hidden: { transition: { staggerChildren: 0.07, staggerDirection: -1 } },
                }}
              >
                {links.map((link) => (
                  <motion.div
                    key={link.to}
                    variants={{
                      hidden: { opacity: 0, y: 30, transition: { duration: 0.4, ease: EASE } },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <Link
                      to={link.to}
                      onClick={onClose}
                      className="block border-b border-white/20 py-7 font-display text-3xl font-extrabold uppercase tracking-tight text-white"
                    >
                      <TextRoll active={rollActive}>{link.label}</TextRoll>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Bas : bascule langue + CTA Contact. */}
              <div className="mt-4 flex items-center justify-between gap-4">
                <button
                  onClick={toggle}
                  aria-label="Changer de langue"
                  className="flex h-12 items-center rounded-full border border-white/20 px-5 font-display text-sm uppercase tracking-wide text-white transition-colors hover:bg-white/10"
                >
                  {lang === "fr" ? "EN" : "FR"}
                </button>
                <div className="flex-1" onClick={onClose}>
                  <FillButton
                    to="/contact"
                    color="hsl(var(--logo))"
                    className="h-12 w-full px-6 font-display text-sm uppercase tracking-wide"
                  >
                    {t.nav.contact}
                  </FillButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
