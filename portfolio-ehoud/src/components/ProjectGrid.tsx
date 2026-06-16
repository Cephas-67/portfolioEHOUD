import { ParallaxImage } from "@/components/ParallaxImage";
import { projects } from "@/data/projects";

// Grille portfolio, calquée sur la galerie du modèle :
// 1 colonne (mobile) -> 3 colonnes (desktop), grands écarts verticaux, toutes
// les images au même ratio 0.8 (portrait), parallax au scroll + zoom au survol.
export function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 gap-y-60 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-96">
      {projects.map((project) => (
        <figure key={project.title}>
          <ParallaxImage src={project.src} alt={project.title} ratio={0.8} />
          {/* Légende calquée sur le modèle : titre, puis catégorie atténuée. */}
          <figcaption className="mt-4">
            <p className="truncate text-base text-theme-text-primary">{project.title}</p>
            <p className="truncate text-sm text-theme-text-primary/60">{project.category}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
