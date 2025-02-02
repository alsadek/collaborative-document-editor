<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8">
                <div class="document-content">
                    <div class="d-flex align-items-center justify-content-between">
                        <h2>{{ title }}</h2>
                        <button class="btn btn-primary ml-3" @click="editDocument">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                    <div v-html="content"></div>
                </div>
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

export default {
    data() {
        return {
        title: "",
        content: "",
        versions: []
        };
    },
    components: {
        Collaborators,
        DocumentVersions
    },
    mixins: [documentMixin],
    methods: {
        editDocument() {
            this.$router.push({ name: 'DocumentEditor', params: { id: this.document.id } });
        }
    },
    computed: {
        collaborators() {
            return this.$store.state.documents.collaborators;
        },
    }
}
</script>
