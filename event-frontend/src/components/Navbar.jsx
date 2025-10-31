import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "./Button";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isDashboard = location.pathname === "/dashboard";

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem("theme");
    if (stored === "dark") root.classList.add("dark");
    setIsDark(root.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = !isDark;
    root.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-6 bg-white dark:bg-gray-900 shadow-md z-50">
      <Link to="/">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          EventPlanner
        </h1>
      </Link>

      {isHome && (
        <div className="space-x-6">
          <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 text-gray-800 dark:text-gray-100">
            About
          </a>
          <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 text-gray-800 dark:text-gray-100">
            Features
          </a>
          <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 text-gray-800 dark:text-gray-100">
            Contact
          </a>
        </div>
      )}

      {!isDashboard && (
        <div className="space-x-3 flex items-center">
          <Link to="/login">
            <Button variant="outline" className="border dark:border-gray-700">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-blue-600 text-white">Sign Up</Button>
          </Link>

          <button
            onClick={toggleTheme}
            className="ml-3 h-9 w-9 inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-700"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      )}
    </nav>
  );
}
