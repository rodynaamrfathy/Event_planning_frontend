import { Link } from "react-router";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">Login</h1>

        <form className="flex flex-col gap-4">
          {/* Later: Use useState hooks for email and password */}
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
          />

          {/* Later: Add onSubmit handler */}
          {/* Send credentials → POST `/api/login` → receive JWT */}
          {/* Save token in localStorage or sessionStorage */}
          {/* Example:
              localStorage.setItem("token", res.data.token);
              navigate("/dashboard");
          */}
          <button className="bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-600 transition">
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
