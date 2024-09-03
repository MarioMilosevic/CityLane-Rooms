import HeaderContainer from "../components/layout/HeadingContainer";
import FormBlock from "../components/layout/FormBlock";
import ContentWrapper from "../components/layout/ContentWrapper";
import Label from "../components/layout/Label";
import Input from "../components/layout/Input";
import { SettingsType } from "../types/types";
import { initialSettingsState, settingsFormFields } from "../utils/constants";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  settingsFormSchema,
  settingsFormValues,
} from "../validation/settingsFormSchema";
import useFetchSettings from "../hooks/useFetchSettings";
const Settings = () => {
  const [settings, setSettings] = useState<SettingsType>(initialSettingsState);
  useFetchSettings(setSettings);

  const { maxGuests, maxNights, minNights, breakfastPrice } = settings;

  const form = useForm<settingsFormValues>({
    defaultValues: {
      minNights,
      maxNights,
      breakfastPrice,
      maxGuests,
    },
    resolver: zodResolver(settingsFormSchema),
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  return (
    <>
      <HeaderContainer title="Update hotel settings" />
      <ContentWrapper>
        <FormBlock>
          <Label id={"Minimum nights/booking"} />
          <Input id={"Minimum nights/booking"} type="number" />
        </FormBlock>
        <FormBlock>
          <Label id={"Maximum nights/booking"} />
          <Input id={"Maximum nights/booking"} type="number" />
        </FormBlock>
        <FormBlock>
          <Label id={"Maximum guests/booking"} />
          <Input id={"Maximum guests/booking"} type="number" />
        </FormBlock>
        <FormBlock>
          <Label id={"Breakfast price"} />
          <Input id={"Breakfast price"} type="number" />
        </FormBlock>
      </ContentWrapper>
    </>
  );
};

export default Settings;
