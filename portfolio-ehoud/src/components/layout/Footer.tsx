import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const EMAIL = "otitossouehoud@gmail.com";
const LINKEDIN =
  "https://www.linkedin.com/in/ehoud-emmanuel-oti-tossou-2a4487172";
const MEDIUM = "https://medium.com/@otitossouemmanuel";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="theme-marine bg-theme-bg-primary px-4 py-16 text-theme-text-primary lg:px-6">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl">Le Bleu Créatif</p>
          <p className="mt-2 max-w-sm text-theme-text-primary/70">{t.brand.role}</p>
        </div>

        <nav className="flex flex-col gap-2 text-theme-text-primary/80">
          <Link to="/a-propos" className="hover:text-theme-accent">{t.nav.about}</Link>
          <Link to="/portfolio" className="hover:text-theme-accent">{t.nav.portfolio}</Link>
          <Link to="/entrepreneuriat" className="hover:text-theme-accent">{t.nav.ventures}</Link>
          <Link to="/contact" className="hover:text-theme-accent">{t.nav.contact}</Link>
        </nav>

        <div className="flex flex-col gap-2 text-theme-text-primary/80">
          <a href={`mailto:${EMAIL}`} className="hover:text-theme-accent">{EMAIL}</a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-theme-accent">
            LinkedIn
          </a>
          <a href={MEDIUM} target="_blank" rel="noopener noreferrer" className="hover:text-theme-accent">
            Medium
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1400px] border-t border-theme-text-primary/15 pt-6 text-sm text-theme-text-primary/60">
        © {new Date().getFullYear()} Ehoud Emmanuel OTI-TOSSOU — Abomey-Calavi, Bénin
      </div>
    </footer>
  );
}
