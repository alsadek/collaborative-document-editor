<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h2>Create New Document</h2>
                <form @submit.prevent="submitDocument">
                    <div class="form-group mb-3">
                        <label for="title">Title</label>
                        <input
                            v-model="title"
                            type="text"
                            class="form-control"
                            id="title"
                            placeholder="Enter document title"
                            required
                        />
                    </div>
                    <div class="form-group mb-3">
                        <label for="content">Content</label>
                        <textarea
                            v-model="content"
                            class="form-control"
                            id="content"
                            rows="10"
                            placeholder="Enter document content"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">
                        Create Document
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            content: ''
        }
    },
    methods: {
        async submitDocument() {
            try {
                await this.$store.dispatch('documents/createDocument', {
                    title: this.title,
                    content: this.content
                });
                this.$router.push({ name: 'DocumentList' });
            } catch (error) {
                console.error('Error creating document:', error);
            }
        }
    }
}
</script>
