import { Section } from "@/components/layout/Section";
import { useLanguage } from "@/i18n/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  return (
    <Section theme="pale">
      <h1 className="font-poster uppercase text-5xl md:text-6xl">{t.nav.about}</h1>
    </Section>
  );
}
