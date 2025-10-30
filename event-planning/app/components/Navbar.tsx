import { Link, useLocation } from "react-router";
import Button from "./button";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isDashboard = location.pathname === "/dashboard";

  return (
    <nav
      className="
        fixed top-0 left-0 w-full
        flex justify-between items-center
        px-10 py-6 bg-white shadow-md z-50
      "
    >  
      <Link to="/">
        <h1 className="text-2xl font-bold text-blue-600">EventPlanner</h1>
      </Link>

      {/* Navigation links only visible on the Landing page */}
      {isHome && (
        <div className="space-x-6">
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#features" className="hover:text-blue-600">Features</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
        </div>
      )}

      {/* Show login/signup buttons everywhere except on Dashboard */}
      {!isDashboard && (
        <div className="space-x-3">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-blue-600 text-white">Sign Up</Button>
          </Link>
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
        </div>
      )}
    </nav>
  );
}
