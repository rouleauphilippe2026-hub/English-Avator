import React, { useState } from "react";
import SettingsPanel from "./SettingsPanel";
import Avatar from "./Avatar";

function App() {
  const [userConfig, setUserConfig] = useState(null);
  const [message, setMessage] = useState("Hello! I am your intelligent avatar.");

  return (
    <div>
      <SettingsPanel onConfigChange={setUserConfig} />
      {userConfig &&
        <div>
          <Avatar message={message} config={userConfig} />
          <button onClick={() => setMessage("How can I help you today?")}>
            Parle-moi
          </button>
        </div>
      }
    </div>
  );
}

