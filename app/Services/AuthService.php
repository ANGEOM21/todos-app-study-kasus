<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    // set user guard
    private $userGuard;

    public function __construct()
    {
        /** @var JWTGuard */
        $this->userGuard = Auth::guard('api');
    }

    /**
     * Register User
     * @param array $data
     * @return array
     * @throws \Illuminate\Auth\AuthenticationException
     */
    public function registerUser(array $data): array
    {
        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        // Auto login setelah register
        $token = $this->userGuard->login($user);

        return [
            'user'  => $user,
            'token' => $this->respondWithToken($token),
        ];
    }

    /**
     * Login User
     * @param array $credentials
     * @return array
     * @throws \Illuminate\Auth\AuthenticationException
     */
    public function loginUser(array $credentials): ?array
    {
        if (!$token = $this->userGuard->attempt($credentials)) {
            return null;
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get Profile
     * @return User
     * @throws \Illuminate\Auth\AuthenticationException
     */
    public function getProfile()
    {
        return $this->userGuard->user();
    }

    /**
     * Logout User
     * @throws \Illuminate\Auth\AuthenticationException
     */
    public function logoutUser(): void
    {
        $this->userGuard->logout();
    }

    /**
     * Refresh Token
     * @return array
     * @throws \Illuminate\Auth\AuthenticationException
     */
    public function refreshToken(): array
    {
        $token = $this->userGuard->refresh();
        return $this->respondWithToken($token);
    }

    /**
     * Format Token Response
     * @param $token
     * @return array
     * @throws \Illuminate\Auth\AuthenticationException
     */
    private function respondWithToken($token): array
    {
        return [
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => $this->userGuard->factory()->getTTL() * 60
        ];
    }
}
