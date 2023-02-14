<template>
  <div>
    <b-row>
      <b-col xl="4">
        <overview></overview>
      </b-col>
      <b-col xl="4">
        <overview></overview>
      </b-col>
      <b-col xl="4">
        <overview></overview>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <solicitudes></solicitudes>
      </b-col>
      <b-col>
        <customers></customers>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BCard, BCardHeader, BRow, BCol, BCardText,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import {$themeColors} from '@themeConfig'
// import Overview from "@/layouts/components/estadisticas/Overview.vue";
// import Solicitudes from "@/layouts/components/estadisticas/Solicitudes.vue";
// import Customers from "@/layouts/components/estadisticas/Customers";
export default {
  components: {
    VueApexCharts,
    BCard,
    BCardHeader,
    BRow,
    BCardText,
    BCol,
    Overview,
    Solicitudes,
    Customers,
  },
  data() {
    return {
      goal_overview: {},
      goalOverviewRadialBar: {
        series: [83],
        chartOptions: {
          chart: {
            sparkline: {
              enabled: true,
            },
            dropShadow: {
              enabled: true,
              blur: 3,
              left: 1,
              top: 1,
              opacity: 0.1,
            },
          },
          colors: ['#51e5a8'],
          plotOptions: {
            radialBar: {
              offsetY: -10,
              startAngle: -150,
              endAngle: 150,
              hollow: {
                size: '77%',
              },
              track: {
                background: '#ebe9f1',
                strokeWidth: '50%',
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  color: '#5e5873',
                  fontSize: '2.86rem',
                  fontWeight: '600',
                },
              },
            },
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: 'horizontal',
              shadeIntensity: 0.5,
              gradientToColors: [$themeColors.success],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100],
            },
          },
          stroke: {
            lineCap: 'round',
          },
          grid: {
            padding: {
              bottom: 30,
            },
          },
        },
      },
    }
  },
  created() {
    this.$http.get('/card/card-analytics/goal-overview').then(res => {
      this.goal_overview = res.data
    })
  },
}
</script>
