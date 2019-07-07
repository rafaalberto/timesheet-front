<template>
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
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <br>
        <b-table responsive striped bordered :items="reports" :fields="fieldsReport">
            <template slot="hoursWorked" slot-scope="data">
                <div class="text-center-align">{{data.item.hoursWorked}}</div>
            </template>
        </b-table>
    </div>                
</template>

<script>
    import axios from 'axios'
    import { baseApiUrl, showError} from '@/global'
    export default {
        name: 'TimesheetReport',
        props: {
            employeeId: Object,
            year: Object,
            month: Object
        },
        data() {
            return {
                reports: [],
                fieldsReport: [{
                    key: 'typeCode',
                    label: 'Código',
                    thStyle: 'width: 10%'
                }, {
                    key: 'typeDescription',
                    label: 'Tipo',
                    thStyle: 'width: 20%'
                }, {
                    key: 'totalHoursFormatted',
                    label: 'Total horas',
                    thStyle: 'width: 20%'
                }, {
                    key: 'totalCost',
                    label: 'Total custo',
                    thStyle: 'width: 20%'
                }, ]
            }
        },
        methods: {
            fetchReport() {
                const { employeeParam } = this.employeeId
                const { yearParam } = this.year
                const { monthParam } = this.month
  
                const url = `${baseApiUrl}/timesheet/docket/${employeeParam}/${yearParam}/${monthParam}`
                axios.get(url)
                .then(response => this.reports = response.data)
                .catch(showError)
            }
        },
        mounted() {
            this.fetchReport()
        }
    }
</script>

<style></style>