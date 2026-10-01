import { useState } from "react";
import backIcon from "../assets/x-icon.svg";
import { useNavigate } from "react-router-dom";

export default function ItemModal({ item, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  if (!item || !isOpen) return null;

  const numericPrice =
    Number(
      typeof item?.price === "number"
        ? item.price
        : String(item?.price || "").replace(/[^0-9]/g, ""),
    ) || 0;

  const totalPrice = Number(numericPrice * quantity);
  const handleToProceedCheckout = () => {
    navigate("/checkout", {
      state: {
        item,
        quantity,
        totalPrice,
      },
    });
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <main
        className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <img
            src={backIcon}
            alt="cancel-button"
            className="w-4 h-4 opacity-60 hover:opacity-100 transition-opacity"
          />
        </button>

        <div className="flex gap-4">
          <div className="w-1/3 aspect-square bg-gray-50 rounded-lg flex items-center justify-center p-2">
            <img
              src={item.image}
              alt={item.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="w-2/3 flex flex-col justify-center">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {item.category}
            </span>
            <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
            <p className="text-xl font-bold text-blue-600 mt-2">
              {item.price} / item
            </p>
          </div>
        </div>

        <div className="mt-6 border-t pt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Jumlah Beli</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center font-bold hover:bg-gray-100"
            >
              -
            </button>
            <span className="font-semibold w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev + 1))}
              className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center font-bold hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <span className="text-sm font-medium text-gray-500">
            Total Harga:
          </span>
          <span className="text-xl font-bold text-gray-900">
            Rp {totalPrice.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="mt-6">
          <button
            onClick={handleToProceedCheckout}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition cursor-pointer"
          >
            Proceed to checkout...
          </button>
        </div>
      </main>
    </div>
  );
}
