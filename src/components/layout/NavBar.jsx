import { ShoppingCart, User } from "lucide-react";
import magnifyingGlassIcon from "../../assets/magnifying-glass-solid-full.svg";
import { useCategories } from "../../hooks/useCatalog";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";

export default function NavBar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) {
  const { data: categories = [], isLoading } = useCategories();
  const { totalQuantity } = useCart();
  const { currentUser } = useUser();

  const navigate = useNavigate();

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
          onChange={(e) => onSelectCategory(e.target.value)}
          disabled={isLoading}
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
            onChange={(e) => onSearchChange(e.target.value)}
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
          {currentUser ? (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-gray-800 text-sm font-medium border border-gray-200 shadow-xs"
              title={`${currentUser.firstName} ${currentUser.lastName}`}
            >
              <span className="truncate max-w-[140px]">
                {currentUser.firstName} {currentUser.lastName}
              </span>
              <User className="w-4 h-4 text-gray-600 shrink-0" aria-hidden="true" />
            </div>
          ) : (
            <button
              onClick={() => navigate("/sign-up")}
              className="bg-white rounded outline-solid outline-2 outline-blue-500 font-bold px-2 py-1 hover:bg-blue-500 hover:text-white hover:outline-gray-400 transition-colors cursor-pointer"
            >
              Daftar
            </button>
          )}
        </div>
      </ul>
    </nav>
  );
}
