import { FaUser, FaMoon, FaSun } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import supabase from "src/config/supabaseClient";
import { showToast } from "src/utils/toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { retrieveUser } from "src/api/AccountApi";
import LoadingSpinner from "../common/LoadingSpinner";

const Navigation = ({
  handleThemeSwitch,
  theme,
}: {
  handleThemeSwitch: () => void;
  theme: string;
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    try {
      setLoading(true);
      const retrieveUserInfo = async () => {
        const user = await retrieveUser();
        console.log(user);
        setUser(user);
      };
      retrieveUserInfo();
    } catch (error) {
      console.error("Unexpected error occured", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading || !user) return <LoadingSpinner />;

  const {
    user_metadata: { fullName, image },
  } = user;

  console.log(fullName);
  console.log(image);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      showToast("Unable to sign out");
      console.error("Unable to sign out", error);
    }
  };

  const goToAccount = () => {
    navigate("/account");
  };

  return (
    <nav className="flex justify-end gap-4 mx-12 h-[50px] py-2 bg-neutral-50 dark:bg-slate-700">
      <div className="flex gap-2 justify-center items-center h-full">
        <img src={image} alt={image} className="rounded-full h-full" />
        <span className="text-sm lowercase">{fullName}</span>
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
    </nav>
  );
};

export default Navigation;
