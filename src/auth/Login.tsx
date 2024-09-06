import roomHubLogo from "../assets/images/roomhub icon.jpg";
const Login = () => {
  return (
    <main className="flex flex-col items-center w-full pt-36">
      <div className="flex flex-col gap-4 border border-black items-center">
        <img
          src={roomHubLogo}
          alt={roomHubLogo}
          className="border border-black rounded-full w-[100px] h-[100px]"
        />
        <h2 className="text-2xl  text-center">RoomHub</h2>
        <h1 className="text-4xl font-medium">Log into your account</h1>
      </div>
      <form className="border border-black">
        forma 
      </form>
    </main>
  );
};

export default Login;
