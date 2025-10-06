import OpenAI from "openai";

export default async function handler(req, res) {
  // CORS : autoriser les requêtes depuis ton front
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Répondre aux requêtes préflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Accepter uniquement les requêtes POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { message, language } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message manquant" });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content:
            `Tu es Eumonia, un avatar IA amical et pédagogue. ` +
            `Parle simplement, dans la langue demandée (${language || "français"}).`
        },
        { role: "user", content: message }
      ],
      temperature: 0.7
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() || "Désolé, je n’ai pas compris.";
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Erreur OpenAI:", error);
    return res.status(500).json({ error: "Erreur serveur IA", details: error.message });
  }
}
