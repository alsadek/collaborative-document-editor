<?php

namespace App\Http\Controllers;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\DocumentUpdated;

class DocumentController extends Controller
{
    public function create(Request $request)
    {
        $document = Document::create([
            'owner_id' => Auth::id(),
            'title' => $request->title,
            'content' => $request->content
        ]);
        return response()->json($document);
    }

    public function update(Request $request, $id)
    {
        $document = Document::findOrFail($id);
        $document->update($request->all());
        broadcast(new DocumentUpdated($document))->toOthers();
        return response()->json($document);
    }

    public function index()
    {
        $documents = Document::all();
        return response()->json($documents);
    }

    public function show($id)
    {
        $document = Document::findOrFail($id);
        return response()->json($document);
    }
}
