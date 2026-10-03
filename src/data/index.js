import CatalogImages from "../assets/CatalogItems";

export const Category = [
  { id: 1, name: "All" },
  { id: 2, name: "Headphone" },
  { id: 3, name: "Smartwatch" },
  { id: 4, name: "Mouse" },
];

export const Items = [
  {
    id: 1,
    name: "Sony WH-1000XM5",
    category: "Headphone",
    price: "Rp 5.299.000",
    image: CatalogImages.headphone1,
    rating: 4.9,
    reviewCount: 142,
    description:
      "Headphone nirkabel premium dengan peredam bising terdepan di industri (Industry-leading Noise Cancellation) berkat dua prosesor dan delapan mikrofon. Dilengkapi driver 30mm yang presisi, daya tahan baterai hingga 30 jam, serta desain ultra-nyaman dan ringan untuk pemakaian seharian penuh.",
    reviews: [
      {
        id: 101,
        name: "Budi Santoso",
        rating: 5,
        comment:
          "ANC-nya gila banget, suara bising kantor dan jalanan langsung hening total. Bass empuk dan detail suara sangat jernih!",
        date: "2024-02-15",
      },
      {
        id: 102,
        name: "Siti Rahma",
        rating: 5,
        comment:
          "Baterai awet banget, seminggu pakai buat kerja cuma ngecas sekali. Bantalan telinganya juga empuk.",
        date: "2024-03-01",
      },
      {
        id: 103,
        name: "Reza Pratama",
        rating: 4.7,
        comment:
          "Kualitas mikrofon untuk Zoom call sangat bersih. Sangat direkomendasikan untuk WFH.",
        date: "2024-03-12",
      },
    ],
  },
  {
    id: 2,
    name: "Audio-Technica ATH-M50x",
    category: "Headphone",
    price: "Rp 2.350.000",
    image: CatalogImages.headphone2,
    rating: 4.8,
    reviewCount: 98,
    description:
      "Headphone monitor studio profesional legendaris yang diakui oleh audio engineer dan audiophile di seluruh dunia. Menghadirkan reproduksi suara yang sangat akurat dengan respons bass yang dalam dan rapat. Menggunakan driver aperture besar 45mm dengan magnet neodymium.",
    reviews: [
      {
        id: 201,
        name: "Dimas Anggara",
        rating: 5,
        comment:
          "Standar emas buat mixing audio dan monitor recording. Karakter suaranya flat dan jujur.",
        date: "2024-01-20",
      },
      {
        id: 202,
        name: "Fajar Nugraha",
        rating: 4.6,
        comment:
          "Build quality kokoh, kabel bisa dilepas dan dapat 3 pilihan kabel dalam paket penjualan.",
        date: "2024-02-28",
      },
    ],
  },
  {
    id: 3,
    name: "Bose QuietComfort 45",
    category: "Headphone",
    price: "Rp 4.799.000",
    image: CatalogImages.headphone3,
    rating: 4.8,
    reviewCount: 76,
    description:
      "Kenyamanan legendaris khas Bose dengan teknologi Acoustic Noise Cancelling kelas dunia. Dilengkapi mode Aware untuk mendengar suara sekitar tanpa melepas headphone. Equalizer dapat disesuaikan sesuka hati lewat aplikasi Bose Music, baterai tahan 24 jam dalam sekali pengisian.",
    reviews: [
      {
        id: 301,
        name: "Hendro Wijaya",
        rating: 5,
        comment:
          "Headphone paling nyaman di telinga yang pernah saya punya. Tidak bikin kepala pusing saat dipakai traveling naik pesawat.",
        date: "2024-02-10",
      },
      {
        id: 302,
        name: "Larasati Putri",
        rating: 4.6,
        comment:
          "Suara vokal jernih dan noise cancelling-nya sangat natural tanpa rasa kedap berlebih.",
        date: "2024-03-05",
      },
    ],
  },
  {
    id: 4,
    name: "Sennheiser Momentum 4",
    category: "Headphone",
    price: "Rp 5.499.000",
    image: CatalogImages.headphone4,
    rating: 4.9,
    reviewCount: 110,
    description:
      "Kualitas audio audiophile dengan sistem transduser 42mm yang terinspirasi dari soundstage studio profesional. Keunggulan mutlak dengan daya tahan baterai luar biasa hingga 60 jam pemakaian non-stop. Dilengkapi Adaptive Noise Cancellation canggih dan mode transparansi pintar.",
    reviews: [
      {
        id: 401,
        name: "Kevin Sanjaya",
        rating: 5,
        comment:
          "Daya tahan baterai 60 jam bukan kaleng-kaleng! Soundstage-nya luas dan separasi instrumennya jempolan.",
        date: "2024-01-14",
      },
      {
        id: 402,
        name: "Maya Indira",
        rating: 4.8,
        comment:
          "Desain minimalis dan kontrol sentuhnya sangat responsif. Musik akustik terdengar luar biasa hidup.",
        date: "2024-02-22",
      },
    ],
  },
  {
    id: 5,
    name: "SteelSeries Arctis Nova Pro",
    category: "Headphone",
    price: "Rp 4.800.000",
    image: CatalogImages.headphone5,
    rating: 4.7,
    reviewCount: 65,
    description:
      "Headset gaming premium level kompetitif dengan Nova Pro Acoustic System dan driver High Fidelity. Dilengkapi GameDAC Gen 2 untuk resolusi audio 96KHz/24-Bit dengan distorsi ultra-rendah. Fitur Multi-System Connect memudahkan peralihan antara PC dan konsol game.",
    reviews: [
      {
        id: 501,
        name: "Rian Hidayat",
        rating: 5,
        comment:
          "Footstep musuh di game FPS seperti Valorant dan CS2 terdengar sangat akurat posisi arahnya. DAC-nya sangat fungsional!",
        date: "2024-02-18",
      },
      {
        id: 502,
        name: "Arif Kurniawan",
        rating: 4.4,
        comment:
          "Mikrofon ClearCast Gen 2 sangat jernih dengan noise reduction berbasis AI. Mantap buat main bareng tim.",
        date: "2024-03-08",
      },
    ],
  },
  {
    id: 6,
    name: "Apple Watch Series 9",
    category: "Smartwatch",
    price: "Rp 7.499.000",
    image: CatalogImages.smartwatch1,
    rating: 4.9,
    reviewCount: 230,
    description:
      "Didukung oleh chip Apple S9 SiP yang bertenaga dengan layar Always-On Retina hingga 2000 nits. Fitur gesture 'Double Tap' ajaib memudahkan kontrol tanpa menyentuh layar. Dilengkapi sensor kesehatan tingkat lanjut: ECG, sensor oksigen darah (SpO2), dan pelacakan tidur komprehensif.",
    reviews: [
      {
        id: 601,
        name: "Clara Vania",
        rating: 5,
        comment:
          "Gesture double tap-nya sangat berguna kalau tangan lagi sibuk bawa belanjaan. Layarnya terang benderang di bawah terik matahari.",
        date: "2024-02-05",
      },
      {
        id: 602,
        name: "Doni Prakoso",
        rating: 4.8,
        comment:
          "Integrasi mulus dengan ekosistem Apple iPhone. Fitur pelacak kebugaran dan heart rate sangat akurat.",
        date: "2024-03-02",
      },
    ],
  },
  {
    id: 7,
    name: "Samsung Galaxy Watch 6",
    category: "Smartwatch",
    price: "Rp 3.999.000",
    image: CatalogImages.smartwatch2,
    rating: 4.8,
    reviewCount: 154,
    description:
      "Smartwatch modern dengan bezel layar 20% lebih tipis dan layar Sapphire Crystal yang tangguh terhadap goresan. Menyediakan analisis komposisi tubuh (BIA), pemantauan detak jantung, zona detak jantung personal untuk lari, dan panduan kualitas tidur yang dipersonalisasi.",
    reviews: [
      {
        id: 701,
        name: "Bayu Wicaksono",
        rating: 5,
        comment:
          "Tampilan layarnya sangat tajam dan vibran. Fitur Sleep Coaching-nya membantu banget memperbaiki pola istirahat.",
        date: "2024-01-29",
      },
      {
        id: 702,
        name: "Nadya Amanda",
        rating: 4.6,
        comment:
          "Gampang ganti strap dengan tombol one-click. Desainnya ramping dan elegan dipakai saat acara formal.",
        date: "2024-02-25",
      },
    ],
  },
  {
    id: 8,
    name: "Garmin Forerunner 265",
    category: "Smartwatch",
    price: "Rp 7.799.000",
    image: CatalogImages.smartwatch3,
    rating: 4.9,
    reviewCount: 88,
    description:
      "Jam tangan lari pintar khusus atlet dan penggemar olahraga dengan layar sentuh AMOLED cerah. Dilengkapi metrik pelatihan canggih seperti Training Readiness Score, status HRV, dan GPS multi-band akurat. Baterai tahan hingga 13 hari dalam mode smartwatch.",
    reviews: [
      {
        id: 801,
        name: "Teguh Prasetyo",
        rating: 5,
        comment:
          "GPS multi-band sangat presisi untuk track maraton. Layar AMOLED-nya enak banget dilihat saat lari pagi.",
        date: "2024-02-14",
      },
      {
        id: 802,
        name: "Eka Saputra",
        rating: 4.8,
        comment:
          "Data metrik larinya sangat detail (cadence, stride length, recovery time). Jam wajib untuk pelari serius!",
        date: "2024-03-11",
      },
    ],
  },
  {
    id: 9,
    name: "Huawei Watch GT 4",
    category: "Smartwatch",
    price: "Rp 3.199.000",
    image: CatalogImages.smartwatch4,
    rating: 4.7,
    reviewCount: 104,
    description:
      "Menggabungkan estetika jam tangan klasik berbentuk segi delapan dengan teknologi kesehatan terdepan. Daya tahan baterai legendaris hingga 14 hari pemakaian. Kompatibel dengan perangkat Android maupun iOS, dilengkapi manajemen kalori dan pelacakan tidur TruSleep 3.0.",
    reviews: [
      {
        id: 901,
        name: "Gita Permata",
        rating: 5,
        comment:
          "Desainnya mewah banget seperti jam mekanik mahal! Baterai beneran awet 2 minggu tanpa perlu sering dicas.",
        date: "2024-02-08",
      },
      {
        id: 902,
        name: "Ahmad Fauzi",
        rating: 4.5,
        comment:
          "Notifikasi WA dan telepon masuk lancar. Manajemen kalorinya sangat praktis untuk memantau diet harian.",
        date: "2024-03-04",
      },
    ],
  },
  {
    id: 10,
    name: "Amazfit GTR 4",
    category: "Smartwatch",
    price: "Rp 2.799.000",
    image: CatalogImages.smartwatch5,
    rating: 4.6,
    reviewCount: 79,
    description:
      "Smartwatch serbaguna dengan antena GPS terpolarisasi melingkar pita ganda pertama di industri untuk pelacakan rute super akurat. Dilengkapi lebih dari 150 mode olahraga, pengenalan latihan kekuatan otomatis, serta dukungan panggilan suara Bluetooth berkualitas tinggi.",
    reviews: [
      {
        id: 1001,
        name: "Bambang Sudirgo",
        rating: 5,
        comment:
          "Value for money terbaik di kelas harganya. Fitur olahraga lengkap, GPS akurat, dan ada speaker buat telepon.",
        date: "2024-01-19",
      },
      {
        id: 1002,
        name: "Rina Marlina",
        rating: 4.3,
        comment:
          "Tampilan UI Zepp OS ringan dan gampang disesuaikan. Watch face bawaannya banyak pilihan menarik.",
        date: "2024-02-17",
      },
    ],
  },
  {
    id: 11,
    name: "Logitech MX Master 3S",
    category: "Mouse",
    price: "Rp 1.699.000",
    image: CatalogImages.mouse1,
    rating: 4.9,
    reviewCount: 312,
    description:
      "Mouse produktivitas nomor satu untuk para profesional, programmer, dan kreator konten. Dilengkapi switch Quiet Clicks yang 90% lebih hening serta scroll wheel elektromagnetik MagSpeed yang mampu menggulir 1.000 baris dalam 1 detik. Sensor optik 8.000 DPI dapat digunakan di segala permukaan termasuk kaca.",
    reviews: [
      {
        id: 1101,
        name: "Yogi Pratama",
        rating: 5,
        comment:
          "Kenyamanan ergonomisnya luar biasa untuk kerja berjam-jam di depan komputer. Scroll horizontalnya sangat membantu editing timeline video dan excel.",
        date: "2024-02-12",
      },
      {
        id: 1102,
        name: "Anissa Kusuma",
        rating: 4.9,
        comment:
          "Kliknya sunyi banget tidak mengganggu rekan kerja di kantor. Baterai tahan berbulan-bulan!",
        date: "2024-03-07",
      },
    ],
  },
  {
    id: 12,
    name: "Razer DeathAdder V3 Pro",
    category: "Mouse",
    price: "Rp 2.399.000",
    image: CatalogImages.mouse2,
    rating: 4.8,
    reviewCount: 167,
    description:
      "Bentuk ergonomis ikonik yang disempurnakan bersama para atlet esport pro dunia. Memiliki bobot ultra-ringan hanya 63 gram tanpa lubang honeycomb. Dilengkapi sensor Razer Focus Pro 30K Optical dan Optical Mouse Switches Gen-3 yang bebas masalah double-click.",
    reviews: [
      {
        id: 1201,
        name: "Iqbal Ramadhan",
        rating: 5,
        comment:
          "Grip ergonomisnya pas banget di tangan. Bobot 63g bikin flick shot di Valorant jadi jauh lebih gesit dan presisi.",
        date: "2024-01-25",
      },
      {
        id: 1202,
        name: "Sandy Gunawan",
        rating: 4.7,
        comment:
          "Sensornya gila responsifnya, tidak ada delay sama sekali. Permukaan coating-nya juga kesat tidak licin saat tangan berkeringat.",
        date: "2024-02-27",
      },
    ],
  },
  {
    id: 13,
    name: "Logitech G Pro X Superlight 2",
    category: "Mouse",
    price: "Rp 2.499.000",
    image: CatalogImages.mouse3,
    rating: 4.9,
    reviewCount: 220,
    description:
      "Evolusi mouse gaming esport paling dominan di kancah turnamen profesional. Menghadirkan switch hybrid optik-mekanikal LIGHTFORCE untuk kecepatan kilat dan ketahanan klik mekanik yang memuaskan. Menggunakan sensor HERO 2 dengan akurasi sub-mikron dan port modern USB-C.",
    reviews: [
      {
        id: 1301,
        name: "Daniel Kristianto",
        rating: 5,
        comment:
          "Switch Lightforce terasa jauh lebih renyah dan responsif dibanding generasi pertama. Sangat enteng dan seimbang!",
        date: "2024-02-16",
      },
      {
        id: 1302,
        name: "Rio Ferdinand",
        rating: 4.8,
        comment:
          "Baterai tahan lama hingga 95 jam dan sekarang sudah USB-C. Skates PTFE bawaannya sangat mulus meluncur di mousepad.",
        date: "2024-03-09",
      },
    ],
  },
  {
    id: 14,
    name: "SteelSeries Aerox 3 Wireless",
    category: "Mouse",
    price: "Rp 1.499.000",
    image: CatalogImages.mouse4,
    rating: 4.6,
    reviewCount: 92,
    description:
      "Mouse gaming ultra-ringan 68 gram dengan bodi berlubang honeycomb dan perlindungan AquaBarrier bersertifikasi IP54 yang tahan terhadap tumpahan air, debu, dan kotoran. Dilengkapi pencahayaan 3-zone RGB prism yang memukau dan daya tahan baterai hingga 200 jam melalui koneksi 2.4GHz dan Bluetooth.",
    reviews: [
      {
        id: 1401,
        name: "Agus Setiawan",
        rating: 4.7,
        comment:
          "Lampu RGB di bawah lubang honeycomb-nya terlihat keren banget di setup meja. Bobotnya enteng dan ada sertifikasi anti air IP54.",
        date: "2024-01-30",
      },
      {
        id: 1402,
        name: "Ricky Maulana",
        rating: 4.5,
        comment:
          "Bisa dual koneksi dongle 2.4G dan Bluetooth, praktis buat dibawa bepergian sama laptop.",
        date: "2024-02-21",
      },
    ],
  },
  {
    id: 15,
    name: "Pulsar X2 V2 Wireless",
    category: "Mouse",
    price: "Rp 1.399.000",
    image: CatalogImages.mouse5,
    rating: 4.7,
    reviewCount: 84,
    description:
      "Mouse kompetitif simetris dengan punuk belakang yang memberikan topangan sempurna bagi gaya genggam claw dan fingertip grip. Menggunakan optical switch yang bebas debounce latency, sensor PixArt PAW3395 dengan 26.000 DPI, serta encoder scroll wheel Pulsar Blue yang sangat tactile dan terproteksi dari debu.",
    reviews: [
      {
        id: 1501,
        name: "Hendra Gunawan",
        rating: 5,
        comment:
          "Bentuk simetrisnya sangat pas untuk claw grip. Klik optik responsif tanpa risiko double click. Kualitas build sangat solid tanpa suara berderit.",
        date: "2024-02-11",
      },
      {
        id: 1502,
        name: "Vicky Pratama",
        rating: 4.5,
        comment:
          "Scroll wheel-nya terasa pas step demi step-nya saat ganti senjata di game. Software konfigurasinya juga enteng dan mudah digunakan.",
        date: "2024-03-03",
      },
    ],
  },
];
