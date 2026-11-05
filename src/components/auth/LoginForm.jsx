import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function LoginForm({ onSubmit, isPending }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-500          
              focus:ring-1 focus:ring-blue-500"
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
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-3 pr-10 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-500  
                focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium      
            rounded-lg shadow-sm transition-colors cursor-pointer"
      >
        {isPending ? "Memproses..." : "Login"}
      </button>
    </form>
  );
}
