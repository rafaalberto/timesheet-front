<template>
   <div>
    <h3 class="title">Cadastro de Usuários</h3>
        <div class="btn-new">
            <router-link :to="{name: 'userForm', params: { id: 0 }}" class="btn btn-primary">
                <i class="fa fa-file"><span class="text-font">&nbsp;&nbsp;Novo</span></i>
            </router-link>
        </div>
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
                  <label for="user">Usuário</label>
                  <input type="text" id="user" class="form-control" ref="username" v-model="userSearch.username">
               </div>
               <div class="col-md-3">
                  <label for="name">Nome</label>
                  <input type="text" id="name" class="form-control" v-model="userSearch.name">
               </div>
               <div class="col-md-3">
                  <label for="profile">Perfil</label>
                  <select class="form-control" id="profile" v-model="userSearch.profile">
                     <option value="">Todos</option>
                     <option value="ROLE_ADMIN">Administrador</option>
                     <option value="ROLE_USER">Usuário</option>
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
            <b-table responsive striped bordered :items="users" :fields="fields" 
               show-empty empty-text="Dados não encontrados">
               <template slot="edit" slot-scope="data">
                  <div class="text-center-align">
                     <router-link :to="{name: 'userForm', params: { id: data.item.id }}" class="mr-2 btn btn-primary">
                        <i class="fa fa-pencil"></i>
                     </router-link>
                  </div>
               </template>
               <template slot="delete" slot-scope="data">
                  <div class="text-center-align">
                     <b-button class="mr-2 btn btn-default" @click="openDeleteModal(data.item)"><i class="fa fa-remove"></i></b-button>
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
import { mapState } from 'vuex'
import NProgress from 'nprogress'

export default {
    name: 'UserIndex',
    computed: mapState(['user']),
    data() {
        return {
            users: [],
            userSearch: {
               profile: ''
            },
            currentPage: 1,
            size: 10,
            totalElements: 0,
            fields: [
                { key: 'id', label: 'ID', sortable: true, thStyle: 'width: 15%' },
                { key: 'username', label: 'Usuário', sortable: true, thStyle: 'width: 30%' },
                { key: 'name', label: 'Nome', sortable: true, thStyle: 'width: 35%' },
                { key: 'profile', label: 'Perfil', sortable: true,
                    formatter: value => value === 'ROLE_ADMIN' ? 'Administrador' : 'Usuário',
                    thStyle: 'width: 20%' },
                { key: 'edit', label: 'Editar', thStyle: 'text-align: center; width: 5%' },
                { key: 'delete', label: 'Excluir', thStyle: 'text-align: center; width: 5%' }
            ],
        }
    },
    methods: {
        fetch() {
            const page = this.currentPage - 1
            const url = `${baseApiUrl}/users?page=${page}&size=${this.size}`
            axios.get(url)
                .then(response => {
                    this.users = response.data.content
                    this.totalElements = response.data.totalElements
                })
                .catch(showError)
        },
        search() {
            NProgress.start()
            const page = this.currentPage - 1
            let url = `${baseApiUrl}/users?page=${page}&size=${this.size}`
            url = this.fetchSearchUrl(url)
            axios.get(url)
                .then(response => {
                    this.users = response.data.content
                    this.totalElements = response.data.totalElements
                })
                .catch(showError)
                NProgress.done()
        },
        fetchSearchUrl(url) {
            if(this.userSearch.username !== undefined && this.userSearch.username.trim() !== "") {
               url = url + `&username=${this.userSearch.username.trim()}`
            }
            if(this.userSearch.name !== undefined && this.userSearch.name.trim() !== "") {
               url = url + `&name=${this.userSearch.name.trim()}`
            }
            if(this.userSearch.profile !== undefined && this.userSearch.profile !== "") {
               url = url + `&profile=${this.userSearch.profile}`
            }
            return url
        },
        remove(item) {
            NProgress.start()
            const userSession = this.user
            if(userSession.username === item.username){
                this.$toasted.global.defaultError({ msg: 'Usuário logado não pode ser excluído!' })
                return
            }
            const id = item.id
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.fetch()
                })
                .catch(showError)
            NProgress.done()
        },
        openDeleteModal(item) {
            this.$bus.$emit('modal-open', {
            title: 'Exclusão',
            description: 'Deseja realmente excluir este registro?',
            type: 'modal-primary',
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            confirmBefore: ()=> {
               this.remove(item)
            },
            confirmAfter: () => {
               
            },
            cancelBefore: () => {},
            cancelAfter: () => {},
            clickOverlay: () => {}
            })
        },
    },
    mounted() {
        this.fetch()
        this.$refs.username.focus()
    },
    watch: {
        currentPage() {
            this.fetch()
        }
    }
}
</script>

<style lang="css"></style>
