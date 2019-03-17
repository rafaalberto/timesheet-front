import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

import Home from '@/components/home/Home'
import UserIndex from '@/components/admin/UserIndex'
import UserForm from '@/components/admin/UserForm'
import Auth from '@/components/auth/Auth'

import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
},
{
    name: 'userIndex',
    path: '/user',
    component: UserIndex
}
,{
    name: 'userForm',
    path: '/user/:id',
    component: UserForm
},
{
    name: 'auth',
    path: '/auth',
    component: Auth
}]

const router = new VueRouter({
    mode: 'history', routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        //user && user.admin ? next() : next({ path: '/' })
        user ? next() : next({ path: '/' })
    } else {
        next()
    }
})

router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start()
    }
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router