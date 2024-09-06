import roomHubLogo from "../assets/images/roomhub icon.jpg";
import PrimaryActionButton from "../components/common/PrimaryActionButton";
import FormBlock from "../components/layout/FormBlock";
import Input from "../components/layout/Input";
import Label from "../components/layout/Label";
import PrimaryActionButtonWrapper from "../components/layout/PrimaryActionButtonWrapper";
const Login = () => {
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
      <form className="w-[600px] pt-12 flex flex-col ">
        <FormBlock size="small">
          <Label id="Email address" />
          <Input id="Email address" type="email" />
        </FormBlock>
        <FormBlock size="small">
          <Label id="Password" />
          <Input id="Password" type="password" />
        </FormBlock>
        <PrimaryActionButton text="Log in" color="yellow" />
      </form>
    </main>
  );
};

export default Login;
