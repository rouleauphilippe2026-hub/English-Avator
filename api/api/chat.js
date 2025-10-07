import OpenAI from "openai";

// Active la configuration CORS (autorise ton site à communiquer avec ton API)
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { message } = req.body;
  if (!message || typeof message !== "string") {
    return res
      .status(400)
      .json({ error: "Aucun message valide reçu par le serveur." });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ Clé OpenAI manquante !");
    return res.status(500).json({
      error:
        "Erreur serveur : clé OpenAI non configurée. Ajoute OPENAI_API_KEY dans Vercel.",
    });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content:
            "Tu es Eumonia1, une assistante intelligente, douce et bienveillante. Tu aides les utilisateurs à apprendre l’anglais à travers des dialogues conviviaux en français et en anglais.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    let reply;
    if (
      Array.isArray(completion.choices) &&
      completion.choices.length > 0 &&
      completion.choices[0].message?.content
    ) {
      reply = completion.choices[0].message.content;
      return res.status(200).json({ reply });
    } else {
      console.error("⚠️ Réponse inattendue :", completion);
      return res.status(500).json({
        reply:
          "❌ Erreur lors de la génération de la réponse IA. Essaie encore un peu plus tard !",
      });
    }
  } catch (error) {
    console.error("🔥 Erreur OpenAI :", error);
    return res.status(500).json({
      error: "Erreur lors de la communication avec OpenAI.",
      details: error.message,
    });
  }
