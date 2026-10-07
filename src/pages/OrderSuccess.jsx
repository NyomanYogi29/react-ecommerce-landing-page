import { useLocation, useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const successData = location.state;

  if (!successData) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-4">Informasi order tidak ditemukan.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const { orderDetails, customerInfo, orderId } = successData;
  const { item, quantity, totalPrice, items: orderItems } = orderDetails;
  const displayItems = orderItems && orderItems.length > 0 ? orderItems : [item];

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <div className="bg-white border rounded-xl p-6 shadow-sm text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          Pesanan Anda Telah Diproses!
        </h1>
        <p className="text-sm text-gray-500 mt-1">ID Transaksi: {orderId}</p>

        {/* Rincian Produk */}
        <div className="mt-6 text-left border rounded-lg p-4 bg-gray-50 divide-y divide-gray-200">
          {displayItems.map((it) => {
            const qty = orderDetails.quantities?.[it.id] ?? (it.id === item?.id ? quantity : it.quantity || 1);
            return (
              <div key={it.id} className="py-3 first:pt-0 last:pb-0 flex items-center gap-4">
                <img
                  src={it.image}
                  alt={it.name}
                  className="w-16 h-16 object-contain rounded bg-white p-1 border"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{it.name}</h4>
                  <p className="text-sm text-gray-500">Jumlah: {qty} unit</p>
                </div>
                <p className="font-bold text-gray-900">{it.price}</p>
              </div>
            );
          })}
          <div className="pt-3 flex justify-between items-center">
            <span className="font-medium text-gray-700">Total Dibayar</span>
            <p className="font-bold text-gray-900 text-lg">
              Rp {totalPrice.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* Detail Pembeli */}
        <div className="mt-6 text-left border rounded-lg p-4">
          <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">
            Identitas Pemesan
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-800">Nama:</span>{" "}
              {customerInfo.name}
            </p>
            <p>
              <span className="font-medium text-gray-800">Email:</span>{" "}
              {customerInfo.email}
            </p>
            <p>
              <span className="font-medium text-gray-800">No. HP:</span>{" "}
              {customerInfo.phone}
            </p>
            <p>
              <span className="font-medium text-gray-800">Alamat:</span>{" "}
              {customerInfo.address}
            </p>
          </div>
        </div>

        {/* Back to Dashboard */}
        <button
          onClick={() => navigate("/")}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
