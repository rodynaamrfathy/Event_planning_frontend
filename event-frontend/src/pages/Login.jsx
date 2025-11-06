import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5001/api/v1/auth/sign-in", {
                email,
                password,
            });

            if (res.data?.success) {
                alert(`✅ ${res.data.message}`);
                localStorage.setItem("token", res.data.data.token);
                navigate("/dashboard");
            } else {
                alert(`❌ ${res.data.message}`);
            }
        } catch (err) {
            const msg =
                err.response?.data?.message ||
                "Something went wrong. Please try again.";

            alert(`❌ ${msg}`);
        }
    };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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

          <button className="bg-blue-500 text-white p-3 rounded-lg">
            Login
          </button>

          <p className="text-sm text-center">
            Don’t have an account?
            <Link to="/signup" className="text-blue-600 hover:underline ml-1">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
