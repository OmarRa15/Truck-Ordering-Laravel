<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); 
            $table->string('location');
            $table->string('size');
            $table->float('weight');
            $table->string('pickup_location');
            $table->date('pickup_date');
            $table->string('destination_location');
            $table->enum('delivery_type', ['fast', 'normal']);
            $table->enum('status', ['pending', 'in progress', 'delivered'])->default('pending');
            $table->timestamps(); // Adds 'created_at' and 'updated_at' columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
