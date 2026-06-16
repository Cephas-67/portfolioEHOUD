import { Section } from "@/components/layout/Section";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Articles() {
  const { t } = useLanguage();
  return (
    <Section theme="marine">
      <h1 className="font-display text-5xl md:text-6xl">{t.nav.articles}</h1>
    </Section>
  );
}
