export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    // Ici, tu peux appeler ton IA ou retourner une réponse factice
    res.status(200).json({ reply: "Voici une réponse IA factice." });
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
