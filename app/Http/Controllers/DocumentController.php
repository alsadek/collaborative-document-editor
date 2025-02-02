<?php

namespace App\Http\Controllers;
use App\Models\Document;
use App\Models\DocumentVersion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\DocumentUpdated;
use App\Events\UserJoinedDocument;
use App\Events\UserLeftDocument;

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
        // dd($request->all());
        $document = Document::findOrFail($id);
        $document->update($request->all());

        DocumentVersion::create([
            'document_id' => $document->id,
            'content' => $document->content,
            'user_id' => auth()->user()->id,
        ]);

        // \Log::info('1232', ['user' => $document]);

        // broadcast(new UserLeftDocument(Auth::user(), 1))->toOthers();
        
        broadcast(new DocumentUpdated(Auth::user(), $document))->toOthers();
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
        $documents_versions = DocumentVersion::with('user')->get();
        // dd($documents_versions);
        return response()->json(
            ['document' => $document, 
            'documents_versions' =>$documents_versions]
        );
        // return response()->json($document);
    }

    public function joinDocument($documentId)
    {
        broadcast(new UserJoinedDocument(Auth::user(), $documentId))->toOthers();
        return response()->json(['status' => 'joined']);
    }

    public function leaveDocument($documentId)
    {
        broadcast(new UserLeftDocument(Auth::user(), $documentId))->toOthers();
        return response()->json(['status' => 'left']);
    }
}
