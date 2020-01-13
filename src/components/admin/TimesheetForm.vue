<template>
  <div>
    <h3 class="title">Lançamentos</h3>
    <div class="box box-default">
      <div class="box-header with-border">
        <h3 class="box-title" style="color: gray;">
          <i class="fa fa-user"></i> &nbsp;Colaborador
        </h3>
      </div>
      <div class="form-horizontal box-body">
        <div class="row">
          <label class="col-xs-1 control-label" for="employee">Colaborador</label>
          <div class="col-xs-4">
            <input
              type="text"
              class="form-control"
              id="employee"
              name="employee"
              v-model="employee.name"
              readonly
            />
          </div>
          <label class="col-xs-1 control-label" for="recordNumber">Registro</label>
          <div class="col-xs-2">
            <input
              type="text"
              class="form-control"
              id="recordNumber"
              name="recordNumber"
              v-model="employee.recordNumber"
              readonly
            />
          </div>
          <label class="col-xs-1 control-label" for="period">Referência</label>
          <div class="col-xs-2">
            <input
              type="text"
              class="form-control"
              id="period"
              name="period"
              v-model="period"
              readonly
            />
          </div>
        </div>
        <br />
        <div class="row">
          <label class="col-xs-1 control-label" for="company">Empresa</label>
          <div class="col-xs-4">
            <input
              type="text"
              class="form-control"
              id="company"
              name="company"
              v-model="employee.company.name"
              readonly
            />
          </div>
          <label class="col-xs-1 control-label" for="position">Cargo</label>
          <div class="col-xs-4">
            <input
              type="text"
              class="form-control"
              id="position"
              name="position"
              v-model="employee.position.title"
              readonly
            />
          </div>
        </div>
      </div>
    </div>
    <div class="box box-default">
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active">
            <a href="#hours" data-toggle="tab">Horas</a>
          </li>
          <li>
            <a href="#bonus" data-toggle="tab">Bonificações</a>
          </li>
          <li>
            <a href="#report" data-toggle="tab">Resumo</a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="active tab-pane" id="hours">
            <TimesheetHours
              :employeeId="{employeeParam}"
              :year="{yearParam}"
              :month="{monthParam}"
              :costHour="{costHourParam}"
              :dangerousness="{dangerousness}"
              :period="{periodParam}"
            />
          </div>
          <div class="tab-pane" id="bonus">
            <TimesheetBonus
              :employeeId="{employeeParam}"
              :year="{yearParam}"
              :month="{monthParam}"
            />
          </div>
          <div class="tab-pane" id="report">
            <TimesheetDocket
              :employeeId="{employeeParam}"
              :year="{yearParam}"
              :month="{monthParam}"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="box-footer">
      <div class="col-sm-9 col-sm-offset-1">
        <button type="button" class="btn btn-default" @click.prevent="back">
          <i class="fa fa-mail-reply" aria-hidden="true"></i>&nbsp;Voltar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
import TimesheetHours from "@/components/admin/TimesheetHours";
import TimesheetBonus from "@/components/admin/TimesheetBonus";
import TimesheetDocket from "@/components/admin/TimesheetDocket";
export default {
  name: "TimesheetForm",
  components: { TimesheetHours, TimesheetBonus, TimesheetDocket },
  props: {
    employeeId: Object,
    year: Object,
    month: Object,
    period: Object
  },
  data() {
    return {
      employeeParam: this.$route.params.employeeId,
      yearParam: this.$route.params.year,
      monthParam: this.$route.params.month,
      periodParam: this.$route.params.period,
      costHourParam: 0,
      dangerousness: false,
      periodMonth: [],
      employee: {
        company: {},
        position: {}
      }
    };
  },
  methods: {
    fetchEmployee() {
      const url = `${baseApiUrl}/employees/${this.employeeParam}`;
      axios
        .get(url)
        .then(response => {
          this.employee = response.data;
          this.costHourParam = this.employee.costHour;
          this.dangerousness = this.employee.position.dangerousness;
        })
        .catch(showError);
    },
    fetchPeriod() {
      const monthNames = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ];
      this.periodMonth =
        monthNames[this.$route.params.month - 1] +
        "/" +
        this.$route.params.year;
    },
    back() {
      this.$router.push({ path: "/employeeSearch" });
    }
  },
  mounted() {
    this.fetchEmployee();
    this.fetchPeriod();
  }
};
</script>

<style></style>