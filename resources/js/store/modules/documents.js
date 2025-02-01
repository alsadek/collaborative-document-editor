import axios from 'axios'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export default {
    namespaced: true,
    state: {
        documents: [],
        currentDocument: null,
        versionHistory: [],
        collaborators: []
    },
    mutations: {
        setDocuments(state, documents) {
            state.documents = documents
        },
        setCurrentDocument(state, document) {
            state.currentDocument = document
        },
        setVersionHistory(state, history) {
            state.versionHistory = history
        },
        setCollaborators(state, collaborators) {
            state.collaborators = collaborators
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
        async updateDocument({ commit }, payload) {
            try {
                const response = await axios.put(`/documents/${payload.id}`, {
                    title: payload.title,
                    content: payload.content
                });
                commit('setCurrentDocument', response.data);
                return response.data;
            } catch (error) {
                throw error.response.data;
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
        },
        async fetchVersionHistory({ commit }, documentId) {
            try {
                const response = await axios.get(`/documents/${documentId}/history`)
                commit('setVersionHistory', response.data)
                return response.data
            } catch (error) {
                throw error.response.data
            }
        },
        // listenForDocumentUpdates({ commit, state }, documentId) {
        //     window.Pusher = Pusher;
        //     window.Echo = new Echo({
        //         broadcaster: 'pusher',
        //         key: '1935026',
        //         cluster: 'eu',
        //         encrypted: true
        //     });
        
        //     window.Echo.private(`document.${documentId}`)
        //         .listen('DocumentUpdated', (e) => {
        //             commit('setCurrentDocument', e.document);
        //         })
        //         .here((users) => {
        //             commit('setCollaborators', users);
        //         })
        //         .joining((user) => {
        //             commit('setCollaborators', [...state.collaborators, user]);
        //         })
        //         .leaving((user) => {
        //             commit('setCollaborators', state.collaborators.filter(u => u.id !== user.id));
        //         });
        // }
        
    }
}
