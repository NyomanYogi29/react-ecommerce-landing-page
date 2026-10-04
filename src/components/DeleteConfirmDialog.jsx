export default function DeleteConfirmDialog({
  isOpen,
  count = 1,
  title,
  content = "Produk yang kamu akan dihapus dari keranjang",
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  const headerText = title || `Hapus ${count} produk?`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity"
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-center flex flex-col items-center gap-2 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-gray-900">{headerText}</h3>

        <p className="text-xs sm:text-sm font-light text-gray-500">
          {content}
        </p>

        <div className="flex items-center justify-center gap-3 w-full mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 rounded-xl font-bold text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-xl font-bold text-sm text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
