import { Link } from "react-router-dom";
import { Section } from "@/components/layout/Section";

export default function NotFound() {
  return (
    <Section theme="marine" className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-script text-7xl text-theme-accent">404</p>
      <p className="mt-4 text-theme-text-primary/80">Cette page n'existe pas.</p>
      <Link to="/" className="mt-8 rounded-full bg-theme-accent px-6 py-3 text-theme-bg-primary">
        Retour à l'accueil
      </Link>
    </Section>
  );
}
