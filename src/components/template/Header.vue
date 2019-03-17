<template>
   <header class="main-header">
      <a href="#" class="logo">
      <span class="logo-mini"><b>A</b>W</span>
      <span class="logo-lg"><b>Admin</b> Web</span>
      </a>
      <nav class="navbar navbar-static-top">
         <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button"></a>
         <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
               <li class="dropdown user user-menu">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                  <span class="hidden-xs text-font">
                     <em class="fa fa-user"><span class="text-font">&nbsp;&nbsp;{{ user.name }}</span></em>
                  </span>
                  </a>
                  <ul class="dropdown-menu">
                     <li class="user-footer">
                        <div class="pull-right">
                           <a href="#" class="btn btn-default btn-flat" @click.prevent="logout()">Sair</a>
                        </div>
                     </li>
                  </ul>
               </li>
            </ul>
         </div>
      </nav>
   </header>
</template>

<script>
import { mapState } from 'vuex'
import { userKey } from '@/global'
export default {
    name: 'Header',
    computed: mapState(['user']),
    methods: {
        logout() {
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push({ name: 'auth' })
        }
    }
}
</script>

<style></style>