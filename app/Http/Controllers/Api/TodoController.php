<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UpdateTodoRequest;
use App\Http\Requests\Api\StoreTodoRequest;
use App\Http\Resources\Api\TodoResource;
use App\Services\TodoService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class TodoController extends Controller
{
    use ApiResponse;

    /** @var TodoService */
    protected $todoService;

    /**
     * Initialize the controller with the TodoService
     *
     * @param TodoService $todoService
     */
    public function __construct(TodoService $todoService)
    {
        $this->todoService = $todoService;
    }

    /**
     * Get list of todos for current user
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $todos = $this->todoService->getUserTodos();
        return $this->success(TodoResource::collection($todos), 'List of todos');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Api\StoreTodoRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreTodoRequest $request): JsonResponse
    {
        $todo = $this->todoService->createTodo($request->validated());
        return $this->success(new TodoResource($todo), 'Todo created successfully', 201);
    }

    /**
     * Show the specified todo.
     *
     * @param string $id The ID of the todo
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        $todo = $this->todoService->findTodoById((int)$id);

        if (!$todo) return $this->error('Todo not found', 404);

        return $this->success(new TodoResource($todo), 'Todo detail');
    }

    /**
     * Update the specified todo in storage.
     *
     * @param  \App\Http\Requests\Api\UpdateTodoRequest  $request
     * @param  string  $id The ID of the todo
     * @return \Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Http\Exceptions\NotFoundHttpException
     */
    public function update(UpdateTodoRequest $request, string $id): JsonResponse
    {
        $todo = $this->todoService->findTodoById((int)$id);
        if (!$todo) return $this->error('Todo not found', 404);
        $updatedTodo = $this->todoService->updateTodo($todo, $request->validated());

        return $this->success(new TodoResource($updatedTodo), 'Todo updated successfully');
    }

    /**
     * Delete the specified todo from storage.
     *
     * @param string $id The ID of the todo to delete
     * @return JsonResponse
     * @throws \Illuminate\Http\Exceptions\NotFoundHttpException if the todo is not found
     */
    public function destroy(string $id): JsonResponse
    {
        $todo = $this->todoService->findTodoById((int)$id);
        if (!$todo) return $this->error('Todo not found', 404);
        $this->todoService->deleteTodo($todo);

        return $this->success(null, 'Todo deleted successfully');
    }
}
