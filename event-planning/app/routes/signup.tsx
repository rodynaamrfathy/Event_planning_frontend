import { Link } from "react-router";

export default function Signup() {
  return (
    <div className="flex items-center justify-center  ">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
              <h1 className="text-xl font-semibold mb-4">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Full Name" className="border p-2 rounded" />
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
        />
        <input type="email" placeholder="Email" className="border p-2 rounded" />
        <input type="password" placeholder="Password" className="border p-2 rounded" />
                <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
        <button className="bg-blue-500 text-white rounded p-2">Create Account</button>
      </form>
      </div>
    </div>
  );
}
