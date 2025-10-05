import { featuresConfig } from "./featuresConfig";

export function speak(text) {
  if (!featuresConfig.voiceEnabled) return; // Si désactivée, ne parle pas
  // Ici, ta logique de synthèse vocale IA
  // Si featuresConfig.premiumTTS === true, utilise la voix premium
}
