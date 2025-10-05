import React, { useState } from "react";
import HomeInfo from "./components/HomeInfo";
import Avatar3D from "./components/Avatar3D";

function App() {
  const [stars, setStars] = useState(0);
  const [talking, setTalking] = useState(false);

  // À appeler à chaque bonne réponse
  const handleGoodAnswer = () => setStars(s => s + 1);

  return (
    <div>
      <HomeInfo stars={stars} />
      <Avatar3D talking={talking} />
      <button onClick={handleGoodAnswer}>Bonne réponse ! (Gagner une étoile)</button>
      {/* ...le reste de ton app */}
    </div>
  );
}

