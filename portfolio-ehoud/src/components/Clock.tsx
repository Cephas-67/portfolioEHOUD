import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

// Horloge façon écran de verrouillage iOS : grande heure HH:MM (24 h) + la date
// en dessous. L'heure vient de l'horloge locale du visiteur (toujours juste), se
// recale sur la minute pile puis se met à jour chaque minute.
export function Clock({ className }: { className?: string }) {
  const { lang } = useLanguage();
  const locale = lang === "fr" ? "fr-FR" : "en-US";
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    // Premier saut calé sur la prochaine minute, ensuite toutes les 60 s.
    const msToNextMinute = 60000 - (Date.now() % 60000);
    const timeout = setTimeout(() => {
      setNow(new Date());
      interval = setInterval(() => setNow(new Date()), 60000);
    }, msToNextMinute);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const time = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  const rawDate = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "long",
  }).format(now);
  const date = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);

  return (
    <div className={cn("font-ios flex flex-col items-center text-white", className)}>
      <time
        dateTime={now.toISOString()}
        className="clock-glass font-extrabold leading-none text-[clamp(4rem,15vw,11rem)]"
      >
        {time}
      </time>
      <span className="mt-2 font-medium text-white/90 [text-shadow:0_1px_20px_rgba(0,0,0,0.45)] text-[clamp(1rem,2.4vw,1.5rem)]">
        {date}
      </span>
    </div>
  );
}
