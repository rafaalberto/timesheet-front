<template>
   <div>
    <h3 class="title">Relatório Mensal de Horas - Selecionar colaborador</h3>
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
                  <label for="recordNumber">Registro</label>
                  <input type="text" id="recordNumber" class="form-control" v-model="employeeSearch.recordNumber">
               </div>
               <div class="col-md-3">
                  <label for="company">Empresa</label>
                  <select class="form-control" id="company" v-model="employeeSearch.company">
                     <option value="">Todos</option>
                     <option :value="company.id" v-for="company in companies" :key="company.id">{{ company.name }}</option>
                  </select>
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
         <div class="box-body table-responsive">
            <b-table responsive striped bordered :items="employees" :fields="fields" 
               show-empty empty-text="Dados não encontrados">
               <template slot="select" slot-scope="data">
                  <div class="text-center-align">
                     <router-link :to="{name: 'timesheetReportGroup', params: { id: data.item.id }}" class="mr-2 btn btn-primary">
                        <i class="fa fa-check"></i>
                     </router-link>
                  </div>
               </template>
               <template slot="empty" slot-scope="scope">
                  <h4>{{scope.emptyText}}</h4>
               </template>
            </b-table>
            <div class="text-right">
                <b-pagination align="right" aria-label="Pagination" v-model="currentPage" 
                :total-rows="totalElements" :per-page="size"></b-pagination>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import axios from 'axios'
import { baseApiUrl, showError } from '@/global'
import NProgress from 'nprogress'

export default {
    name: 'employeeSearchReport',
    data() {
        return {
            employees: [],
            companies: [],
            employeeSearch: {
               document: '',
               recordNumber: '',
               company: '',
               status: 'ACTIVE',
            },
            currentPage: 1,
            size: 10,
            totalElements: 0,
            fields: [
                { key: 'id', label: 'ID', sortable: true, thStyle: 'width: 10%' },
                { key: 'name', label: 'Name', sortable: true, thStyle: 'width: 35%' },
                { key: 'recordNumber', label: 'Registro', sortable: true, thStyle: 'width: 15%' },
                { key: 'company.name', label: 'Empresa', sortable: true, thStyle: 'width: 25%' },
                { key: 'status', label: 'Situação', sortable: true,
                    formatter: value => value === 'ACTIVE' ? 'Ativo' : 'Inativo',
                    thStyle: 'width: 10%' },
                { key: 'select', label: 'Selecionar', thStyle: 'text-align: center; width: 5%' },
            ],
        }
    },
    methods: {
        fetch() {
            const page = this.currentPage - 1
            const url = `${baseApiUrl}/employees?page=${page}&size=${this.size}`
            axios.get(url)
                .then(response => {
                    this.employees = response.data.content
                    this.totalElements = response.data.totalElements
                })
                .catch(showError)
        },
        search() {
            NProgress.start()
            const page = this.currentPage - 1
            let url = `${baseApiUrl}/employees?page=${page}&size=${this.size}`
            url = this.fetchSearchUrl(url)
            axios.get(url)
                .then(response => {
                    this.employees = response.data.content
                    this.totalElements = response.data.totalElements
                })
                .catch(showError)
                NProgress.done()
        },
        fetchSearchUrl(url) {
            if(this.employeeSearch.name !== undefined && this.employeeSearch.name.trim() !== "") {
               url = url + `&name=${this.employeeSearch.name.trim()}`
            }
            if(this.employeeSearch.recordNumber !== undefined && this.employeeSearch.recordNumber !== "") {
               url = url + `&recordNumber=${this.employeeSearch.recordNumber}`
            }
            if(this.employeeSearch.company !== undefined && this.employeeSearch.company !== "") {
               url = url + `&companyId=${this.employeeSearch.company}`
            }
            if(this.employeeSearch.status !== undefined && this.employeeSearch.status !== "") {
               url = url + `&status=${this.employeeSearch.status}`
            }
            return url
        },
        fetchCompanies() {
            const url = `${baseApiUrl}/companies`
            axios.get(url)
               .then(response => {
                  this.companies = response.data.content
               })
            .catch(showError)
        }
    },
    mounted() {
        this.search()
        this.$refs.name.focus()
        this.fetchCompanies()
    },
    watch: {
        currentPage() {
            this.search()
        }
    }
}
</script>

<style lang="css"></style>
