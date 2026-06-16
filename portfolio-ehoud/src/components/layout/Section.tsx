import { cn } from "@/lib/utils";

type Theme = "marine" | "pale" | "sky" | "blue";

type SectionProps = {
  theme?: Theme;
  className?: string;
  children: React.ReactNode;
};

// Applique l'un des thèmes de section (5 rôles de couleur) et le fond associé.
// C'est le mécanisme central repris du modèle : chaque page choisit sa palette.
export function Section({ theme = "marine", className, children }: SectionProps) {
  return (
    <section
      className={cn(
        `theme-${theme}`,
        "min-h-[60vh] bg-theme-bg-primary px-4 py-24 text-theme-text-primary lg:px-6",
        className,
      )}
    >
      <div className="mx-auto max-w-[1400px]">{children}</div>
    </section>
  );
}
