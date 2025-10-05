import React from "react";

export default function HomeInfo({ stars = 0 }) {
  // Génère les étoiles selon le score
  const renderStars = () => {
    return (
      <div style={{ marginBottom: 16 }}>
        {Array.from({ length: stars }).map((_, idx) => (
          <span key={idx} style={{ fontSize: 32, color: "#ffd700", marginRight: 4 }}>★</span>
        ))}
        {stars === 0 && (
          <span style={{ fontSize: 18, color: "#aaa" }}>Aucune étoile pour le moment…</span>
        )}
      </div>
    );
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, #e3f0ff 0%, #f3e3ff 100%)",
      borderRadius: 24,
      padding: 32,
      maxWidth: 540,
      margin: "32px auto",
      boxShadow: "0 6px 32px #b3b3e6",
      textAlign: "center"
    }}>
      {renderStars()}
      <img
        src="https://github.com/rouleauphilippe2023-oss/English-Avator/raw/main/public/avatar-face.png"
        alt="Avatar Eumonia1"
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          boxShadow: "0 2px 12px #aaa",
          marginBottom: 24,
          border: "4px solid #fff"
        }}
      />
      <h1 style={{ color: "#5a4fcf", marginBottom: 8 }}>Eumonia1 Avatar Web App</h1>
      <p style={{ fontSize: 18, marginBottom: 16, color: "#444" }}>
        <b>Bienvenue !</b> <br />
        Découvrez Eumonia1, l’avatar 3D intelligent animé.<br/>
        Cliquez sur <b>« Parle-moi »</b> pour voir Eumonia1 bouger la bouche et parler grâce à la synthèse vocale.<br/>
        <span style={{ color: "#8a3ffb" }}>Explorez la modélisation 3D, le lipsync en temps réel et l’intégration IA possible.</span>
      </p>
      <div style={{
        background: "#e9e9fd",
        borderRadius: 12,
        padding: "12px 24px",
        fontSize: 16,
        marginBottom: 12,
        display: "inline-block"
      }}>
        <b>Technos :</b> React, Three.js, react-three-fiber, @react-three/drei
      </div>
      <p style={{ fontSize: 15, color: "#888", marginTop: 12 }}>
        Ce projet démontre l’animation d’un avatar 3D (GLB) dans une application React, pilotée par la voix et les interactions utilisateur.<br/>
        <span style={{ fontSize: 13 }}>Auteur : <a href="https://github.com/rouleauphilippe2026-hub" style={{ color: "#5a4fcf" }}>rouleauphilippe2026-hub</a></span>
      </p>
    </div>
  );
