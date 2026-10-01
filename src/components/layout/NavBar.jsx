import magnifyingGlassIcon from "../../assets/magnifying-glass-solid-full.svg";
import CategoryDropdownMenu from "../CategoryDropdownMenu";

export default function NavBar({ selectedCategory, onSelectCategory }) {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-sm border-b border-gray-100">
      <h1 className="text-xl md:text-2xl font-bold text-blue-600 tracking-tight cursor-pointer">
        end1tech .store
      </h1>

      <div className="flex items-center w-72 md:w-96">
        <CategoryDropdownMenu
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />

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
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-300 rounded-r-lg outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      <ul className="flex items-center gap-3 text-sm font-medium">
        <li>
          <a className="px-3 py-1.5 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
            Dashboard
          </a>
        </li>
        <li>
          <a className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors cursor-pointer">
            Checkout
          </a>
        </li>
      </ul>
    </nav>
  );
}
