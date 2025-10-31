import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/api/v1/auth/sign-up", {
        name,
        email,
        password,
        role,
      });

      localStorage.setItem("token", res.data.data.token);
      alert("✅ Signup successful!");
      navigate("/dashboard");
    } catch (err) {
        console.error(err);
        alert("❌ Login failed");
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            className="border p-3 rounded-lg dark:bg-gray-800"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg dark:bg-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg dark:bg-gray-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="border p-3 rounded-lg dark:bg-gray-800"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>

          <button className="bg-blue-600 text-white p-3 rounded-lg">
            Sign Up
          </button>

          <p className="text-sm text-center">
            Already have an account?
            <Link to="/login" className="text-blue-600 hover:underline ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
