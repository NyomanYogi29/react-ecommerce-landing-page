import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil data yang diteruskan dari modal
  const orderDetails = location.state;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Proteksi jika user akses langsung url /checkout tanpa memilih barang
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

  const { item, quantity, totalPrice } = orderDetails;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Arahkan ke rute sukses dengan membawa detail barang dan data pemesan
    navigate("/order-success", {
      state: {
        orderDetails,
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

      {/* Ringkasan Barang Singkat */}
      <div className="bg-white border rounded-lg p-4 mb-6 flex justify-between items-center shadow-sm">
        <div>
          <h2 className="font-semibold text-gray-800">{item.name}</h2>
          <p className="text-sm text-gray-500">Jumlah: {quantity} barang</p>
        </div>
        <p className="text-lg font-bold text-blue-600">
          Rp {totalPrice.toLocaleString("id-ID")}
        </p>
      </div>

      {/* Form Identitas Pelanggan */}
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
