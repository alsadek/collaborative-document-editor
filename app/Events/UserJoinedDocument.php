<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Support\Facades\Log;

class UserJoinedDocument implements ShouldBroadcast
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

    public function broadcastWith()
    {
        $payload = [
            'user' => $this->user,
            'documentId' => $this->documentId,
        ];
        return $payload;
    }
}
