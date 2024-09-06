import roomHubLogo from "../assets/images/roomhub icon.jpg";
import PrimaryActionButton from "../components/common/PrimaryActionButton";
import FormBlock from "../components/layout/FormBlock";
import Input from "../components/layout/Input";
import Label from "../components/layout/Label";
import { loginUser } from "./LoginApi";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserFormValues, loginUserSchema } from "./loginUserSchema";

const Login = () => {

const form = useForm<loginUserFormValues>({
  defaultValues: {
    email: "",
    password: "",
  },
  resolver: zodResolver(loginUserSchema),
  mode: "onChange",
});
const {
  register,
  handleSubmit,
  formState: { errors },
  } = form;
  
  const onSubmit = async () => {
    console.log('radi')
  }

  return (
    <main className="flex flex-col items-center w-full pt-36">
      <div className="flex flex-col gap-4 items-center">
        <img
          src={roomHubLogo}
          alt={roomHubLogo}
          className="rounded-full w-[100px] h-[100px]"
        />
        <h2 className="text-2xl text-yellow-800 text-center">ROOMHUB</h2>
        <h1 className="text-4xl font-medium">Log into your account</h1>
      </div>
      <form className="w-[500px] pt-24 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <FormBlock size="small" direction="column">
          <Label id="Email address" />
          <Input id="Email address" type="email" zod={{...register('email')}} error={errors.email}/>
        </FormBlock>
        <FormBlock size="small" direction="column">
          <Label id="Password" />
          <Input id="Password" type="password" zod={{ ...register("password") }} error={errors.password} />
        </FormBlock>
        <PrimaryActionButton text="Log in" color="yellow" type="submit" />
      </form>
    </main>
  );
};

export default Login;
