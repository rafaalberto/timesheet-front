<template>
   <div id="app">
      <div id="wrapper" class="wrapper">
         <Header v-if="user" />
         <HeaderAuth v-if="!user" />
         <Menu v-if="user" />
         <Loading v-if="validToken" />
         <Content v-else />
         <Modal></Modal>
      </div>
   </div>
</template>
<script>
   import axios from 'axios'
   import { baseApiUrl, userKey } from '@/global'
   import { mapState } from 'vuex'
   import Header from '@/components/template/Header'
   import HeaderAuth from '@/components/template/HeaderAuth'
   import Menu from '@/components/template/Menu'
   import Loading from '@/components/template/Loading'
   import Content from '@/components/template/Content'
   import Modal from '@/components/template/Modal'

   export default {
     name: 'App',
     components: { Header, HeaderAuth, Menu, Loading, Content, Modal },
     computed: mapState(['user']),
     data() {
       return {
         validToken: true
       }
     },
     methods: {
       async validateToken() {
         this.validToken = true
         const json = localStorage.getItem(userKey)
         const userData = JSON.parse(json)
         this.$store.commit('setUser', null)
         if(!userData) {
           this.validToken = false
           this.$router.push({ name: 'auth'})
           return
         }
         const token = userData.token
         const res = await axios.get(`${baseApiUrl}/auth/token/validate/${token}`)
         if(res.data.isValid){
           this.$store.commit('setUser', userData)
         }else{
           localStorage.removeItem(userKey)
           this.$router.push({ name: 'auth' })
         }
         this.validToken = false
       }
     },
     created() {
       this.validateToken()
     }
   }
</script>
<style>
   #nprogress .bar {
      background: gray !important;
   }
   .text-font {
      font-family: 'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
   }
   .required-field {
     color: red;
   }
   .btn-actions {
        text-align: center;
    }
    .btn-new {
        float: right;
        margin-top: -35px;
    }
    .b-table.table>tfoot>tr>th[aria-sort][aria-sort=ascending]:after, 
    .b-table.table>thead>tr>th[aria-sort][aria-sort=ascending]:after {
        opacity: 1;
        content: "\2193";
    }
    .b-table.table>tfoot>tr>th[aria-sort]:after, 
    .b-table.table>thead>tr>th[aria-sort]:after {
        position: inherit;
        margin: 1em;
        bottom: 0;
        right: .35em;
        padding-bottom: inherit;
        font-size: inherit;
        line-height: inherit;
        opacity: .4;
        content: "\2195";
    }
    .table > thead > tr > th {
        vertical-align: bottom;
        border-bottom: 3px solid #ddd;
    }
    .text-center-align {
        text-align: center;
    }
    .box-title {
        display: inline-block;
        font-size: 16px !important;
        margin: 0;
        line-height: 1;
    }
    .box-body {
        padding: 15px;
        padding-top: 5px;
        color: #2a3f54;
        font-size: 14px;
    }
    table {
        font-size: 14px;
        border: 1px solid black;
        color: #2a3f54;
    }
    .table-bordered {
        border: 1px solid #ddd;
    }
    .table-bordered > thead > tr > th, 
    .table-bordered > tbody > tr > th, 
    .table-bordered > tfoot > tr > th, 
    .table-bordered > thead > tr > td, 
    .table-bordered > tbody > tr > td, 
    .table-bordered > tfoot > tr > td {
        border: 1px solid #ddd;
    }
    .table > thead > tr > th {
        vertical-align: bottom;
        border-bottom: 3px solid #ddd;
    }
    .box {
        position: relative;
        background: #ffffff;
        border-top: 1px solid #d2d6de;
        margin-bottom: 20px;
        width: 100%;
    }
    .btn-default {
        background-color: #dddddd;
        color: #444;
        border-color: #b3b3b3;
    }
    .title {
        font-size: 18px;
        color: #2a3f54;
    }
    .content-header > h1 {
        margin: 2px !important;
    }
    .gray-color {
        color: gray;
    }
</style>