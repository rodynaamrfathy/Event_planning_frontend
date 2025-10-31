import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // Check if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Welcome to your Dashboard
      </h1>

      <p className="text-gray-700 dark:text-gray-300 mb-6">
        This is your main dashboard. You can add your events, see analytics, and manage your account.
      </p>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
