export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface Todo {
  id: number;
  title: string;
  descriptions: string | null;
  is_done: boolean;
  image_url: string | null;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface TodoInput {
  title: string;
  descriptions?: string;
  is_done?: boolean;
  image?: File | null;
}
