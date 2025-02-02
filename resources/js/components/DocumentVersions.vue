<template>
    <div class="collaborators">
        <h5 class="mt-2">Document Versions <h6>(Hover me)</h6></h5>
        <ul class="list-group">
            <li 
                v-for="version in versions" 
                :key="version.id" 
                class="list-group-item"
                @mouseover="showContent(version.id, version.content)"
                @mouseleave="hideContent(version.id)"
            >
                <strong>Version {{ version.version_id }}</strong> - {{ formatDate(version.created_at) }} by {{ version.user.name }}
                <div v-if="hoveredContent[version.id]" class="version-content" v-html="hoveredContent[version.id]"></div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        versions: {
            type: Array,
            required: true
        },
        formatDate: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            hoveredContent: {}
        }
    },
    methods: {
        showContent(versionId, content) {
            this.hoveredContent[versionId] = content;
        },
        hideContent(versionId) {
            this.hoveredContent[versionId] = null;
        }
    }
}
</script>
