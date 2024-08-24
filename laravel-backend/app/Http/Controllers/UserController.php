<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Create a new user.
     */
    public function store(Request $request)
    {
        // only admins can use this endpoint
        if (!auth()->user()->isAdmin) {
            return response()->json(['message' => 'You are not authorized to do this operation.'], 403);
        }

        $validatedData = $request->validate([
            'email' => 'required|email|unique:users',
            'phone_number' => 'nullable|string',
            'name' => 'nullable|string',
            'password' => 'required|string|min:8',
            'isAdmin' => 'boolean',
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);

        return response()->json($user, 201);
    }

    /**
     * Update an existing user.
     */
    public function update(Request $request, $id)
    {
        if (!auth()->user()->isAdmin) {
            return response()->json(['message' => 'You are not authorized to do this operation.'], 403);
        }

        if (!is_numeric($id)) {
            return response()->json(['message' => 'Invalid user ID'], 400);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validatedData = $request->validate([
            'email' => 'email|unique:users,email,' . $user->id,
            'phone_number' => 'nullable|string',
            'name' => 'nullable|string',
            'password' => 'nullable|string|min:8',
            'isAdmin' => 'boolean',
        ]);

        if (isset($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        $user->update($validatedData);

        return response()->json($user, 200);
    }

    /**
     * Delete a user.
     */
    public function destroy($id)
    {
        if (!auth()->user()->isAdmin) {
            return response()->json(['message' => 'You are not authorized to do this operation.'], 403);
        }

        if (!is_numeric($id)) {
            return response()->json(['message' => 'Invalid user ID'], 400);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        
        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    /**
     * Get all users.
     */
    public function index()
    {
        if (!auth()->user()->isAdmin) {
            return response()->json(['message' => 'You are not authorized to do this operation.'], 403);
        }

        $users = User::all();

        return response()->json($users, 200);
    }
}
