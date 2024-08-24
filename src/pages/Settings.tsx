import HeaderContainer from "../components/layout/HeadingContainer";
import InputField from "../components/layout/InputField";
import TableContainer from "../components/layout/ContentWrapper";
const Settings = () => {
  return (
    <>
      <HeaderContainer title="Update hotel settings" isVisible={false} />
      <TableContainer>
        <InputField name="Minimum nights/booking" type="number" />
        <InputField name="Maximum nights/booking" type="number" />
        <InputField name="Maximum guests/booking" type="number" />
        <InputField name="Breakfast price" type="number" />
      </TableContainer>
    </>
  );
};

export default Settings;
