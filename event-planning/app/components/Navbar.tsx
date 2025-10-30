import { Link, useLocation } from "react-router";
import Button from "./button";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const isDashboard = location.pathname === "/dashboard";

  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-md">
      <Link to="/">
        <h1 className="text-2xl font-bold text-blue-600">EventPlanner</h1>
      </Link>

      {/* Show this only on Home */}
      {isHome && (
        <div className="space-x-6">
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#features" className="hover:text-blue-600">Features</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
        </div>
      )}

      {/*  */}
      {!isDashboard &&(<div className="space-x-3">
        <Link to="/login">
          <Button variant="outline">Login</Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-blue-600 text-white">Sign Up</Button>
        </Link>
      </div>
      )}

      {/* On dashboard Logout button */}
      {isDashboard &&(<div className="space-x-3">
        <Link to="/">
          <Button variant="outline">Logout</Button>
        </Link>
      </div>
      )}
    </nav>
  );
}
