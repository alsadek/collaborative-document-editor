<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header text-center">
                        <h4>Login</h4>
                    </div>
                    <div class="card-body">
                        <!-- Display Error Message -->
                        <div v-if="errorMessage" class="alert alert-danger text-center">
                            {{ errorMessage }}
                        </div>

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

                            <button 
                                type="submit" 
                                class="btn btn-primary btn-block"
                                :disabled="isLoading"
                            >
                                {{ isLoading ? 'Logging in...' : 'Login' }}
                            </button>
                        </form>

                        <div class="text-center mt-3">
                            <router-link to="/register" class="btn btn-link">
                                Don't have an account? Register
                            </router-link>
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
            password: '',
            errorMessage: '',  // Store error messages
            isLoading: false   // Loading state
        }
    },
    methods: {
        async submitLogin() {
            this.errorMessage = '' // Reset error message
            this.isLoading = true  // Start loading

            try {
                await this.$store.dispatch('auth/login', {
                    email: this.email,
                    password: this.password
                })
                this.$router.push('/')
            } catch (error) {
                console.error('Login failed', error)
                
                // Set a user-friendly error message
                this.errorMessage = error.message || 'Invalid email or password. Please try again.'
            } finally {
                this.isLoading = false  // Stop loading
            }
        }
    }
}
</script>
