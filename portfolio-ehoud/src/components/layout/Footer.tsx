import logo from "@/assets/logodef.webp";

const EMAIL = "otitossouehoud@gmail.com";
const LINKEDIN =
  "https://www.linkedin.com/in/ehoud-emmanuel-oti-tossou-2a4487172";
const MEDIUM = "https://medium.com/@otitossouemmanuel";

export function Footer() {
  return (
    <footer className="theme-marine relative z-10 overflow-hidden rounded-t-[2.5rem] bg-theme-bg-primary px-4 py-16 text-theme-text-primary shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.45)] lg:px-6 lg:py-20">
      {/* Logo BC en grand, hors flux (absolute) : il déborde et se fait couper
          sans agrandir le footer. */}
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -bottom-44 right-0 w-[360px] translate-x-10 select-none drop-shadow-2xl md:w-[640px] md:translate-x-16"
      />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Marque + réseaux sociaux empilés */}
        <p className="font-display text-3xl">Le Bleu Créatif</p>
        <div className="mt-5 flex flex-col gap-2 text-theme-text-primary/80">
          <a href={`mailto:${EMAIL}`} className="hover:text-theme-accent">{EMAIL}</a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-theme-accent">
            LinkedIn
          </a>
          <a href={MEDIUM} target="_blank" rel="noopener noreferrer" className="hover:text-theme-accent">
            Medium
          </a>
        </div>
      </div>
    </footer>
  );
}
