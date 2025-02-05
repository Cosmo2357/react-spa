import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      {/* 🎯 Header */}
      <Navbar />

      {/* 🎯 Main Content - This is where nested routes (Home, Setting) will be rendered */}
      <main className="pt-16 container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
