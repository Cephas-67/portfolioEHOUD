import { Section } from "@/components/layout/Section";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  return (
    <Section theme="marine">
      <h1 className="font-poster uppercase text-5xl md:text-6xl">{t.nav.contact}</h1>
    </Section>
  );
}
