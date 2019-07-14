<template>
   <div>
      <h3 class="title">Cadastro de Empresas</h3>
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
               <div class="form-group" v-if="companyId">
                  <label class="col-sm-2 control-label" for="id">ID</label>
                  <div class="col-sm-2">
                     <input type="text" class="form-control" id="id" name="id" readonly="readonly" v-model="company.id" ref="id">
                  </div>
               </div>
               <div class="form-group">
                  <label class="col-sm-2 control-label" for="document">CNPJ<b class="required-field"> *</b></label>
                  <div class="col-sm-3">
                     <input type="text" class="form-control" id="document" name="document" v-model="company.document" v-mask="'##.###.###/####-##'" maxlength="18" ref="document">
                  </div>
               </div>
               <div class="form-group">
                  <label class="col-sm-2 control-label" for="name">Nome<b class="required-field"> *</b></label>
                  <div class="col-sm-5">
                     <input type="text" class="form-control" id="name" name="name" v-model="company.name" maxlength="50">
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
    name: 'companyForm',
    props: {
          id: String,
    },
    data() {
        return {
            company: {},
            companyId: this.$route.params.id,
        }
    },
    methods: {
      save() {
        const method = this.company.id ? 'put' : 'post'
        const id = this.company.id ? `${this.company.id}` : ''
        const url = `${baseApiUrl}/companies/${id}`
        axios[method](url, this.company)
          .then(() => {
            this.$toasted.global.defaultSuccess()
            this.$router.push({ path: '/company' })
          }).catch(showError)
      },
      back() {
        this.$router.push({ path: '/company' })
      },
      loadcompany() {
        const url = `${baseApiUrl}/companies/${this.company.id}`
        axios.get(url)
          .then(res => this.company = res.data)
          .catch(showError)
      }
    },
    mounted() {
      if(this.companyId !== 0) {
        this.company.id = this.companyId
        this.loadcompany()
      } 
      this.$refs.document.focus()
    }
}
</script>

<style scoped>
   input {
      text-transform: uppercase;
   }
</style>
