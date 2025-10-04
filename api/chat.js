

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

  try {
    const { message } = req.body;
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // rapide, expressif et moins coûteux
      messages: [
        { role: "system", content: "Tu es un assistant intelligent pour un site d'apprentissage de l'anglais nommé English Avatar." },
        { role: "user", content: message }
      ],
    });

    const reply = response.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Erreur OpenAI :", error);
    res.status(500).json({ error: "Erreur API OpenAI" });
  }
}
