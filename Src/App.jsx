import React, { useState } from "react";
import SettingsPanel from "./components/SettingsPanel";
import Avatar3D from "./components/Avatar3D";

function App() {
  const [userConfig, setUserConfig] = useState(null);
  const [talking, setTalking] = useState(false);

  // Simule la parole pendant 2 secondes
  const handleSpeak = () => {
    setTalking(true);
    setTimeout(() => setTalking(false), 2000);
  };

  return (
    <div>
      <SettingsPanel onConfigChange={setUserConfig} />
      <Avatar3D talking={talking} />
      <button onClick={handleSpeak}>Parle-moi</button>
      {/* ...Le reste de ton app */}
    </div>
  );
}

