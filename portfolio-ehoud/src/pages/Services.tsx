import { Section } from "@/components/layout/Section";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Services() {
  const { t } = useLanguage();
  return (
    <Section theme="marine">
      <h1 className="font-display text-5xl md:text-6xl">{t.nav.services}</h1>
    </Section>
  );
}
