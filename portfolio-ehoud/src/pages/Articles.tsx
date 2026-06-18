import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/Reveal";
import { FillButton } from "@/components/FillButton";
import { useLanguage } from "@/i18n/LanguageContext";
import { articles, MEDIUM_PROFILE, type Article } from "@/data/articles";
import heroImg from "@/assets/hero/pexels-marina-zasorina-7486696.jpg";

// Formatte une date ISO selon la langue active (ex. « 7 juin 2026 »).
function useDateFormatter() {
  const { lang } = useLanguage();
  const locale = lang === "fr" ? "fr-FR" : "en-US";
  return (iso: string) =>
    new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(
      new Date(iso),
    );
}

// Bandeau tag + date, réutilisé sur la carte à la une et les cartes de la grille.
function Meta({ tag, date }: { tag: string; date: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-theme-text-primary/60">
      <span className="rounded-md bg-theme-bg-secondary px-2.5 py-1 font-display text-xs uppercase tracking-wide text-theme-text-secondary">
        {tag}
      </span>
      <span>{date}</span>
    </div>
  );
}

function ArticleCard({
  article,
  formatDate,
  readMore,
}: {
  article: Article;
  formatDate: (iso: string) => string;
  readMore: string;
}) {
  return (
    <a
      href={article.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col"
    >
      <div className="overflow-hidden rounded-xl">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="aspect-[3/2] w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4">
        <Meta tag={article.tag} date={formatDate(article.date)} />
      </div>
      <h3 className="mt-3 font-display text-xl leading-snug text-theme-text-primary transition-colors group-hover:text-theme-accent">
        {article.title}
      </h3>
      <p className="mt-2 text-theme-text-primary/70">{article.excerpt}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm text-theme-accent">
        {readMore}
        <span aria-hidden className="transition-transform group-hover:translate-x-1">
          &rarr;
        </span>
      </span>
    </a>
  );
}

export default function Articles() {
  const { t } = useLanguage();
  const j = t.journal;
  const formatDate = useDateFormatter();
  const [featured, ...rest] = articles;

  return (
    <div className="theme-marine bg-grain text-theme-text-primary">
      <PageHero image={heroImg} eyebrow={j.heroEyebrow} title={j.heroTitle} />

      <Section theme="marine">
        <Reveal>
          <p className="max-w-2xl text-lg text-theme-text-primary/80">{j.intro}</p>
        </Reveal>

        {/* Article à la une : grand visuel + résumé. */}
        <Reveal>
          <a
            href={featured.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
          >
            <div className="overflow-hidden rounded-2xl">
              <img
                src={featured.image}
                alt={featured.title}
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.04]"
              />
            </div>
            <div>
              <Meta tag={featured.tag} date={formatDate(featured.date)} />
              <h2 className="mt-4 font-script text-4xl leading-tight sm:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-xl text-lg text-theme-text-primary/80">{featured.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-theme-accent">
                {j.readMore}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </div>
          </a>
        </Reveal>

        {/* Le reste des articles, en grille. */}
        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <Reveal key={article.href}>
              <ArticleCard article={article} formatDate={formatDate} readMore={j.readMore} />
            </Reveal>
          ))}
        </div>

        {/* Lien vers le profil Medium complet, avec l'effet de survol lenis (FillButton). */}
        <div className="mt-16 flex justify-center">
          <FillButton
            href={MEDIUM_PROFILE}
            color="hsl(var(--blue))"
            className="px-7 py-3.5 font-display text-sm uppercase tracking-wide"
          >
            {j.allOnMedium}
          </FillButton>
        </div>
      </Section>
    </div>
  );
}
