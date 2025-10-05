import React, { useState, useEffect } from "react";
import HomeInfo from "./components/HomeInfo";
import Avatar3D from "./components/Avatar3D";

// Étoile 3D stylisée
const Star = ({ animate }) => (
  <span
    style={{
      fontSize: 40,
      marginRight: 8,
      color: "#ffe600",
      textShadow:
        "0 2px 8px #fff300, 0 6px 24px #a78500, 0 0px 0px #ffd700, 0 1px 0px #fff",
      filter: animate
        ? "drop-shadow(0 0 16px #fff300) drop-shadow(0 0 8px #a78500)"
        : "drop-shadow(0 2px 12px #a78500)",
      transition: "transform 0.5s cubic-bezier(.68,-0.55,.27,1.55)",
      transform: animate ? "scale(1.7) rotate(-12deg)" : "scale(1)",
      borderRadius: "50%",
      border: "2px solid #fffbe6"
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
      setTimeout(() => setAnimateIdx(-1), 600);
      setTimeout(() => setShowNotif(false), 1200);
      return s + 1;
    });
  };

  // Option pour réinitialiser le score
  const handleReset = () => setStars(0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #31165e 0%, #4b197a 60%, #1a0936 100%)",
        paddingBottom: 42,
      }}
    >
      <div style={{ position: "relative", paddingTop: 32 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          {stars === 0 ? (
            <span
              style={{
                fontSize: 20,
                color: "#4b197a",
                background: "#fff",
                borderRadius: 16,
                padding: "10px 32px",
                boxShadow: "0 4px 20px #2c1144, 0 2px 10px #a3a0d6",
                border: "2px solid #b9a3fa",
                fontWeight: "bold",
                display: "inline-block"
              }}
            >
              Aucune étoile pour le moment…
            </span>
          ) : (
            Array.from({ length: stars }).map((_, idx) => (
              <Star key={idx} animate={idx === animateIdx} />
            ))
          )}
        </div>
        {showNotif && (
          <div
            style={{
              position: "absolute",
              top: -8,
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(90deg, #ffe600ee 40%, #ffcf3b 100%)",
              color: "#4b197a",
              borderRadius: 16,
              padding: "12px 40px",
              fontWeight: "bold",
              fontSize: 24,
              boxShadow: "0 6px 26px #2c1144, 0 2px 8px #ffe60066",
              border: "2px solid #fffbe6",
              zIndex: 2,
              animation: "notifpop 1s ease"
            }}
          >
            Bravo !
          </div>
        )}
      </div>
      <HomeInfo stars={stars} />
      <Avatar3D talking={talking} />
      <div style={{ textAlign: "center", marginTop: 18 }}>
        <button
          onClick={handleGoodAnswer}
          style={{
            background: "linear-gradient(90deg,#6a32aa,#4b197a 80%)",
            color: "#ffe600",
            border: "none",
            borderRadius: 12,
            fontWeight: "bold",
            fontSize: 18,
            padding: "14px 36px",
            marginRight: 14,
            boxShadow: "0 4px 20px #31165e",
            cursor: "pointer",
            transition: "background 0.2s",
            letterSpacing: "1px",
            textShadow: "0 2px 10px #a78500",
          }}
        >
          Bonne réponse ! (Gagner une étoile)
        </button>
        <button
          onClick={handleReset}
          style={{
            background: "#fff",
            color: "#4b197a",
            border: "2px solid #4b197a",
            borderRadius: 12,
            fontWeight: "bold",
            fontSize: 16,
            padding: "12px 28px",
            cursor: "pointer",
            marginLeft: 8,
            boxShadow: "0 4px 16px #c7bbf7",
          }}
        >
          Réinitialiser les étoiles
        </button>
      </div>
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

