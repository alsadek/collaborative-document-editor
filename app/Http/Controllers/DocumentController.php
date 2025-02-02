<?php

namespace App\Http\Controllers;

use App\Services\DocumentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\DocumentUpdated;
use App\Events\UserJoinedDocument;
use App\Events\UserLeftDocument;

class DocumentController extends Controller
{
    protected $documentService;

    public function __construct(DocumentService $documentService)
    {
        $this->documentService = $documentService;
    }

    public function index()
    {
        return response()->json($this->documentService->getAllDocuments());
    }

    public function show($id)
    {
        return response()->json($this->documentService->getDocumentWithVersions($id));
    }

    public function create(Request $request)
    {
        return response()->json($this->documentService->createDocument($request->all()), 201);
    }

    public function update(Request $request, $id)
    {
        $document = $this->documentService->updateDocument($id, $request->only(['title', 'content']));

        broadcast(new DocumentUpdated(Auth::user(), $document))->toOthers();
        return response()->json($document);
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
