import { useEffect, useState } from "react";
import { fetchSettings } from "src/api/SettingsApi";
import { SettingsType } from "src/types/types";
const useFetchSettings = (
  setSettings: React.Dispatch<React.SetStateAction<SettingsType>>
) => {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchAndSetSettings = async () => {
      try {
        setLoading(true);
        const data = await fetchSettings();
        setSettings(data);
      } catch (error) {
        console.error("Error fetching settings data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAndSetSettings();
  }, [setSettings]);
  return loading;
};

export default useFetchSettings;
