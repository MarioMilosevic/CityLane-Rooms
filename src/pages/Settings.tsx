import HeaderContainer from "src/components/layout/HeadingContainer";
import ContentWrapper from "src/components/layout/ContentWrapper";
import LoadingSpinner from "src/components/layout/LoadingSpinner";
import SettingsForm from "src/components/layout/SettingsForm";
import useFetchSettings from "src/hooks/useFetchSettings";
const Settings = () => {
  const { settings, setSettings, loading } = useFetchSettings();

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
