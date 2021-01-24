import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
// import SecureLS from "secure-ls";

import state from './state'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
    plugins: [createPersistedState({
        key: 'bili_tools_config'
    })],
    strict: process.env.NODE_ENV !== 'production'
})
