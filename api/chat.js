import OpenAI from 'openai';

export default async function handler(req, res) {
  // CORS headers pour permettre les requêtes cross-origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  // Gestion de la requête OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    const { message } = req.body;
    
    // Vérification de la clé API OpenAI
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY not configured");
      return res.status(500).json({ 
        reply: "⚠️ La clé API OpenAI n'est pas configurée. Veuillez configurer OPENAI_API_KEY dans les variables d'environnement Vercel." 
      });
    }
    
    try {
      // Initialiser le client OpenAI
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
      
      // Appeler l'API OpenAI pour générer une réponse
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Tu es Eumonia1, un avatar intelligent et sympathique qui aide les utilisateurs à apprendre l'anglais. Tu réponds de manière pédagogique, encourageante et claire. Tu peux répondre en français ou en anglais selon la question posée."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });
      
      const reply = completion.choices[0].message.content;
      res.status(200).json({ reply });
      
    } catch (error) {
      console.error("OpenAI API Error:", error);
      
      // Gestion des erreurs spécifiques
      if (error.status === 401) {
        return res.status(500).json({ 
          reply: "❌ Erreur d'authentification OpenAI. Vérifiez que la clé API est valide." 
        });
      } else if (error.status === 429) {
        return res.status(500).json({ 
          reply: "⏳ Trop de requêtes. Veuillez réessayer dans quelques instants." 
        });
      } else {
        return res.status(500).json({ 
          reply: "❌ Erreur lors de la génération de la réponse IA. Veuillez réessayer." 
        });
      }
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
