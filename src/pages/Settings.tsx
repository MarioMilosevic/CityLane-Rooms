import HeaderContainer from "../components/layout/HeadingContainer";
import FormBlock from "../components/layout/FormBlock";
import ContentWrapper from "../components/layout/ContentWrapper";
import Label from "../components/layout/Label";
import Input from "../components/layout/Input";
import { settingsFormFields } from "../utils/constants";
const Settings = () => {
  return (
    <>
      <HeaderContainer title="Update hotel settings" isVisible={false} />
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
