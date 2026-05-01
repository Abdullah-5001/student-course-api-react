import { useState } from "react";
import { API_URL } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      console.log("register Data", formData);
      const response = await API_URL.post("/auth/register", formData);
      console.log(response);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("studentId", response.data.data._id);
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.message || "Registration failed";
      setError(errorMsg);
      console.error("Registration failed:", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 py-8">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">Join us to manage your courses</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 mt-6 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 font-bold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
