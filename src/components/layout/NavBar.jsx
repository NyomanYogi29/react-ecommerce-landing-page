import { ShoppingCart } from "lucide-react";
import magnifyingGlassIcon from "../../assets/magnifying-glass-solid-full.svg";
import { Category } from "../../data";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/user/useUser";

export default function NavBar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalQuantity = 0,
  currentUser = null,
}) {
  const categories = Category;
  const navigate = useNavigate();
  const { data: userResponse } = useUser();

  const user = userResponse?.data || currentUser;

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-sm border-b border-gray-100">
      <h1
        onClick={() => navigate("/")}
        className="text-xl md:text-2xl font-bold text-blue-600 tracking-tight cursor-pointer"
      >
        end1tech .store
      </h1>

      <div className="flex items-center w-72 md:w-96">
        <select
          value={selectedCategory}
          onChange={(e) => onSelectCategory?.(e.target.value)}
          className="h-full px-3 py-1.5 text-sm bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg outline-none text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="relative flex-1 h-full">
          <img
            alt="magnifying-glass"
            src={magnifyingGlassIcon}
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none"
          />
          <input
            name="search-bar"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-300 rounded-r-lg outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      <ul className="flex items-center gap-3 text-sm font-medium">
        <div className="relative inline-block">
          <Link to="/cart" className="cursor-pointer block">
            <ShoppingCart className="w-6.5 h-6.5" color="grey" />
          </Link>
          {totalQuantity > 0 && (
            <span className="absolute -top-1.5 -right-2 flex h-5 min-w-5 px-1 items-center justify-center rounded-full bg-rose-500 text-[11px] font-bold text-white shadow-sm pointer-events-none">
              {totalQuantity > 99 ? "99+" : totalQuantity}
            </span>
          )}
        </div>
        <div className="ml-4">
          {user ? (
            <span className="font-medium text-gray-800 text-sm">
              {user.name}
            </span>
          ) : (
            <div className="flex items-center gap-2">
              {/* Tombol Masuk */}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 font-bold px-3 py-1 rounded hover:bg-blue-50 transition-colors cursor-pointer"
              >
                Masuk
              </button>

              {/* Tombol Daftar */}
              <button
                onClick={() => navigate("/sign-up")}
                className="bg-blue-600 text-white font-bold px-3 py-1 rounded hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
              >
                Daftar
              </button>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
}
