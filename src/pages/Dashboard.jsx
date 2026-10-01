import { useState } from "react";
import { Items } from "../data/index";
import CatalogCard from "../components/CatalogCard";
import ItemModal from "../components/ItemModal";

export default function Dashbaord({ selectedCategory = "All" }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems =
    selectedCategory === "All"
      ? Items
      : Items.filter(
          (item) =>
            item.category.toLocaleLowerCase() ===
            selectedCategory.toLowerCase(),
        );
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredItems.map((item) => (
          <CatalogCard
            key={item.id}
            name={item.name}
            category={item.category}
            price={item.price}
            image={item.image}
            onSelect={() => setSelectedItem(item)}
          />
        ))}
      </div>

      <ItemModal
        isOpen={Boolean(selectedItem)}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </main>
  );
}
