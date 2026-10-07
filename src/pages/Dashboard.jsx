import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CatalogCard from "../components/CatalogCard";
import { useItems } from "../hooks/useCatalog";
import { useDebounce } from "../hooks/useDebounce";
import AddToCartNotification from "../components/addToCartNotification";
import { useCart } from "../context/CartContext";

export default function Dashbaord({
  selectedCategory = "All",
  searchQuery = "",
}) {
  const navigate = useNavigate();
  const debounceSearch = useDebounce(searchQuery, 300);
  const { addToCart } = useCart();

  const [toast, setToast] = useState({
    isOpen: false,
  });

  const handleAddToCart = (item) => {
    addToCart(item, 1);
    setToast({
      isOpen: true,
    });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, isOpen: false }));
    }, 3000);
  };

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
              price={item.price}
              seller={item.seller}
              image={item.image}
              rating={item.rating}
              onSelect={() => navigate(`/item-detail/${item.id}`)}
              onAddToCart={() => handleAddToCart(item)}
            />
          ))}
        </div>
      )}

      <AddToCartNotification
        isOpen={toast.isOpen}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />
    </main>
  );
}
