import { Category } from "../data";

export default function CategoryDropdownMenu({
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onSelectCategory(e.target.value)}
      className="h-full px-3 py-1.5 text-sm bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg outline-none text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
    >
      {Category.map((cat) => (
        <option key={cat.id} value={cat.name}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}
