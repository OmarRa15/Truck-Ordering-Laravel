<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->post('/users', [UserController::class, 'store']); // Create user
Route::middleware('auth:sanctum')->post('/users/{id}', [UserController::class, 'update']); // Update user
Route::middleware('auth:sanctum')->delete('/users/{id}', [UserController::class, 'destroy']); // Delete user

Route::middleware('auth:sanctum')->get('/orders', [OrdersController::class, 'index']);        // List all orders
Route::middleware('auth:sanctum')->post('/orders', [OrdersController::class, 'store']);       // Create a new order
Route::middleware('auth:sanctum')->get('/orders/{id}', [OrdersController::class, 'show']);    // Get a single order by ID
Route::middleware('auth:sanctum')->post('/orders/{id}', [OrdersController::class, 'update']);  // Update an existing order
Route::middleware('auth:sanctum')->delete('/orders/{id}', [OrdersController::class, 'destroy']); // Delete an order
Route::middleware('auth:sanctum')->get('/orders/status/{status}', [OrdersController::class, 'getOrdersByStatus']); // Get orders by status

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
