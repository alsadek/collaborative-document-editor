<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header text-center">
                        <h4>Register</h4>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="submitRegistration">
                            <div class="form-group mb-3">
                                <label for="name">Name</label>
                                <input 
                                    v-model="name" 
                                    type="text" 
                                    class="form-control" 
                                    id="name" 
                                    placeholder="Enter your name" 
                                    required
                                />
                            </div>
                            <div class="form-group mb-3">
                                <label for="email">Email</label>
                                <input 
                                    v-model="email" 
                                    type="email" 
                                    class="form-control" 
                                    id="email" 
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
                                    id="password" 
                                    placeholder="Enter your password" 
                                    required
                                />
                            </div>
                            <div class="form-group mb-3">
                                <label for="password_confirmation">Confirm Password</label>
                                <input 
                                    v-model="password_confirmation" 
                                    type="password" 
                                    class="form-control" 
                                    id="password_confirmation" 
                                    placeholder="Confirm your password" 
                                    required
                                />
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">Register</button>
                        </form>
                        <div class="text-center mt-3">
                            <a href="/login" class="btn btn-link">Already have an account? Login</a>
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
                this.$router.push('/')
            } catch (error) {
                console.error('Registration failed', error)
            }
        }
    }
}
</script>
