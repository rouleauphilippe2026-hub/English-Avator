import { featuresConfig } from "./featuresConfig";

export function speak(text) {
  if (!featuresConfig.voiceEnabled) return;
  if (featuresConfig.premiumTTS) {
    // Utiliser API ElevenLabs, Google, Azure...
  } else {
    // Utiliser API native SpeechSynthesis
  }
}
