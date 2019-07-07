import Vue from 'vue'

export const userKey = '__api_user'
export const baseApiUrl = 'http://localhost:8080'

export function showError(error) {
    if(error && error.response && error.response.data) {
        if(error.response.data[0] !== undefined) {
            Vue.toasted.global.defaultError({ msg: error.response.data[0].message })
        }else{
            Vue.toasted.global.defaultError({ msg: error.response.data.errors[0].message })
        }
    }else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey }