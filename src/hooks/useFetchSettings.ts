import { useEffect } from "react";
import { fetchSettings } from "../services/SettingsApi";
import { SettingsType } from "../types/types";
const useFetchSettings = (
  setSettings: React.Dispatch<React.SetStateAction<SettingsType>>
) => {
  useEffect(() => {
    const fetchAndSetSettings = async () => {
      try {
        const data = await fetchSettings();
        setSettings(data);
      } catch (error) {
        console.error("Error fetching settings data", error);
      }
    };
    fetchAndSetSettings();
  }, [setSettings]);
};

export default useFetchSettings;
