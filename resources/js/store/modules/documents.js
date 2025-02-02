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
        
        listenForDocumentUpdates({ commit, state }, documentId) {
            window.Pusher = Pusher;
            window.Echo = new Echo({
                broadcaster: 'pusher',
                key: '0598b7d5aafd222248b2',
                cluster: 'eu',
                encrypted: true,
                auth: {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token
                    },
                },
            });
            window.Echo.join(`document.${documentId}`)
            .listen('DocumentUpdated', (e) => {
                console.log('DocumentUpdated event received:', e);
                commit('setCurrentDocument', e.document);
            })
            .listen('UserJoinedDocument', (e) => {
                console.log('UserJoinedDocument event received:', e);
                commit('setCollaborators', [...state.collaborators, e.user]);
            })
            .listen('UserLeftDocument', (e) => {
                console.log('UserLeftDocument event received:', e);
                commit('setCollaborators', state.collaborators.filter(u => u.id !== e.user.id));
            })
            .here((users) => {
                console.log('Presence: users here:', users);
                commit('setCollaborators', users);
            })
            .leaving((user) => {
                console.log('Presence: user left:', user);
                commit('setCollaborators', state.collaborators.filter(u => u.id !== user.id));
            });

        }
        
    }
}
