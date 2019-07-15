<template>
   <div>
      <h3 class="title">Cadastro de Cargos</h3>
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
               <div class="form-group" v-if="positionId">
                  <label class="col-sm-2 control-label" for="id">ID</label>
                  <div class="col-sm-2">
                     <input type="text" class="form-control" id="id" title="id" readonly="readonly" v-model="position.id" ref="id">
                  </div>
               </div>
               <div class="form-group">
                  <label class="col-sm-2 control-label" for="title">Título<b class="required-field"> *</b></label>
                  <div class="col-sm-5">
                     <input type="text" class="form-control" id="title" title="title" v-model="position.title" maxlength="50" ref="title">
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
    title: 'positionForm',
    props: {
          id: String,
    },
    data() {
        return {
            position: {},
            positionId: this.$route.params.id,
        }
    },
    methods: {
      save() {
        const method = this.position.id ? 'put' : 'post'
        const id = this.position.id ? `${this.position.id}` : ''
        const url = `${baseApiUrl}/positions/${id}`
        axios[method](url, this.position)
          .then(() => {
            this.$toasted.global.defaultSuccess()
            this.$router.push({ path: '/position' })
          }).catch(showError)
      },
      back() {
        this.$router.push({ path: '/position' })
      },
      loadPosition() {
        const url = `${baseApiUrl}/positions/${this.position.id}`
        axios.get(url)
          .then(res => this.position = res.data)
          .catch(showError)
      }
    },
    mounted() {
      if(this.positionId !== 0) {
        this.position.id = this.positionId
        this.loadPosition()
      } 
      this.$refs.title.focus()
    }
}
</script>

<style scoped>
   input {
      text-transform: uppercase;
   }
</style>
