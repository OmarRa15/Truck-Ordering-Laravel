<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\OrdersController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     // return $request->user();
//     return response()->json([
//         // 'user' => $request->user(),
//         'message' => 'You are authenticated'
//     ]);
// });


Route::post('/users', [UserController::class, 'store']); // Create user
Route::post('/users/{id}', [UserController::class, 'update']); // Update user
Route::delete('/users/{id}', [UserController::class, 'destroy']); // Delete user

Route::get('/orders', [OrdersController::class, 'index']);        // List all orders
Route::post('/orders', [OrdersController::class, 'store']);       // Create a new order
Route::get('/orders/{id}', [OrdersController::class, 'show']);    // Get a single order by ID
Route::post('/orders/{id}', [OrdersController::class, 'update']);  // Update an existing order
Route::delete('/orders/{id}', [OrdersController::class, 'destroy']); // Delete an order
Route::get('/orders/status/{status}', [OrdersController::class, 'getOrdersByStatus']); // Get orders by status
