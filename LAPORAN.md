# LAPORAN PENGEMBANGAN PROYEK TEKNOLOGI WEB

## "End1Tech Store" – Platform E-Commerce Katalog Gadget & Aksesori Modern

---

**Mata Kuliah:** Teknologi Web  
**Semester:** 5  
**Nama Proyek:** End1Tech Store (`my-app2`)

---

## 1. Deskripsi Project

**End1Tech Store** adalah aplikasi web _front-end_ berbasis _Single Page Application_ (SPA) yang dirancang untuk menyediakan pengalaman berbelanja daring modern pada kategori produk teknologi, gadget, dan aksesori komputer (seperti _headphone_, _gaming mouse_, dan _smartwatch_).

Aplikasi ini dibangun untuk mengimplementasikan arsitektur web modern yang memisahkan secara tegas antara pengelolaan _server-state_ (data asinkron produk dan kategori) serta _client-state_ (keranjang belanja, autentikasi pengguna, dan kontrol antarmuka).

Fitur-fitur utama yang disediakan dalam proyek ini meliputi:

1. **Katalog Produk Dinamis:** Penyajian daftar produk dengan filter kategori interaktif (_All_, _Headphone_, _Mouse_, _Smartwatch_) serta fitur pencarian kata kunci dengan teknik _debouncing_ untuk mengoptimalkan performa input.
2. **Halaman Detail Produk (`/item-detail/:id`):** Informasi komprehensif terkait spesifikasi barang, harga per unit, rating ulasan, pemilihan kuantitas, serta opsi tindakan ganda: _Tambah ke Keranjang_ atau _Beli Langsung_.
3. **Keranjang Belanja Interaktif (`/cart`):** Pengelolaan barang belanjaan yang dikelompokkan berdasarkan penjual (_seller_), kemampuan seleksi parsial (_checkbox selection_) barang yang ingin di-_checkout_, penyesuaian kuantitas (_increment/decrement_), serta modal dialog konfirmasi penghapusan item.
4. **Alur Checkout & Validasi:** Dukungan untuk skenario pembayaran langsung (_Buy Now_) maupun pembayaran seluruh barang terpilih dari keranjang, dilengkapi verifikasi status _login_ pengguna sebelum mengakses form pemesanan.
5. **Autentikasi Pengguna Mandiri (`/sign-up`):** Fitur pendaftaran akun pengguna lokal dengan validasi format password dan pengecekan duplikasi email.
6. **Persistensi Data _Offline-First_:** Seluruh data produk, keranjang belanja, akun pengguna, dan sesi aktif tersimpan secara persisten pada _browser storage_, sehingga status aplikasi tetap terjaga saat halaman disegarkan (_refresh_).

---

## 2. TechStack

Aplikasi ini memanfaatkan ekosistem pengembangan web modern dengan performa tinggi, efisiensi bundle, dan arsitektur komponen modular:

### 2.1 React dan Vite

- **React 19:** Pustaka (_library_) utama berbasis komponen deklaratif untuk membangun antarmuka pengguna interaktif. Memanfaatkan fitur hooks modern (`useState`, `useEffect`, `useMemo`, `useContext`) untuk reaktivitas UI yang optimal dan rendering yang efisien.
- **Vite 8:** _Build tool_ dan _development server_ generasi terbaru yang memanfaatkan _native ES Modules_ (ESM) dan _Hot Module Replacement_ (HMR) berkecepatan tinggi. Vite memangkas waktu _cold-start_ dan proses _bundling_ produksi secara signifikan dibandingkan bundler tradisional.

### 2.2 TailwindCSS

- **TailwindCSS (v4):** _Utility-first CSS framework_ generasi terbaru yang terintegrasi langsung melalui plugin `@tailwindcss/vite`. TailwindCSS memungkinkan penataan tampilan yang konsisten, responsif (_mobile-friendly_ hingga desktop), serta menghasilkan ukuran berkas CSS produksi yang minimal karena hanya mengompilasi kelas utilitas yang benar-benar digunakan.

### 2.3 React Router

- **React Router DOM (v7):** Pustaka deklaratif untuk manajemen _routing_ pada aplikasi SPA. Mendukung navigasi dinamis tanpa memuat ulang seluruh halaman (_full reload_), parameter rute (`useParams` pada rute `/item-detail/:id`), passing state antarhalaman (`useLocation`), serta navigasi terprogram (`useNavigate`).

### 2.4 TanStack Query

- **TanStack React Query (v5):** Pustaka manajemen _server-state_ dan _data fetching_ asinkron standar industri. Berperan dalam menangani _caching_, sinkronisasi data, otomatisasi status _loading_ (`isLoading`) dan kesalahan (`isError`), penanganan _stale time_, serta transisi data halus melalui utilitas `placeholderData: keepPreviousData`. Dilengkapi juga dengan `@tanstack/react-query-devtools` untuk inspeksi status cache secara langsung.

### 2.5 Bun

- **Bun (v1.x):** _All-in-one JavaScript runtime_, _package manager_, dan _toolkit_ berkecepatan tinggi. Digunakan sebagai pengelola dependensi (_package manager_) pengganti npm/yarn karena kecepatan instalasi paket yang jauh lebih cepat berkat optimasi memori dan integrasi _system call_ native.

---

## 3. Implementasi

Pada bagian ini dipaparkan bagaimana komponen-komponen arsitektur teknis diintegrasikan ke dalam basis kode proyek.

### 3.1 React Query

TanStack React Query digunakan untuk mengelola siklus hidup data produk dan kategori yang disimulasikan secara asinkron. Pendekatan ini memisahkan logika pengambilan data dari komponen presentasi visual.

1. **Inisialisasi `QueryClient` dan Penyediaan Provider Global**  
   Pada berkas titik masuk aplikasi (`src/main.jsx`), dibuat sebuah instance `QueryClient` dengan konfigurasi _default options_ (misalnya penentuan `staleTime: 30000` ms, pembatasan `retry: 1`, dan deaktivasi `refetchOnWindowFocus`). Seluruh pohon komponen kemudian dibungkus dengan `<QueryClientProvider>`.

   ***

   ## src/main.jsx Line 6 - 22

2. **Abstraksi Query Key Factory & Custom Hooks**  
   Untuk menjaga konsistensi kunci cache dan memudahkan _maintenance_, dibuat _custom hooks_ pada berkas `src/hooks/useCatalog.js`:
   - `useCategories()`: Mengambil daftar kategori produk dengan status cache permanen (`staleTime: Infinity`).
   - `useItems(filters)`: Mengambil daftar produk berdasarkan filter kategori dan parameter pencarian, dilengkapi `placeholderData: keepPreviousData` agar UI tidak berkedip (_flicker_) saat filter berubah.
   - `useItem(id)`: Mengambil satu detail item spesifik berdasarkan ID produk yang aktif.

   ***

   ## src/hooks/useCatalog.js Line 8 - 39

3. **Konsumsi State Asinkron pada Komponen Antarmuka**  
   Komponen `Dashboard` dan `ItemDetail` mengonsumsi _custom hook_ tersebut secara langsung dengan memanfaatkan status reaktif `isLoading`, `isError`, dan `data` untuk menyajikan _skeleton loader_, pesan galat, atau daftar kartu katalog.

   ***

   ## src/pages/Dashboard.jsx Line 32 - 40

---

### 3.2 Local Storage

`localStorage` dimanfaatkan sebagai lapisan penyimpanan persisten (_offline database simulation_) guna mempertahankan integritas data aplikasi pada sisi peramban.

1. **Abstraksi CRUD & Seeding Database Produk**  
   Pada `src/data/apiSimulation.js`, fungsi `readDB()` dan `writeDB()` bertindak sebagai ORM/abstraksi database lokal dengan kunci penyimpanan `end1tech.products`. Jika data belum tersedia di memori peramban atau terjadi kerusakan format JSON, sistem secara otomatis melakukan _fallback seed_ dari kumpulan data awal (`src/data/index.js`). Simulasi _latency_ (600 ms) ditambahkan untuk menirukan karakteristik _network delay_ REST API nyata.

   ***

   ## src/data/apiSimulation.js Line 10 - 31

2. **Penyimpanan Kredensial & Pendaftaran Akun Pengguna**  
   Data pengguna yang mendaftar melalui form registrasi disimpan secara persisten dengan kunci `end1tech.users`. Fungsi `registerUser()` memeriksa duplikasi email sebelum menambahkan entitas pengguna baru ke dalam larik akun lokal.

   ***

   ## src/data/apiSimulation.js Line 70 - 87

3. **Sinkronisasi Otomatis Keranjang Belanja (_Cart Persistence_)**  
   Status isi keranjang belanja diinisialisasi dari `localStorage.getItem("end1tech_cart")` melalui teknik _lazy state initialization_. Setiap kali terjadi mutasi pada state `cartItems`, hook `useEffect` secara otomatis menulis kembali data terbaru ke dalam `localStorage`.

   ***

   ## src/context/CartContext.jsx Line 8 - 24

4. **Persistensi Sesi Autentikasi Pengguna Aktif**  
   Pengguna yang sedang masuk (_logged in user_) dicatat dalam kunci `end1tech.currentUser`. Apabila pengguna melakukan _logout_ atau state bernilai `null`, entitas tersebut dihapus dari `localStorage`.

   ***

   ## src/context/UserContext.jsx Line 9 - 29

---

### 3.3 React Context

React Context API diimplementasikan untuk menangani _client-state_ berskala global agar terhindar dari permasalahan _prop drilling_ antarkomponen yang berjauhan.

1. **Manajemen Global State Keranjang Belanja (`CartContext`)**  
   `CartContext` membungkus operasi-operasi bisnis keranjang:
   - `addToCart(item, quantity)`: Menambah item baru atau mengalkulasi ulang kuantitas bila item sudah ada di dalam keranjang.
   - `updateQuantity(itemId, quantity)`: Mengubah kuantitas item secara terperinci.
   - `removeFromCart(itemIds)`: Menghapus satu atau sekelompok item terpilih dari keranjang.
   - `clearCart()`: Mengosongkan keranjang saat pesanan berhasil diproses.
   - `totalQuantity`: Menghitung akumulasi jumlah item untuk kebutuhan lencana (_badge indicator_) pada navigasi atas (`NavBar`).

   ***

   ## src/context/CartContext.jsx Line 7 - 86

2. **Custom Hook `useCart` dengan Context Boundary Guard**  
   Untuk mencegah kesalahan konsumsi context di luar cakupan provider, dibuat custom hook `useCart` yang menyertakan pengecekan _boundary exception_.

   ***

   ## src/context/CartContext.jsx Line 88 - 94

3. **Manajemen Status Autentikasi Pengguna (`UserContext`)**  
   Menyediakan objek `currentUser` dan fungsi `setCurrentUser` untuk memeriksa hak akses halaman privat (seperti validasi sebelum _checkout_) dan menampilkan nama pengguna pada antarmuka.

   ***

   ## src/context/UserContext.jsx Line 8 - 49

4. **Penyusunan Provider Terpusat pada Komponen Induk**  
   Seluruh provider disusun secara berlapis pada `src/App.jsx` untuk memastikan seluruh rute halaman dapat mengakses data keranjang dan autentikasi pengguna secara konsisten.

   ***

   ## src/App.jsx Line 18 - 53

---

## 4. Evaluasi

### 4.1 Kritik

Berdasarkan hasil analisis terhadap arsitektur dan implementasi kode saat ini, terdapat beberapa catatan kritis:

1. **Keterbatasan Keamanan dan Kapasitas `localStorage`:**  
   Penyimpanan data akun pengguna (termasuk kata sandi dalam bentuk _plain text_) pada `localStorage` sangat rentan terhadap serangan _Cross-Site Scripting_ (XSS) karena dapat diakses secara bebas oleh skrip JavaScript di sisi klien. Selain itu, batasan kapasitas penyimpanan browser (rata-rata 5 MB) tidak memadai untuk menampung volume data transaksi atau katalog dalam skala riil.
2. **Ketiadaan Backend Server dan Database Relasional:**  
   Penggunaan _in-memory delay_ dan modul simulasi lokal (`apiSimulation.js`) membatasi aplikasi pada skenario _single-device/single-browser_. Data tidak dapat disinkronkan lintas perangkat dan tidak terdapat validasi integritas data transaksional di sisi server (_server-side ACID compliance_).
3. **Penanganan Alur Autentikasi yang Bersifat Parsial:**  
   Meskipun terdapat fitur pendaftaran akun (`/sign-up`), aplikasi saat ini belum menyediakan halaman masuk (_Sign In / Login_) terpisah bagi pengguna yang sudah terdaftar sebelumnya. Sistem hanya mengasumsikan pengguna aktif berasal dari proses registrasi terakhir yang disimpan pada `currentUser`.
4. **Resiko Inkonsistensi Kuantitas pada Multi-Seller Cart:**  
   Pemisahan logika pesanan pada halaman `Cart` dan `Checkout` yang mengandalkan operan _route state_ (`location.state`) berpotensi kehilangan sinkronisasi jika pengguna membuka kembali tab baru atau memanipulasi riwayat navigasi peramban secara manual.

---

### 4.2 Saran Pembangunan

Untuk meningkatkan keandalan, skalabilitas, dan kesiapan produksi (_production readiness_), berikut adalah rekomendasi pengembangan ke depan:

1. **Migrasi ke RESTful API / GraphQL dengan Backend Nyata:**  
   Menggantikan lapisan `apiSimulation.js` dengan arsitektur backend sungguhan (misalnya menggunakan Node.js/Express, Go, atau FastAPI) yang terhubung ke basis data relasional (PostgreSQL) atau NoSQL (MongoDB). Hal ini memungkinkan sinkronisasi katalog secara _real-time_ dan konkurensi stok barang.
2. **Implementasi Autentikasi Standar Industri (JWT & HttpOnly Cookies):**  
   Mengimplementasikan mekanisme _Secure Token-based Authentication_ menggunakan JSON Web Token (JWT) yang disimpan di dalam _HttpOnly & Secure Cookie_ untuk mencegah akses ilegal via JavaScript, disertai fasilitas _Sign In_, _Forgot Password_, dan _Role-Based Access Control_ (User vs Admin).
3. **Integrasi Payment Gateway:**  
   Menghubungkan alur _checkout_ dengan layanan gerbang pembayaran pihak ketiga (seperti Midtrans atau Xendit) untuk mendukung verifikasi pembayaran otomatis (Virtual Account, QRIS, Kartu Kredit) serta pencatatan status transaksi (_pending_, _settlement_, _expire_).
4. **Penyempurnaan Mutation State pada TanStack Query:**  
   Memanfaatkan `useMutation` bersama teknik _Optimistic Updates_ dan _Query Invalidation_ (`queryClient.invalidateQueries`) untuk setiap operasi mutasi (seperti pembuatan pesanan, penambahan ulasan produk, dan perubahan stok), sehingga cache di sisi klien selalu mencerminkan status database terkini.
5. **Pengujian Terotomatisasi (_Testing Suite_):**  
   Menambahkan pengujian otomatis unit dan komponen menggunakan Vitest & React Testing Library, serta pengujian ujung-ke-ujung (_End-to-End_) menggunakan Playwright atau Cypress guna memastikan keandalan alur transaksi keranjang dan pembayaran.
