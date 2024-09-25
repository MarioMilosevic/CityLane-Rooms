import logo from "../../assets/images/logo.jpg";
import { links } from "../../utils/constants";
import { useNavigate, useLocation } from "react-router-dom";
import Title from "../common/Title";
import PageLink from "../common/PageLink";
import { SidebarProps } from "src/types/types";
import Uploader from "src/data/Uploader";

const Sidebar = ({ isSidebarOpen, closeSidebar }: SidebarProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const clickHandler = (path: string) => {
    navigate(`/${path}`);
    if (isSidebarOpen) {
      closeSidebar();
    }
  };
  return (
    <aside
      className={`bg-neutral-50 w-[220px] lg:w-[300px] lg:flex lg:flex-col border-neutral-200 rounded-lg dark:bg-slate-800 lg:translate-x-0 lg:static absolute z-20 lg:z-0 transition duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-[100%]"
      }`}
    >
      <img src={logo} alt={logo} className="w-full pb-6" />
      <Title title="CityLane Rooms" position="center" />
      <div className="flex flex-col pt-6 pb-8 px-3 gap-1">
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
      <Uploader />
    </aside>
  );
};

export default Sidebar;
