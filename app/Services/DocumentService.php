<?php

namespace App\Services;

use App\Models\Document;
use App\Models\DocumentVersion;
use Illuminate\Support\Facades\Auth;

class DocumentService
{
    public function getAllDocuments()
    {
        return Document::all();
    }

    public function getDocumentWithVersions($id)
    {
        $document = Document::findOrFail($id);
        return [
            'document' => $document,
            'documents_versions' => $document->versions()->with('user')->get()
        ];
    }

    public function createDocument($data)
    {
        return Document::create([
            'owner_id' => Auth::id(),
            'title' => $data['title'],
            'content' => $data['content']
        ]);
    }

    public function updateDocument($id, $data)
    {
        $document = Document::findOrFail($id);
        $document->update($data);

        $this->createNewVersion($document);

        return $document;
    }

    public function createNewVersion(Document $document)
    {
        $newVersionId = $document->versions()->max('version_id') + 1 ?? 1;

        DocumentVersion::create([
            'document_id' => $document->id,
            'version_id' => $newVersionId,
            'content' => $document->content,
            'user_id' => Auth::id(),
        ]);
    }
}
