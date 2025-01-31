
<template>
    <nav>
        <div v-if="isAuthenticated" class="nav-links">
            <router-link to="/dashboard">Dashboard</router-link>
            <a href="#" @click.prevent="logout">Logout</a>
        </div>
        <div v-else class="nav-links">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        isAuthenticated() {
            return this.$store.getters['auth/isAuthenticated']
        }
    },
    methods: {
        async logout() {
            console.log('sss');
            await this.$store.dispatch('auth/logout')
            this.$router.push('/login')
        }
    }
}
</script>
