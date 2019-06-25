<template>
    <div>
        <h3 class="title">Lançamento de Horas</h3>
        <br>
        <div class="box box-default">
            <div class="box-header with-border">
                <h3 class="box-title" style="color: gray;"><i class="fa fa-edit"></i> &nbsp;Lançamento</h3>
            </div>
            <form class="form-horizontal">
                <div class="box-body">
                    <div class="row">
                        <label class="col-xs-1 control-label" for="employee">Colaborador</label>
                        <div class="col-xs-5">
                            <input type="text" class="form-control" id="employee" name="employee" v-model="employee.name" readonly>
                        </div>
                        <label class="col-xs-1 control-label" for="recordNumber">Registro</label>
                        <div class="col-xs-2">
                            <input type="text" class="form-control" id="recordNumber" name="recordNumber" v-model="employee.recordNumber" readonly>
                        </div>
                        <label class="col-xs-1 control-label" for="period">Período</label>
                        <div class="col-xs-2">
                            <input type="text" class="form-control" id="period" name="period" v-model="period" readonly>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <label class="col-xs-1 control-label" for="date">Data</label>
                        <div class="col-xs-2">
                            <input type="text" class="form-control" id="date" name="date" v-model="date" ref="date" v-mask="'##/##/####'">
                        </div>
                        <label class="col-xs-1 control-label" for="type">Tipo</label>
                        <div class="col-xs-2">
                            <select class="form-control" name="type" id="type" v-model="type">
                                <option value="REGULAR">Normal</option>
                                <option value="DAY_OFF">Folga</option>
                                <option value="HOLIDAY">Feriado</option>
                            </select>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <label class="col-xs-1 control-label" for="timeIn">Hr Inicial</label>
                        <div class="col-xs-2">
                            <input type="text" class="form-control" id="timeIn" name="timeIn" v-model="timeIn" v-mask="'##:##'">
                        </div>
                        <label class="col-xs-1 control-label" for="lunchStart">Hr Final</label>
                        <div class="col-xs-2">
                            <input type="text" class="form-control" id="lunchStart" name="lunchStart" v-model="lunchStart" v-mask="'##:##'">
                        </div>
                        <label class="col-xs-1 control-label" for="lunchEnd">Hr Inicial</label>
                        <div class="col-xs-2">
                            <input type="text" class="form-control" id="lunchEnd" name="lunchEnd" v-model="lunchEnd" v-mask="'##:##'">
                        </div>
                        <label class="col-xs-1 control-label" for="timeOut">Hr Final</label>
                        <div class="col-xs-2">
                            <input type="text" class="form-control" id="timeOut" name="timeOut" v-model="timeOut" v-mask="'##:##'">
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
        <div class="box box-default">
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#activity" data-toggle="tab">Lançamento</a></li>
                    <li><a href="#timeline" data-toggle="tab">Resumo</a></li>
                </ul>
                <div class="tab-content">
                    <div class="active tab-pane" id="activity">
                        <div class="box-body table-responsive">
                            <b-table responsive striped bordered :items="timesheets" :fields="fields" show-empty empty-text="Dados não encontrados">
                                <template slot="hoursWorked" slot-scope="data">
                                    <div class="text-center-align">{{data.item.hoursWorked}}</div>
                                </template>
                                <template slot="hoursJourney" slot-scope="data">
                                    <div class="text-center-align">{{data.item.hoursJourney}}</div>
                                </template>
                                <template slot="extraHours" slot-scope="data">
                                    <div class="text-center-align">{{data.item.extraHours}}</div>
                                </template>
                                <template slot="weeklyRest" slot-scope="data">
                                    <div class="text-center-align">{{data.item.weeklyRest}}</div>
                                </template>
                                <template slot="sumula90" slot-scope="data">
                                    <div class="text-center-align">{{data.item.sumula90}}</div>
                                </template>
                                <template slot="nightShift" slot-scope="data">
                                    <div class="text-center-align">{{data.item.nightShift}}</div>
                                </template>
                                <template slot="paidNightTime" slot-scope="data">
                                    <div class="text-center-align">{{data.item.paidNightTime}}</div>
                                </template>
                                <template slot="delete" slot-scope="data">
                                    <div class="text-center-align">
                                        <b-button class="mr-2 btn btn-primary" @click="openDeleteModal(data.item)"><i class="fa fa-remove"></i></b-button>
                                    </div>
                                </template>
                            </b-table>
                        </div>
                    </div>
                    <div class="tab-pane" id="timeline">
                       <div class="box-body table-responsive">
                            <table aria-busy="false" aria-colcount="4" class="table b-table table-striped table-bordered">
                                <thead class>
                                    <tr>
                                        <td style="text-align: 25%"><b>Valor hora</b></td>
                                        <td style="text-align: 25%"><b>100%</b></td>
                                        <td style="text-align: 25%"><b>50%</b></td>
                                        <td style="text-align: 25%"><b>20%</b></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{employee.costHourFormatted}}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table><br>
                            <b-table responsive striped bordered :items="reports" :fields="fieldsReport">
                                <template slot="hoursWorked" slot-scope="data">
                                    <div class="text-center-align">{{data.item.hoursWorked}}</div>
                                </template>
                            </b-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, showError } from '@/global'
import moment from 'moment'
import NProgress from 'nprogress'
export default {
    name: 'TimesheetForm',
    props: {
          employeeId: String,
          year: String,
          month: String
    },
    data() {
        return {
           employeeParam: this.$route.params.employeeId,
           yearParam: this.$route.params.year,
           monthParam: this.$route.params.month,
           timesheet: {},
           employee: {},
           timesheets: [],
           reports: [],
           period: this.$route.params.month + '/' + this.$route.params.year,
           date: {},
           type: 'REGULAR',
           timeIn: {},
           lunchStart: {},
           lunchEnd: {},
           timeOut: {},
           fields: [
                { key: 'date', label: 'Data', thStyle: 'width: 14%' },
                { key: 'type', label: 'Tipo', thStyle: 'width: 12%' },
                { key: 'entry', label: 'Registros', thStyle: 'width: 20%' },
                { key: 'hoursWorked', label: 'H. Trab', thStyle: 'text-align:center;width: 7%' },
                { key: 'hoursJourney', label: 'Jornada', thStyle: 'text-align:center;width: 7%' },
                { key: 'extraHours', label: 'H. Extras', thStyle: 'text-align:center;width: 7%' },
                { key: 'weeklyRest', label: 'DSR', thStyle: 'text-align:center;width: 7%' },
                { key: 'sumula90', label: 'S.90', thStyle: 'text-align:center;width: 7%' },
                { key: 'nightShift', label: 'ADN', thStyle: 'text-align:center;width: 7%' },
                { key: 'paidNightTime', label: 'HNR', thStyle: 'text-align:center;width: 7%' },
                { key: 'delete', label: 'Excluir', thStyle: 'text-align: center; width: 5%' }
            ],
            fieldsReport: [
               { key: 'typeCode', label: 'Código', thStyle: 'width: 10%' },
               { key: 'typeDescription', label: 'Tipo', thStyle: 'width: 20%' },
               { key: 'totalHoursFormatted', label: 'Total horas', thStyle: 'width: 20%' },
               { key: 'totalCost', label: 'Total custo', thStyle: 'width: 20%' },
            ]
        }
    },
    methods: {
      fetchDaily() {
         const url = `${baseApiUrl}/timesheet/daily/${this.employeeParam}/${this.yearParam}/${this.monthParam}`
         axios.get(url)
            .then(response => {
               this.timesheets = response.data
            })
            .catch(showError)
      },
      fetchReport() {
         const url = `${baseApiUrl}/timesheet/docket/${this.employeeParam}/${this.yearParam}/${this.monthParam}`
         axios.get(url)
            .then(response => {
               this.reports = response.data
            })
            .catch(showError)
      },
      fetchEmployee() {
         const url = `${baseApiUrl}/employees/${this.employeeParam}`
         axios.get(url)
            .then(response => {
               this.employee = response.data
            })
            .catch(showError)
      },
      save() {
         this.setDateTime()
         this.timesheet.employeeId = this.employeeParam,
         this.timesheet.yearReference = this.yearParam,
         this.timesheet.monthReference = this.monthParam,
         this.lunchStart = this.fetchDateTime(this.lunchStart, this.timeIn)
         this.lunchEnd = this.fetchDateTime(this.lunchEnd, this.lunchStart)
         this.timeOut = this.fetchDateTime(this.timeOut, this.lunchEnd)

         const dateTimeFormat = 'YYYY-MM-DD HH:mm'
         this.timesheet.type = this.type
         
         this.timesheet.hoursJourney = '07:20'
         this.timesheet.sumula90 = '01:00'

         if(this.timesheet.type === 'REGULAR' || this.timesheet.type === 'HOLIDAY'){
            this.timesheet.timeIn = moment(this.timeIn).format(dateTimeFormat)
            this.timesheet.lunchStart = moment(this.lunchStart).format(dateTimeFormat)
            this.timesheet.lunchEnd = moment(this.lunchEnd).format(dateTimeFormat)
            this.timesheet.timeOut = moment(this.timeOut).format(dateTimeFormat)
         }else if(this.timesheet.type === 'DAY_OFF'){ 
            this.timeIn = new Date(`${this.date} 00:00`)
            this.timesheet.timeIn = moment(this.timeIn).format(dateTimeFormat)
            this.timesheet.lunchStart = moment(this.timeIn).format(dateTimeFormat)
            this.timesheet.lunchEnd = moment(this.timeIn).format(dateTimeFormat)
            this.timesheet.timeOut = moment(this.timeIn).format(dateTimeFormat)
            this.timesheet.sumula90 = '00:00'
         }

         const method = 'post'
         const url = `${baseApiUrl}/timesheet`
         axios[method](url, this.timesheet)
            .then(() => {
               this.$toasted.global.defaultSuccess()
               this.reset()
               this.fetchDaily()
               this.fetchReport()   
            }).catch(showError)
      },
      back() {
         this.$router.push({ path: '/' })
      },
      setDateTime() {
         const split = this.date.split('/')
         this.date = `${split[2]}/${split[1]}/${split[0]}`
         this.timeIn = new Date(`${this.date} ${this.timeIn}`)
         this.lunchStart = new Date(`${this.date} ${this.lunchStart}`)
         this.lunchEnd = new Date(`${this.date} ${this.lunchEnd}`)
         this.timeOut = new Date(`${this.date} ${this.timeOut}`)
      },
      fetchDateTime(currentDateTime, previousDateTime) {
         const diff = moment(currentDateTime).diff(previousDateTime, 'minutes')
         return diff < 0 ? moment(currentDateTime).add(1, 'day') : currentDateTime 
      },
      reset(){
         this.type = 'REGULAR',
         this.date = {},
         this.timeIn = {},
         this.lunchStart = {},
         this.lunchEnd = {},
         this.timeOut = {},
         this.$refs.date.focus()
      },
      remove(item) {
            NProgress.start()
            const id = item.id
            axios.delete(`${baseApiUrl}/timesheet/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.fetch()
                    this.fetchReport()
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
      this.fetchDaily()
      this.fetchReport()
      this.fetchEmployee()
      this.$refs.date.focus()
    }
}
</script>

<style></style>
