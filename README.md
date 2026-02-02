# Dokumentasi Mini Project - Fullstack Todo App

Repository ini berisi jawaban untuk studi kasus mini project yang mencakup pemahaman teori backend dan implementasi praktis menggunakan **Laravel 12** dan **React Vite**.

---
## Jawaban Teori

### 1. Jelaskan apa itu REST API?
**REST (Representational State Transfer)** adalah gaya arsitektur perangkat lunak yang mengatur bagaimana aplikasi web berkomunikasi satu sama lain melalui protokol HTTP. Sebuah API dapat dikatakan bersifat RESTful jika memenuhi beberapa prinsip utama:
*   **Stateless:** Setiap *request* dari client harus berisi semua informasi yang diperlukan oleh server untuk memprosesnya. Server tidak menyimpan "state" atau sesi client di memori server.
*   **Client-Server:** Adanya pemisahan tugas yang jelas antara antarmuka pengguna (Frontend) dan penyimpanan data (Backend).
*   **Uniform Interface:** Penggunaan metode HTTP yang standar (GET, POST, PUT, DELETE) dan penggunaan URI (Uniform Resource Identifier) sebagai alamat unik untuk setiap resource.
*   **Resource-Based:** Data direpresentasikan sebagai resource (misalnya: `/api/v1/todos`) dan biasanya ditukarkan dalam format JSON atau XML.

### 2. Apa itu CORS dan bagaimana cara menanganinya di backend?
**CORS (Cross-Origin Resource Sharing)** adalah mekanisme keamanan yang diterapkan oleh browser untuk membatasi permintaan HTTP lintas domain. Browser akan memblokir *request* dari Frontend (misal: `localhost:5173`) ke Backend (misal: `api.example.com`) jika backend tidak memberikan izin secara eksplisit.

**Cara Menanganinya di Backend (Laravel):**
*   **Konfigurasi Middleware:** Pada Laravel 12, CORS ditangani secara otomatis melalui file konfigurasi `config/cors.php`.
*   **Headers:** Backend harus mengirimkan header HTTP tertentu dalam responsnya, seperti:
    *   `Access-Control-Allow-Origin`: Menentukan domain mana saja yang diizinkan (misal: `*` untuk semua atau domain spesifik).
    *   `Access-Control-Allow-Methods`: Menentukan metode HTTP yang diizinkan (GET, POST, dll).
    *   `Access-Control-Allow-Headers`: Menentukan header khusus yang boleh dikirim oleh client.
*   **Pre-flight Request:** Backend harus merespons permintaan metode `OPTIONS` yang dikirim browser sebelum permintaan utama dilakukan.

### 3. Jelaskan perbedaan antara SQL dan NoSQL database!
| Fitur | SQL (Relational) | NoSQL (Non-Relational) |
|---|---|---|
| **Struktur** | Menggunakan tabel dengan skema tetap (baris & kolom). | Fleksibel (Dokumen, Key-Value, Graph, atau Wide-column). |
| **Relasi** | Sangat baik dalam menangani relasi kompleks (JOIN). | Tidak dirancang untuk relasi kompleks secara *native*. |
| **Skalabilitas** | **Vertikal** (Upgrade spesifikasi hardware server). | **Horisontal** (Menambah jumlah server/sharding). |
| **Integritas** | Mematuhi prinsip **ACID** (Atomicity, Consistency, Isolation, Durability). | Mematuhi prinsip **BASE** (Basically Available, Soft state, Eventual consistency). |
| **Contoh** | MySQL, PostgreSQL, SQL Server. | MongoDB, Redis, Cassandra. |

### 4. Apa yang Anda ketahui tentang middleware?
**Middleware** adalah komponen yang bertindak sebagai "jembatan" atau perantara antara permintaan (*request*) yang masuk dan tujuan akhirnya (*controller*). Middleware berada di tengah-tengah jalur eksekusi aplikasi.

**Fungsi Utama Middleware:**
*   **Autentikasi:** Memeriksa apakah user sudah login (misalnya: mengecek validitas token JWT).
*   **Otorisasi:** Memeriksa apakah user memiliki hak akses untuk resource tertentu.
*   **Sanitasi & Validasi:** Membersihkan input data atau mengubah format request sebelum sampai ke controller.
*   **Logging:** Mencatat riwayat aktivitas request yang masuk.
*   **CORS:** Mengatur kebijakan akses lintas domain.

---

## Implementasi Project (Soal No. 5 & 6)

Project ini telah diimplementasikan dengan standar industri menggunakan:
*   **Backend:** Laravel 12 dengan implementasi JWT (Tymon), Service Pattern, dan Clean Code.
*   **Frontend:** React (Vite), TypeScript, Tailwind CSS v4, DaisyUI v5, dan Zustand.

### Lokasi Kode Program
Untuk memudahkan review, kode program dibagi ke dalam beberapa branch:

1.  **Branch `main`:** Berisi file `README.md` (Jawaban Teori) dan dokumentasi umum.
2.  **Branch `feat/backend-api`:** Berisi seluruh implementasi **Soal No. 5** (API Register, Login JWT, CRUD Todos dengan relasi user, dan Image Upload).
    *   *Highlights:* Service Layer, Form Requests, API Resources, dan ApiResponse Trait.
3.  **Branch `feat/frontend-app`:** Berisi implementasi **Soal No. 6** (Tampilan Antarmuka, Integrasi API, Axios Interceptors untuk Refresh Token, dan State Management menggunakan Zustand).

---

### Cara Menjalankan Project

**Backend:**
```bash
composer install
php artisan migrate
php artisan jwt:secret
php artisan storage:link
php artisan serve
```

**Frontend:**
```bash
npm install
npm run dev
```

---
*Dibuat oleh: FAHMI IDRIS ANJOUNGHAN*
*Waktu Pengerjaan: < 24 Jam*
