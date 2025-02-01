<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h2>{{ document.title }}</h2>
                <p>{{ document.content }}</p>
                <div class="text-center mt-3">
                    <button class="btn btn-primary" @click="editDocument">Edit Document</button>
                </div>
                <div class="text-center mt-3">
                    <h5>Collaborators</h5>
                    <ul class="list-group">
                        <li v-for="collaborator in collaborators" :key="collaborator.id" class="list-group-item">
                            {{ collaborator.name }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            document: {},
            // collaborators: []
        }
    },
    created() {
        this.fetchDocument(this.$route.params.id);
        this.listenForUpdates(this.$route.params.id);
        this.joinDocument(this.$route.params.id);
    },
    beforeDestroy() {
        this.leaveDocument(this.$route.params.id);
    },
    
    methods: {
        async fetchDocument(documentId) {
            try {
                const document = await this.$store.dispatch('documents/fetchDocument', documentId);
                this.document = document;
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        },
        listenForUpdates(documentId) {
            this.$store.dispatch('documents/listenForDocumentUpdates', documentId);
        },
        editDocument() {
            this.$router.push({ name: 'DocumentEditor', params: { id: this.document.id } });
        },
        async joinDocument(documentId) {
            try {                
                await axios.post(`/documents/${documentId}/join`);
            } catch (error) {
                console.error('Error joining document:', error);
            }
        },
        async leaveDocument(documentId) {
            try {
                await axios.post(`/documents/${documentId}/leave`);
            } catch (error) {
                console.error('Error leaving document:', error);
            }
        }
    },
    computed: {
        collaborators() {
            return this.$store.state.documents.collaborators;
        }
    }
}
</script>
