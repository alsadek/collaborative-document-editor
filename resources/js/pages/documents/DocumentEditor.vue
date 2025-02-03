<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h2>Edit Document</h2>
                <form @submit.prevent="submitDocument">
                    <div class="form-group mb-3">
                        <label for="title">Title</label>
                        <input
                            v-model="title"
                            type="text"
                            class="form-control"
                            id="title"
                            required
                        />
                    </div>
                    <div class="form-group mb-3">
                        <label for="content">Content</label>
                        <Toolbar @format="formatText"/>
                        <div class="form-control" id="content" contenteditable="true" ref="editor" @input="updateContent" style="min-height: 200px; overflow: auto;"></div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">
                        Update Document
                    </button>
                </form>
            </div>
            <div class="col-md-4">
                <Collaborators :collaborators="collaborators"/>
                <DocumentVersions :versions="versions" :formatDate="formatDate"/>
            </div>
        </div>
    </div>
</template>

<script>
import { documentMixin } from '@/documentMixin';
import Collaborators from '@/components/Collaborators.vue';
import DocumentVersions from '@/components/DocumentVersions.vue';
import Toolbar from '@/components/Toolbar.vue';

export default {
    components: {
        Collaborators,
        DocumentVersions,
        Toolbar
    },
    mixins: [documentMixin],
    data() {
        return {
            title: '',
            content: ''
        }
    },
    watch: {
        content: {
            handler(newContent) {
                if (this.$refs.editor.innerHTML !== newContent) {
                    this.$refs.editor.innerHTML = newContent;
                }
            },
            deep: true
        }
    },
    methods: {
    updateContent() {
        this.content = this.$refs.editor.innerHTML;
    },
    async submitDocument() {
        try {
                await this.$store.dispatch('documents/updateDocument', {
                    id: this.$route.params.id,
                    title: this.title,
                    content: this.content
                });
                this.leaveDocument(this.$route.params.id);

                this.$router.push({ name: 'DocumentList' });
            } catch (error) {
                console.error('Error submitting document:', error);
            }
    },
    formatText(command) {
        document.execCommand(command, false, null);
        this.updateContent();
    }
},
    computed: {
        collaborators() {
            return this.$store.state.documents.collaborators;
        }
    }
}
</script>
