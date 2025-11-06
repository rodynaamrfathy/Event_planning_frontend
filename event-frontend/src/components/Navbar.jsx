import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "./Button";

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const isHome = location.pathname === "/";

    const [isDark, setIsDark] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Load theme + login state
    useEffect(() => {
        const root = document.documentElement;
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") root.classList.add("dark");
        setIsDark(root.classList.contains("dark"));

        // ✅ Check if user is logged in
        setIsLoggedIn(!!localStorage.getItem("token"));
    }, [location.pathname]);

    const toggleTheme = () => {
        const root = document.documentElement;
        const next = !isDark;
        root.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
        setIsDark(next);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/"); // ✅ redirect to landing page
    };


    return (
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-6 bg-white dark:bg-gray-900 shadow-md z-50">
            <Link to="/">
                <h1 className="text-2xl font-bold hover:text-blue-600 dark:hover:text-blue-400 text-gray-800 dark:text-gray-100">
                    EventPlanner
                </h1>
            </Link>

            {isHome && (
                <div className="space-x-6">
                    <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 text-gray-800 dark:text-gray-100">About</a>
                    <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 text-gray-800 dark:text-gray-100">Features</a>
                    <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 text-gray-800 dark:text-gray-100">Contact</a>
                </div>
            )}

            <div className="space-x-3 flex items-center">

                {/* ✅ Show Login / Signup ONLY when user is NOT logged in */}
                {!isLoggedIn && (
                    <>
                        <Link to="/login">
                            <Button variant="outline" className="border dark:border-gray-700">
                                Login
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button className="bg-blue-600 text-white">Sign Up</Button>
                        </Link>
                    </>
                )}

                {/* ✅ Show Logout when user IS logged in */}
                {isLoggedIn && (
                    <Button
                        onClick={handleLogout}
                        className="bg-red-600 text-white"
                    >
                        Logout
                    </Button>
                )}

                {/* ✅ Theme toggle */}
                <button
                    onClick={toggleTheme}
                    className="ml-3 h-9 w-9 inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-700"
                >
                    {isDark ? "☀️" : "🌙"}
                </button>
            </div>
        </nav>
    );
}
