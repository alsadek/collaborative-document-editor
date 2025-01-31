<template>
    <div class="register-container">
        <form @submit.prevent="submitRegistration">
            <input 
                v-model="name" 
                type="text" 
                placeholder="Name" 
                required
            />
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
            <input 
                v-model="password_confirmation" 
                type="password" 
                placeholder="Confirm Password" 
                required
            />
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    },
    methods: {
        async submitRegistration() {
            try {
                await this.$store.dispatch('auth/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                })
                this.$router.push('/dashboard')
            } catch (error) {
                console.error('Registration failed', error)
            }
        }
    }
}
</script>
