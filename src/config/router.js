import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

import Home from '@/components/home/Home'
import UserIndex from '@/components/admin/UserIndex'
import UserForm from '@/components/admin/UserForm'
import CompanyIndex from '@/components/admin/CompanyIndex'
import CompanyForm from '@/components/admin/CompanyForm'
import PositionIndex from '@/components/admin/PositionIndex'
import PositionForm from '@/components/admin/PositionForm'
import EmployeeIndex from '@/components/admin/EmployeeIndex'
import EmployeeForm from '@/components/admin/EmployeeForm'
import EmployeeSearch from '@/components/admin/EmployeeSearch'
import TimesheetGroup from '@/components/admin/TimesheetGroup'
import TimesheetForm from '@/components/admin/TimesheetForm'
import EmployeeSearchReport from '@/components/admin/EmployeeSearchReport'
import TimesheetReportGroup from '@/components/admin/TimesheetReportGroup'
import TimesheetReport from '@/components/admin/TimesheetReport'
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
},
{
    name: 'userForm',
    path: '/user/:id',
    component: UserForm
},
{
    name: 'companyIndex',
    path: '/company',
    component: CompanyIndex
},
{
    name: 'companyForm',
    path: '/company/:id',
    component: CompanyForm
},
{
    name: 'positionIndex',
    path: '/position',
    component: PositionIndex
},
{
    name: 'positionForm',
    path: '/position/:id',
    component: PositionForm
},
{
    name: 'employeeIndex',
    path: '/employee',
    component: EmployeeIndex
},
{
    name: 'employeeForm',
    path: '/employee/:id',
    component: EmployeeForm
},
{
    name: 'employeeSearch',
    path: '/employeeSearch',
    component: EmployeeSearch
},
{
    name: 'timesheetGroup',
    path: '/timesheetGroup/:id',
    component: TimesheetGroup
},
{
    name: 'timesheetForm',
    path: '/timesheet/:employeeId/:year/:month/:period',
    component: TimesheetForm
},
{
    name: 'employeeSearchReport',
    path: '/employeeSearchReport',
    component: EmployeeSearchReport
},
{
    name: 'timesheetReportGroup',
    path: '/timesheetReportGroup/:id',
    component: TimesheetReportGroup
},
{
    name: 'timesheetReport',
    path: '/timesheetReport/:employeeId/:year/:month',
    component: TimesheetReport
},
{
    name: 'auth',
    path: '/auth',
    component: Auth
}]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if (to.matched.some(record => record.meta.requiresAdmin)) {
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