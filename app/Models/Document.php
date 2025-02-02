<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \App\Models\DocumentVersion;

class Document extends Model
{

    use HasFactory;

    protected $fillable = ['title', 'content', 'owner_id'];

    public function versions()
    {
        return $this->hasMany(DocumentVersion::class);
    }
}
