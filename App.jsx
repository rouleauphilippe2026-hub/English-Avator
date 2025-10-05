import React, { useState } from "react";
import SettingsPanel from "./SettingsPanel";

function App() {
  const [userConfig, setUserConfig] = useState(null);

  return (
    <div>
      <SettingsPanel onConfigChange={setUserConfig} />
      {/* Les modules peuvent utiliser userConfig pour adapter leur comportement */}
    </div>
  );
}

