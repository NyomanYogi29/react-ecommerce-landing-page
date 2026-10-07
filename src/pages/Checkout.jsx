import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { removeFromCart } = useCart();

  const orderDetails = location.state;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  if (!orderDetails) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-4">
          Tidak ada data pesanan yang dipilih.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  const { item, quantity, totalPrice, items: orderItems } = orderDetails;
  const displayItems = orderItems && orderItems.length > 0 ? orderItems : [item];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const purchasedIds = displayItems.map((it) => it.id);
    removeFromCart(purchasedIds);

    navigate("/order-success", {
      state: {
        orderDetails: {
          ...orderDetails,
          items: displayItems,
        },
        customerInfo: formData,
        orderId: `ORD-${Date.now()}`,
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Checkout Pesanan
      </h1>

      <div className="bg-white border rounded-lg p-4 mb-6 divide-y divide-gray-100 shadow-sm">
        {displayItems.map((it) => {
          const qty = orderDetails.quantities?.[it.id] ?? (it.id === item?.id ? quantity : it.quantity || 1);
          return (
            <div key={it.id} className="py-2.5 first:pt-0 last:pb-0 flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-gray-800">{it.name}</h2>
                <p className="text-sm text-gray-500">Jumlah: {qty} barang</p>
              </div>
            </div>
          );
        })}
        <div className="pt-3 flex justify-between items-center">
          <span className="font-medium text-gray-700">Total Pembayaran</span>
          <p className="text-lg font-bold text-blue-600">
            Rp {totalPrice.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-lg p-6 shadow-sm flex flex-col gap-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan nama penerima"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alamat Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="contoh@domain.com"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nomor Handphone
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="081234567890"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alamat Lengkap
          </label>
          <textarea
            name="address"
            required
            rows={3}
            value={formData.address}
            onChange={handleChange}
            placeholder="Jalan, No. Rumah, Kecamatan, Kota, Kode Pos"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Checkout Sekarang
        </button>
      </form>
    </div>
  );
}
