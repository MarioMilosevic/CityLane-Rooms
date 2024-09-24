import logo from "../../assets/images/logo.jpg";
import { links } from "../../utils/constants";
import { useNavigate, useLocation } from "react-router-dom";
import Title from "../common/Title";
import PageLink from "../common/PageLink";
import SidebarOverlay from "./SidebarOverlay";
// import Uploader from "src/data/Uploader";

const Sidebar = ({isSidebarOpen}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const clickHandler = (path: string) => {
    navigate(`/${path}`);
  };
  return (
    <aside className={`bg-neutral-50 w-[250px] lg:w-[300px] lg:flex lg:flex-col border border-neutral-200 dark:bg-slate-600 dark:border-slate-50 lg:translate-x-0 lg:static absolute z-20 lg:z-0 transition duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-[100%]"}`}>
      <img src={logo} alt={logo} className="w-full pb-6" />
      <Title title="CityLane Rooms" position="center" />
      <div className="flex flex-col pt-6 gap-1">
        {links.map((link) => (
          <PageLink
            key={link.text}
            link={link}
            isSelected={pathname
              .toLowerCase()
              .includes(link.text.toLowerCase())}
            clickHandler={() => clickHandler(link.text)}
          />
        ))}
      </div>
      {/* <Uploader /> */}
      {/* {isSidebarOpen && <SidebarOverlay />} */}
    </aside>
  );
};

export default Sidebar;
