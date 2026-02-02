# Backend API - Todo Application (Laravel 12)

Dokumentasi ini menjelaskan detail teknis, arsitektur, dan instruksi penggunaan API untuk aplikasi Todo. Backend ini dibangun menggunakan **Laravel 12** dengan standar industri seperti *Service Pattern*, *Form Request Validation*, dan *JWT Authentication*.

## Tech Stack
- **Framework:** Laravel 12
- **Language:** PHP 8.4+
- **Authentication:** JWT (JSON Web Token) via `tymon/jwt-auth`
- **Database:** MySQL / PostgreSQL
- **Pattern:** Service Layer, API Resources, Trait-based Responses.

## Cara Instalasi

1.  **Clone Branch:**
    ```bash
    git checkout feat/backend-api
    ```
2.  **Install Dependencies:**
    ```bash
    composer install
    ```
3.  **Setup Environment:**
    Salin file `.env.example` menjadi `.env` dan sesuaikan konfigurasi database Anda.
4.  **Generate App Key & JWT Secret:**
    ```bash
    php artisan key:generate
    php artisan jwt:secret
    ```
5.  **Run Migrations:**
    ```bash
    php artisan migrate
    ```
6.  **Create Storage Link (Untuk Akses Gambar):**
    ```bash
    php artisan storage:link
    ```
7.  **Run Server:**
    ```bash
    php artisan serve
    ```

## Format Response API
Semua response API menggunakan format JSON yang konsisten:
```json
{
    "statusCode": 200,
    "message": "Success message",
    "data": { ... } atau [ ... ]
}
```

## Dokumentasi Endpoint

### 1. Authentikasi
| Method | Endpoint | Auth | Deskripsi |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | No | Pendaftaran user baru |
| `POST` | `/api/v1/auth/login` | No | Login untuk mendapatkan JWT Token |
| `POST` | `/api/v1/auth/refresh` | Yes | Memperbarui token yang expired |
| `GET` | `/api/v1/auth/me` | Yes | Mendapatkan profil user yang sedang login |
| `POST` | `/api/v1/auth/logout` | Yes | Menghapus session/blacklist token |

**Contoh Payload Login:**
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

---

### 2. Todos Management
Semua endpoint di bawah ini memerlukan header `Authorization: Bearer <token>`.

| Method | Endpoint | Payload | Deskripsi |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/todos` | - | List semua todo milik user login |
| `POST` | `/api/v1/todos` | FormData | Membuat todo baru (mendukung upload gambar) |
| `GET` | `/api/v1/todos/{id}` | - | Mengambil detail satu todo |
| `POST` | `/api/v1/todos/{id}` | FormData + `_method=PUT` | Update todo (dengan/tanpa gambar) |
| `DELETE` | `/api/v1/todos/{id}` | - | Menghapus todo |

#### Detail Request:
- **Create Todo (Multipart/Form-Data):**
    - `title`: string (required)
    - `descriptions`: string (optional)
    - `image`: file (optional, image, max 5MB)
- **Update Todo (Penting):**
    Karena keterbatasan PHP dalam memproses `multipart/form-data` pada method `PUT`, silakan gunakan method **`POST`** dan tambahkan field **`_method`** dengan nilai **`PUT`** di dalam body request.

---

## Arsitektur Folder
- `app/Services`: Berisi logika bisnis (TodoService, AuthService).
- `app/Http/Controllers/Api`: Controller ramping (Thin Controller).
- `app/Http/Requests/Api`: Validasi input data (Form Request).
- `app/Http/Resources/Api`: Transformasi data model ke JSON (DTO).
- `app/Traits`: `ApiResponse.php` untuk standarisasi format response.

## Keamanan & Validasi
- **JWT Authorization:** Mengamankan data agar hanya pemilik yang bisa mengakses todonya sendiri.
- **Form Requests:** Memastikan data yang masuk sesuai tipe data dan valid.
- **CORS Handling:** Dikonfigurasi untuk mengizinkan akses dari frontend modern (React/Vue).

---
*Dokumentasi ini dibuat untuk memenuhi syarat penilaian Scalability dan Maintainability pada Mini Project.*