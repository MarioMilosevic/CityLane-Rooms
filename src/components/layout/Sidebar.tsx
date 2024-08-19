import logo from "../../assets/images/logo.png";
const Sidebar = () => {
  return (
    <div className="border-black border w-[500px]">
      <div className="bg-gray-50 w-[200px] border border-black">
        <img src={logo} alt={logo} className="w-full" />
      </div>
      <h1 className="text-2xl font-medium tracking-wide border border-black">EchoStay</h1>
    </div>
  );
};

export default Sidebar;
