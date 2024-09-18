import { useEffect, useState } from "react";
import { fetchSettings } from "src/api/SettingsApi";
import { SettingsType } from "src/types/types";
import { initialSettingsState } from "src/utils/constants";
const useFetchSettings = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<SettingsType>(initialSettingsState);
  useEffect(() => {
    const fetchAndSetSettings = async () => {
      try {
        setLoading(true);
        const data = await fetchSettings();
        setSettings(data);
      } catch (error) {
        console.error("Error fetching rooms", error);
        setSettings(initialSettingsState);
      } finally {
        setLoading(false);
      }
    };
    fetchAndSetSettings();
  }, []);
  return { settings, setSettings, loading };
};

export default useFetchSettings;
