import HeaderContainer from "../components/layout/HeadingContainer";
import ContentWrapper from "../components/layout/ContentWrapper";
import { SettingsType } from "../types/types";
import { initialSettingsState } from "../utils/constants";
import { useState } from "react";
import LoadingSpinner from "../components/layout/LoadingSpinner";
import useFetchSettings from "../hooks/useFetchSettings";
import SettingsForm from "../components/layout/SettingsForm";
const Settings = () => {
  const [settings, setSettings] = useState<SettingsType>(initialSettingsState);
  const loading = useFetchSettings(setSettings);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <HeaderContainer title="Update hotel settings" />
      <ContentWrapper>
        <SettingsForm settings={settings} setSettings={setSettings} />
      </ContentWrapper>
    </>
  );
};

export default Settings;
