<?php

namespace App\Events;
use App\Models\Document;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class DocumentUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $document;

    public function __construct($user, $document)
    {
        // \Log::info('__construct', ['user' => 'asdasdadsdsa']);
        $this->user = $user;
        $this->document = $document;
    }

    public function broadcastOn()
    {

        return new PresenceChannel('document.' . $this->document->id);
    }

    public function broadcastWith()
    {
        $payload = [
            'user' => $this->user,
            'documentId' => $this->document->id,
        ];
        return $payload;
    }
}
