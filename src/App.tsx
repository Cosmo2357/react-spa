import { useUserDataStore } from "./store/main";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Setting from "./pages/Setting.tsx";
import Layout from "./layouts/Layout.tsx";

export default function App() {
  const envTitle = import.meta.env.VITE_TITLE;
  const envMessage = import.meta.env.VITE_MESSAGE;
  console.log(envTitle);
  console.log(envMessage);

  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const { user } = useUserDataStore();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (path === "/login") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Routes>

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
