import Vue from 'vue'
import Router from 'vue-router'
import Home from '../page/home/index.vue'
Vue.use(Router)

export default new Router({

    routes: [{
            path: '/login',
            component: () => import('../page/login/index'),
            hidden: true
        },

        {
            path: '/404',
            component: () => import('../page/404/index'),
            hidden: true
        },

        {
            path: '/',
            component: Home,
            redirect: '/dashboard',
            children: [{
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('../view/dashboard/index.vue'),
                meta: {
                    title: '首页',
                    icon: 'dashboard'
                }
            }]
        }
    ]
})