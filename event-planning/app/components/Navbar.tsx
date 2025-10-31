import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import Button from "./button";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isDashboard = location.pathname === "/dashboard";

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const root = document.documentElement;
      setIsDark(root.classList.contains("dark"));
    } catch (_) {}
  }, []);

  const toggleTheme = () => {
    try {
      const root = document.documentElement;
      const next = !isDark;
      root.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      setIsDark(next);
    } catch (_) {}
  };

  return (
    <nav
      className="
        fixed top-0 left-0 w-full
        flex justify-between items-center
        px-10 py-6 bg-white dark:bg-gray-900 shadow-md z-50
      "
    >  
      <Link to="/">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">EventPlanner</h1>
      </Link>

      {/* Navigation links only visible on the Landing page */}
      {isHome && (
        <div className="space-x-6">
          <a href="#about" className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">About</a>
          <a href="#features" className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">Features</a>
          <a href="#contact" className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
        </div>
      )}

      {/* Show login/signup buttons everywhere except on Dashboard */}
      {!isDashboard && (
        <div className="space-x-3 flex items-center">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-blue-600 text-white">Sign Up</Button>
          </Link>
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="ml-3 h-9 w-9 inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      )}

      {/* When user is logged in (on Dashboard): show Logout */}
      {isDashboard && (
        <div className="space-x-3 flex items-center">
          {/* Later: Fetch username from JWT or user context */}
          {/* Example: <span>Welcome, {username}</span> */}

          <Link to="/">
            {/* Later: Add logout logic before redirect */}
            {/* Example:
                localStorage.removeItem("token");
                navigate("/login");
            */}
            <Button variant="outline">Logout</Button>
          </Link>
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="ml-1 h-9 w-9 inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      )}
    </nav>
  );
}
