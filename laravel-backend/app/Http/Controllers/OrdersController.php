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
            'size' => 'required|string',
            'weight' => 'required|numeric',
            'pickup_location' => 'required|string',
            'pickup_date' => 'required|date',
            'destination_location' => 'required|string',
            'delivery_type' => 'required|in:fast,normal',
        ]);
        
        // Set the user ID to the authenticated user's ID
        $validatedData['user_id'] = auth()->user()->id;

        // Set the status to 'pending' by default
        $validatedData['status'] = 'pending';
        
        // Validate the date as yyyy-mm-dd
        $validatedData['pickup_date'] = date('Y-m-d', strtotime($validatedData['pickup_date']));
        
        $order = Order::create($validatedData);

        return response()->json($order, 201);
    }

    /**
     * Update an existing order.
     */
    public function update(Request $request, $id)
    {
        if (!is_numeric($id)) {
            return response()->json(['message' => 'Invalid order ID'], 400);
        }

        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $validatedData = $request->validate([
            'size' => 'string',
            'weight' => 'numeric',
            'pickup_location' => 'string',
            'pickup_date' => 'date',
            'destination_location' => 'string',
            'delivery_type' => 'in:fast,normal',
            'status' => 'in:pending,in progress,delivered',
        ]);

        // if the user is not an admin, they can't update the status 
        if (!auth()->user()->isAdmin && isset($validatedData['status'])) {
            return response()->json(['message' => 'You are not authorized to update the status'], 403);
        }

        // The user can only update the order if it's pending
        if ($order->status !== 'pending' && !auth()->user()->isAdmin) {
            return response()->json(['message' => 'You are not authorized to update this order'], 403);
        }

        // Normal users can only update their own orders
        if (!auth()->user()->isAdmin && $order->user_id !== auth()->user()->id) {
            return response()->json(['message' => 'You are not authorized to update this order'], 403);
        }

        // Validate the date as yyyy-mm-dd
        if (isset($validatedData['pickup_date'])) {
            $validatedData['pickup_date'] = date('Y-m-d', strtotime($validatedData['pickup_date']));
        }

        $order->update($validatedData);

        return response()->json($order, 200);
    }

    /**
     * Delete an order.
     */
    public function destroy($id)
    {
        if (!is_numeric($id)) {
            return response()->json(['message' => 'Invalid order ID'], 400);
        }

        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Normal users can only delete their own orders if they are pending
        if (!auth()->user()->isAdmin) {
            if ($order->status !== 'pending' || $order->user_id !== auth()->user()->id) {
                return response()->json(['message' => 'You are not authorized to delete this order'], 403);
            }
        }

        $order->delete();

        return response()->json(['message' => 'Order deleted successfully'], 200);
    }

    /**
     * Retrieve a list of all orders.
     */
    public function index()
    {
        $orders = Order::all();
        
        // If the user is not an admin, only return their orders
        if (!auth()->user()->isAdmin) {
            $orders = $orders->where('user_id', auth()->user()->id)->values();
        }
        return response()->json($orders, 200);
    }

    /**
     * Retrieve a single order by ID.
     */

    public function show($id)
    {
        if (!is_numeric($id)) {
            return response()->json(['message' => 'Invalid order ID'], 400);
        }

        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Normal users can only view their own orders
        if (!auth()->user()->isAdmin && $order->user_id !== auth()->user()->id) {
            return response()->json(['message' => 'You are not authorized to view this order'], 403);
        }
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
        $orders = Order::where('status', $status);

        // if the user is not an admin, they can only view their own orders
        if (!auth()->user()->isAdmin) {
            $orders = $orders->where('user_id', auth()->user()->id);
        }

        return response()->json($orders->get(), 200);
    }

}
