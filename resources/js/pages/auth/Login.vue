<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header text-center">
                        <h4>Login</h4>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="submitLogin">
                            <div class="form-group mb-3">
                                <label for="email">Email</label>
                                <input 
                                    v-model="email" 
                                    type="email" 
                                    class="form-control" 
                                    id="email" 
                                    autocomplete="email"
                                    placeholder="Enter your email" 
                                    required
                                />
                            </div>
                            <div class="form-group mb-3">
                                <label for="password">Password</label>
                                <input 
                                    v-model="password" 
                                    type="password" 
                                    class="form-control"
                                    autocomplete="current-password"
                                    id="password" 
                                    placeholder="Enter your password" 
                                    required
                                />
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">Login</button>
                        </form>
                        <div class="text-center mt-3">
                            <a href="/register" class="btn btn-link">Don't have an account? Register</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                this.$router.push('/')
            } catch (error) {
                console.error('Login failed', error)
                // Handle login error (show message, etc.)
            }
        }
    }
}
</script>
