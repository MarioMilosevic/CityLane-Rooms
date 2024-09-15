import Label from "./Label";
import FormBlock from "./FormBlock";
import Input from "./Input";
import PrimaryActionButton from "../common/PrimaryActionButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  settingsFormSchema,
  settingsFormValues,
} from "src/validation/settingsFormSchema";
import { updateSettings } from "src/api/SettingsApi";
import { showToast } from "src/utils/toast";
import ButtonWrapper from "./ButtonWrapper";
import { SettingsFormProps } from "../../types/types";

const SettingsForm = ({ settings, setSettings }: SettingsFormProps) => {
  const form = useForm<settingsFormValues>({
    defaultValues: {
      maxGuests: settings.maxGuests,
      maxNights: settings.maxNights,
      minNights: settings.minNights,
      breakfastPrice: settings.breakfastPrice,
    },
    resolver: zodResolver(settingsFormSchema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = form;

  const onSubmit = async (formData: settingsFormValues) => {
    try {
      const response = await updateSettings(formData);
      if (response.id) {
        setSettings(response);
        showToast("Settings updated sucessfully", "success");
      } else {
        showToast("Updating failed, please try again", "error");
      }
    } catch (error) {
      showToast("Unexpected error occured, please try again", "error");
      console.error("Updating settings failed: ", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBlock size="big" direction="row">
        <Label id={"Minimum nights/booking"} />
        <Input
          id={"Minimum nights/booking"}
          type="number"
          zod={{ ...register("minNights") }}
          error={errors.minNights}
        />
      </FormBlock>
      <FormBlock size="big" direction="row">
        <Label id={"Maximum nights/booking"} />
        <Input
          id={"Maximum nights/booking"}
          type="number"
          zod={{ ...register("maxNights") }}
          error={errors.maxNights}
        />
      </FormBlock>
      <FormBlock size="big" direction="row">
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
      <FormBlock size="big" direction="row">
        <Label id={"Breakfast price"} />
        <Input
          id={"Breakfast price"}
          type="number"
          zod={{ ...register("breakfastPrice") }}
          error={errors.breakfastPrice}
        />
      </FormBlock>
      {isDirty && (
        <ButtonWrapper>
          <PrimaryActionButton
            text="Cancel"
            color="white"
            clickHandler={() => reset()}
          />
          <PrimaryActionButton
            text="Save changes"
            color="yellow"
            type="submit"
          />
        </ButtonWrapper>
      )}
    </form>
  );
};

export default SettingsForm;
