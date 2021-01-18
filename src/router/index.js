import Vue from 'vue';
import VueRouter from 'vue-router';
import BaseMessagePush from "@/views/BaseMessagePush";
import ConfigForm from "@/views/ConfigForm";
import UserList from "@/views/UserList";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/common/message'
    },
    {
        path: '/common/message',
        name: 'MessagePush',
        component: BaseMessagePush,
    },
    {
        path: '/users/add',
        name: 'Add',
        component: ConfigForm,
    },
    {
        path: '/users',
        name: 'List',
        component: UserList,
    },
    // {
        // path: '/users/:id/edit',
        // name: 'Edit',
        // component: ConfigForm,
    // }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;