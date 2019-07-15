import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import money from 'v-money'

Vue.use(Vuex)
Vue.use(money)

export default new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            if(user) {
                const token = `Bearer ${user.token}`
                axios.defaults.headers.common['Authorization'] = token
                state.isMenuVisible = true
            }else{
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    }
})