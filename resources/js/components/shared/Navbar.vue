<template>
    <nav class="navbar navbar-expand-lg navbar-light custom-nav">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">DocEdit</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <!-- <li class="nav-item" v-if="isAuthenticated">
                        <router-link class="nav-link" to="/documents">Documents</router-link>
                    </li> -->
                    <li class="nav-item" v-if="isAuthenticated">
                        <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
                    </li>
                    <li class="nav-item" v-else>
                        <router-link class="nav-link" v-if="isOnLoginPage" to="/register">Register</router-link>
                        <router-link class="nav-link" v-if="isOnRegisterPage" to="/login">Login</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters('auth', ['isAuthenticated']),
        isOnLoginPage() {
            return this.$route.name === 'Login'
        },
        isOnRegisterPage() {
            return this.$route.name === 'Register'
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch('auth/logout')
            this.$router.push('/login')
        }
    }
}
</script>
