import Vue from 'vue'
import {
    ToastPlugin,
    ModalPlugin
} from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import VueCardFormat from 'vue-credit-card-validation'


import router from './router'
import store from './store/index'
import App from './App.vue'

import * as VueGoogleMaps from "vue2-google-maps"
import {
    VueMaskDirective
} from 'v-mask'
// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import axiosIns from "@/libs/axios";
// import moment from "moment";
import Echo from 'laravel-echo'
window.io = require('socket.io-client')



// import VueEcho from 'vue-echo-laravel';
// window.io = require('socket.io-client')

// Vue.use(VueEcho, {
//     broadcaster: 'socket.io',
//     host: window.location.hostname + ':6001',
// });

// import Echo from 'laravel-echo';

window.io = require('socket.io-client');

// export var echo_instance = new Echo({
//     broadcaster: 'socket.io',
//     host: process.env.VUE_APP_BACKEND_APP + ':6001',
//     auth: {
//         headers: {
//             /** I'm using access tokens to access  **/
//             Authorization: 'Bearer ' + localStorage.getItem('us_ri_td'),
//         },
//     },
// });

// Vue.prototype.$echo = echo_instance;

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(VueCardFormat);

// Composition API
Vue.use(VueCompositionAPI)
// Vue.use(moment)

window.googleApiKey = 'AIzaSyCtXXpxwkWBjdNCWVd85xnJ1PcXmQIn8tM';

// integración mapa
Vue.use(VueGoogleMaps, {
    load: {
        key: window.googleApiKey,
        libraries: "places",
        v: 3.38,
        openNow: true
    }
});
Vue.directive('mask', VueMaskDirective);
// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

axiosIns.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${store.getters['Users/userToken']}`
    return config;
})


// Redirect if not login
router.beforeEach((to, from, next) => {

    /*Comprobar si esta logueado*/
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters["Users/loggedIn"]) {
            next({
                name: 'login',
            })
            return false
        } else {
            next()
        }
    } else {
        next()
    }

    let allowNavigation = false
    //Get list permissions
    let data = store.getters["Users/userData"].user != undefined ? store.getters["Users/userData"].user.role.permission : [];
    let listPermissions = [];
    for (let i = 0; i < data.length; i++) {
        listPermissions.push(data[i].slug);
    }
    if(store.getters["Users/userData"].user){
    if (store.getters["Users/userData"].user.role.id > 3 || store.getters["Users/userData"].user.role.id == 2) {

        for (let i = 0; i < listPermissions.length; i++) {
            if (to.matched.some(record => {
                    if (record.meta.permission) {
                        return record.meta.permission === listPermissions[i]
                    }

                })) {
                next()
                allowNavigation = true
            }
        }

        if (allowNavigation == false) {
            next({
                name: 'Login'
            })
        }
    }




    //Entrar corporate account
    if (store.getters["Users/userData"].user.role.id === 3) {
        if (to.matched.some(record => {
                if (record.meta.rol) {
                    return record.meta.rol.some(x => x === 3)
                } else {
                    return false
                }
            })) {
            next()
        } else {
            next({
                name: 'Login'
            })
        }
    }
    /*Entrar si es admin*/
    // if (store.getters["Users/userData"].user.role.id === 2) {
    //     if (to.matched.some(record => {
    //             if (record.meta.rol) {
    //                 return record.meta.rol.some(x => x === 2)
    //             } else {
    //                 return false
    //             }
    //         })) {
    //         next()
    //     } else {
    //         next({
    //             name: 'Login'
    //         })
    //     }
    // }

    /*Entrar si es super-admin*/
    // if (to.matched.some(record => record.meta.rol === "1")) {
    //     if (store.getters["Users/userData"].user.role.id === 1) {
    //         next()
    //     } else {
    //         next({
    //             name: 'login',
    //         })
    //     }
    // } else {
    //     next()
    // }




    if (store.getters["Users/userData"].user.role.id === 1) {
        if (to.matched.some(record => {
                if (record.meta.rol) {
                    return record.meta.rol.some(x => x === 1)
                } else {
                    return false
                }
            })) {
            next()
        } else {
            next({
                name: 'Login'
            })
        }
    }

}

});

Vue.prototype.$hasPermission = function (permission) {
    let listPermissions = this.$store.getters['Users/userData'].user.role.permission
    let role = this.$store.getters['Users/userData'].user.role
    let roleSuperAdmin = "Super Admin"

    if (role.role === roleSuperAdmin) {
        return true
    }
    if (listPermissions.length == 0)
        return false
    let res = listPermissions.find(element => JSON.parse(element.slug.toLowerCase().includes(permission)));
    if (res == undefined) {
        return false
    } else {
        return true
    }
}

Vue.prototype.$getListPermissions = function () {
    let data = this.$store.getters["Users/userData"].user.role.permission;
    let listPermissions = [];
    for (let i = 0; i < data.length; i++) {
        listPermissions.push(data[i].slug);
    }

    return listPermissions
}

new Vue({
    store,
    router,
    created() {
        axiosIns.interceptors.response.use(
            response => response,
            error => {
                if (error.response.status === 401) {
                    this.$store.dispatch('Users/deleteSessionInfo')

                    this.$swal({
                        icon: 'error',
                        title: "Session expired",
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                        buttonsStyling: false,
                    })

                    this.$router.push({
                        name: 'login'
                    })
                }
                return Promise.reject(error)
            }
        )
    },
    render: h => h(App),
}).$mount('#app')