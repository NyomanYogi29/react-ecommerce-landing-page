import { useNavigate, useSearchParams } from "react-router-dom";
import CatalogCard from "../components/CatalogCard";
import AddToCartNotification from "../components/addToCartNotification";
import { useProductsByCategory } from "@/hooks/product/useProductsByCategory";

export default function Dashbaord() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";
  const searchQuery = searchParams.get("search") || "";

  const { data: response, isLoading, isError } = useProductsByCategory(category);
  const items = response?.data || [];

  const displayedItems = searchQuery
    ? items.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {isLoading ? (
        <div className="text-center py-12 text-gray-500">
          Memuat produk...
        </div>
      ) : isError ? (
        <div className="text-center py-12 text-red-500">
          Gagal memuat produk.
        </div>
      ) : displayedItems.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Produk tidak ditemukan.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayedItems.map((item) => (
            <CatalogCard
              key={item.id}
              name={item.name}
              price={item.price}
              seller={item.seller}
              image={item.image}
              rating={item.rating}
              review_count={item.review_count}
              onSelect={() => navigate(`/item-detail/${item.id}`)}
            />
          ))}
        </div>
      )}

      <AddToCartNotification isOpen={false} />
    </main>
  );
}
