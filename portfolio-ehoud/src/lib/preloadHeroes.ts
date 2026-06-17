// Précharge en arrière-plan toutes les images de fond des heros pendant l'écran
// d'intro, pendant que l'utilisateur ne regarde pas encore les autres pages. Ainsi,
// au premier clic vers /a-propos, /services, etc., l'image du hero est déjà dans le
// cache du navigateur : elle s'affiche tout de suite, sans le flash « fond bleu » le
// temps qu'elle se télécharge.
const heroImages = import.meta.glob("../assets/hero/*.{jpg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export function preloadHeroes() {
  for (const url of Object.values(heroImages)) {
    const img = new Image();
    img.src = url; // déclenche le téléchargement, le résultat reste en cache
  }
}
