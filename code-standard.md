# Code Standard & Development Guide

Dokumen ini merupakan panduan standar pengembangan bagi AI coding agent maupun pengembang manusia dalam memahami arsitektur, workflow, dan konvensi penulisan kode pada codebase frontend ini.

---

## 1. Konteks Proyek

Proyek ini merupakan proyek tugas kuliah untuk latihan implementasi integrasi antara **Frontend** dan **Backend**.

### Tech Stack Frontend:

- **Framework & Bundler:** React (v19) + Vite
- **JavaScript Runtime & Package Manager:** [Bun](https://bun.sh/) (wajib digunakan untuk semua aktivitas package management dan scripting)
- **Server State Management:** TanStack React Query (v5) untuk data fetching, caching, server-side state, dan hooks
- **Routing:** React Router DOM (v7)
- **Styling:** Tailwind CSS (v4)
- **HTTP Client:** Axios

---

## 2. Aturan-Aturan Dasar (Core Rules)

### 1. Konvensi Ekspor (`export` vs `export default`)

- **Hindari penggunaan `export default`** pada fungsi, utilitas, service, hook, handler, atau konfigurasi JavaScript (`.js`).
- Selalu gunakan **named export** (`export const ...`).
- **Pengecualian:** `export default` HANYA diperbolehkan untuk komponen antarmuka / UI (file `.jsx`), seperti komponen di `src/components/` dan halaman di `src/pages/`.

### 2. Sederhanakan Penulisan Ekspor (Direct Named Export)

- Permudah _code writing_ dengan tidak berbelit-belit menulis `export { x as y }` atau `export const ... as ...` jika tidak diperlukan.
- Tulis langsung deklarasi ekspor secara lugas dan bersih, contoh:
  - `src/config/queryKeys.js`
  - `src/config/api.js`
  - File-file pada `src/services/` (misal: `export const UserService = { ... };`)

### 3. Separation of Concerns & Larangan Business Logic di Service

- File di `src/services/` diperuntukkan **secara ketat hanya sebagai data entry point** (melakukan HTTP request ke endpoint backend dan mengembalikan respons).
- **DILARANG KERAS** meletakkan validasi kompleks, pengecekan kondisi mendalam, atau _minor business logic_ di dalam `src/services/`.

---

## 3. Workflow & Struktur Folder (`src/`)

Alur pemrosesan data mengikuti rantai tanggung jawab yang jelas:

```text
[Backend API]
      ▲
      │ (HTTP Request / Response)
[src/services]    <- Entry point data & pemanggilan Axios
      ▲
      │ (Payload data bersih)
[src/hooks]       <- TanStack Query hooks (caching, server state)
      ▲
      │ (Format payload via src/handler)
[src/components]  <- Komponen UI presentasional / interaktif
      ▲
[src/pages]       <- Perakitan komponen-komponen UI menjadi satu halaman
```

### Penjelasan Folder:

| Direktori         | Tanggung Jawab Utama                                                          | Aturan Khusus                                                            |
| ----------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `src/services/`   | Melakukan request/fetching data ke endpoint backend.                          | Murni HTTP call (Axios). Tanpa logic bisnis.                             |
| `src/handler/`    | Merakit payload schema atau transformer data form sebelum dikirim ke service. | Mengisolasi parsing data input form ke payload API.                      |
| `src/hooks/`      | Manajemen server-side query, state, mutasi via TanStack Query.                | Menggunakan query key terpusat, mendefinisikan staleTime/caching policy. |
| `src/components/` | Komponen-komponen UI modular dan reusable.                                    | Gunakan `export default` pada komponen `.jsx`.                           |
| `src/pages/`      | Menggabungkan komponen UI menjadi satu tampilan utuh (halaman).               | Gunakan `export default` pada halaman `.jsx`.                            |

### Direktori Pendukung:

- **`src/config/`**: Konfigurasi external service / library (misal Axios instance `api.js`, centralized `queryKeys.js`), serta pembacaan environment variable yang di-_freeze_ menggunakan `Object.freeze()`.
- **`src/utils/`**: Utility functions dan helper umum yang bersifat agnostic terhadap UI.
- **`src/data/`**: Berkas data lokal (_deprecated_ untuk konsumsi utama, namun masih digunakan untuk keperluan dummy data / seeding katalog).
- **`src/assets/`**: Gambar, ikon, dan aset statis.

---

## 4. Catatan Penting untuk AI Agent & Developer

1. **JANGAN PERNAH LAKUKAN `build` (`bun run build`):**
   Selama folder `src/assets` masih berisi gambar mentah di dalamnya, proses build akan menghasilkan error. Abaikan build check dan fokus pada fungsionalitas kode serta linting (`bun run lint`).
2. **SELALU GUNAKAN BUN:**
   Gunakan Bun sebagai runtime dan package manager utama untuk setiap perintah terminal (`bun add`, `bun run lint`, `bun run dev`, dll).
3. **PENGELOMPOKAN ROUTE DI `src/App.jsx`:**
   Daftar route pada `src/App.jsx` harus selalu dikelompokkan dengan rapi dan diberikan komentar penjelas di atasnya, contoh:

   ```jsx
   <Routes>
     {/* Dashboard pages */}
     <Route path="/" element={<Dashbaord />} />

     {/* Product & Shopping pages */}
     <Route path="/item-detail/:id" element={<ItemDetail />} />
     <Route path="/cart" element={<Cart />} />
     <Route path="/checkout" element={<Checkout />} />
     <Route path="/order-success" element={<OrderSuccess />} />

     {/* Auth pages */}
     <Route path="/sign-up" element={<SignUp />} />
     <Route path="/login" element={<Login />} />
   </Routes>
   ```
