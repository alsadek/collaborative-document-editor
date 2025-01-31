import { createStore } from 'vuex'
import auth from './modules/auth'
import documents from './modules/documents'

export default createStore({
    modules: {
        auth,
        documents
    }
})
