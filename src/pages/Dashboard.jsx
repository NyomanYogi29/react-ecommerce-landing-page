import { useNavigate } from "react-router-dom";
import CatalogCard from "../components/CatalogCard";
import { Items } from "../data";
import AddToCartNotification from "../components/addToCartNotification";

export default function Dashbaord() {
  const navigate = useNavigate();
  const items = Items;

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {items.length === 0 ? (
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
            />
          ))}
        </div>
      )}

      <AddToCartNotification isOpen={false} />
    </main>
  );
}
