import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import InkReveal from "@/components/InkReveal";
import { ContactForm } from "@/components/ContactForm";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="theme-marine bg-grain text-theme-text-primary">
      {/* Hero « encre » : sous un calque navy, un degrade de bleus (sky -> blue ->
          logo). La souris creuse des taches d'encre qui revelent ces bleus (pas de
          photo). Le titre reste au-dessus du calque (z-2). Hauteur < 100vh pour
          laisser deviner le formulaire dessous. */}
      <section className="relative min-h-[88svh] overflow-hidden bg-navy">
        {/* Fond revele : degrade 100 % bleu de la charte. */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--sky))] via-[hsl(var(--blue))] to-[hsl(var(--logo))]" />

        {/* Calque navy + revelation a l'encre : au curseur (desktop) ou au doigt
            (mobile, support tactile dans InkReveal). */}
        <InkReveal maskColor={[23, 56, 97]} brushSize={150} />

        {/* Deux petits carres accent (rappel de la marque). */}
        <span className="pointer-events-none absolute left-1/2 top-16 z-[2] h-2 w-2 -translate-x-1/2 bg-logo" />
        <span className="pointer-events-none absolute bottom-16 left-1/2 z-[2] h-2 w-2 -translate-x-1/2 bg-logo" />

        <div className="pointer-events-none absolute inset-0 z-[2] flex select-none items-center justify-center px-4 text-center">
          <h1 className="font-script leading-none text-white text-[clamp(3rem,9vw,8rem)] [text-shadow:0_2px_28px_rgba(0,0,0,0.45)]">
            {t.contact.heroTitle}
          </h1>
        </div>

        {/* Repere de scroll vers le formulaire. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-6 z-[2] flex justify-center text-white/70"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-7 w-7" />
        </motion.div>
      </section>

      {/* Formulaire repris du modele HoH/dear-honey : bloc deux colonnes (titre navy
          a gauche, panneau pale + champs a droite). */}
      <ContactForm />
    </div>
  );
}
