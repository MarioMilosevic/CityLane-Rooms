import logo from "../../assets/images/logo.png";
import { links } from "../../utils/constants";
import Link from "../common/Link";

const Sidebar = () => {
  return (
    <div className="bg-neutral-50 w-[200px] flex flex-col">
      <img src={logo} alt="Logo" className="w-full" />
      <h1 className="text-2xl tracking-wide flex justify-center pb-10">EchoStay</h1>
      <ul className="flex flex-col  pl-2">
        {links.map((link, index) => (
          <Link link={link} index={index} isSelected={true} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
