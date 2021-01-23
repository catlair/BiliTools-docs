import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import './utils/static'
import './assets/css/common.css';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');

console.log('测试时用cookie', 'DedeUserID=1; bili_jct=qwertyuiopasdfghjkl;SESSDATA=abcdefghijk')
