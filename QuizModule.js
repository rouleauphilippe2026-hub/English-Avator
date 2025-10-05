import { featuresConfig } from "./featuresConfig";

function renderQuiz() {
  if (!featuresConfig.quizEnabled) return null; // Si désactivé, pas de quiz
  // Ici, ta logique d’affichage et correction des quiz IA
}
