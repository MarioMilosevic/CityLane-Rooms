import supabase from "./config/supabaseClient";
import { useState, useEffect } from "react";
import { RoomType } from "./utils/types";
import Sidebar from "./components/layout/Sidebar";
import MainContainer from "./components/layout/MainContainer";
import Navigation from "./components/layout/Navigation";
import Main from "./components/layout/Main";
function App() {
  const [error, setError] = useState<string>("");
  const [rooms, setRooms] = useState<RoomType[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase.from("Rooms").select();

      if (error) {
        setError("Error loading rooms");
        console.error(error);
        setRooms([]);
      } else {
        setRooms(data);
        setError("");
      }
    };

    fetchRooms();
  }, []);

  return (
    <>
      <Sidebar />
      <MainContainer>
        <Navigation />
        <Main/>
      </MainContainer>
    </>
  );
}

export default App;
