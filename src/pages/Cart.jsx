import {
  Trash2,
  Minus,
  Plus,
  Check,
  ShoppingBasket,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";

export function EmptyCartState() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 md:p-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
      <div className="relative flex items-center justify-center w-36 h-36 md:w-44 md:h-44 rounded-full bg-emerald-50 text-emerald-500 shrink-0">
        <ShoppingBasket className="w-20 h-20 md:w-24 md:h-24 stroke-[1.5]" />
        <span className="absolute top-4 right-6 w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
        <span className="absolute bottom-6 left-6 w-2.5 h-2.5 bg-emerald-300 rounded-full" />
      </div>
      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Your shopping cart is empty.
        </h2>
        <p className="text-sm md:text-base text-gray-500 pb-2">
          Start exploring what you needs!
        </p>
        <Link
          to="/"
          className="inline-block text-white font-bold px-8 py-2.5 rounded-lg shadow-sm transition-all duration-200 bg-[#03AC0E] hover:bg-[#028b0b]"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
}

export function CartFilled({ items = [], onCheckout, onRemoveItem }) {
  const navigate = useNavigate();

  const isDialogOpen = false;
  const pendingDeleteIds = [];
  const activeSelectedIds = items.map((i) => i.id);

  const groupedBySeller = items.reduce((acc, item) => {
    const seller = item.seller || "Toko Lain";
    if (!acc[seller]) {
      acc[seller] = [];
    }
    acc[seller].push(item);
    return acc;
  }, {});

  const isSelectAll =
    items.length > 0 && activeSelectedIds.length === items.length;

  const totalPrice = items
    .filter((item) => activeSelectedIds.includes(item.id))
    .reduce((sum, item) => {
      const numericPrice =
        typeof item.price === "number"
          ? item.price
          : Number(String(item.price || "").replace(/[^0-9]/g, "")) || 0;
      const qty = item.quantity || 1;
      return sum + numericPrice * qty;
    }, 0);

  const handleProceedCheckout = () => {
    if (onCheckout) {
      onCheckout({
        items,
        totalPrice,
      });
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-8 flex flex-col gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer text-sm font-semibold text-gray-800">
            <input
              type="checkbox"
              checked={isSelectAll}
              readOnly
              className="w-4 h-4 rounded border-gray-300 text-[#03AC0E] accent-[#03AC0E] focus:ring-[#03AC0E] cursor-pointer"
            />
            <span>
              Pilih Semua{" "}
              <span className="text-gray-400 font-normal">
                ({items.length})
              </span>
            </span>
          </label>

          {activeSelectedIds.length > 0 && (
            <button
              type="button"
              onClick={() => onRemoveItem?.(activeSelectedIds)}
              className="text-sm font-bold text-red-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              Hapus
            </button>
          )}
        </div>

        {Object.entries(groupedBySeller).map(([sellerName, shopItems]) => {
          const isShopChecked = shopItems.every((it) =>
            activeSelectedIds.includes(it.id),
          );

          return (
            <div
              key={sellerName}
              className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <input
                  type="checkbox"
                  checked={isShopChecked}
                  readOnly
                  className="w-4 h-4 rounded border-gray-300 text-[#03AC0E] accent-[#03AC0E] focus:ring-[#03AC0E] cursor-pointer"
                />
                <div className="flex items-center gap-1.5 font-bold text-sm text-gray-800">
                  <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">
                    <Check className="w-2.5 h-2.5 stroke-3" />
                  </span>
                  <span>{sellerName}</span>
                </div>
              </div>

              {shopItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 pt-1 not-last:border-b not-last:border-gray-50 not-last:pb-4"
                >
                  <div className="flex items-start gap-3 shrink-0">
                    <input
                      type="checkbox"
                      checked={activeSelectedIds.includes(item.id)}
                      readOnly
                      className="w-4 h-4 mt-2 rounded border-gray-300 text-[#03AC0E] accent-[#03AC0E] cursor-pointer"
                    />
                    <Link
                      to={`/item-detail/${item.id}`}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 shrink-0 cursor-pointer block"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <Link
                      to={`/item-detail/${item.id}`}
                      className="cursor-pointer block"
                    >
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Kategori: {item.category} • Brand: {item.brand}
                      </p>
                    </Link>

                    <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                      <Link
                        to={`/item-detail/${item.id}`}
                        className="flex items-center gap-1 text-[#E02954] font-bold text-sm sm:text-base cursor-pointer"
                      >
                        <span>{item.price}</span>
                      </Link>

                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => onRemoveItem?.([item.id])}
                          className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                          title="Hapus barang"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-7">
                          <button
                            type="button"
                            className="px-2 h-full text-gray-400 hover:bg-gray-100 flex items-center justify-center transition cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-gray-700 min-w-6 text-center">
                            {item.quantity || 1}
                          </span>
                          <button
                            type="button"
                            className="px-2 h-full text-[#03AC0E] hover:bg-gray-100 flex items-center justify-center transition cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div className="lg:col-span-4 sticky top-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-gray-900">
            Ringkasan belanja
          </h2>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Total</span>
            <span className="font-bold text-gray-900 text-base">
              {activeSelectedIds.length > 0
                ? "Rp " + totalPrice.toLocaleString("id-ID")
                : "-"}
            </span>
          </div>
          <br></br>
          <button
            type="button"
            onClick={handleProceedCheckout}
            disabled={activeSelectedIds.length === 0}
            className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all duration-200 text-white ${
              activeSelectedIds.length > 0
                ? "bg-[#03AC0E] hover:bg-[#028b0b] cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Beli{" "}
            {activeSelectedIds.length > 0
              ? `(${activeSelectedIds.length})`
              : ""}
          </button>
        </div>
      </div>

      <DeleteConfirmDialog
        isOpen={isDialogOpen}
        count={pendingDeleteIds.length}
        content="Produk yang kamu akan dihapus dari keranjang"
      />
    </div>
  );
}

export default function Cart({
  items,
  cartItems: propCartItems,
  cardItems,
  onCheckout,
  onRemoveItem,
}) {
  const cartList = items ?? propCartItems ?? cardItems ?? [];
  const showSuccessToast = false;
  const isCartEmpty = cartList.length === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {showSuccessToast && (
        <aside
          aria-live="polite"
          role="status"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-emerald-50 border border-emerald-300 rounded-xl shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 shrink-0">
            <Check className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <p className="font-semibold text-sm text-emerald-900">
              Checkout berhasil!
            </p>
            <p className="text-xs text-emerald-700">
              Pesanan Anda telah diproses.
            </p>
          </div>
        </aside>
      )}

      <div className="flex gap-3 items-center mb-6">
        <Link to="/" className="cursor-pointer">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Keranjang</h1>
      </div>

      {isCartEmpty ? (
        <EmptyCartState />
      ) : (
        <CartFilled
          items={cartList}
          onCheckout={onCheckout}
          onRemoveItem={onRemoveItem}
        />
      )}
    </div>
  );
}
