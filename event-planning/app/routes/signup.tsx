import { Link } from "react-router";

export default function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4 text-center">Sign Up</h1>

        <form className="flex flex-col gap-4">
          {/* Later: Use state hooks to store user input */}
          {/* Example: const [name, setName] = useState('') */}
          <input type="text" placeholder="Full Name" className="border p-2 rounded" />
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="border p-2 rounded"
          />
          <input type="email" placeholder="Email" className="border p-2 rounded" />
          <input type="password" placeholder="Password" className="border p-2 rounded" />

          {/* Later: Add form submission logic */}
          {/* onSubmit handler → POST to backend `/api/signup` with user data */}
          {/* Example:
              const handleSignup = async (e) => {
                e.preventDefault();
                await axios.post("/api/signup", { name, username, email, password });
                navigate("/login");
              };
          */}

          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
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
