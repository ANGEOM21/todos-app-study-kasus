<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    
    /**
     * Return a successful response with the given data, message, and status code.
     *
     * @param mixed $data The data to be returned.
     * @param string $message The message to be returned.
     * @param int $statusCode The status code to be returned.
     * @return JsonResponse The successful response.
     */
    protected function success(mixed $data = null, string $message = 'Success', int $statusCode = 200): JsonResponse
    {
        return response()->json([
            'statusCode' => $statusCode,
            'message'    => $message,
            'data'       => $data,
        ], $statusCode);
    }

    
    /**
     * Return an error response with the given message, status code, and errors.
     *
     * @param string $message The message to be returned.
     * @param int $statusCode The status code to be returned.
     * @param mixed $errors The errors to be returned.
     * @return JsonResponse The error response.
     */
    protected function error(string $message, int $statusCode = 400, mixed $errors = null): JsonResponse
    {
        return response()->json([
            'statusCode' => $statusCode,
            'message'    => $message,
            'data'       => null,
            'errors'     => $errors
        ], $statusCode);
    }
}
