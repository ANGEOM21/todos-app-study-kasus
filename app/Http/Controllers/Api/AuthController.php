<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\LoginRequest;
use App\Http\Requests\Api\Auth\RegisterRequest;
use App\Services\AuthService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    use ApiResponse;
    /** @var AuthService */
    protected $authService;


    /**
     * Construct a new instance of the AuthController
     * 
     * @param AuthService $authService
     */
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Register a new user.
     *
     * @param  \App\Http\Requests\Api\Auth\RegisterRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $this->authService->registerUser($request->validated());

        return $this->success($data, 'User created successfully', 201);
    }

    /**
     * Login user and return token.
     *
     * @param  \App\Http\Requests\Api\Auth\LoginRequest  $request
     * @return \Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Auth\AuthenticationException
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $data = $this->authService->loginUser($request->validated());

        if (!$data) {
            return $this->error('Unauthorized', 401);
        }

        return $this->success($data, 'Login successful');
    }

    /**
     * Return the authenticated user's profile.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(): JsonResponse
    {
        $user = $this->authService->getProfile();
        return $this->success($user, 'User profile');
    }

    /**
     * Logout the current user and invalidate the token.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\AuthenticationException
     */
    public function logout(): JsonResponse
    {
        $this->authService->logoutUser();
        return $this->success(null, 'Successfully logged out');
    }

    /**
     * Refresh the token for the current user.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\AuthenticationException
     *
     * @throws \Exception if the token is invalid or unauthorized
     */
    public function refresh(): JsonResponse
    {
        try {
            $data = $this->authService->refreshToken();
            return $this->success($data, 'Token refreshed successfully');
        } catch (\Exception $e) {
            return $this->error('Unauthorized or Invalid Token', 401);
        }
    }
}
