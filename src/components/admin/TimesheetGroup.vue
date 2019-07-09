<template>
   <div>
      <h3 class="title">Lançamento de horas - Selecionar período</h3>
      <br>
      <div class="box box-default">
         <div class="box-header with-border">
            <h3 class="box-title" style="color: gray;"><i class="fa fa-edit"></i> &nbsp;Seleção do período</h3>
         </div>
         <div>
            <p></p><b>&nbsp;&nbsp;(*)</b>&nbsp;Preenchimento obrigatório<p></p>
         </div>
         <form class="form-horizontal">
            <div class="box-body">
               <div class="form-group">
                  <label class="col-sm-2 control-label" for="employee">Colaborador</label>
                  <div class="col-sm-4">
                     <input type="text" class="form-control" id="employeeId" title="employee" v-model="employee.name" readonly>
                  </div>
               </div>
               <div class="form-group">
                  <label class="col-sm-2 control-label" for="company">Empresa</label>
                  <div class="col-sm-4">
                     <input type="text" class="form-control" id="company" title="company" v-model="employee.company.name" readonly>
                  </div>
               </div>
               <div class="form-group">
                  <label class="col-sm-2 control-label" for="recordNumber">Registro</label>
                  <div class="col-sm-2">
                     <input type="text" class="form-control" id="recordNumber" title="recordNumber" v-model="employee.recordNumber" readonly>
                  </div>
               </div>
               <div class="form-group">
                  <label class="col-sm-2 control-label" for="year">Ano<b class="required-field"> *</b></label>
                  <div class="col-sm-2">
                     <select class="form-control" id="year" v-model="year">
                        <option v-for="year in years" :key="year">{{ year }}</option>
                     </select>
                  </div>
               </div>
               <div class="form-group">
                  <label class="col-sm-2 control-label" for="month">Mês<b class="required-field"> *</b></label>
                  <div class="col-sm-2">
                     <select class="form-control" id="month" v-model="month" ref="month">
                        <option v-for="month in months" :key="month">{{ month }}</option>
                     </select>
                  </div>
               </div>
            </div>
            <div class="box-footer">
               <div class="col-sm-9 col-sm-offset-2">
                  <button type="submit" class="btn btn-primary" @click.prevent="search">Continuar&nbsp;&nbsp;<i class="fa fa-arrow-circle-right" aria-hidden="true"></i></button>&nbsp;
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
    name: 'timesheetGroup',
    props: {
          id: String,
    },
    data() {
        return {
           timesheetGroup: {},
           months: [],
           years: [],
           employeeId: this.$route.params.id,
           employee: {
              company: {}
           },
           year: new Date().getFullYear(),
           month: new Date().getMonth() + 1
        }
    },
    methods: {
        search() {
           const urlPath = `/timesheet/${this.employeeId}/${this.year}/${this.month}`
           this.$router.push({ path: urlPath })
        },
        fetchEmployee() {
           const url = `${baseApiUrl}/employees/${this.employeeId}`
               axios.get(url)
               .then(res => this.employee = res.data)
               .catch(showError)
        },
        fetchMonths() {
           for(let month = 1; month <= 12; month ++) {
              this.months.push(month)
           }
        },
        fetchYears() {
           const currentYear = new Date().getFullYear()
           const period = 5
           for(let year = currentYear; year > currentYear - period; year --) {
              this.years.push(year)
           }
        }
    },
    mounted() {
       this.fetchEmployee()
       this.fetchMonths()
       this.fetchYears()
       this.$refs.month.focus()
    }
}
</script>

<style lang="css"></style>
