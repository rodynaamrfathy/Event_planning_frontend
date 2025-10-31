import { Link } from "react-router";

export default function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">Sign Up</h1>

        <form className="flex flex-col gap-4">
          {/* Later: Use state hooks to store user input */}
          {/* Example: const [name, setName] = useState('') */}
          <input type="text" placeholder="Full Name" className="border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          <input type="email" placeholder="Email" className="border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
          <input type="password" placeholder="Password" className="border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />

          {/* Later: Add form submission logic */}
          {/* onSubmit handler → POST to backend `/api/signup` with user data */}
          {/* Example:
              const handleSignup = async (e) => {
                e.preventDefault();
                await axios.post("/api/signup", { name, username, email, password });
                navigate("/login");
              };
          */}

          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Log in
            </Link>
          </p>

          {/* Later: Disable button while waiting for response */}
          <button className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
