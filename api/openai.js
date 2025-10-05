/**
 * OpenAI API Serverless Function for Vercel
 * This function connects to OpenAI API without exposing the API key to the client
 * 
 * Required environment variable:
 * - OPENAI_API_KEY: Your OpenAI API key (set in Vercel dashboard)
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
  
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: "Le message est requis" });
  }
  
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error("OPENAI_API_KEY environment variable is not set");
    return res.status(500).json({ 
      error: "Configuration serveur manquante",
      reply: "Désolé, la connexion à l'IA n'est pas encore configurée. Veuillez configurer la clé API OpenAI dans les variables d'environnement Vercel."
    });
  }
  
  try {
    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Tu es un assistant pédagogique spécialisé dans l'apprentissage de l'anglais. Tu aides les utilisateurs francophones à apprendre l'anglais de manière interactive et encourageante. Réponds de manière claire, concise et pédagogique."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI API Error:", response.status, errorData);
      
      if (response.status === 401) {
        return res.status(500).json({ 
          error: "Clé API invalide",
          reply: "La clé API OpenAI semble invalide. Veuillez vérifier la configuration."
        });
      }
      
      if (response.status === 429) {
        return res.status(500).json({ 
          error: "Limite de taux dépassée",
          reply: "Trop de requêtes. Veuillez réessayer dans quelques instants."
        });
      }
      
      throw new Error(`OpenAI API returned ${response.status}`);
    }
    
    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu générer de réponse.";
    
    return res.status(200).json({ 
      reply: aiReply,
      model: data.model,
      usage: data.usage
    });
    
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return res.status(500).json({ 
      error: "Erreur lors de l'appel à l'IA",
      reply: "❌ Erreur: Impossible de contacter l'IA pour le moment. Veuillez réessayer plus tard."
    });
  }
}
