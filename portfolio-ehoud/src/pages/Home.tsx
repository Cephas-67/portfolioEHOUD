import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Blob } from "@/components/Blob";
import { Reveal } from "@/components/Reveal";
import { HeroShowcase } from "@/components/HeroShowcase";
import { FontTester } from "@/components/FontTester";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/ehoud-hero.webp";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
    <FontTester />
    <section className="theme-marine relative overflow-hidden bg-theme-bg-primary text-theme-text-primary">
      {/* Blobs signature en arrière-plan */}
      <Blob className="left-[-6%] top-24 h-72 w-72 opacity-30" variant={0} />
      <Blob className="right-[8%] bottom-10 h-96 w-96 opacity-20" variant={1} delay={1.5} />
      <Blob className="left-[30%] bottom-[-8%] h-64 w-64 opacity-10" variant={0} delay={3} />

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1400px] items-center gap-8 px-4 py-16 md:grid-cols-2 lg:px-6">
        {/* Colonne texte */}
        <div className="order-2 md:order-1">
          <Reveal>
            <p className="font-accent text-sm uppercase tracking-[0.2em] text-theme-accent">
              {t.hero.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 font-poster uppercase text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              {t.hero.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg text-theme-text-primary/75">{t.hero.subtitle}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/portfolio">{t.hero.ctaPortfolio}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">{t.hero.ctaContact}</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Portrait détouré */}
        <div className="order-1 flex justify-center md:order-2 md:justify-end">
          <img
            src={portrait}
            alt="Ehoud Emmanuel OTI-TOSSOU"
            className="h-auto w-[min(80%,420px)] drop-shadow-2xl"
            loading="eager"
          />
        </div>
      </div>
    </section>

    {/* Galerie animée — aperçu des travaux qui défilent (signature HoH) */}
    <section className="theme-marine bg-theme-bg-primary py-16 text-theme-text-primary">
      <div className="mx-auto mb-10 max-w-[1400px] px-4 lg:px-6">
        <Reveal>
          <p className="font-accent text-sm uppercase tracking-[0.2em] text-theme-accent">
            {t.work.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-poster uppercase text-3xl leading-tight sm:text-4xl">
            {t.work.title}
          </h2>
        </Reveal>
      </div>
      <HeroShowcase />
      <div className="mx-auto mt-10 max-w-[1400px] px-4 lg:px-6">
        <Button asChild variant="outline">
          <Link to="/portfolio">{t.work.cta}</Link>
        </Button>
      </div>
    </section>
    </>
  );
}
