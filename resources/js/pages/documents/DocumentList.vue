<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h2>Documents</h2>
                <ul class="list-group">
                    <li v-for="document in documents" :key="document.id" class="list-group-item">
                        <router-link :to="{ name: 'DocumentView', params: { id: document.id } }">
                            {{ document.title }}
                        </router-link>
                    </li>
                </ul>
                <button class="btn btn-primary mt-3" @click="createNewDocument">Create New Document</button>
            </div>
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
    created() {
        this.fetchDocuments();
    },
    methods: {
        async fetchDocuments() {
            try {
                const response = await this.$store.dispatch('documents/fetchUserDocuments');
                this.documents = response.data;
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        },
        createNewDocument() {
            this.$router.push({ name: 'DocumentCreate' });
        }
    }
}
</script>
