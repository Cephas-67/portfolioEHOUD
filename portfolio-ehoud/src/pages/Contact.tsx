import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import InkReveal from "@/components/InkReveal";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/ContactForm";
import portrait from "@/assets/ehoud-bomber.jpg";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="theme-marine bg-theme-bg-primary text-theme-text-primary">
      {/* Hero « encre » : le portrait est caché sous un calque navy que la souris
          révèle en taches d'encre (effet InkReveal). Le titre reste au-dessus du
          calque (z-2, non interactif) pour rester lisible. Hauteur < 100vh pour
          laisser deviner le formulaire en dessous. */}
      <section className="relative min-h-[88svh] overflow-hidden bg-navy">
        <img
          src={portrait}
          alt="Ehoud Emmanuel OTI-TOSSOU"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <InkReveal maskColor={[23, 56, 97]} brushSize={150} />

        <div className="pointer-events-none absolute inset-0 z-[2] flex select-none flex-col items-center justify-center px-4 text-center text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.55)]">

          <h1 className="mt-4 font-script leading-none text-[clamp(3rem,9vw,8rem)]">
            {t.contact.heroTitle}
          </h1>

        </div>

        {/* Repère de scroll vers le formulaire. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-6 z-[2] flex justify-center text-white/70"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-7 w-7" />
        </motion.div>
      </section>

      {/* Formulaire (façon Dear Honey), deux modes : Travaillons / Feedback. */}
      <Section theme="marine">
        <ContactForm />
      </Section>
    </div>
  );
}
