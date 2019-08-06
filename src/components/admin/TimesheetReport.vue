<template>
    <div>
        <div class="section-no-print">
            <h3 class="title">Relatório</h3>
            <div class="btn-new">
                <button class="btn btn-primary" @click="print">
                    <i class="fa fa-print"><span class="text-font">&nbsp;&nbsp;Imprimir</span></i>
                </button>
            </div>
        </div>
        <br>
        <div class="section-to-print">
            <table class="table">
                <tr>
                    <td colspan="10" class="report-cell title">{{ employee.company.name }}</td>
                </tr>
                <tr>
                    <td colspan="5" class="report-cell">{{ employee.name }}</td>
                    <td colspan="3" class="report-cell">REGISTRO {{ employee.recordNumber }}</td>
                    <td colspan="2" class="report-cell">REF. {{ period }}</td>
                </tr>
                <tr>
                    <td colspan="4" class="report-cell">Função {{ employee.position.title }}</td>
                    <td colspan="2" class="report-cell">C. Custo {{ employee.costCenter }}</td>
                    <td colspan="2" class="report-cell">Valor Hora: {{ employee.costHourFormatted }}</td>
                    <td colspan="2" class="report-cell">H. Base 220</td>
                </tr>
            </table>
            <table class="table">
            <tr>
                <td class="report-cell">Data</td>
                <td class="report-cell">Tipo</td>
                <td class="report-cell">Jornada</td>
                <td class="report-cell">H. Trab</td>
                <td class="report-cell">Jornada</td>
                <td class="report-cell">H. Extras</td>
                <td class="report-cell">D.S.R.</td>
                <td class="report-cell">S.90</td>
                <td class="report-cell">A.D.N.</td>
                <td class="report-cell">H.R.N.</td>
            </tr>
            <tr v-for="timesheet in timesheets" :key="timesheet.id">
                    <td class="report-cell"> {{ timesheet.date }} </td>
                    <td class="report-cell"> {{ timesheet.type }} </td>
                    <td class="report-cell"> {{ timesheet.entry }} </td>
                    <td class="report-cell"> {{ timesheet.hoursWorked }} </td>
                    <td class="report-cell"> {{ timesheet.hoursJourney }} </td>
                    <td class="report-cell"> {{ timesheet.extraHours }} </td>
                    <td class="report-cell"> {{ timesheet.weeklyRest }} </td>
                    <td class="report-cell"> {{ timesheet.sumula90 }} </td>
                    <td class="report-cell"> {{ timesheet.nightShift }} </td>
                    <td class="report-cell"> {{ timesheet.paidNightTime }} </td>
            </tr>
        </table>
        <table class="table">
            <tr>
                <td class="report-cell"><b>Valor hora</b></td>
                <td class="report-cell"><b>100%</b></td>
                <td class="report-cell"><b>50%</b></td>
                <td class="report-cell"><b>20%</b></td>
            </tr>
            <tr>
                <td class="report-cell">{{ report.regularPriceFormatted }}</td>
                <td class="report-cell">{{ report.hundredPercentFormatted }}</td>
                <td class="report-cell">{{ report.fiftyPercentFormatted }}</td>
                <td class="report-cell">{{ report.twentyPercentFormatted }}</td>
            </tr>
        </table>
        <table class="table">
            <tr>
                <td class="report-cell">Evento</td>
                <td class="report-cell">Descrição</td>
                <td class="report-cell">Qt. Horas</td>
                <td class="report-cell">Vlr (R$)</td>
            </tr>
            <tr v-for="item in report.items" :key="item.typeCode">
                <td class="report-cell"> {{ item.typeCode }} </td>
                <td class="report-cell"> {{ item.typeDescription }} </td>
                <td class="report-cell"> {{ item.totalHoursFormatted }} </td>
                <td class="report-cell"> {{ item.totalCostFormatted }} </td>
            </tr>
            <tr>
                <td colspan="3" class="report-cell"> Total de Vencimentos Brutos </td>
                <td class="report-cell"> {{ report.totalFormatted }} </td>
            </tr>
        </table>
        </div>
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
                employeeParam: this.$route.params.employeeId,
                yearParam: this.$route.params.year,
                monthParam: this.$route.params.month,
                period: {},
                employee: {
                    company: {},
                    position: {}
                },
                timesheets: [],
                report: {
                    items: []
                },
            }
        },
        methods: {
            fetchEmployee() {
                const url = `${baseApiUrl}/employees/${this.employeeParam}`
                axios.get(url).then(response => {
                    this.employee = response.data
                    this.costHourParam = this.employee.costHour
                })
                .catch(showError)
            },
            fetchPeriod() {
                const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
                this.period = monthNames[this.$route.params.month - 1] + '/' + this.$route.params.year
            },
            fetchDaily() {
                const asc = true
                const url = `${baseApiUrl}/timesheet/daily/${this.employeeParam}/${this.yearParam}/${this.monthParam}/${asc}`
                axios.get(url).then(response => this.timesheets = response.data)
                .catch(showError)
            },
            fetchBonuses() {
                const { employeeParam } = this.employeeId
                const { yearParam } = this.year
                const { monthParam } = this.month
  
                const url = `${baseApiUrl}/bonus/${employeeParam}/${yearParam}/${monthParam}`
                axios.get(url).then(response => this.bonuses = response.data)
                .catch(showError)
            },
            fetchBonuses() {
                const url = `${baseApiUrl}/timesheet/docket/${this.employeeParam}/${this.yearParam}/${this.monthParam}`
                axios.get(url)
                .then(response => this.report = response.data)
                .catch(showError)
            },
            print() {
                window.print()  
            }
        },
        mounted() {
            this.fetchEmployee()
            this.fetchPeriod()
            this.fetchDaily()
            this.fetchBonuses()
        }
    }
</script>

<style>
    @page {
        margin: 0;
    }

    @media print {
        .section-no-print {
            display: none;
        }
        .section-to-print {
            display: block;;
        }        
    }

    .title {
        font-size: 18px;
        font-weight: bold;
    }

    .gray-screen {
        color: gray
    }

    .report-cell {
        border: 1px solid black;
        text-align: center;
    }

    .table-border {
        border: 1px solid black;
    }

</style>