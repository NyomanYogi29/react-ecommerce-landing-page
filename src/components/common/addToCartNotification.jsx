import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddToCartNotification({ isOpen = true }) {
  if (!isOpen) return null;

  return (
    <aside
      aria-live="polite"
      role="status"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-400 rounded-xl shadow-lg transition-all duration-500 ease-in-out"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 shrink-0">
        <Check className="w-5 h-5 stroke-[2.5]" />
      </div>
      <div className="flex flex-col gap-0.5 text-sm">
        <p className="font-medium text-sm text-green-900">
          Barang berhasil masuk ke keranjang!
        </p>
        <Link
          to="/checkout"
          className="font-semibold text-green-700 underline hover:text-green-800 transition-colors"
        >
          Lihat keranjang
        </Link>
      </div>
    </aside>
  );
}
