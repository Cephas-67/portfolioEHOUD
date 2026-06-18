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
  // Heures et minutes séparées pour l'affichage vertical sur mobile (empilé).
  const [hh, mm] = time.match(/\d{2}/g) ?? [time, ""];

  const rawDate = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "long",
  }).format(now);
  const date = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);

  return (
    <div className={cn("font-ios flex flex-col items-center text-white", className)}>
      {/* Mobile : heures sur minutes (vertical, sans deux-points). Desktop (md+) :
          HH:MM sur une ligne. Geré uniquement en CSS (flex-col -> flex-row). */}
      <time
        dateTime={now.toISOString()}
        className="clock-glass flex flex-col items-center font-extrabold leading-[0.85] text-[clamp(4.5rem,17vw,11rem)] md:flex-row md:leading-none md:text-[clamp(4rem,15vw,11rem)]"
      >
        <span>{hh}</span>
        <span className="hidden md:inline">:</span>
        <span>{mm}</span>
      </time>
      <span className="mt-3 font-medium text-white/90 [text-shadow:0_1px_20px_rgba(0,0,0,0.45)] text-[clamp(1rem,2.4vw,1.5rem)]">
        {date}
      </span>
    </div>
  );
}
