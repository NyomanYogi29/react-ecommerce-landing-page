import { House, ShoppingCartPlus, Star } from "lucide-react";

export default function CatalogCard({
  name,
  price,
  image,
  seller,
  rating,
  onSelect,
  onAddToCart,
}) {
  const handleCartPlusClick = (e) => {
    e.stopPropagation();
    console.log(`${name} successfully added to the cart`);
    if (onAddToCart) {
      onAddToCart();
    }
  };

  return (
    <div
      onClick={onSelect}
      className="flex flex-col bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
    >
      <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center rounded-md overflow-hidden mb-3 cursor-pointer">
        <button
          type="button"
          onClick={handleCartPlusClick}
          className="absolute cursor-pointer top-2 right-2 z-10 p-2 rounded-full bg-black/10 hover:bg-black/20 text-gray-700 backdrop-blur-sm transition-colors flex items-center justify-center focus:outline-none"
          aria-label="Add to cart"
        >
          <ShoppingCartPlus className="w-6 h-6" />
        </button>
        <img
          src={image}
          alt={name}
          className="max-h-full max-w-full object-contain p-2"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 cursor-pointer">
          {name}
        </h3>
        <div className="flex justify-between items-center mb-1">
          <p className="text-base font-bold text-red-400 m-1">{price}</p>
          <p className="flex items-center gap-1 text-sm font-light text-gray-900">
            <Star color="gold" className="w-5 h-5" /> {rating}
          </p>
        </div>
        <span className="flex items-center gap-1 mb-1 text-[12px] font-black text-gray-900">
          <House className="w-5 h-5" />
          {seller}
        </span>
      </div>
    </div>
  );
}
