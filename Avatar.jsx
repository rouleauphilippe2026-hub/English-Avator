import React, { useEffect } from "react";

function speak(text, voiceEnabled, premiumTTS) {
  if (!voiceEnabled) return;
  if (premiumTTS) {
    // Intégration ElevenLabs, Google, Azure... (à compléter selon API)
    alert("Synthèse premium non intégrée dans cet exemple !");
  } else {
    // Synthèse vocale native
    const synth = window.speechSynthesis;
    const utter = new window.SpeechSynthesisUtterance(text);
    synth.speak(utter);
  }
}

export default function Avatar({ message, config }) {
  useEffect(() => {
    if (message) speak(message, config.voiceEnabled, config.premiumTTS);
  }, [message, config.voiceEnabled, config.premiumTTS]);

  return (
    <div style={{
      width: 160,
      height: 160,
      borderRadius: "50%",
      background: "#cde",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 28,
      margin: "24px auto",
      boxShadow: "0 2px 6px #aaa"
    }}>
      {/* Simple avatar visuel */}
      <span role="img" aria-label="Avatar">🧑‍🎓</span>
      {/* Animation bouche (à compléter si lipsyncEnabled) */}
      {config.lipsyncEnabled && <div style={{
        position: "absolute",
        bottom: 26,
        left: "50%",
        transform: "translateX(-50%)",
        width: 40,
        height: 18,
        borderRadius: "0 0 20px 20px",
        background: "#222",
        animation: "mouthmove 1s infinite"
      }} />}
      {/* Ajoute une animation CSS si lipsyncEnabled */}
      <style>
        {`
          @keyframes mouthmove {
            0%, 100% { height: 18px; }
            50% { height: 32px; }
          }
        `}
      </style>
    </div>
  );
