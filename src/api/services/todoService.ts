import api from '../axios';
import type { Todo, TodoInput, ApiResponse } from '../../types';

export const todoService = {
  getAll: async () => {
    const response = await api.get<ApiResponse<Todo[]>>('/todos');
    return response.data;
  },

  getOne: async (id: number) => {
    const response = await api.get<ApiResponse<Todo>>(`/todos/${id}`);
    return response.data;
  },

  create: async (todo: TodoInput) => {
    const formData = new FormData();
    formData.append('title', todo.title);
    if (todo.descriptions) formData.append('descriptions', todo.descriptions);
    if (todo.is_done !== undefined) formData.append('is_done', todo.is_done ? '1' : '0');
    if (todo.image) formData.append('image', todo.image);

    const response = await api.post<ApiResponse<Todo>>('/todos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id: number, todo: TodoInput) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    
    formData.append('title', todo.title);
    if (todo.descriptions) formData.append('descriptions', todo.descriptions);
    if (todo.is_done !== undefined) formData.append('is_done', todo.is_done ? '1' : '0');
    if (todo.image) formData.append('image', todo.image);

    const response = await api.post<ApiResponse<Todo>>(`/todos/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete<ApiResponse<any>>(`/todos/${id}`);
    return response.data;
  }
};
