import HeaderContainer from "../components/layout/HeadingContainer";
import FormBlock from "../components/layout/FormBlock";
import ContentWrapper from "../components/layout/ContentWrapper";
import Label from "../components/layout/Label";
import Input from "../components/layout/Input";
import { SettingsType } from "../types/types";
import { initialSettingsState, settingsFormFields } from "../utils/constants";
import useFetchSettings from "../hooks/useFetchSettings";
import { useState } from "react";
const Settings = () => {
  const [settings, setSettings] = useState<SettingsType>(initialSettingsState);
  useFetchSettings(setSettings);
  console.log(settings)
  return (
    <>
      <HeaderContainer title="Update hotel settings" />
      <ContentWrapper>
        {settingsFormFields.map((form, index) => (
          <FormBlock key={index}>
            <Label id={form.name} />
            <Input id={form.name} type={form.type} />
          </FormBlock>
        ))}
      </ContentWrapper>
    </>
  );
};

export default Settings;
