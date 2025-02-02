<template>
    <div id="app">
        <Navbar />
        <router-view></router-view>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar.vue'

export default {
    name: 'App',
    components: {
        Navbar
    },
    computed: {
        ...mapGetters('auth', ['isAuthenticated'])
    },
    created() {
        // Attempt to fetch user on app initialization
        if (this.isAuthenticated) {
            this.$store.dispatch('auth/fetchUser')
        }
    }
}
</script>
