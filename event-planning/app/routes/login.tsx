import { Link } from "react-router";

export default function Login() {
  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form className="flex flex-col gap-4">
        <input type="email" placeholder="Email" className="border p-2 rounded" />
        <input type="password" placeholder="Password" className="border p-2 rounded" />
        <p className="text-sm text-gray-600 text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
            Register now
            </Link>
        </p>
        <button className="bg-blue-500 text-white rounded p-2">Login</button>
      </form>
    </div>
  );
}
