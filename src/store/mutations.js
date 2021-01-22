import Vue from 'vue'

export default {
    update({account}, payload) {
        const key = payload.key || payload.k;
        const value = payload.value || payload.v;
        const index = payload.index || payload.i;
        account[index][key] = value;
    },
    switch({account}, payload) {
        const key = payload.key || payload.k;
        const value = payload.value || payload.v;
        const index = payload.index || payload.i;
        account[index].switch[key] = value;
    },
    addUser({account, template}, {user, index}) {
        if (user) template = user;
        Vue.set(account, index, JSON.parse(JSON.stringify(template)))
    }
}
