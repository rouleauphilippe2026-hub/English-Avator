import React from "react";

export default function HomeInfo({ stars = 0 }) {
  // Génère les étoiles selon le score
  const renderStars = () => (
    <div style={{ marginBottom: 16 }}>
      {Array.from({ length: stars }).map((_, idx) => (
        <span key={idx} style={{
          fontSize: 32,
          color: "#ffd700",
          marginRight: 4,
          textShadow: "0 2px 8px #fff300, 0 6px 24px #a78500",
        }}>★</span>
      ))}
      {stars === 0 && (
        <span style={{
          fontSize: 18,
          color: "#4b197a",
          background: "rgba(255,255,255,0.18)",
          borderRadius: 16,
          padding: "10px 32px",
          boxShadow: "0 4px 20px #2c1144, 0 2px 10px #a3a0d6",
          border: "2px solid #b9a3fa",
          fontWeight: "bold",
          backdropFilter: "blur(8px)",
          display: "inline-block"
        }}>
          Aucune étoile pour le moment…
        </span>
      )}
    </div>
  );

  return (
    <div style={{
      background: "rgba(255,255,255,0.12)",
      borderRadius: 24,
      padding: 32,
      maxWidth: 540,
      margin: "32px auto",
      boxShadow: "0 6px 32px #b3b3e6",
      textAlign: "center",
      position: "relative",
      backdropFilter: "blur(8px)",
      border: "2px solid #b9a3fa",
    }}>
      {renderStars()}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
        position: "relative",
      }}>
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: "radial-gradient(circle, #ffe60044 30%, #6a32aa33 80%)",
          filter: "blur(6px)",
          zIndex: 0,
          pointerEvents: "none"
        }} />
        <img
          src="https://github.com/rouleauphilippe2023-oss/English-Avator/raw/main/public/avatar-face.png"
          alt="Avatar Eumonia1"
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            boxShadow: "0 2px 12px #aaa",
            border: "4px solid #fff",
            position: "relative",
            zIndex: 1
          }}
        />
      </div>
      <h1 style={{ color: "#5a4fcf", marginBottom: 8 }}>Eumonia1 Avatar Web App</h1>
      <p style={{ fontSize: 18, marginBottom: 16, color: "#444" }}>
        <b>Bienvenue !</b> <br />
        Découvrez Eumonia1, l’avatar 3D intelligent animé.<br/>
        Cliquez sur <b>« Parle-moi »</b> pour voir Eumonia1 bouger la bouche et parler grâce à la synthèse vocale.<br/>
        <span style={{ color: "#8a3ffb" }}>Explorez la modélisation 3D, le lipsync en temps réel et l’intégration IA possible.</span>
      </p>
      <div style={{
        background: "rgba(255,255,255,0.18)",
        borderRadius: 12,
        padding: "12px 24px",
        fontSize: 16,
        marginBottom: 12,
        display: "inline-block",
        backdropFilter: "blur(8px)",
        border: "2px solid #b9a3fa",
      }}>
        <b>Technos :</b> React, Three.js, react-three-fiber, @react-three/drei
      </div>
      <p style={{ fontSize: 15, color: "#888", marginTop: 12 }}>
        Ce projet démontre l’animation d’un avatar 3D (GLB) dans une application React, pilotée par la voix et les interactions utilisateur.<br/>
        <span style={{ fontSize: 13 }}>Auteur : <a href="https://github.com/rouleauphilippe2026-hub" style={{ color: "#5a4fcf" }}>rouleauphilippe2026-hub</a></span>
      </p>
    </div>
  );
