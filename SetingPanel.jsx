import React, { useState } from "react";
import { featuresConfig } from "./featuresConfig";

export default function SettingsPanel({ onConfigChange }) {
  // Initialise le state avec la config par défaut
  const [config, setConfig] = useState(featuresConfig);

  // Mise à jour d'une option
  const handleChange = (key, value) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    if (onConfigChange) onConfigChange(newConfig); // remonte si le parent veut suivre la config
  };

  return (
    <div style={{
      border: "1px solid #eee",
      padding: 16,
      borderRadius: 8,
      maxWidth: 400,
      background: "#fafcff",
      margin: "20px auto"
    }}>
      <h3 style={{marginBottom: 16}}>Options facultatives</h3>
      <div style={{marginBottom: 8}}>
        <label>
          <input
            type="checkbox"
            checked={config.voiceEnabled}
            onChange={e => handleChange("voiceEnabled", e.target.checked)}
          />
          &nbsp;Voix IA activée
        </label>
      </div>
      <div style={{marginBottom: 8}}>
        <label>
          <input
            type="checkbox"
            checked={config.lipsyncEnabled}
            onChange={e => handleChange("lipsyncEnabled", e.target.checked)}
          />
          &nbsp;Animation de bouche
        </label>
      </div>
      <div style={{marginBottom: 8}}>
        <label>
          <input
            type="checkbox"
            checked={config.quizEnabled}
            onChange={e => handleChange("quizEnabled", e.target.checked)}
          />
          &nbsp;Quiz IA adaptatif
        </label>
      </div>
      <div style={{marginBottom: 8}}>
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
      <div style={{marginBottom: 0}}>
        <label>
          <input
            type="checkbox"
            checked={config.premiumTTS}
            onChange={e => handleChange("premiumTTS", e.target.checked)}
          />
          &nbsp;Synthèse vocale premium
        </label>
      </div>
    </div>
  );
