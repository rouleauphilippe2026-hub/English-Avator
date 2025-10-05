import { featuresConfig } from "./featuresConfig";

export function animateLipsync(audio) {
  if (!featuresConfig.lipsyncEnabled) return; // Si désactivée, pas d’animation
  // Ici, ta logique lipsync (animation bouche synchronisée avec la voix)
}
