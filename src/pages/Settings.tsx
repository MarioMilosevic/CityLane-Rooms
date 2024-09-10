import HeaderContainer from "src/components/layout/HeadingContainer";
import ContentWrapper from "src/components/layout/ContentWrapper";
import { SettingsType } from "src/types/types";
import { initialSettingsState } from "src/utils/constants";
import { useState } from "react";
import LoadingSpinner from "src/components/layout/LoadingSpinner";
import useFetchSettings from "src/hooks/useFetchSettings";
import SettingsForm from "src/components/layout/SettingsForm";
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
