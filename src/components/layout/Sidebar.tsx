import logo from "../../assets/images/logo.jpg";
import { links } from "../../utils/constants";
import { useNavigate, useLocation } from "react-router-dom";
import Title from "../common/Title";
import Link from "../common/Link";
// import Uploader from "src/data/Uploader";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  console.log(pathname);
  console.log(pathname.slice(1));

  const clickHandler = (path: string) => {
    navigate(`/${path}`);
  };
  return (
    <aside className="bg-neutral-50 w-[250px] flex flex-col border-r border-neutral-200 dark:bg-slate-600 dark:border-slate-700">
      <img src={logo} alt={logo} className="w-full pb-6" />
      <Title title="CityLane Rooms" />
      <div className="flex flex-col pl-2 pt-6 gap-1">
        {links.map((link) => (
          <Link
            key={link.text}
            link={link}
            isSelected={pathname
              .toLowerCase()
              .includes(link.text.toLowerCase())}
            clickHandler={() => clickHandler(link.text)}
          />
        ))}
      </div>
      {/* <Uploader/> */}
    </aside>
  );
};

export default Sidebar;
