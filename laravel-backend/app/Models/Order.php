<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Notifications\NewOrderNotification;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'user_id',
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

    protected static function booted()
    {
        static::created(function ($order) {

            // Notify the user when a new order is created
            $admins = User::where('isAdmin', true)->get();

            foreach ($admins as $admin) {
                $admin->notify(new NewOrderNotification($order));
            }
        });
    }

}
