<template>
   <div>
      <h3 class="title">Cadastro de Usuários</h3>
      <br>
      <div class="box box-default">
         <div class="box-header with-border">
            <h3 class="box-title" style="color: gray;"><i class="fa fa-edit"></i> &nbsp;Cadastro</h3>
         </div>
         <div>
            <p></p><b>&nbsp;&nbsp;(*)</b>&nbsp;Preenchimento obrigatório<p></p>
         </div>
         <form class="form-horizontal">
            <div class="box-body">
               <div class="form-group" v-if="userId">
                  <label class="col-sm-2 control-label" for="id">ID</label>
                  <div class="col-sm-2">
                     <input type="text" class="form-control" id="id" name="id" readonly="readonly" v-model="user.id" ref="id">
                  </div>
               </div>
               <div class="form-group">
                  <label class="col-sm-2 control-label" for="name">Nome<b class="required-field"> *</b></label>
                  <div class="col-sm-4">
                     <input type="text" class="form-control" id="name" name="name" v-model="user.name" ref="name">
                  </div>
               </div>
               <div class="form-group">
                  <label class="col-sm-2 control-label" for="username">Usuário<b class="required-field"> *</b></label>
                  <div class="col-sm-4">
                     <input type="text" class="form-control" id="username" name="username" v-model="user.username">
                  </div>
               </div>
               <div class="form-group">
                  <label class="col-sm-2 control-label" for="password">Senha<b class="required-field"> *</b></label>
                  <div class="col-sm-3">
                     <input type="password" class="form-control" id="password" name="password" v-model="user.password" >
                  </div>
               </div>
               <div class="form-group">
                  <label class="col-sm-2 control-label" for="profile">Perfil<b class="required-field"> *</b></label>
                  <div class="col-sm-3">
                     <select class="form-control" name="profile" id="profile" v-model="user.profile">
                        <option value="ROLE_ADMIN">Administrador</option>
                        <option value="ROLE_USER">Usuário</option>
                     </select>
                  </div>
               </div>
            </div>
            <div class="box-footer">
               <div class="col-sm-9 col-sm-offset-2">
                  <button type="submit" class="btn btn-primary" @click.prevent="save"><i class="fa fa-save" aria-hidden="true"></i>&nbsp;Salvar</button>&nbsp;
                  <button type="button" class="btn btn-default" @click.prevent="back"><i class="fa fa-mail-reply" aria-hidden="true"></i>&nbsp;Voltar</button>
               </div>
            </div>
         </form>
      </div>
   </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, showError } from '@/global'
export default {
    name: 'UserForm',
    props: {
          id: String,
    },
    data() {
        return {
            user: {
              profile: 'ROLE_USER'
            },
            userId: this.$route.params.id,
        }
    },
    methods: {
      save() {
        const method = this.user.id ? 'put' : 'post'
        const id = this.user.id ? `${this.user.id}` : ''
        const url = `${baseApiUrl}/users/${id}`
        axios[method](url, this.user)
          .then(() => {
            this.$toasted.global.defaultSuccess()
            this.$router.push({ path: '/user' })
          }).catch(showError)
      },
      back() {
        this.$router.push({ path: '/user' })
      },
      loadUser() {
        const url = `${baseApiUrl}/users/${this.user.id}`
        axios.get(url)
          .then(res => this.user = res.data)
          .catch(showError)
      }
    },
    mounted() {
      if(this.userId !== 0) {
        this.user.id = this.userId
        this.loadUser()
      } 
      this.$refs.name.focus()
    }
}
</script>

<style></style>
