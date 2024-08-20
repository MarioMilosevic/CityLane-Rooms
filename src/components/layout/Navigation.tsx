import { FaUser, FaMoon } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import userPicture from "../../assets/images/mariomilosevic.jpg";
const Navigation = () => {
  return (
    <nav className="flex justify-end gap-4 w-full h-[50px] py-2 pr-16 border-b border-neutral-200">
      <div className="flex gap-2 justify-center items-center h-full">
        <img
          src={userPicture}
          alt={userPicture}
          className="rounded-full h-full"
        />
        <span className="text-sm lowercase">Mario</span>
      </div>
      <div className="flex items-center gap-4">
        <FaUser className="cursor-pointer" />
        <FaMoon className="cursor-pointer" />
        <MdOutlineLogin className="cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navigation;
