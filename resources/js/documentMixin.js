import axios from 'axios';

export const documentMixin = {
    data() {
        return {
            document: {},
            versions: [],
            documentId: this.$route.params.id
        };
    },
    created() {
        this.fetchDocument(this.documentId);
        this.listenForUpdates(this.documentId);
        this.joinDocument(this.documentId);
    },
    
    beforeUnmount() {        
        this.leaveDocument(this.documentId);
    },
    methods: {
        async fetchDocument(documentId) {
            try {
                const response = await this.$store.dispatch('documents/fetchDocument', documentId);                
                this.title = response.document.title;
                this.content = response.document.content;
                this.versions = response.documents_versions; 
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        },
        listenForUpdates(documentId) {
            this.$store.dispatch('documents/listenForDocumentUpdates', documentId);
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
                console.log('ss123', documentId);
                
                await axios.post(`/documents/${documentId}/leave`);
            } catch (error) {
                console.error('Error leaving document:', error);
            }
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        }
    }
};
