import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";
import Rooms from "./pages/Rooms";
import Users from "./pages/Users";
import SharedLayout from "./components/layout/SharedLayout";
import useFetchRooms from "./hooks/useFetchRooms";

function App() {
  useFetchRooms();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* <Route index element={<Navigate to="/bookings" replace />} />  */}
          <Route index element={<Navigate to="/rooms" replace />} />
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
