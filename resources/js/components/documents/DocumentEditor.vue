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
                        <div class="toolbar">
                            <button type="button" @click="formatText('bold')" title="Bold"><strong>B</strong></button>
                            <button type="button" @click="formatText('italic')" title="Italic"><em>I</em></button>
                            <button type="button" @click="formatText('underline')" title="Underline"><u>U</u></button>
                            <button type="button" @click="formatText('strikeThrough')" title="Strikethrough"><s>S</s></button>
                            <button type="button" @click="formatText('insertOrderedList')" title="Ordered List">OL</button>
                            <button type="button" @click="formatText('insertUnorderedList')" title="Unordered List">UL</button>
                            <button type="button" @click="formatText('justifyLeft')" title="Align Left">Left</button>
                            <button type="button" @click="formatText('justifyCenter')" title="Align Center">Center</button>
                            <button type="button" @click="formatText('justifyRight')" title="Align Right">Right</button>
                        </div>
                        <div
                            class="form-control"
                            id="content"
                            contenteditable="true"
                            @input="updateContent"
                            v-html="content"
                            style="min-height: 200px; overflow: auto;"
                        ></div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">
                        Update Document
                    </button>
                </form>
            </div>
            <div class="col-md-4">
                <!-- <Collaborators :collaborators="collaborators"/> -->
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
    props: {
        document: {
            type: Object,
            required: true,
            default: () => ({})
        }
    },
    
    created() {
        if (this.$route.params.id) {
            this.fetchDocument(this.$route.params.id);
            this.listenForUpdates(this.$route.params.id);
            this.joinDocument(this.$route.params.id);

        }
    },
    data() {
        return {
            title: '',
            content: ''
        }
    },
    
    mounted() {
        this.updateEditorContent();
    },
    beforeUnmount() {        
        this.leaveDocument(this.$route.params.id);
    },
    methods: {
        updateEditorContent() {
            if (this.$refs.editor) {
                this.$refs.editor.innerHTML = this.content;
            }
        },
        updateContent(event) {
            this.content = event.target.innerHTML; 

            this.$nextTick(() => {
                const el = event.target;
                const range = document.createRange();
                const selection = window.getSelection();

                range.selectNodeContents(el);
                range.collapse(false); // Move cursor to the end

                selection.removeAllRanges();
                selection.addRange(range);
            });
        },
        async fetchDocument(documentId) {
            try {
                const response = await this.$store.dispatch('documents/fetchDocument', documentId);
                this.title = response.document.title;
                this.content = response.document.content;
                this.versions = response.documents_versions
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        },
        listenForUpdates(documentId) {
            this.$store.dispatch('documents/listenForDocumentUpdates', documentId);
        },
        formatText(command) {
            document.execCommand(command, false, null);
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            return new Date(dateString).toLocaleDateString('en-US', options);
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
        async joinDocument(documentId) {
            try {                
                await axios.post(`/documents/${documentId}/join`);
            } catch (error) {
                console.error('Error joining document:', error);
            }
        },
        async leaveDocument(documentId) {
            console.log('leaveDocument111');
            
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
