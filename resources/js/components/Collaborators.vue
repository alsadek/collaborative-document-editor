<template>
    <div class="collaborators">
        <h5>Collaborators</h5>
        <ul class="list-group">
            <li v-for="collaborator in collaborators" :key="collaborator.id" class="list-group-item">
                {{ collaborator.name }}
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
        }
    }
}
</script>
