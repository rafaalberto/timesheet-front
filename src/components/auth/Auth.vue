<template>
   <div class="login-box">
      <div class="login-logo">
         <a href="#"><b>Admin</b> Web</a>
      </div>
      <div class="login-box-body">
         <p class="login-box-msg">Informe usuário e senha para acesso</p>
         <div class="form-group has-feedback">
            <input type="text" class="form-control" placeholder="Usuário" v-model="user.username" ref="username">
            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
         </div>
         <div class="form-group has-feedback">
            <input type="password" class="form-control" placeholder="Senha" v-model="user.password" ref="password">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
         </div>
         <div class="row">
            <div class="col-xs-8"></div>
            <div class="col-xs-4">
               <button class="btn btn-primary btn-block btn-flat" @click.prevent="signin">Entrar</button>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
   import { baseApiUrl, showError, userKey } from '@/global'
   import axios from 'axios'
   
   export default {
       name: 'Auth',
       data() {
           return {
               user: {}
           }
       },
       methods: {
           signin() {
               axios.post(`${baseApiUrl}/login`, this.user)
                   .then(res => {
                       this.$store.commit('setUser', res.data)
                       localStorage.setItem(userKey, JSON.stringify(res.data))
                       this.$router.push({ path: '/user' })
                   }).catch(showError)
           }
       },
       mounted() {
           this.$refs.username.focus()
       }
   }
</script>
<style></style>