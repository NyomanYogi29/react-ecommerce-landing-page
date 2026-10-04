import { useState } from "react";
import CatalogCard from "../components/CatalogCard";
import ItemModal from "../components/ItemModal";
import { useItems } from "../hooks/useCatalog";
import { useDebounce } from "../hooks/useDebounce";

export default function Dashbaord({
  selectedCategory = "All",
  searchQuery = "",
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const debounceSearch = useDebounce(searchQuery, 300);

  const {
    data: items = [],
    isLoading,
    isError,
  } = useItems({
    category: selectedCategory,
    search: debounceSearch,
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Memuat katalog...</div>
      ) : isError ? (
        <div className="text-center py-12 text-red-500">
          Gagal mengambil data katalog.
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Produk tidak ditemukan.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <CatalogCard
              key={item.id}
              name={item.name}
              category={item.category}
              price={item.price}
              image={item.image}
              rating={item.rating}
              onSelect={() => setSelectedItem(item)}
            />
          ))}
        </div>
      )}

      <ItemModal
        isOpen={Boolean(selectedItem)}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </main>
  );
}
