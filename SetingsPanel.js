import React, { useState } from "react";
import { featuresConfig } from "./featuresConfig";

export default function SettingsPanel({ onConfigChange }) {
  // Initialise le state avec la config par défaut
  const [config, setConfig] = useState(featuresConfig);

  // Mise à jour d'une option
  const handleChange = (key, value) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    if (onConfigChange) onConfigChange(newConfig); // remonte si parent veut suivre la config
  };

  return (
    <div style={{ border: "1px solid #eee", padding: 16, borderRadius: 8, maxWidth: 400 }}>
      <h3>Options facultatives</h3>
      <div>
        <label>
          <input
            type="checkbox"
            checked={config.voiceEnabled}
            onChange={e => handleChange("voiceEnabled", e.target.checked)}
          />
          Activer la voix IA
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={config.lipsyncEnabled}
            onChange={e => handleChange("lipsyncEnabled", e.target.checked)}
          />
          Animation de bouche synchronisée
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={config.quizEnabled}
            onChange={e => handleChange("quizEnabled", e.target.checked)}
          />
          Quiz IA adaptatif
        </label>
      </div>
      <div>
        <label>
          Mode:&nbsp;
          <select
            value={config.mode}
            onChange={e => handleChange("mode", e.target.value)}
          >
            <option value="expert">Expert</option>
            <option value="débutant">Débutant</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={config.premiumTTS}
            onChange={e => handleChange("premiumTTS", e.target.checked)}
          />
          Synthèse vocale premium
        </label>
      </div>
    </div>
  );
