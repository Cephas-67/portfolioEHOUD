import { useLanguage } from "@/i18n/LanguageContext";
import { services } from "@/data/services";

// Page Offre : reprise du pattern « the buzz » de House of Honey.
// Chaque service est une section plus haute que l'écran. À l'intérieur, un bloc
// `sticky` plein écran (image + texte) reste épinglé pendant que la page défile,
// puis se libère quand la section se termine : le service suivant recouvre.
// 100% CSS sticky, donc aucun calcul au scroll : ça reste fluide avec Lenis.
export default function Services() {
  const { lang } = useLanguage();

  return (
    <div className="theme-marine bg-theme-bg-primary text-theme-text-primary">
      {services.map((service, index) => {
        const copy = service[lang];
        const number = String(index + 1).padStart(2, "0");

        return (
          <section key={copy.title} className="relative h-[160vh]">
            <div className="sticky top-0 flex h-screen items-end overflow-hidden">
              {/* Grande image du service, plein écran */}
              <img
                src={service.src}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Voile sombre : garde le texte lisible quelle que soit l'image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/40" />

              {/* Texte posé sur l'image */}
              <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-24 lg:px-6 lg:pb-32">
                <p className="font-display text-sm uppercase tracking-[0.2em] text-white/70">
                  {number} · {copy.eyebrow}
                </p>
                <h2 className="mt-4 max-w-4xl font-display text-5xl uppercase leading-[0.95] text-white md:text-7xl lg:text-8xl">
                  {copy.title}
                </h2>
                <p className="mt-6 max-w-xl text-lg text-white/85">{copy.text}</p>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
