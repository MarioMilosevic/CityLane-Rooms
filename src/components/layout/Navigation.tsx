import { FaUser, FaMoon, FaSun } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import supabase from "src/config/supabaseClient";
import { showToast } from "src/utils/toast";
import { useNavigate } from "react-router-dom";
import { NavigationProps } from "src/types/types";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";

const Navigation = ({
  handleThemeSwitch,
  theme,
  user,
  setIsSidebarOpen,
}: NavigationProps) => {
  const navigate = useNavigate();
  const {
    user_metadata: { fullName, image },
  } = user;

  const firstName = fullName.split(" ")[0];

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      showToast("Unable to sign out", 'error');
      console.error("Unable to sign out", error);
    }
  };

  const goToAccount = () => {
    navigate("/account");
  };

  return (
    <nav className="flex justify-between lg:justify-end items-center gap-4 px-8 h-[50px] py-2  bg-neutral-50 dark:bg-slate-700 relative">
      <BsLayoutTextSidebarReverse
        className="block lg:hidden cursor-pointer"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      />
      <div className="h-full flex gap-6">
        <div className="flex gap-2 justify-center items-center h-full">
          {image && (
            <img src={image} alt={image} className="rounded-full h-full" />
          )}
          <span className="text-sm lowercase">{firstName}</span>
        </div>
        <div className="flex items-center gap-4">
          <FaUser className="cursor-pointer" onClick={goToAccount} />
          {theme === "light" ? (
            <FaSun className="cursor-pointer" onClick={handleThemeSwitch} />
          ) : theme === "dark" ? (
            <FaMoon className="cursor-pointer" onClick={handleThemeSwitch} />
          ) : null}
          <MdOutlineLogin className="cursor-pointer" onClick={signOut} />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
