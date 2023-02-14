<template>
  <b-card no-body>
    <b-card-body class="pb-6">
      <b-avatar
          class="mb-1"
          :variant="`light-${color}`"
          size="45"
      >
        <feather-icon
            size="21"
            :icon="icon"
        />
      </b-avatar>
      <div class="truncate">
        <h2 class="mb-25 font-weight-bolder">
          {{ statistic }}
        </h2>
        <span>{{ statisticTitle }}</span>


        <div v-if="totalDriver !== null" class="d-flex justify-content-center flex-column align-items-center pt-4">
          <span class="d-block pb-1">{{ subAllDriver }}</span>
          <div :class="totalDriver > 100 ? 'container-numero-may' : 'container-numero'">
              {{ totalDriver }}
          </div>
        </div>

      </div>
    </b-card-body>

    <!--    <vue-apex-charts-->
    <!--      type="area"-->
    <!--      height="100"-->
    <!--      width="100%"-->
    <!--      :options="chartOptionsComputed"-->
    <!--      :series="chartData"-->
    <!--    />-->

  </b-card>
</template>

<script>
import {BCard, BCardBody, BAvatar} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import {$themeColors} from '@themeConfig'
import {areaChartOptions} from './chartOptions'

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardBody,
    BAvatar,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    statistic: {
      type: [Number, String],
      required: true,
    },
    statisticTitle: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
    chartData: {
      type: Array,
      default: () => [],
    },
    chartOptions: {
      type: Object,
      default: null,
    },
    totalDriver: {
      type: Number,
      default: 0
    },
    subAllDriver:{
      type: String,
      default: ''
    }
  },
  computed: {
    chartOptionsComputed() {
      if (this.chartOptions === null) {
        const options = JSON.parse(JSON.stringify(areaChartOptions))
        options.theme.monochrome.color = $themeColors[this.color]
        return options
      }
      return this.chartOptions
    },
  },
}
</script>

<style scoped>
/*.truncate {*/
/*  padding-bottom: 74px;*/
/*}*/
/*@media only screen and (min-width: 600px) and (max-width: 1280px) {*/
/*  .truncate {*/
/*    padding-bottom: 54px;*/
/*  }*/
/*}*/

.card-body  >  .truncate > div  {
  transition: transform 1s ease;
}
.card-body:hover >  .truncate > div > .container-numero, .container-numero-may {
  transform: scale3d(1.1, 1.1, 1.1);

}
.container-numero {
  text-align: center;
  font-size: 3rem;
  border-radius: 100%;
  background-color: #948bf2;
  width: 68px;
  color: white;
  box-shadow: 0 0 7px #7367f0;
  transition: transform 1s ease;
}
/*.container-numero:hover {*/
/*  transform: scale3d(1.1, 1.1, 1.1);*/
/*}*/
.container-numero-may {
  text-align: center;
  font-size: 3rem;
  border-radius: 5px;
  background-color: #948bf2;
  width: auto;
  padding: 10px;
  color: white;
  box-shadow: 0 0 7px #7367f0;
}
/*.container-numero-may:hover {*/
/*  transform: scale3d(1.1, 1.1, 1.1);*/
/*}*/
</style>
