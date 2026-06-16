import Marquee from "react-fast-marquee";
import { useLanguage } from "@/i18n/LanguageContext";
import { PageHero } from "@/components/PageHero";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";

import heroImg from "@/assets/hero/pexels-steve-29708294.jpg";
import ehoudSuit from "@/assets/ehoud-suit.jpg";
import doIdentity from "@/assets/portfolio/boom-events.webp";
import doPosters from "@/assets/portfolio/taka-pro-league.webp";
import doSocial from "@/assets/portfolio/social-square-01.webp";

// Grands titres = Pinyon Script (font-script), casse normale (le script ne se met
// pas en capitales). Échelle reprise de House of Honey (title-*/body-* -> clamps),
// légèrement agrandie car un script lit plus petit.
const TITLE_BIG = "font-script leading-[1.05] text-[clamp(2.75rem,5.5vw,4.5rem)]";
const TITLE_MED = "font-script leading-[1.1] text-[clamp(2rem,3.5vw,3.25rem)]";
const TITLE_SMALL = "font-script leading-[1.1] text-[clamp(1.75rem,2.6vw,2.5rem)]";
const QUOTE = "font-script leading-[1.2] text-[clamp(1.5rem,2.4vw,2.1rem)]";
const BODY_30 = "text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.6]";
const EYEBROW = "text-sm uppercase tracking-[0.2em] text-theme-accent";

export default function About() {
  const { t } = useLanguage();
  const a = t.about;

  const doItems = [
    { title: a.do1, img: doIdentity },
    { title: a.do2, img: doPosters },
    { title: a.do3, img: doSocial },
  ];

  return (
    <div className="theme-marine bg-theme-bg-primary text-theme-text-primary">
      <PageHero image={heroImg} eyebrow={a.heroEyebrow} title={a.heroTitle} />

      {/* A — L'auteur : infos à gauche, photo à droite avec effet clip/parallax
          (cœur de la page studio HoH). */}
      <section className="bg-theme-bg-secondary px-4 py-24 text-theme-text-secondary lg:px-6 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <p className={EYEBROW}>{a.studioEyebrow}</p>
            <h2 className={TITLE_BIG}>{a.studioTitle}</h2>
            <p className={BODY_30}>{a.statementP1}</p>
            <p className={BODY_30}>{a.statementP2}</p>
          </Reveal>
          {/* Photo détourable d'Ehoud, à droite, révélée par parallax/clip. */}
          <ParallaxImage
            src={ehoudSuit}
            alt="Ehoud Emmanuel OTI-TOSSOU"
            ratio={0.82}
            className="lg:order-last"
          />
        </div>
      </section>

      {/* B — Déclaration (script) + citation décalée à droite (grille 12, comme studio). */}
      <section className="bg-theme-bg-secondary px-4 pb-24 text-theme-text-secondary lg:px-6 lg:pb-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <Reveal className="lg:col-span-8">
            <h2 className={TITLE_BIG}>{a.statementTitle}</h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className={`text-theme-accent ${QUOTE}`}>« {a.studioQuote} »</p>
          </Reveal>
        </div>
      </section>

      {/* C — « Ce que je fais » : rangée d'images titrées (titre script centré par visuel). */}
      <section className="bg-theme-bg-secondary px-4 pb-24 text-theme-text-secondary lg:px-6 lg:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className={`mb-12 text-center ${EYEBROW}`}>{a.doEyebrow}</p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {doItems.map((item) => (
              <Reveal key={item.title} className="flex flex-col">
                <h3 className={`mb-5 text-center ${TITLE_SMALL}`}>{item.title}</h3>
                <ParallaxImage src={item.img} alt={item.title} ratio={0.82} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* D — Clôture : déclaration centrée (script) + grand marquee accent (fond navy). */}
      <section className="overflow-hidden bg-theme-bg-primary px-4 pt-24 text-theme-text-primary lg:px-6 lg:pt-32">
        <Reveal className="mx-auto max-w-[1054px]">
          <p className={`text-center ${EYEBROW}`}>{a.closingEyebrow}</p>
          <p className={`mx-auto mt-6 text-center ${TITLE_MED}`}>{a.closingStatement}</p>
        </Reveal>
        <div className="pointer-events-none mt-16">
          <Marquee speed={80} gradient={false} autoFill>
            <span className="hero-name mx-12 font-bold uppercase leading-none text-theme-accent text-[clamp(5rem,19vw,18rem)]">
              {a.closingMarquee}
            </span>
          </Marquee>
        </div>
      </section>
    </div>
  );
}
