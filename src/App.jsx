import React, { useState, useEffect } from "react";
import HomeInfo from "./components/HomeInfo";
import Avatar3D from "./components/Avatar3D";

function App() {
  // Charger le score depuis localStorage au démarrage
  const [stars, setStars] = useState(() => {
    const stored = localStorage.getItem("eumonia1-stars");
    return stored ? parseInt(stored, 10) : 0;
  });
  const [talking, setTalking] = useState(false);

  // Sauvegarder le score à chaque changement
  useEffect(() => {
    localStorage.setItem("eumonia1-stars", stars);
  }, [stars]);

  // À appeler à chaque bonne réponse
  const handleGoodAnswer = () => setStars(s => s + 1);

  // Option pour réinitialiser le score
  const handleReset = () => setStars(0);

  return (
    <div>
      <HomeInfo stars={stars} />
      <Avatar3D talking={talking} />
      <button onClick={handleGoodAnswer}>Bonne réponse ! (Gagner une étoile)</button>
      <button onClick={handleReset} style={{ marginLeft: 12 }}>Réinitialiser les étoiles</button>
    </div>
  );
}

