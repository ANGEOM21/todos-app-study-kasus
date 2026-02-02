import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '../api/services/todoService';
import type { TodoInput } from '../types';
import toast from 'react-hot-toast';

export const useGetTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await todoService.getAll();
      return response.data || []; 
    },
  });
};

export const useTodoMutations = () => {
  const queryClient = useQueryClient();

  const createTodo = useMutation({
    mutationFn: (newTodo: TodoInput) => todoService.create(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo created successfully');
    },
    onError: (_error: any) => {
      toast.error('Failed to create todo');
    }
  });

  const updateTodo = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TodoInput }) => todoService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo updated successfully');
    },
  });

  const deleteTodo = useMutation({
    mutationFn: (id: number) => todoService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo deleted successfully');
    },
  });

  return { createTodo, updateTodo, deleteTodo };
};
