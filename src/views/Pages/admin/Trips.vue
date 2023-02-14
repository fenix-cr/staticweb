<template>
  <div>
    <b-row style="row-gap: 17px">

      <b-col lg="3" sm="6">
        <router-link style="color: #6e6b7b" :to="{ name: 'reservations' }">
          <StatisticCardWithAreaChart statistic="Reservations" :chart-data="series" icon="BellIcon"
            statistic-title="View all reservations" :total-driver="allReservas" sub-all-driver="Reservations">
          </StatisticCardWithAreaChart>
        </router-link>
      </b-col>


      <!--Start  Book a Ride -->

      <b-col lg="3" sm="6">
        <router-link style="color: #6e6b7b" :to="{ name: 'book-a-ride' }">
          <StatisticCardWithAreaChart icon="TruckIcon" statistic="Book a ride" color="warning"
            :total-driver="allReservasBookingCanceled" sub-all-driver="Book a ride" :chart-data="ordersRecevied"
            statistic-title="schedule a booking"></StatisticCardWithAreaChart>
        </router-link>
      </b-col>

      <!--End  Book a Ride -->

    </b-row>

    <!--    <router-view></router-view>-->
  </div>
</template>

<script>
import { BButton, BCard, BCardText, BCol, BRow, } from 'bootstrap-vue'
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
      allReservas: 0,
      allReservasBookingCanceled: 0,

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
  methods: {
    getListAll() {
      this.$http.get(`admin/panel/booking/list_total_records`).then((response) => {
        this.allReservas = response.data.data;
      })
    },
    //Viajes Cancelados = 4
    getListBookingCanceled() {
      this.$http.get(`admin/panel/booking/list_total_records?status=4`).then((response) => {
        this.allReservasBookingCanceled = response.data.data;
      })
    }
  },
  mounted() {
    this.getListAll();
    this.getListBookingCanceled();
  }
}
</script>

<style lang="scss">
@import "src/assets/scss/variables/variables-components.scss";

@media only screen and (max-width: 600px) {
  .optrips {
    flex-direction: column;
  }
}
</style>
