import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FillButton } from "@/components/FillButton";
import { useLanguage } from "@/i18n/LanguageContext";

// Formulaire de contact (repris de houseofhoney.com/dear-honey : colonne centrée,
// nom + email + message), adapté en DEUX modes via une bascule : « Travaillons »
// (projet) ou « Feedback ». Sans backend : l'envoi prépare un mail vers Ehoud.
const EMAIL = "otitossouehoud@gmail.com";
type Mode = "work" | "feedback";

const inputCls =
  "w-full rounded-lg border border-theme-text-primary/15 bg-theme-bg-secondary/30 px-4 py-3 text-theme-text-primary outline-none transition-colors placeholder:text-theme-text-primary/40 focus:border-theme-accent";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2 text-left">
      <span className="text-sm uppercase tracking-wide text-theme-text-primary/70">
        {label} <span className="text-theme-accent">*</span>
      </span>
      {children}
      {error && <span className="text-sm text-theme-accent">{error}</span>}
    </label>
  );
}

export function ContactForm() {
  const { t } = useLanguage();
  const c = t.contact;
  const [mode, setMode] = useState<Mode>("work");

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

  function onSubmit(v: Values) {
    const subject = mode === "work" ? "Projet via le portfolio" : "Feedback via le portfolio";
    const body = `${v.message}\n\n- ${v.name} (${v.email})`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    toast.success(c.success);
    reset();
  }

  const heading = mode === "work" ? c.workHeading : c.feedbackHeading;
  const intro = mode === "work" ? c.workIntro : c.feedbackIntro;
  const messagePh = mode === "work" ? c.messagePhWork : c.messagePhFeedback;

  return (
    <div className="mx-auto max-w-xl">
      {/* Bascule deux modes (remplace le switch connexion/inscription) : pastille
          glissante via layoutId. */}
      <div className="mb-10 flex justify-center">
        <div className="relative inline-flex rounded-full border border-theme-text-primary/15 bg-theme-bg-secondary/30 p-1">
          {(["work", "feedback"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className="relative rounded-full px-6 py-2.5 font-display text-sm uppercase tracking-wide transition-colors"
            >
              {mode === m && (
                <motion.span
                  layoutId="intent-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-theme-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span
                className={mode === m ? "text-theme-bg-primary" : "text-theme-text-primary/70"}
              >
                {m === "work" ? c.work : c.feedback}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Titre + intro (centré, façon Dear Honey), adaptés au mode actif. */}
      <div className="mb-8 text-center">
        <h2 className="font-script text-4xl leading-tight sm:text-5xl">{heading}</h2>
        <p className="mx-auto mt-4 max-w-md text-theme-text-primary/70">{intro}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
        <Field label={c.name} error={errors.name?.message}>
          <input {...register("name")} placeholder={c.namePh} className={inputCls} />
        </Field>
        <Field label={c.email} error={errors.email?.message}>
          <input
            type="email"
            {...register("email")}
            placeholder={c.emailPh}
            className={inputCls}
          />
        </Field>
        <Field label={c.message} error={errors.message?.message}>
          <textarea
            {...register("message")}
            placeholder={messagePh}
            rows={5}
            className={`${inputCls} resize-none`}
          />
        </Field>
        <div className="mt-2 flex justify-center">
          <FillButton
            type="submit"
            color="hsl(var(--blue))"
            className="px-8 py-3.5 font-display text-sm uppercase tracking-wide"
          >
            {c.send}
          </FillButton>
        </div>
      </form>
    </div>
  );
}
