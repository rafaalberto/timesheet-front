<template>
    <div>
        <h3 class="title">Lançamentos</h3>
        <br>
        <div class="box box-default">
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#hours" data-toggle="tab">Horas</a></li>
                    <li><a href="#bonus" data-toggle="tab">Bonificações</a></li>
                    <li><a href="#report" data-toggle="tab">Resumo</a></li>
                </ul>
                <div class="tab-content">
                    <div class="active tab-pane" id="hours">
                        <TimesheetHours :employeeId="{employeeParam}" :year="{yearParam}" :month="{monthParam}" />
                    </div>
                    <div class="tab-pane" id="bonus">
                        <TimesheetBonus :employeeId="{employeeParam}" :year="{yearParam}" :month="{monthParam}" />
                    </div>
                    <div class="tab-pane" id="report">
                        <TimesheetReport :employeeId="{employeeParam}" :year="{yearParam}" :month="{monthParam}" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TimesheetHours from '@/components/admin/TimesheetHours'
    import TimesheetBonus from '@/components/admin/TimesheetBonus'
    import TimesheetReport from '@/components/admin/TimesheetReport'
    export default {
        name: 'TimesheetForm',
        components: { TimesheetHours, TimesheetBonus, TimesheetReport },
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
            }
        }
    }
</script>

<style></style>