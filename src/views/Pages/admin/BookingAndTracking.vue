<template>
  <div>
    <b-row>
      <!-- <b-col
          lg="3"
          sm="6"
      >
        <router-link style="color: #6e6b7b" :to="{name:'approve-drivers'}">
          <StatisticCardWithAreaChart
              icon="CheckCircleIcon"
              statistic="Approved drivers"
              :chart-data="ordersRecevied"
              statistic-title="Viewall approved drivers"
              :total-driver="null"
              sub-all-driver="null"
          ></StatisticCardWithAreaChart>
        </router-link>
      </b-col> -->
      <b-col
          lg="3"
          sm="6"
      >
        <router-link style="color: #6e6b7b" :to="{name:'assign-driver'}">
          <StatisticCardWithAreaChart
              statistic="Assign driver"
              :chart-data="series"
              icon="UserCheckIcon"
              color="warning"
              statistic-title="Start booking a ride for your patients"
              :total-driver="null"
              sub-all-driver="null"
          ></StatisticCardWithAreaChart>
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BButton,
  BCard,
  BCardText,
  BCol,
  BRow,
} from 'bootstrap-vue'
import StatisticCardWithAreaChart from "@core/components/statistics-cards/StatisticCardWithAreaChart";
export default {
  components: {
    BCard,
    BCardText,
    BButton,
    BCol,
    BRow,

    StatisticCardWithAreaChart,
  },
  data() {
    return {
      series: [
        {
          name: '',
          data: [28, 40, 36, 52, 38, 60, 55],
        },
      ],
      ordersRecevied: [
        {
          name: '',
          data: [10, 15, 8, 15, 7, 12, 8],
        },
      ],
    }
  },
}
</script>

<style lang="scss">
@import "src/assets/scss/variables/variables-components.scss";
@media only screen and (max-width: 600px) {
  .opbooking {
    flex-direction: column;
  }
}
</style>
