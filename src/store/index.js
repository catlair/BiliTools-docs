import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';

import state from './state';
import mutations from './mutations';
import actions from './actions';

const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

const storage = {
  getItem: (key) => ls.get(key),
  setItem: (key, value) => ls.set(key, value),
  removeItem: (key) => ls.remove(key),
};

const lsConfig = {
  key: 'bili_tools_config',
};

process.env.NODE_ENV === 'production' && (lsConfig.storage = storage);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [createPersistedState(lsConfig)],
  strict: process.env.NODE_ENV !== 'production',
});
