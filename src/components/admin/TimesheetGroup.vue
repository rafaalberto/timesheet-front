<template>
   <div>
    <h3 class="title">Lançamento de horas - Selecionar período</h3>
    <br>
    <div class="box box-default">
         <div class="box-header with-border">
            <h3 class="box-title gray-color">
               <i class="fa fa-search"></i> &nbsp;Pesquisa
            </h3>
         </div>
         <div class="box-body">
            <div class="row">
               <div class="col-md-3">
                  <label for="name">Nome</label>
                  <input type="text" id="name" class="form-control" v-model="employeeSearch.name" ref="name">
               </div>
               <div class="col-md-3">
                  <label for="profile">Situação</label>
                  <select class="form-control" id="status" v-model="employeeSearch.status">
                     <option value="">Todos</option>
                     <option value="ACTIVE">Ativo</option>
                     <option value="INACTIVE">Inativo</option>
                  </select>
               </div>
            </div>
         </div>
         <div class="box-footer text-center">
            <button type="button" class="btn btn-primary" @click.prevent="search">
               <i class="fa fa-search"></i>&nbsp;Pesquisar
            </button>
         </div>
      </div>
      <div class="box box-default">
         <div class="box-header with-border">
            <h3 class="box-title gray-color">
               <i class="fa fa-table"></i> &nbsp;Lista
            </h3>
         </div>
      </div>
   </div>
</template>
<script>

export default {
    name: 'timesheetGroup',
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    mounted() {
        
    },
    watch: {
        
    }
}
</script>

<style lang="css"></style>
