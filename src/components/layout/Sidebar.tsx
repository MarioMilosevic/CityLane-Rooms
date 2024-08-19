import logo from "../../assets/images/logo.png";
import { links } from "../../utils/constants";
import Link from "../common/Link";

const Sidebar = () => {
  return (
    <div className="bg-neutral-50 w-[200px]">
        <img src={logo} alt="Logo" className="w-full border border-black" />
      <h1 className="text-xl tracking-wide flex justify-center">
        EchoStay
      </h1>
      <ul>
        {links.map((link, index) => (
          <Link link={link} index={index} isSelected={true} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
