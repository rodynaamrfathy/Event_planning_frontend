import { Link } from "react-router";

export default function Login() {
  return (
    <div className="flex items-center justify-center  ">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h1>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-600 transition">
            Login
          </button>
          <p className="text-sm text-gray-600 text-center mt-2">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
