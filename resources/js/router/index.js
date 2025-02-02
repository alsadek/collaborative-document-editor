import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

// Importing components
import DocumentList from '../pages/documents/DocumentList.vue'
import DocumentEditor from '../pages/documents/DocumentEditor.vue'
import DocumentView from '../pages/documents/DocumentView.vue'
import DocumentCreate from '../pages/documents/DocumentCreate.vue'
import Login from '../pages/auth/Login.vue'
import Register from '../pages/auth/Register.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => Login,
        meta: { guest: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => Register,
        meta: { guest: true }
    },
    {
        path: '/',
        name: 'DocumentList',
        component: DocumentList,
        meta: { requiresAuth: true }
    },
    {
        path: '/documents/new',
        name: 'DocumentCreate',
        component: DocumentCreate,
        meta: { requiresAuth: true }
    },
    {
        path: '/documents/:id',
        name: 'DocumentView',
        component: DocumentView,
        meta: { requiresAuth: true }
    },
    {
        path: '/documents/:id/edit',
        name: 'DocumentEditor',
        component: DocumentEditor,
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
            next('/')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
