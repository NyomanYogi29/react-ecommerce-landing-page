import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle, ArrowLeft } from "lucide-react";

export default function SignUp() {
  const navigate = useNavigate();

  const showPassword = false;
  const showConfirmPassword = false;
  const error = "";
  const isSubmitting = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleBackToDashboard = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-10 px-4">
      <div className="relative w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <button
          className="absolute top-3 left-2 cursor-pointer"
          onClick={handleBackToDashboard}
        >
          <ArrowLeft className="w-8 h-8 hover:text-black" />
        </button>
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-900 mt-2">Sign Up</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create an account for free.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                required
                placeholder="John Doe"
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="john.doe@example.com"
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="At least 6 characters"
                className="w-full pl-3 pr-10 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                placeholder="Re-enter your password"
                className="w-full pl-3 pr-10 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow-sm transition-colors cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            {isSubmitting ? "Memproses..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
