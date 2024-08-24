<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewOrderNotification extends Notification
{
    use Queueable;

    protected $order;

    /**
     * Create a new notification instance when a new order is created.
     */
    public function __construct($order)
    {
        $this->order = $order;
    }
    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database']; 
    }

        // /**
        //  * Get the mail representation of the notification.
        //  */
        // public function toMail(object $notifiable): MailMessage
        // {
        //     return (new MailMessage)
        //                 ->line('The introduction to the notification.')
        //                 ->action('Notification Action', url('/'))
        //                 ->line('Thank you for using our application!');
        // }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'order_id' => $this->order->id,
            'user_id' => $this->order->user_id,
            'user_name' => $this->order->user->name,
            'message' => 'A new order has been created by ' . $this->order->user->name . '. at ' . $this->order->created_at, 
        ];
    }
}
