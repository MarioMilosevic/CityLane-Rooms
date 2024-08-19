import logo from "../../assets/images/logo.png";
import { links } from "../../utils/constants";
import Link from "../common/Link";

const Sidebar = () => {
  return (
    <div className="border-black border w-[500px]">
      <div className="bg-gray-50 w-[200px] border border-black">
        <img src={logo} alt="Logo" className="w-full" />
      </div>
      <h1 className="text-2xl font-medium tracking-wide border border-black">
        EchoStay
      </h1>
      <ul>
        {links.map((link, index) => (
          <Link link={link} index={index}/>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
