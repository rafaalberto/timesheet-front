<template>
  <div>
    <div class="box-body">
      <h3 class="box-title gray-color">
        <i class="fa fa-table"></i> &nbsp;Lançamento de Horas
      </h3>
      <br />
      <br />
      <form class="form-horizontal">
        <div class="row">
          <label class="col-xs-1 control-label" for="dayOfMonth">Dia</label>
          <div class="col-xs-2">
            <select
              class="form-control"
              name="dayOfMonth"
              id="dayOfMonth"
              v-model="dayOfMonth"
              ref="dayOfMonth"
            >
              <option v-for="day in days" :key="day">{{ day }}</option>
            </select>
          </div>
          <label class="col-xs-1 control-label" for="type">Tipo</label>
          <div class="col-xs-2">
            <select class="form-control" name="type" id="type" v-model="type">
              <option value="REGULAR">Normal</option>
              <option value="DAY_OFF">Folga</option>
              <option value="HOLIDAY">Feriado</option>
              <option value="VACATION">Férias</option>
              <option value="OCCURRENCE">Ocorrência</option>
            </select>
          </div>
          <label class="col-xs-1 control-label" for="notes">Observações</label>
          <div class="col-xs-3">
            <input
              type="text"
              class="form-control"
              id="notes"
              name="notes"
              maxlength="30"
              v-model="timesheet.notes"
            />
          </div>
        </div>
        <br />
        <div class="row">
          <label class="col-xs-1 control-label" for="timeIn">Hr Inicial</label>
          <div class="col-xs-2">
            <input
              type="text"
              class="form-control"
              id="timeIn"
              name="timeIn"
              v-model="timeIn"
              v-mask="'##:##'"
            />
          </div>
          <label class="col-xs-1 control-label" for="lunchStart">Hr Final</label>
          <div class="col-xs-2">
            <input
              type="text"
              class="form-control"
              id="lunchStart"
              name="lunchStart"
              v-model="lunchStart"
              v-mask="'##:##'"
            />
          </div>
          <label class="col-xs-1 control-label" for="lunchEnd">Hr Inicial</label>
          <div class="col-xs-2">
            <input
              type="text"
              class="form-control"
              id="lunchEnd"
              name="lunchEnd"
              v-model="lunchEnd"
              v-mask="'##:##'"
            />
          </div>
          <label class="col-xs-1 control-label" for="timeOut">Hr Final</label>
          <div class="col-xs-2">
            <input
              type="text"
              class="form-control"
              id="timeOut"
              name="timeOut"
              v-model="timeOut"
              v-mask="'##:##'"
            />
          </div>
        </div>
        <br />
        <div class="row">
          <label class="col-xs-1 control-label"></label>
          <div class="col-xs-2">
            <button type="submit" class="btn btn-primary" @click.prevent="save">
              <i class="fa fa-save" aria-hidden="true"></i>&nbsp;&nbsp;Salvar
            </button>&nbsp;
          </div>
        </div>
      </form>
    </div>
    <div class="box-body table-responsive">
      <b-table
        responsive
        striped
        bordered
        :items="timesheets"
        :fields="fields"
        show-empty
        empty-text="Dados não encontrados"
      >
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
            <b-button class="mr-2 btn btn-primary" @click="openDeleteModal(data.item)">
              <i class="fa fa-remove"></i>
            </b-button>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import eventBus from "@/eventBus";
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
import moment from "moment";
import NProgress from "nprogress";
export default {
  name: "TimesheetHours",
  props: {
    employeeId: Object,
    year: Object,
    month: Object,
    costHour: Object,
    dangerousness: Object,
    period: Object
  },
  data() {
    return {
      timesheet: {},
      timesheets: [],
      dayOfMonth: 1,
      quantityDaysOfMonth: 30,
      date: {},
      days: [],
      type: "REGULAR",
      timeIn: {},
      lunchStart: {},
      lunchEnd: {},
      timeOut: {},
      notes: {},
      fields: [
        {
          key: "date",
          label: "Data",
          thStyle: "width: 8%"
        },
        {
          key: "type",
          label: "Descrição",
          thStyle: "width: 28%"
        },
        {
          key: "entry",
          label: "Registros",
          thStyle: "width: 15%"
        },
        {
          key: "hoursWorked",
          label: "H. Trab",
          thStyle: "text-align:center;width: 6%"
        },
        {
          key: "hoursJourney",
          label: "Jornada",
          thStyle: "text-align:center;width: 6%"
        },
        {
          key: "extraHours",
          label: "H. Extras",
          thStyle: "text-align:center;width: 7%"
        },
        {
          key: "weeklyRest",
          label: "DSR",
          thStyle: "text-align:center;width: 6%"
        },
        {
          key: "sumula90",
          label: "S.90",
          thStyle: "text-align:center;width: 6%"
        },
        {
          key: "nightShift",
          label: "ADN",
          thStyle: "text-align:center;width: 6%"
        },
        {
          key: "paidNightTime",
          label: "HNR",
          thStyle: "text-align:center;width: 6%"
        },
        {
          key: "delete",
          label: "Excluir",
          thStyle: "text-align: center; width: 5%"
        }
      ]
    };
  },
  methods: {
    fetchDays() {
      const { yearParam } = this.year;
      const { monthParam } = this.month;

      let monthWith30Days = ["4", "6", "9", "11"];
      let monthWith31Days = ["1", "3", "5", "7", "8", "10", "12"];

      if (monthWith31Days.includes(monthParam)) {
        this.quantityDaysOfMonth = 31;
      } else if (monthWith30Days.includes(monthParam)) {
        this.quantityDaysOfMonth = 30;
      } else {
        let isLeap = new Date(yearParam, 1, 29).getDate();
        if (isLeap === 29) {
          this.quantityDaysOfMonth = 29;
        } else {
          this.quantityDaysOfMonth = 28;
        }
      }

      for (let day = 1; day <= this.quantityDaysOfMonth; day++) {
        this.days.push(day);
      }
    },
    fetchDaily() {
      const { employeeParam } = this.employeeId;
      const { yearParam } = this.year;
      const { monthParam } = this.month;
      const asc = false;

      const url = `${baseApiUrl}/timesheet/daily/${employeeParam}/${yearParam}/${monthParam}/${asc}`;
      axios
        .get(url)
        .then(response => (this.timesheets = response.data))
        .catch(showError);

      eventBus.$emit("dataChanged");
    },
    save() {
      this.setDateTime();
      const { employeeParam } = this.employeeId;
      const { yearParam } = this.year;
      const { monthParam } = this.month;
      const { costHourParam } = this.costHour;
      const { dangerousness } = this.dangerousness;
      const { periodParam } = this.period;

      this.timesheet.employeeId = employeeParam;
      this.timesheet.yearReference = yearParam;
      this.timesheet.monthReference = monthParam;
      this.timesheet.period = periodParam;

      this.lunchStart = this.fetchDateTime(this.lunchStart, this.timeIn);
      this.lunchEnd = this.fetchDateTime(this.lunchEnd, this.lunchStart);
      this.timeOut = this.fetchDateTime(this.timeOut, this.lunchEnd);

      const dateTimeFormat = "YYYY-MM-DD HH:mm";
      this.timesheet.type = this.type;

      this.timesheet.hoursJourney = "07:20";
      this.timesheet.sumula90 = "01:00";
      this.timesheet.costHour = costHourParam;
      this.timesheet.dangerousness = dangerousness;

      if (
        this.timesheet.type === "REGULAR" ||
        this.timesheet.type === "HOLIDAY"
      ) {
        this.timesheet.timeIn = moment(this.timeIn).format(dateTimeFormat);
        this.timesheet.lunchStart = moment(this.lunchStart).format(
          dateTimeFormat
        );
        this.timesheet.lunchEnd = moment(this.lunchEnd).format(dateTimeFormat);
        this.timesheet.timeOut = moment(this.timeOut).format(dateTimeFormat);
      } else if (
        this.timesheet.type === "DAY_OFF" ||
        this.timesheet.type === "VACATION" ||
        this.timesheet.type === "OCCURRENCE"
      ) {
        this.timeIn = new Date(`${this.date} 00:00`);
        this.timesheet.timeIn = moment(this.timeIn).format(dateTimeFormat);
        this.timesheet.lunchStart = moment(this.timeIn).format(dateTimeFormat);
        this.timesheet.lunchEnd = moment(this.timeIn).format(dateTimeFormat);
        this.timesheet.timeOut = moment(this.timeIn).format(dateTimeFormat);
        this.timesheet.sumula90 = "00:00";
      }

      const method = "post";
      const url = `${baseApiUrl}/timesheet`;
      axios[method](url, this.timesheet)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
          this.fetchDaily();
        })
        .catch(showError);
      (this.timeIn = {}),
        (this.lunchStart = {}),
        (this.lunchEnd = {}),
        (this.timeOut = {});
    },
    setDateTime() {
      const { yearParam } = this.year;
      const { monthParam } = this.month;

      this.date = this.dayOfMonth + "/" + monthParam + "/" + yearParam;
      const split = this.date.split("/");
      this.date = `${split[2]}/${split[1]}/${split[0]}`;
      this.timeIn = new Date(`${this.date} ${this.timeIn}`);
      this.lunchStart = new Date(`${this.date} ${this.lunchStart}`);
      this.lunchEnd = new Date(`${this.date} ${this.lunchEnd}`);
      this.timeOut = new Date(`${this.date} ${this.timeOut}`);
    },
    fetchDateTime(currentDateTime, previousDateTime) {
      const diff = moment(currentDateTime).diff(previousDateTime, "minutes");
      return diff < 0 ? moment(currentDateTime).add(1, "day") : currentDateTime;
    },
    reset() {
      (this.type = "REGULAR"),
        (this.date = {}),
        (this.dayOfMonth = 1),
        (this.timeIn = {}),
        (this.lunchStart = {}),
        (this.lunchEnd = {}),
        (this.timeOut = {}),
        (this.timesheet.notes = ""),
        this.$refs.dayOfMonth.focus();
    },
    remove(item) {
      NProgress.start();
      const id = item.id;
      axios
        .delete(`${baseApiUrl}/timesheet/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
          this.fetchDaily();
        })
        .catch(showError);
      NProgress.done();
    },
    openDeleteModal(item) {
      this.$bus.$emit("modal-open", {
        title: "Exclusão",
        description: "Deseja realmente excluir este registro?",
        type: "modal-primary",
        confirmText: "Confirmar",
        cancelText: "Cancelar",
        confirmBefore: () => {
          this.remove(item);
        },
        confirmAfter: () => {},
        cancelBefore: () => {},
        cancelAfter: () => {},
        clickOverlay: () => {}
      });
    }
  },
  mounted() {
    this.fetchDays();
    this.fetchDaily();
    this.$refs.dayOfMonth.focus();
  }
};
</script>

<style></style>