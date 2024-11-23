import { useState } from "react";
import loginImage from "../assets/loginImage.png";
import { useNavigate } from "react-router-dom";
import { registerData } from "../services/authLogin";
import { toast } from "sonner"; // Pastikan ini diimpor

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = { email, password };
    try {
      const { role } = await registerData(newData);  // API request for login
      if (role === "company") {
        toast.success("Login Success!");  // Success message
        navigate("/company-dashboard");
      } else {
        toast.success("Login Success!");  // Success message
        navigate("/students/projects");
      }
    } catch (error) {
      toast.error("Invalid email or password!");  // Error message if login fails
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center w-full max-w-4xl bg-[#D6EFD8] p-6 sm:p-8 rounded-lg shadow-lg">
        <div className="w-full sm:w-1/2 p-4">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1A5319] text-white px-4 py-2 rounded-lg hover:bg-[#80AF81] focus:outline-none focus:ring-2 focus:ring-[#1A5319] focus:ring-opacity-50"
            >
              Login Now
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden sm:block w-1/2 p-4">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
