import Vue from 'vue';
import { createTemplate } from '@/data/form';

export default {
  update({ temp }, payload) {
    const key = payload.key || payload.k,
      value = payload.value || payload.v;
    temp[payload.saveKey][key] = Object.copy(value);
  },
  switch({ temp }, payload) {
    const key = payload.key || payload.k,
      value = payload.value || payload.v;
    temp[payload.saveKey].switch[key] = Object.copy(value);
  },
  switchMessage({ temp }, payload) {
    const key = payload.key || payload.k;
    temp.message.switch[key] = payload.value || payload.v;
  },
  updateMessage({ temp }, payload) {
    Vue.set(temp.message, 'form', Object.copy(payload));
  },
  saveMessage(state) {
    Vue.set(state, 'message', Object.copy(state.temp.message));
  },
  addAccount({ account, temp }, { userId }) {
    Vue.set(account, userId, temp.createAccount);
    Vue.set(temp, 'createAccount', createTemplate());
  },
  deleteAccount({ account, temp }, { userId }) {
    Vue.delete(account, userId);
    Vue.delete(temp, userId);
  },
  updateAccount({ account, temp }, { userId }) {
    Vue.set(account, userId, temp[userId]);
    Vue.delete(temp, userId);
  },
  copyToTemp({ temp, account }, { userId }) {
    Vue.set(temp, userId, Object.copy(account[userId]));
  },
  cancelCreateAccount({ temp }) {
    Vue.set(temp, 'createAccount', createTemplate());
  },
  cancelUpdateAccount({ temp, account }, { userId }) {
    Vue.set(temp, userId, Object.copy(account[userId]));
  },
  restoreForm(state, payload) {
    Vue.set(state, 'account', payload.account);
    Vue.set(state, 'message', payload.message);
    Vue.set(state.temp, 'message', payload.message);
    this.commit('clearTempAccount');
  },
  clearTempAccount(state) {
    const { createAccount, message } = state.temp;
    Vue.set(state, 'temp', {
      createAccount,
      message,
    });
  },
  copyAccount({ temp, account }, { userId }) {
    const tempAccount = Object.copy(account[userId]);
    Vue.set(temp, 'createAccount', tempAccount);
    Vue.set(temp['createAccount']['baseConfig'], 'cookie', '');
  },
};
