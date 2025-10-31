import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:5001/api/v1/auth/sign-in`,
        { email, password }
      );

      toast.success("Logged in successfully!");
      localStorage.setItem("token", res.data.data.token);
      navigate("/dashboard");

    } catch (err) {
      const error = err as AxiosError<any>;
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
          Login
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />

          <button
            className="bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-600 transition"
            type="submit"
          >
            Login
          </button>

          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
