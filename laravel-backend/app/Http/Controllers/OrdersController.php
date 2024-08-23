<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    /**
     * Create a new order.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'size' => 'required|string',
            'weight' => 'required|numeric',
            'pickup_location' => 'required|string',
            'pickup_date' => 'required|date',
            'destination_location' => 'required|string',
            'delivery_type' => 'required|in:fast,normal',
            'status' => 'required|in:pending,in progress,delivered',
        ]);

        $order = Order::create($validatedData);

        return response()->json($order, 201);
    }

    /**
     * Update an existing order.
     */
    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $validatedData = $request->validate([
            'user_id' => 'exists:users,id',
            'size' => 'string',
            'weight' => 'numeric',
            'pickup_location' => 'string',
            'pickup_date' => 'date',
            'destination_location' => 'string',
            'delivery_type' => 'in:fast,normal',
            'status' => 'in:pending,in progress,delivered',
        ]);

        $order->update($validatedData);

        return response()->json($order, 200);
    }

    /**
     * Delete an order.
     */
    public function destroy($id)
    {
        $order = Order::findOrFail($id);

        $order->delete();

        return response()->json(['message' => 'Order deleted successfully'], 200);
    }

    /**
     * Retrieve a list of all orders.
     */
    public function index()
    {
        $orders = Order::all();

        return response()->json($orders, 200);
    }

    /**
     * Retrieve a single order by ID.
     */
    public function show($id)
    {
        $order = Order::findOrFail($id);

        return response()->json($order, 200);
    }

    /**
     * Retrieve orders by status.
     */
    
    public function getOrdersByStatus($status)
    {
        // Ensure the status is valid
        if (!in_array($status, ['pending', 'in progress', 'delivered'])) {
            return response()->json(['message' => 'Invalid status'], 400);
        }

        // Fetch orders with the given status
        $orders = Order::where('status', $status)->get();

        return response()->json($orders, 200);
    }

}
