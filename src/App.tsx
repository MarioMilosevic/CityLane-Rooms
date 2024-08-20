import supabase from "./config/supabaseClient";
import { /*useState,*/ useEffect } from "react";
import Sidebar from "./components/layout/Sidebar";
import MainContainer from "./components/layout/MainContainer";
import Navigation from "./components/layout/Navigation";
import Main from "./components/layout/Main";
import { setRooms } from "./redux/features/roomsSlice";
import { useDispatch } from "react-redux";
function App() {
  // const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase
        .from("Rooms")
        .select()
        .order("created_at", { ascending: true });

      if (error) {
        // setError("Error loading rooms");
        console.error(error);
        dispatch(setRooms([]));
      } else {
        dispatch(setRooms(data));
        // setError("");
      }
    };

    fetchRooms();
  }, [dispatch]);

  return (
    <>
      <Sidebar />
      <MainContainer>
        <Navigation />
        <Main />
      </MainContainer>
    </>
  );
}

export default App;
