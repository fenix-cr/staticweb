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
            Welcome, {{ $store.getters["Users/userData"].user.name }}
          </h1>
          <b-card-text class="m-auto w-75 text-center pb-2">
            We are happy to have you!
          </b-card-text>
        </b-card>
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
  BImg,
  BAvatar,
} from "bootstrap-vue";
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
    return {};
  },
  methods: {},

  mounted() {},
};
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
  