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
            console.log('Subscribing to private channel: document.' + documentId);
            window.Echo.join(`document.${documentId}`)
                .listen('DocumentUpdated', (e) => {
                    console.log('DocumentUpdated event received:', e);
                    commit('setCurrentDocument', e.document);
                })
                .here((users) => {
                    console.log('Presence: users here:', users);
                    commit('setCollaborators', users);
                })
                .joining((user) => {
                    console.log('Presence: user joined:', user);
                    commit('setCollaborators', [...state.collaborators, user]);
                })
                .leaving((user) => {
                    console.log('Presence: user left:', user);
                    commit('setCollaborators', state.collaborators.filter(u => u.id !== user.id));
                });

        window.Echo.join(`document.${documentId}`)
            .notification((notification) => {
                console.log('Notification received:', notification);
            })
            .listen('pusher:subscription_succeeded', (members) => {
                console.log('Subscription succeeded:', members);
            })
            .listen('pusher:member_added', (member) => {
                console.log('Member added:', member);
            })
            .listen('pusher:member_removed', (member) => {
                console.log('Member removed:', member);
            });
        }
        
    }
}
