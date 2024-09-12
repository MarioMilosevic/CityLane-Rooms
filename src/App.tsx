import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";
import Rooms from "./pages/Rooms";
import Users from "./pages/Users";
import SharedLayout from "./components/layout/SharedLayout";
import Login from "./pages/Login";
import ErrorRoute from "./pages/ErrorRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorRoute />} />
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<SharedLayout />}>
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

// part 20 oko 42 min
