import React, { useState, useEffect } from "react";
import HomeInfo from "./components/HomeInfo";
import Avatar3D from "./components/Avatar3D";

// Petite étoile animée
const Star = ({ animate }) => (
  <span
    style={{
      fontSize: 32,
      color: "#ffd700",
      marginRight: 4,
      transition: "transform 0.4s",
      transform: animate ? "scale(1.4) rotate(-20deg)" : "scale(1)",
      filter: animate ? "drop-shadow(0 0 10px #ffd700)" : "none"
    }}
  >
    ★
  </span>
);

function App() {
  // Charger le score depuis localStorage au démarrage
  const [stars, setStars] = useState(() => {
    const stored = localStorage.getItem("eumonia1-stars");
    return stored ? parseInt(stored, 10) : 0;
  });
  const [talking, setTalking] = useState(false);
  const [animateIdx, setAnimateIdx] = useState(-1); // index de l'étoile animée
  const [showNotif, setShowNotif] = useState(false);

  // Sauvegarder le score à chaque changement
  useEffect(() => {
    localStorage.setItem("eumonia1-stars", stars);
  }, [stars]);

  // Animation et notification à chaque bonne réponse
  const handleGoodAnswer = () => {
    setStars(s => {
      setAnimateIdx(s); // animer la dernière étoile
      setShowNotif(true); // notification
      setTimeout(() => setAnimateIdx(-1), 500);
      setTimeout(() => setShowNotif(false), 1200);
      return s + 1;
    });
  };

  // Option pour réinitialiser le score
  const handleReset = () => setStars(0);

  return (
    <div>
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          {stars === 0 ? (
            <span style={{ fontSize: 18, color: "#aaa" }}>Aucune étoile pour le moment…</span>
          ) : (
            Array.from({ length: stars }).map((_, idx) => (
              <Star key={idx} animate={idx === animateIdx} />
            ))
          )}
        </div>
        {showNotif && (
          <div style={{
            position: "absolute",
            top: -8,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#ffd700ee",
            color: "#5a4fcf",
            borderRadius: 8,
            padding: "6px 22px",
            fontWeight: "bold",
            fontSize: 20,
            boxShadow: "0 2px 12px #ffd70066",
            zIndex: 2,
            animation: "notifpop 1s ease"
          }}>
            Bravo !
          </div>
        )}
      </div>
      <HomeInfo stars={stars} />
      <Avatar3D talking={talking} />
      <button onClick={handleGoodAnswer}>Bonne réponse ! (Gagner une étoile)</button>
      <button onClick={handleReset} style={{ marginLeft: 12 }}>Réinitialiser les étoiles</button>
      {/* Animation CSS pour la notif */}
      <style>{`
        @keyframes notifpop {
          0% { opacity: 0; transform: translateX(-50%) scale(0.8);}
          20% { opacity: 1; transform: translateX(-50%) scale(1.1);}
          80% { opacity: 1; transform: translateX(-50%) scale(1);}
          100% { opacity: 0; transform: translateX(-50%) scale(0.7);}
        }
      `}</style>
    </div>
  );
}

export default App;
