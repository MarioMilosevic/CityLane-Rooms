import logo from "src/assets/images/logo.jpg";
import PrimaryActionButton from "../components/common/PrimaryActionButton";
import FormBlock from "../components/layout/FormBlock";
import Input from "../components/layout/Input";
import Label from "../components/layout/Label";
import { getSession, loginUser } from "src/api/LoginApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginUserFormValues,
  loginUserSchema,
} from "src/validation/loginUserSchema";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "src/utils/toast";
import { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const retrieveSession = async () => {
      const {session} = await getSession();
      if (session) {
        console.log('uslo')
        navigate("/bookings");
      }
    };
    retrieveSession();
  }, [navigate]);

  const form = useForm<loginUserFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginUserSchema),
    mode:'onSubmit'
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    
  } = form;

  const onSubmit = async (formData: loginUserFormValues) => {
    try {
      const response = await loginUser(formData);
      if (response) {
        navigate('/bookings')
        reset();
      }
    } catch (error) {
      showToast("Unexpected error occured, please try again later");
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center w-full pt-36">
      <Toaster />
      <div className="flex flex-col gap-4 items-center">
        <img
          src={logo}
          alt="Company logo"
          className="rounded-full w-[100px] h-[100px]"
        />
        <h2 className="text-2xl text-yellow-800 text-center">CityLane Rooms</h2>
        <h1 className="text-3xl font-medium">Log into your account</h1>
      </div>
      <form
        className="w-[500px] pt-24 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormBlock size="small" direction="column">
          <Label id="Email address" />
          <Input
            id="Email address"
            type="email"
            zod={{ ...register("email") }}
            error={errors.email}
          />
        </FormBlock>
        <FormBlock size="small" direction="column">
          <Label id="Password" />
          <Input
            id="Password"
            type="password"
            zod={{ ...register("password") }}
            error={errors.password}
          />
        </FormBlock>
        <PrimaryActionButton text="Log in" color="yellow" type="submit" />
      </form>
    </main>
  );
};

export default Login;
