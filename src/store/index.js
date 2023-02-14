import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

import { Users, userState } from './Users';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    Users,
  },
  plugins: [
    userState,
  ],
  strict: process.env.DEV,
})
