<?php

namespace App\Events;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class UserLeftDocument implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $documentId;

    public function __construct($user, $documentId)
    {
        $this->user = $user;
        $this->documentId = $documentId;
    }

    public function broadcastOn()
    {
        return new PresenceChannel('document.' . $this->documentId);
    }
}
