import supabase from "./config/supabaseClient";
import { useState, useEffect } from "react";
import { RoomType } from "./utils/types";
import Sidebar from "./components/layout/Sidebar";
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
    </>
  );
}

export default App;
