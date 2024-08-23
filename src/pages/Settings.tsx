import HeaderContainer from "../components/layout/HeadingContainer";
import InputField from "../components/layout/InputField";
import TableContainer from "../components/layout/Table/TableContainer";
import { settingsFields } from "../utils/constants";
const Settings = () => {
  return (
    <>
      <HeaderContainer title="Update hotel settings" isVisible={false} />
      <TableContainer>
        {settingsFields.map((field) => (
          <InputField key={field.id} {...field} />
        ))}
      </TableContainer>
    </>
  );
};

export default Settings;
