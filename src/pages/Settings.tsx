import HeaderContainer from "../components/layout/HeadingContainer";
import FormBlock from "../components/layout/FormBlock";
import ContentWrapper from "../components/layout/ContentWrapper";
import Label from "../components/layout/Label";
import Input from "../components/layout/Input";
import { SettingsType } from "../types/types";
import { initialSettingsState } from "../utils/constants";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  settingsFormSchema,
  settingsFormValues,
} from "../validation/settingsFormSchema";
import LoadingSpinner from "../components/layout/LoadingSpinner";
import useFetchSettings from "../hooks/useFetchSettings";
import PrimaryActionButton from "../components/common/PrimaryActionButton";
import { updateSettings } from "../services/SettingsApi";
const Settings = () => {
  const [settings, setSettings] = useState<SettingsType>(initialSettingsState);
  const loading = useFetchSettings(setSettings);

  const { maxGuests, maxNights, minNights, breakfastPrice } = settings;

  const form = useForm<settingsFormValues>({
    defaultValues: {
      minNights,
      maxNights,
      breakfastPrice,
      maxGuests,
    },
    values: settings,
    resolver: zodResolver(settingsFormSchema),
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (formData: settingsFormValues) => {
    const response = await updateSettings(formData);
    setSettings(response);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <HeaderContainer title="Update hotel settings" />
      <ContentWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormBlock>
            <Label id={"Minimum nights/booking"} />
            <Input
              id={"Minimum nights/booking"}
              type="number"
              zod={{ ...register("minNights") }}
              error={errors.minNights}
            />
          </FormBlock>
          <FormBlock>
            <Label id={"Maximum nights/booking"} />
            <Input
              id={"Maximum nights/booking"}
              type="number"
              zod={{ ...register("maxNights") }}
              error={errors.maxNights}
            />
          </FormBlock>
          <FormBlock>
            <Label id={"Maximum guests/booking"} />
            <Input
              id={"Maximum guests/booking"}
              type="number"
              zod={{
                ...register("maxGuests"),
              }}
              error={errors.maxGuests}
            />
          </FormBlock>
          <FormBlock>
            <Label id={"Breakfast price"} />
            <Input
              id={"Breakfast price"}
              type="number"
              zod={{ ...register("breakfastPrice") }}
              error={errors.breakfastPrice}
            />
          </FormBlock>
          <PrimaryActionButton text="Save changes" color="blue" type="submit" />
        </form>
      </ContentWrapper>
    </>
  );
};

export default Settings;
