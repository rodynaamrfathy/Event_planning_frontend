import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "./Button";

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const isHome = location.pathname === "/";

    const [isDark, setIsDark] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");

    // Load theme + login state + username
    useEffect(() => {
        const root = document.documentElement;
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") root.classList.add("dark");
        setIsDark(root.classList.contains("dark"));

        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        //  Load username if logged in
        if (token) {
            const name = localStorage.getItem("userName") || "User";
            setUserName(name);
        }
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
        localStorage.removeItem("userName"); //  remove username too
        setIsLoggedIn(false);
        setUserName(""); // reset
        navigate("/");
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
                    <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400">About</a>
                    <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400">Features</a>
                    <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
                </div>
            )}

            <div className="space-x-3 flex items-center">

                {/*  Show username when logged in */}
                {isLoggedIn && (
                    <span className="mr-3 font-semibold text-gray-800 dark:text-gray-100">
                        Hi, {userName} 👋
                    </span>
                )}

                {/*  Logged OUT → Show Login / Signup */}
                {!isLoggedIn && (
                    <>
                        <Link to="/login">
                            <Button variant="outline" className="border dark:border-gray-700">
                                Login
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button className="bg-blue-600 text-white">
                                Sign Up
                            </Button>
                        </Link>
                    </>
                )}

                {/*  Logged IN → Show Logout */}
                {isLoggedIn && (
                    <Button
                        onClick={handleLogout}
                        className="bg-red-600 text-white"
                    >
                        Logout
                    </Button>
                )}

                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    className="ml-3 h-9 w-9 inline-flex items-center justify-center rounded-md border dark:border-gray-700"
                >
                    {isDark ? "☀️" : "🌙"}
                </button>
            </div>
        </nav>
    );
}
