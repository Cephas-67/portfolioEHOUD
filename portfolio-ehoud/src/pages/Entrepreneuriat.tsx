import { Section } from "@/components/layout/Section";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Entrepreneuriat() {
  const { t } = useLanguage();
  return (
    <Section theme="blue" grain>
      <h1 className="font-script uppercase text-5xl md:text-6xl">{t.nav.ventures}</h1>
    </Section>
  );
}
