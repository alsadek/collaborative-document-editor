<template>
    <div class="login-container">
        <form @submit.prevent="submitLogin">
            <input 
                v-model="email" 
                type="email" 
                placeholder="Email" 
                required
            />
            <input 
                v-model="password" 
                type="password" 
                placeholder="Password" 
                required
            />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async submitLogin() {
            try {
                await this.$store.dispatch('auth/login', {
                    email: this.email,
                    password: this.password
                })
                this.$router.push('/dashboard')
            } catch (error) {
                console.error('Login failed', error)
                // Handle login error (show message, etc.)
            }
        }
    }
}
</script>
