<template>
    <div>
        <div class="box-body">
            <h3 class="box-title gray-color">
               <i class="fa fa-table"></i> &nbsp;Lançamento de Bonificações
            </h3>
            <br><br>
            <form class="form-horizontal">
                <div class="row">
                    <label class="col-xs-1 control-label" for="code">Código</label>
                    <div class="col-xs-2">
                        <input type="text" class="form-control" id="code" name="code" v-model="bonus.code" ref="code">
                    </div>
                    <label class="col-xs-1 control-label" for="description">Descrição</label>
                    <div class="col-xs-4">
                        <input type="text" class="form-control" id="description" name="description" v-model="bonus.description">
                    </div>
                    <label class="col-xs-1 control-label" for="cost">Valor</label>
                    <div class="col-xs-2">
                        <input type="text" class="form-control" id="cost" name="cost" v-model="bonus.cost">
                    </div>
                </div>
                <br>
                <div class="row">
                    <label class="col-xs-1 control-label"></label>
                    <div class="col-xs-2">
                        <button type="submit" class="btn btn-primary" @click.prevent="save"><i class="fa fa-save" aria-hidden="true"></i>&nbsp;&nbsp;Salvar</button>&nbsp;
                    </div>
                </div>
            </form>
        </div>
        <div class="box-body table-responsive">
            <b-table responsive striped bordered :items="bonuses" :fields="fields" show-empty empty-text="Dados não encontrados">
                <template slot="delete" slot-scope="data">
                    <div class="text-center-align">
                        <b-button class="mr-2 btn btn-primary" @click="openDeleteModal(data.item)"><i class="fa fa-remove"></i></b-button>
                    </div>
                </template>
            </b-table>
        </div>
    </div>
</template>

<script>
    import eventBus from '@/eventBus'
    import axios from 'axios'
    import { baseApiUrl, showError } from '@/global'
    export default {
        name: 'TimesheetBonus',
        props: {
            employeeId: Object,
            year: Object,
            month: Object
        },
        data() {
            return {
                bonus: {},
                bonuses: [],
                fields: [{
                    key: 'code',
                    label: 'Código',
                    thStyle: 'width: 15%'
                }, {
                    key: 'description',
                    label: 'Descrição',
                    thStyle: 'width: 35%'
                }, {
                    key: 'cost',
                    label: 'Valor',
                    thStyle: 'width: 20%'
                }, {
                    key: 'delete',
                    label: 'Excluir',
                    thStyle: 'text-align: center; width: 5%'
                }],
            }
        },
        methods: {
            fetchBonuses() {
                const { employeeParam } = this.employeeId
                const { yearParam } = this.year
                const { monthParam } = this.month
  
                const url = `${baseApiUrl}/bonus/${employeeParam}/${yearParam}/${monthParam}`
                axios.get(url).then(response => this.bonuses = response.data)
                .catch(showError)

                eventBus.$emit('dataChanged')
            },
            save() {
                const { employeeParam } = this.employeeId
                const { yearParam } = this.year
                const { monthParam } = this.month

                this.bonus.employeeId = employeeParam
                this.bonus.yearReference = yearParam
                this.bonus.monthReference = monthParam

                const method = 'post'
                const url = `${baseApiUrl}/bonus`
                axios[method](url, this.bonus)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                        this.reset()
                        this.fetchBonuses()
                    }).catch(showError)
            },
            reset() {
                this.bonus = {}
                this.$refs.code.focus()
            },
            remove(item) {
                const id = item.id
                axios.delete(`${baseApiUrl}/bonus/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                    this.fetchBonuses()
                })
                .catch(showError)
                    
            },
            openDeleteModal(item) {
                this.$bus.$emit('modal-open', {
                    title: 'Exclusão',
                    description: 'Deseja realmente excluir este registro?',
                    type: 'modal-primary',
                    confirmText: 'Confirmar',
                    cancelText: 'Cancelar',
                    confirmBefore: () => {
                        this.remove(item)
                    },
                    confirmAfter: () => {},
                    cancelBefore: () => {},
                    cancelAfter: () => {},
                    clickOverlay: () => {} 
                })
            },
        },
        mounted() {
            this.fetchBonuses()
            this.$refs.code.focus()
        }
    }
</script>

<style></style>