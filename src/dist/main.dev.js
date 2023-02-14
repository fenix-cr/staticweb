"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _vue = _interopRequireDefault(require("vue"));

var _bootstrapVue = require("bootstrap-vue");

var _compositionApi = _interopRequireDefault(require("@vue/composition-api"));

var _vueCreditCardValidation = _interopRequireDefault(require("vue-credit-card-validation"));

var _router = _interopRequireDefault(require("./router"));

var _index = _interopRequireDefault(require("./store/index"));

var _App = _interopRequireDefault(require("./App.vue"));

var VueGoogleMaps = _interopRequireWildcard(require("vue2-google-maps"));

var _vMask = require("v-mask");

require("./global-components");

require("@/libs/portal-vue");

require("@/libs/toastification");

require("@/libs/sweet-alerts");

var _axios = _interopRequireDefault(require("@/libs/axios"));

var _laravelEcho = _interopRequireDefault(require("laravel-echo"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 3rd party plugins
// import moment from "moment";
window.io = require('socket.io-client'); // import VueEcho from 'vue-echo-laravel';
// window.io = require('socket.io-client')
// Vue.use(VueEcho, {
//     broadcaster: 'socket.io',
//     host: window.location.hostname + ':6001',
// });
// import Echo from 'laravel-echo';

window.io = require('socket.io-client'); // export var echo_instance = new Echo({
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

_vue["default"].use(_bootstrapVue.ToastPlugin);

_vue["default"].use(_bootstrapVue.ModalPlugin);

_vue["default"].use(_vueCreditCardValidation["default"]); // Composition API


_vue["default"].use(_compositionApi["default"]); // Vue.use(moment)


window.googleApiKey = 'AIzaSyCtXXpxwkWBjdNCWVd85xnJ1PcXmQIn8tM'; // integración mapa

_vue["default"].use(VueGoogleMaps, {
  load: {
    key: window.googleApiKey,
    libraries: "places",
    v: 3.38,
    openNow: true
  }
});

_vue["default"].directive('mask', _vMask.VueMaskDirective); // import core styles


require('@core/scss/core.scss'); // import assets styles


require('@/assets/scss/style.scss');

_vue["default"].config.productionTip = false;

_axios["default"].interceptors.request.use(function (config) {
  config.headers.Authorization = "Bearer ".concat(_index["default"].getters['Users/userToken']);
  return config;
}); // Redirect if not login


_router["default"].beforeEach(function (to, from, next) {
  /*Comprobar si esta logueado*/
  if (to.matched.some(function (record) {
    return record.meta.requiresAuth;
  })) {
    if (!_index["default"].getters["Users/loggedIn"]) {
      next({
        name: 'login'
      });
      return false;
    } else {
      next();
    }
  } else {
    next();
  }

  var allowNavigation = false; //Get list permissions

  var data = _index["default"].getters["Users/userData"].user != undefined ? _index["default"].getters["Users/userData"].user.role.permission : [];
  var listPermissions = [];

  for (var i = 0; i < data.length; i++) {
    listPermissions.push(data[i].slug);
  }

  if (_index["default"].getters["Users/userData"].user) {
    if (_index["default"].getters["Users/userData"].user.role.id > 3 || _index["default"].getters["Users/userData"].user.role.id == 2) {
      var _loop = function _loop(_i) {
        if (to.matched.some(function (record) {
          if (record.meta.permission) {
            return record.meta.permission === listPermissions[_i];
          }
        })) {
          next();
          allowNavigation = true;
        }
      };

      for (var _i = 0; _i < listPermissions.length; _i++) {
        _loop(_i);
      }

      if (allowNavigation == false) {
        next({
          name: 'Login'
        });
      }
    } //Entrar corporate account


    if (_index["default"].getters["Users/userData"].user.role.id === 3) {
      if (to.matched.some(function (record) {
        if (record.meta.rol) {
          return record.meta.rol.some(function (x) {
            return x === 3;
          });
        } else {
          return false;
        }
      })) {
        next();
      } else {
        next({
          name: 'Login'
        });
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


    if (_index["default"].getters["Users/userData"].user.role.id === 1) {
      if (to.matched.some(function (record) {
        if (record.meta.rol) {
          return record.meta.rol.some(function (x) {
            return x === 1;
          });
        } else {
          return false;
        }
      })) {
        next();
      } else {
        next({
          name: 'Login'
        });
      }
    }
  }
});

_vue["default"].prototype.$hasPermission = function (permission) {
  var listPermissions = this.$store.getters['Users/userData'].user.role.permission;
  var role = this.$store.getters['Users/userData'].user.role;
  var roleSuperAdmin = "Super Admin";

  if (role.role === roleSuperAdmin) {
    return true;
  }

  if (listPermissions.length == 0) return false;
  var res = listPermissions.find(function (element) {
    return JSON.parse(element.slug.toLowerCase().includes(permission));
  });

  if (res == undefined) {
    return false;
  } else {
    return true;
  }
};

_vue["default"].prototype.$getListPermissions = function () {
  var data = this.$store.getters["Users/userData"].user.role.permission;
  var listPermissions = [];

  for (var i = 0; i < data.length; i++) {
    listPermissions.push(data[i].slug);
  }

  return listPermissions;
};

new _vue["default"]({
  store: _index["default"],
  router: _router["default"],
  created: function created() {
    var _this = this;

    _axios["default"].interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (error.response.status === 401) {
        _this.$store.dispatch('Users/deleteSessionInfo');

        _this.$swal({
          icon: 'error',
          title: "Session expired",
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        });

        _this.$router.push({
          name: 'login'
        });
      }

      return Promise.reject(error);
    });
  },
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');