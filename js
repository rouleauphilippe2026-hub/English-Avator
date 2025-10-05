await fetch("https://english-avator-u31q.vercel.app/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: userMessage, language: currentLang }) // "français" | "anglais"
});
