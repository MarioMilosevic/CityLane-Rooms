import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";
import Rooms from "./pages/Rooms";
import Users from "./pages/Users";
import SharedLayout from "./components/layout/SharedLayout";
import supabase from "./config/supabaseClient";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setRooms } from "./redux/features/roomsSlice";

function App() {
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
      }
    };

    fetchRooms();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Navigate to="/bookings" replace />} /> {/* Redirect to /bookings */}
          <Route path="bookings" element={<Bookings />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
