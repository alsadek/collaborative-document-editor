import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/auth/Login.vue'),
        meta: { guest: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../components/auth/Register.vue'),
        meta: { guest: true }
    },
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../pages/Dashboard.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../pages/Dashboard.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/documents/create',
        name: 'DocumentCreate',
        component: () => import('../pages/DocumentCreate.vue'),
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['auth/isAuthenticated']
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next('/login')
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (isAuthenticated) {
            next('/dashboard')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
