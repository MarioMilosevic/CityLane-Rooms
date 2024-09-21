import { FaUser, FaMoon, FaSun } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import userPicture from "../../assets/images/mariomilosevic.jpg";
import supabase from "src/config/supabaseClient";
import { showToast } from "src/utils/toast";
import { useNavigate } from "react-router-dom";
const Navigation = ({
  handleThemeSwitch,
  theme,
}: {
  handleThemeSwitch: () => void;
  theme: string;
}) => {
  const navigate = useNavigate();
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      showToast("Unable to sign out");
      console.error("Unable to sign out", error);
    }
  };

  return (
    <nav className="flex justify-end gap-4 mx-12 h-[50px] py-2 bg-neutral-50 dark:bg-slate-700">
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
        {theme === "light" ? (
          <FaSun className="cursor-pointer" onClick={handleThemeSwitch} />
        ) : theme === "dark" ? (
          <FaMoon className="cursor-pointer" onClick={handleThemeSwitch} />
        ) : null}
        <MdOutlineLogin className="cursor-pointer" onClick={signOut} />
      </div>
    </nav>
  );
};

export default Navigation;
