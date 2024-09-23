import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";
import Rooms from "./pages/Rooms";
import Users from "./pages/Users";
import SharedLayout from "./components/layout/SharedLayout";
import Login from "./pages/Login";
import ErrorRoute from "./pages/ErrorRoute";
import BookingDetails from "./components/layout/BookingDetails";
import CheckInBooking from "./components/layout/CheckInBooking";
import Account from "./pages/Account";

function App() {
  const [theme, setTheme] = useState<string>("light");
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorRoute />} />
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route
          path="/"
          element={
            <SharedLayout
              theme={theme}
              handleThemeSwitch={handleThemeSwitch}
              user={user}
              setUser={setUser}
            />
          }
        >
          <Route path="account" element={<Account setUser={setUser} />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="bookings/:bookingId" element={<BookingDetails />} />
          <Route
            path="bookings/checkIn/:bookingId"
            element={<CheckInBooking />}
          />
          <Route path="rooms" element={<Rooms />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
