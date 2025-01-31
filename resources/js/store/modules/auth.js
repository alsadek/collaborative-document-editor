import axios from 'axios'

export default {
    namespaced: true,
    state: {
        user: null,
        token: localStorage.getItem('token') || null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setToken(state, token) {
            state.token = token
            localStorage.setItem('token', token)
        },
        clearAuth(state) {
            state.user = null
            state.token = null
            localStorage.removeItem('token')
        }
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const response = await axios.post('auth/login', credentials)
                commit('setUser', response.data.user)
                commit('setToken', response.data.token)
                return response.data
            } catch (error) {
                throw error.response.data
            }
        },
        async register({ commit }, userData) {
            try {
                const response = await axios.post('auth/register', userData)
                commit('setUser', response.data.user)
                commit('setToken', response.data.token)
                return response.data
            } catch (error) {
                throw error.response.data
            }
        },
        async logout({ commit }) {
            try {
                await axios.post('auth/logout')
                commit('clearAuth')
            } catch (error) {
                console.error('Logout failed', error)
            }
        },
        async fetchUser({ commit }) {
            try {
                const response = await axios.get('/auth/me')
                commit('setUser', response.data)
            } catch (error) {
                commit('clearAuth')
            }
        }
    },
    getters: {
        isAuthenticated: state => !!state.token,
        currentUser: state => state.user
    }
}
