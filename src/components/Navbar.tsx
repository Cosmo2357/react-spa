import { Link } from "react-router";

export default function Navbar() {

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          MyApp
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Home</Link>
          <Link to="/setting" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Setting</Link>
        </div>
      </div>


    </nav>
  );
}
