<template>
  <div>
    <b-row class="row-container">
      <b-col lg="6" md="12">
        <b-card class="cols-12 card card-congratulations" text-variant="center">
          <!--      <b-card-text>All the best for your new project.</b-card-text>-->
          <!-- images -->

          <b-avatar variant="primary" size="70" class="shadow mb-2">
            <feather-icon size="28" icon="AwardIcon" />
          </b-avatar>
          <h1 class="mb-1 mt-50 text-white text-center">
            Welcome, {{ ($store.getters['Users/userData'].user)?($store.getters['Users/userData'].user.name):'' }}
          </h1>
          <b-card-text class="m-auto w-75 text-center pb-2">
            We are happy to have you!
          </b-card-text>
        </b-card>
      </b-col>
      <b-col lg="3" sm="6">
        <router-link style="color: #6e6b7b" :to="{ name: 'providers' }">
          <StatisticCardWithAreaChart statistic="See providers drivers" :chart-data="series" icon="UsersIcon"
            :total-driver="alldriver" sub-all-driver="Registered drivers"></StatisticCardWithAreaChart>
        </router-link>
      </b-col>

      <b-col lg="3" sm="6">
        <router-link style="color: #6e6b7b" :to="{ name: 'reservation-to-accepted' }">
          <StatisticCardWithAreaChart icon="CalendarIcon" statistic="Reservations to accept" color="warning"
            :chart-data="ordersRecevied" :total-driver="allReservas" sub-all-driver="Reservations pending acceptance">
          </StatisticCardWithAreaChart>
        </router-link>
      </b-col>
      <b-col lg="3" sm="6">
        <router-link style="color: #6e6b7b" :to="{ name: 'clients' }">
          <StatisticCardWithAreaChart icon="HomeIcon" statistic="See provider corporate accounts"
            :chart-data="ordersRecevied" :total-driver="allca" sub-all-driver="Registered corporate accounts">
          </StatisticCardWithAreaChart>
        </router-link>
      </b-col>
      <b-col lg="3" sm="6">
        <router-link style="color: #6e6b7b" :to="{ name: 'all-selfpaids' }">

          <StatisticCardWithAreaChart icon="UsersIcon" statistic="See SelfPay accounts" :chart-data="ordersRecevied"
            :total-driver="allSelfpaid" sub-all-driver="Registered SelfPay accounts"></StatisticCardWithAreaChart>
        </router-link>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import { BButton, BCard, BCardText, BCol, BRow, BImg, BAvatar, } from 'bootstrap-vue'
import StatisticCardWithAreaChart from "@core/components/statistics-cards/StatisticCardWithAreaChart";

export default {
  components: {
    BCard,
    BCardText,
    BButton,
    BCol,
    BRow,
    BImg,
    BAvatar,
    StatisticCardWithAreaChart,
  },

  data() {
    return {
      driversList: [],
      alldriver: 0,
      allca: 0,
      allReservas: 0,
      allSelfpaid: 0,
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
    getDrivers() {
      this.$http.get(`admin/panel/driver/provider/list`).then((response) => {
        this.driversList = response.data.data;
        this.alldriver = this.driversList.total
      }).catch((res) => {})
    },
    getCA() {
      this.$http.get(`admin/panel/ca/list`).then((response) => {
        this.listClients = response.data.data;
        this.allca = this.listClients.total;
        // console.log(this.allca)
      }).catch((res) => {})
    },
    getReservas() {
      this.$http.get(`admin/panel/booking/list?status=0`).then((response) => {
        let reservas = response.data.data;
        this.allReservas = reservas.total;
        // console.log(this.allca)
      }).catch((res) => {})
    },
    getSelfpaids() {
      this.$http.get(`admin/panel/selfpay/list?type=all`).then((response) => {
        this.allSelfpaid = response.data.data.total;
      }).catch((res) => {
        
      })
    }
  },

  mounted() {
    this.getDrivers();
    this.getCA();
    this.getReservas();
    this.getSelfpaids();

    //  console.log(hasPermission(this.$store.getters['Users/userData'].user.role.permission,"back-up-all-data"))
  }
}
</script>

<style lang="scss">
@import "src/assets/scss/variables/variables-components.scss";

.card {
  height: 100%;
  margin-bottom: 0 !important;
}

.row-container {
  row-gap: 10px;
}

@media only screen and (max-width: 600px) {
  .optrips {
    flex-direction: column;
  }

  .row-container {
    gap: 10px;
  }
}

@media only screen and (min-width: 601px) and (max-width: 940px) {
  .row-container {
    row-gap: 10px;
  }
}
</style>
