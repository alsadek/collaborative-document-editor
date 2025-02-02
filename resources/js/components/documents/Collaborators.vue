<template>
    <div class="collaborators">
        <h5>Collaborators</h5>
        <ul class="list-group">
            <li v-for="collaborator in collaborators" :key="collaborator.id" class="list-group-item">
                {{ collaborator.name }}
            </li>
        </ul>

        <h5 class="mt-4">Document Versions</h5>
        <ul class="list-group">
            <li v-for="version in versions" :key="version.id" class="list-group-item">
                <strong>Version {{ version.id }}</strong> - {{ formatDate(version.created_at) }} by {{ version.user.name }}
                <!-- <pre>{{ version.content }}</pre> -->
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        collaborators: {
            type: Array,
            required: true
        },
        versions: {
            type: Array,
            required: true
        },
        formatDate: {
            type: Function,
            required: true
        }
    }
}
</script>
