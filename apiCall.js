import { featuresConfig } from "./featuresConfig";

async function sendChat(message) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      mode: featuresConfig.mode // "expert" ou "débutant"
    })
  });
  // ...traitement de la réponse
}
