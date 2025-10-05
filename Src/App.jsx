import React, { useState } from "react";
import SettingsPanel from "./components/SettingsPanel";
import Avatar3D from "./components/Avatar3D";

function App() {
  const [userConfig, setUserConfig] = useState(null);

  return (
    <div>
      <SettingsPanel onConfigChange={setUserConfig} />
      <Avatar3D />
      {/* ...Le reste de ton app */}
    </div>
  );
}

