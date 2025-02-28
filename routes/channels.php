<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });


Broadcast::routes(['middleware' => ['auth:sanctum']]); // If using Sanctum (for API)


Broadcast::channel('document.{documentId}', function ($user, $documentId) {
    return ['id' => $user->id, 'name' => $user->name]; // Must return user details
});

