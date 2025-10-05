import React, { useState } from "react";
import SettingsPanel from "./components/SettingsPanel";
import Avatar3D from "./components/Avatar3D";

function App() {
  const [userConfig, setUserConfig] = useState(null);
  const [talking, setTalking] = useState(false);

  // Fonction pour lancer la synthèse vocale et synchroniser la bouche
  const handleSpeak = () => {
    const utter = new window.SpeechSynthesisUtterance("Bonjour, je suis Eumonia1 !");
    utter.onstart = () => setTalking(true);
    utter.onend = () => setTalking(false);
    window.speechSynthesis.speak(utter);
  };

  return (
    <div>
      <SettingsPanel onConfigChange={setUserConfig} />
      <Avatar3D talking={talking} />
      <button onClick={handleSpeak}>Parle-moi</button>
    </div>
  );
}

