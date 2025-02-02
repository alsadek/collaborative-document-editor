<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8">
                <div class="document-content">
                    <div class="d-flex align-items-center justify-content-between">
                        <h2>{{ document.title }}</h2>
                        <button class="btn btn-primary ml-3" @click="editDocument">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                    <div v-html="document.content"></div>
                </div>
            </div>
            <div class="col-md-4">
                <Collaborators :collaborators="collaborators" :versions="versions" :formatDate="formatDate"/>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Collaborators from './Collaborators.vue';

export default {
    components: {
        Collaborators
    },
    data() {
        return {
            document: {},
            versions: []
            // collaborators: []
        }
    },
    created() {
        this.fetchDocument(this.$route.params.id);
        this.listenForUpdates(this.$route.params.id);
        this.joinDocument(this.$route.params.id);
    },

    beforeRouteLeave(to, from, next) {
    if (this.$route.params.id) {
        this.leaveDocument(this.$route.params.id);
    }
    next();
},
    
    methods: {
        async fetchDocument(documentId) {
            try {
                const response = await this.$store.dispatch('documents/fetchDocument', documentId);
                this.document = response.document;
                this.versions = response.documents_versions
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
            console.log('leaveDocument', documentId);
            
            try {
                await axios.post(`/documents/${documentId}/leave`);
            } catch (error) {
                console.error('Error leaving document:', error);
            }
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        }
    },
    computed: {
        collaborators() {
            return this.$store.state.documents.collaborators;
        }
    }
}
</script>
