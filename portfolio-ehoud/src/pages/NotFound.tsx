import { Section } from "@/components/layout/Section";
import { FillButton } from "@/components/FillButton";

export default function NotFound() {
  return (
    <Section theme="marine" grain className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-script text-7xl text-theme-accent">404</p>
      <p className="mt-4 text-theme-text-primary/80">Cette page n'existe pas.</p>
      <FillButton to="/" color="hsl(var(--blue))" className="mt-8 px-6 py-3">
        Retour à l'accueil
      </FillButton>
    </Section>
  );
}
