import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

// Importing components
import DocumentList from '../components/documents/DocumentList.vue'
import DocumentEditor from '../components/documents/DocumentEditor.vue'
import DocumentView from '../components/documents/DocumentView.vue'
import DocumentCreate from '../components/documents/DocumentCreate.vue'
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
