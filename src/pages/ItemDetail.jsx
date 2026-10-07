import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, Plus, Minus, Store, ArrowLeft } from "lucide-react";
import { useItem } from "../hooks/useCatalog";
import { priceParcer } from "../utils/priceParser";
import AddToCartNotification from "../components/addToCartNotification";
import { useCart } from "../context/CartContext";

const formatRupiah = (val) => "Rp " + Number(val).toLocaleString("id-ID");

export default function ItemDetail({ onSelectCategory }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: item, isLoading, isError, error } = useItem(id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState({ isOpen: false });

  const handleCategoryClick = () => {
    if (!item?.category) return;
    onSelectCategory?.(item.category);
    navigate("/");
  };

  const handleAddToCart = () => {
    if (item) {
      addToCart(item, quantity);
    }
    setToast({ isOpen: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isOpen: false }));
    }, 3000);
  };

  const handleBuyNow = () => {
    if (!item) return;
    const numericPrice = priceParcer(item.price);
    navigate("/checkout", {
      state: {
        item,
        quantity,
        totalPrice: numericPrice * quantity,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-6 w-32 bg-gray-200 rounded mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 h-96 bg-gray-100 rounded-2xl" />
          <div className="lg:col-span-5 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-5 bg-gray-100 rounded w-1/3" />
            <div className="h-8 bg-gray-200 rounded w-1/2" />
            <div className="h-32 bg-gray-100 rounded-xl" />
          </div>
          <div className="lg:col-span-3 h-80 bg-gray-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Produk tidak ditemukan
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {error?.message || "Item yang Anda cari tidak tersedia."}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const numericPrice = priceParcer(item.price);
  const subtotal = numericPrice * quantity;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <button
          type="button"
          onClick={() => {
            if (window.history.state && window.history.state.idx > 0) {
              navigate(-1);
            } else {
              navigate("/");
            }
          }}
          className="cursor-pointer mr-1 text-gray-600 flex items-center justify-center p-0.5"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <Link to="/" className="hover:text-blue-600 transition">
          Dashboard
        </Link>
        <span>/</span>
        <span
          onClick={handleCategoryClick}
          className="hover:text-blue-600 transition cursor-pointer"
        >
          {item.category}
        </span>
        <span>/</span>
        <span className="text-gray-800 font-medium truncate max-w-xs">
          {item.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 sticky top-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm overflow-hidden">
            <div className="aspect-square w-full rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-50">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
              {item.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
              <div className="flex items-center gap-1 font-semibold text-gray-800">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{item.rating}</span>
                <span className="text-gray-400 font-normal">
                  ({item.reviewCount || 0} rating)
                </span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1.5 text-gray-600">
                <Store className="w-4 h-4 text-blue-600" />
                <span className="font-medium">{item.seller}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <span className="text-3xl font-extrabold text-blue-600 tracking-tight">
              {item.price}
            </span>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-3">
            <h2 className="text-base font-bold text-gray-900">
              Deskripsi Produk
            </h2>
            <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
              <p>
                <span className="font-semibold text-gray-700">Brand:</span>{" "}
                {item.brand}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Perusahaan:</span>{" "}
                {item.company}
              </p>
              <p className="whitespace-pre-line pt-2 text-gray-600">
                {item.description}
              </p>
            </div>
          </div>

          {item.reviews && item.reviews.length > 0 && (
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <h2 className="text-base font-bold text-gray-900">
                Ulasan Pembeli ({item.reviews.length})
              </h2>
              <div className="space-y-3">
                {item.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-800">
                        {rev.name}
                      </span>
                      <span className="text-gray-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{rev.rating}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-3 sticky top-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-base">Atur jumlah</h3>

            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover border border-gray-100 shrink-0"
              />
              <p className="text-xs font-medium text-gray-700 line-clamp-2 leading-snug">
                {item.name}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-gray-500 font-medium">Jumlah:</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-8">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    className="px-2.5 h-full text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-semibold text-gray-800 min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="px-2.5 h-full text-green-600 hover:bg-gray-100 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs text-gray-400">Stok: 50+</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-gray-500">Subtotal</span>
              <span className="text-base font-bold text-gray-900">
                {formatRupiah(subtotal)}
              </span>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white transition shadow-sm cursor-pointer"
              >
                {" "}
                <span>+ Keranjang</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-[0.98] transition cursor-pointer"
              >
                <span>Beli Langsung</span>
              </button>
            </div>

            {/* <div className="flex items-center justify-around pt-3 border-t border-gray-100 text-xs text-gray-500">
              <button
                type="button"
                className="flex items-center gap-1 hover:text-blue-600 transition cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1 hover:text-red-500 transition cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Wishlist</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1 hover:text-blue-600 transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <AddToCartNotification
        isOpen={toast.isOpen}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
