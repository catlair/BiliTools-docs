import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import './assets/css/common.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

console.log('测试时用', 'DedeUserID=000000;DedeUserID__ckMd5=8aa3b2eff1fa70ed; bili_jct=456784423412fa9be07d05c;SESSDATA=dsfsdfsdfsdfsdf')
