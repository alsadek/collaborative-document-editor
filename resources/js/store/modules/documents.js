import axios from 'axios'

export default {
    namespaced: true,
    state: {
        documents: [],
        currentDocument: null
    },
    mutations: {
        setDocuments(state, documents) {
            state.documents = documents
        },
        setCurrentDocument(state, document) {
            state.currentDocument = document
        }
    },
    actions: {
        async fetchUserDocuments({ commit }) {
            try {
                const response = await axios.get('/documents')
                commit('setDocuments', response.data)
                return response
            } catch (error) {
                throw error.response.data
            }
        },
        async createDocument({ commit }, documentData) {
            try {
                const response = await axios.post('/documents', documentData)
                return response.data
            } catch (error) {
                throw error.response.data
            }
        },
        async fetchDocument({ commit }, documentId) {
            try {
                const response = await axios.get(`/documents/${documentId}`)
                commit('setCurrentDocument', response.data)
                return response.data
            } catch (error) {
                throw error.response.data
            }
        }
    }
}
