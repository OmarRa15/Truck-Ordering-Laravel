<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'user_id',
        'location',
        'size',
        'weight',
        'pickup_location',
        'pickup_date',
        'destination_location',
        'delivery_type',
        'status',
    ];

    /**
     * Define the relationship to the User model.
     * Assuming each order is associated with a user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
