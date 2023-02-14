import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
// import axios from "axios";
// import axiosIns from "@/libs/axios";

const ls = new SecureLS({ encodingType: 'rc4', isCompression: false, encryptionSecret: 's3cr3tPa$$w0rd@123' });

export const Users = {
    namespaced: true,
    state: {
        token: null,
        user: {},
        userAllData: {},
    },
    getters: {
        loggedIn(state) {
            return state.token !== null
        },
        userData(state) {
            return state.user
        },
        usersData(state) {
            return state.userAllData
        },
        userToken(state) {
            return state.token
        },
    },
    mutations: {
        retrieveToken(state, token) {
            state.token = token
        },
        userData(state, data) {
            state.user = data
        },
        usersData(state, data) {
            state.userAllData = data
        },
        destroyToken(state) {
            state.token = null
        },
        destroyUser(state) {
            state.user = {}
            state.userAllData = {}
        }
    },
    actions: {
        retrieveToken(context, payload) {
            // let url = '';
            // url = payload.loginType === 'admin' ? 'auth/admin/login' : 'auth/ca/login';

            return new Promise((resolve, reject) => {
                this._vm.$http.post('auth/users/login', {
                        email: payload.userEmail,
                        password: payload.password
                    })
                    .then(response => {
                        // console.log(response)
                        // console.log(resolve)
                        const token = response.data.data.access_token;
                        // console.log(response.data.data)
                        context.commit('retrieveToken', token);
                        context.commit('userData', response.data.data);

                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        destroyToken(context, payload) {


            return new Promise((resolve, reject) => {
                this._vm.$http.post(payload, '')
                    .then(response => {
                        context.commit('destroyToken');
                        context.commit('destroyUser');

                        localStorage.removeItem('us_ri_td');

                        delete this._vm.$http.defaults.headers.common['Authorization'];
                        // console.log('ks')
                        resolve(response)
                    })
                    .catch((err) => {
                        reject(err)
                    })

            })

        },
        deleteSessionInfo({ commit }) {
            commit('destroyToken');
            commit('destroyUser');

            localStorage.removeItem('us_ri_td');

            delete this._vm.$http.defaults.headers.common['Authorization'];
        }

    }
}
export const userState = createPersistedState({
    key: 'us_ri_td',
    storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
    },
    paths: ['Users']
})