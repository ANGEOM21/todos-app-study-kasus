<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TodoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Prefix: /api/v1
*/
Route::prefix('v1')->group(function () {
    // Auth
    Route::controller(AuthController::class)->group(function () {
        Route::post('auth/register', 'register');
        Route::post('auth/login', 'login');
    });

    // Protected
    Route::middleware('auth:api')->group(function () {
        // Auth Actions
        Route::controller(AuthController::class)->prefix('auth')->group(function () {
            Route::post('logout', 'logout');
            Route::post('refresh', 'refresh');
            Route::get('me', 'me');
        });
        // Todo CRUD
        Route::apiResource('todos', TodoController::class);
    });
});
