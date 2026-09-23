import { createContext, useContext, useState, useEffect } from "react";
import storage from "../lib/storage";

export function useSettings() {
  const contextSettings = useContext(ContextSettings);
  return contextSettings;
}

export const ContextSettings = createContext({
  preferences: { showTodoDone: true, imageFile: "" },
  setPreferences: () => {},
});

const defaultSettings = { showTodoDone: true, imageFile: "" };

function SettingsProvider({ children }) {
  const [preferences, setPreferences] = useState(defaultSettings);

  const getPreferences = async () => {
    const preferences = await storage.load({ key: "preferences" });
    if (preferences) {
      setPreferences(preferences);
    }
  };
  useEffect(() => {
    getPreferences();
  }, []);

  return (
    <ContextSettings.Provider value={{ preferences, setPreferences }}>
      {children}
    </ContextSettings.Provider>
  );
}

export default SettingsProvider;
