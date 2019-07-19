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
                    <td>{{ report.regularPriceFormatted }}</td>
                    <td>{{ report.hundredPercentFormatted }}</td>
                    <td>{{ report.fiftyPercentFormatted }}</td>
                    <td>{{ report.twentyPercentFormatted }}</td>
                </tr>
            </tbody>
        </table>
        <br>
        <b-table responsive striped bordered :items="report.items" :fields="fieldsReport">
        </b-table>
        <div class="total-label">Total de vencimentos brutos:&nbsp;&nbsp; <b>{{ report.totalFormatted }}</b></div>
    </div>                
</template>

<script>
    import eventBus from '@/eventBus'
    import axios from 'axios'
    import { baseApiUrl, showError} from '@/global'
    export default {
        name: 'TimesheetDocket',
        props: {
            employeeId: Object,
            year: Object,
            month: Object
        },
        data() {
            return {
                report: {
                    items: []
                },
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
                    key: 'totalCostFormatted',
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
                .then(response => this.report = response.data)
                .catch(showError)
            }
        },
        created() {
            eventBus.$on('dataChanged', () => this.fetchReport())
        },
        mounted() {
            this.fetchReport()
        }
    }
</script>

<style>
    .total-label {
        font-size: 16px;
    }
</style>