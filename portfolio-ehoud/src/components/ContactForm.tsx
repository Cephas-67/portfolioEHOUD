import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";

// Formulaire de contact inspire de houseofhoney.com/dear-honey : carte centree
// (pas pleine largeur) en deux colonnes. Gauche = titre sur fond navy. Droite =
// panneau clair adouci avec sous-titre, champs Nom / Email / Message, et un bouton
// « Envoyer » qui se remplit en bleu logo au survol (texte blanc), comme les CTA.
// Sans backend : l'envoi prepare un mail vers Ehoud.
const EMAIL = "otitossouehoud@gmail.com";

// Champ « rempli » : bloc clair, le label sert de placeholder, fin trait sous le
// champ qui se colore au focus.
const fieldCls =
  "w-full bg-navy/[0.05] px-4 py-4 text-navy outline-none transition-colors " +
  "placeholder:text-navy/45 border-b border-navy/15 focus:bg-navy/[0.08] focus:border-logo";

export function ContactForm() {
  const { t } = useLanguage();
  const c = t.contact;

  // Confirmation d'envoi (l'envoi reel sera branche plus tard, voir onSubmit).
  const [sent, setSent] = useState(false);

  const schema = z.object({
    name: z.string().min(2, c.errName),
    email: z.string().email(c.errEmail),
    message: z.string().min(10, c.errMessage),
  });
  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  // Effet de remplissage du CTA (repris de FillButton) : un voile bleu glisse
  // depuis le bord par lequel le curseur entre, et repart par celui par lequel il
  // sort. Le bouton garde son look « repos » (transparent, texte navy).
  const fillRef = useRef<HTMLSpanElement>(null);

  function enterFill(e: React.MouseEvent<HTMLElement>) {
    const fill = fillRef.current;
    if (!fill) return;
    const r = e.currentTarget.getBoundingClientRect();
    const fromTop = e.clientY - r.top < r.height / 2;
    fill.style.transition = "none";
    fill.style.transform = `translateY(${fromTop ? "-101%" : "101%"})`;
    void fill.offsetHeight; // reflow : applique la position de départ avant l'anim
    fill.style.transition = "transform 0.7s cubic-bezier(0.19,1,0.22,1)";
    fill.style.transform = "translateY(0)";
  }

  function leaveFill(e: React.MouseEvent<HTMLElement>) {
    const fill = fillRef.current;
    if (!fill) return;
    const r = e.currentTarget.getBoundingClientRect();
    const toTop = e.clientY - r.top < r.height / 2;
    fill.style.transition = "transform 0.7s cubic-bezier(0.19,1,0.22,1)";
    fill.style.transform = `translateY(${toTop ? "-101%" : "101%"})`;
  }

  function onSubmit(values: Values) {
    // TODO (envoi reel) : poster { name, email, message } vers EMAIL via un service
    // (EmailJS / Formspree / fonction serverless). Pour l'instant : confirmation UI.
    console.info("Contact - message a envoyer (a brancher)", { to: EMAIL, ...values });
    setSent(true);
    reset();
  }

  return (
    <section className="px-4 py-20 lg:py-28">
      <div className="mx-auto grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl shadow-xl md:grid-cols-2">
        {/* COLONNE GAUCHE : titre sur fond navy, centre. */}
        <div className="relative flex items-center justify-center bg-navy px-8 py-16">
          <span className="absolute left-1/2 top-10 h-2 w-2 -translate-x-1/2 bg-logo" />
          <span className="absolute bottom-10 left-1/2 h-2 w-2 -translate-x-1/2 bg-logo" />
          <Reveal>
            <h2 className="max-w-xs text-center font-script leading-[1.1] text-pale text-[clamp(2rem,2.6vw,3rem)]">
              {c.workHeading}
            </h2>
          </Reveal>
        </div>

        {/* COLONNE DROITE : panneau clair adouci. Apres envoi, on remplace le
            formulaire par une confirmation « Message envoye ». */}
        <div className="flex flex-col justify-center bg-[hsl(var(--surface-contact))] px-8 py-16">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex min-h-[280px] flex-col items-center justify-center text-center"
            >
              <CheckCircle2 className="h-14 w-14 text-logo" strokeWidth={1.5} />
              <p className="mt-5 font-script text-navy text-[clamp(2rem,2.4vw,2.75rem)]">{c.sent}</p>
              <p className="mt-2 text-navy/60">{c.sentHint}</p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-7 text-sm text-navy underline-offset-4 transition-colors hover:text-logo hover:underline"
              >
                {c.sendAnother}
              </button>
            </motion.div>
          ) : (
            <>
              <Reveal>
                <p className="mb-8 text-base leading-relaxed text-navy/70">{c.workIntro}</p>
              </Reveal>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col" noValidate>
            <Reveal delay={0.1}>
              <input
                {...register("name")}
                placeholder={`${c.name} *`}
                className={fieldCls}
                aria-label={c.name}
              />
              {errors.name && <span className="mt-1 block text-sm text-red-600">{errors.name.message}</span>}
            </Reveal>

            <Reveal delay={0.15}>
              <input
                type="email"
                {...register("email")}
                placeholder={`${c.email} *`}
                className={`${fieldCls} mt-5`}
                aria-label={c.email}
              />
              {errors.email && <span className="mt-1 block text-sm text-red-600">{errors.email.message}</span>}
            </Reveal>

            <Reveal delay={0.2}>
              <textarea
                {...register("message")}
                placeholder={`${c.message} *`}
                rows={3}
                className={`${fieldCls} mt-5 resize-none`}
                aria-label={c.message}
              />
              {errors.message && <span className="mt-1 block text-sm text-red-600">{errors.message.message}</span>}
            </Reveal>

            {/* Bouton « Envoyer » : ancien design (trait au-dessus, texte navy,
                fleche a droite) + remplissage bleu au survol (voile + texte blanc). */}
            <Reveal delay={0.25}>
              <button
                type="submit"
                onMouseEnter={enterFill}
                onMouseLeave={leaveFill}
                className="group relative isolate mt-8 flex w-full items-center justify-between overflow-hidden rounded-md border-t border-navy/20 px-4 py-4 text-left text-xl text-navy"
              >
                {/* Voile bleu qui se remplit/se vide selon la direction du curseur. */}
                <span
                  ref={fillRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0"
                  style={{
                    transform: "translateY(101%)",
                    backgroundColor: "hsl(var(--logo))",
                  }}
                />
                <span className="relative z-10 transition-colors duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:text-white">
                  {c.send}
                </span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-[color,transform] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1 group-hover:text-white" />
              </button>
            </Reveal>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
