<?php

namespace App\Services;

use App\Models\Todo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class TodoService
{
    // set user guard
    private $userGuard;

    public function __construct()
    {
        /** @var JWTGuard */
        $this->userGuard = Auth::guard('api');
    }

    /**
     * Get all todos for current user
     * @return Collection
     */
    public function getUserTodos()
    {
        return $this->userGuard->user()->todos()->latest()->get();
    }

    /**
     * Create new todo
     * @param array $data
     * @return Todo
     */
    public function createTodo(array $data): Todo
    {
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            $data['image'] = $data['image']->store('todos', 'public');
        }

        return $this->userGuard->user()->todos()->create($data);
    }

    /**
     * @param int $id
     * Find todo by ID and ensure ownership
     * @return Todo
     */
    public function findTodoById(int $id): ?Todo
    {
        return $this->userGuard->user()->todos()->find($id);
    }

    /**
     * @param Todo $todo
     * @param array $data
     * Update todo
     * @return Todo
     */
    public function updateTodo(Todo $todo, array $data): Todo
    {
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            if ($todo->image) {
                Storage::disk('public')->delete($todo->image);
            }
            $data['image'] = $data['image']->store('todos', 'public');
        }

        $todo->update($data);
        return $todo;
    }

    /**
     * @param Todo $todo
     * Delete todo
     * @return void
     */
    public function deleteTodo(Todo $todo): void
    {
        if ($todo->image) {
            Storage::disk('public')->delete($todo->image);
        }
        $todo->delete();
    }


    // SEPERTI BIASA CURHAT DULU
    // PILEK FLU NGGAK ENAK BANGET ASLI SUMPAH
}