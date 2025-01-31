<template>
    <div class="dashboard">
        <h1>Welcome, {{ user.name }}</h1>
        <div class="documents-section">
            <h2>Your Documents</h2>
            <button @click="createDocument">Create New Document</button>
            <div v-if="documents.length" class="document-list">
                <div 
                    v-for="doc in documents" 
                    :key="doc.id" 
                    class="document-item"
                >
                    {{ doc.title }}
                    <button @click="openDocument(doc.id)">Open</button>
                </div>
            </div>
            <p v-else>No documents yet</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            documents: []
        }
    },
    computed: {
        user() {
            return this.$store.getters['auth/currentUser']
        }
    },
    methods: {
        createDocument() {
            this.$router.push('/documents/create')
        },
        openDocument(id) {
            this.$router.push(`/documents/${id}`)
        },
        async fetchDocuments() {
            try {
                const response = await this.$store.dispatch('documents/fetchUserDocuments')
                this.documents = response.data
            } catch (error) {
                console.error('Failed to fetch documents', error)
            }
        }
    },
    created() {
        this.fetchDocuments()
    }
}
</script>
