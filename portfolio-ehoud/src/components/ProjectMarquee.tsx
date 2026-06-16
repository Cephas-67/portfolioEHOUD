import Marquee from "react-fast-marquee";
import { useReducedMotion } from "framer-motion";
import { projects, type Project } from "@/data/projects";

// Une tuile du marquee : image en hauteur fixe (largeur naturelle = variété des
// formats), léger zoom au survol et libellé qui apparaît, comme le modèle.
function Tile({ project }: { project: Project }) {
  return (
    <figure className="group/item relative mx-3 h-56 overflow-hidden rounded-xl md:h-72">
      <img
        src={project.src}
        alt={project.title}
        loading="lazy"
        className="h-full w-auto max-w-none object-cover transition-transform duration-600 ease-in-out group-hover/item:scale-105"
      />
      <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-theme-bg-primary/80 px-4 py-2 text-sm text-theme-text-primary opacity-0 transition-all duration-300 group-hover/item:translate-y-0 group-hover/item:opacity-100">
        <span className="font-display uppercase tracking-wide text-theme-accent">
          {project.category}
        </span>
        <span className="ml-2">{project.title}</span>
      </figcaption>
    </figure>
  );
}

export function ProjectMarquee() {
  const reduce = useReducedMotion();
  const half = Math.ceil(projects.length / 2);
  const rowTop = projects.slice(0, half);
  const rowBottom = projects.slice(half);

  return (
    <div className="flex flex-col gap-6">
      <Marquee speed={40} direction="left" pauseOnHover gradient={false} play={!reduce} autoFill>
        {rowTop.map((p) => (
          <Tile key={p.title} project={p} />
        ))}
      </Marquee>
      <Marquee speed={40} direction="right" pauseOnHover gradient={false} play={!reduce} autoFill>
        {rowBottom.map((p) => (
          <Tile key={p.title} project={p} />
        ))}
      </Marquee>
    </div>
  );
}
