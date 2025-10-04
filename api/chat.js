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
    // Ici, tu peux appeler ton IA ou retourner une réponse factice
    res.status(200).json({ reply: "Voici une réponse IA factice." });
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
