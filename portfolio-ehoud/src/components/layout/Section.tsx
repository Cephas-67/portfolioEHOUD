import { cn } from "@/lib/utils";

type Theme = "marine" | "pale" | "sky" | "blue";

type SectionProps = {
  theme?: Theme;
  className?: string;
  children: React.ReactNode;
  // Pose le voile de bruit « film » (grain-overlay) par-dessus le fond. Marche
  // sur n'importe quel thème (blend overlay), contrairement à `bg-grain` (navy).
  grain?: boolean;
};

// Applique l'un des thèmes de section (5 rôles de couleur) et le fond associé.
// C'est le mécanisme central repris du modèle : chaque page choisit sa palette.
export function Section({ theme = "marine", className, children, grain = false }: SectionProps) {
  return (
    <section
      className={cn(
        `theme-${theme}`,
        "min-h-[60vh] bg-theme-bg-primary px-4 py-24 text-theme-text-primary lg:px-6",
        grain && "relative",
        className,
      )}
    >
      {grain && <div className="grain-overlay" aria-hidden />}
      <div className="relative z-[1] mx-auto max-w-[1400px]">{children}</div>
    </section>
  );
}
