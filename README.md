# Jawaban Tes Teknis Fullstack Developer

Repository ini berisi jawaban untuk **Soal Mini Project (Nomor 6)** yaitu implementasi Frontend sederhana menggunakan **React (Vite) + TypeScript**.

## Tech Stack (Jawaban Soal 6)
**Frontend Framework & Library:**
*   **Core:** React 19, Vite, TypeScript
*   **Styling:** Tailwind CSS v4, DaisyUI v5
*   **State Management:** Zustand (Auth/UI State), TanStack Query v5 (Server State/Caching)
*   **Networking:** Axios (Interceptors for Auth & Error Handling)
*   **Icons:** Lucide React
*   **Features:**
    *   Authentication (Login, Register & Logout)
    *   Todo CRUD (Create, Read, Update, Delete) with Image Upload
    *   Drag & Drop File Input
    *   Password Visibility Toggle
    *   Responsive Dashboard UI

---

## Struktur Folder Project

Berikut adalah struktur folder utama dalam project ini:

```bash
src/
├── api/
│   ├── services/       # Service layer (authService, todoService)
│   └── axios.ts        # Konfigurasi Axios & Interceptors
├── components/
│   ├── todos/          # Komponen spesifik Todo (Card, Modal)
│   └── ui/             # Komponen UI Reusable
├── hooks/
│   └── useTodos.ts     # Custom Hooks (React Query)
├── pages/
│   ├── Dashboard.tsx   # Halaman Utama
│   ├── Login.tsx       # Halaman Login
│   └── Register.tsx    # Halaman Register
├── router/
│   └── AppRouter.tsx   # Konfigurasi React Router
├── stores/
│   └── useAuthStore.ts # Global State (Zustand)
├── types/
│   └── index.ts        # TypeScript Interfaces/Types
├── main.tsx            # Entry Point App
└── index.css           # Global Styles (Tailwind)
```

---

## Cara Menjalankan Project (Frontend)

1.  **Clone Repository**
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Setup Environment Variable:**
    Buat file `.env` dan sesuaikan URL Backend:
    ```env
    VITE_API_URL=http://localhost:8000/api/v1
    VITE_STORAGE_URL=http://localhost:8000/storage
    ```
4.  **Jalankan Development Server:**
    ```bash
    npm run dev
    ```
