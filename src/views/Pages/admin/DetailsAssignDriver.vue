<template>
  <div class="cols-12 col-xl-12 " style="margin: 0 auto" v-if="infoPatient !== ''">
    <form-wizard color="#7367F0" :title="null" :subtitle="null" finish-button-text="Assign" back-button-text="Previous"
      class="steps-transparent mb-3 d-lg-flex d-xl-flex d-md-flex justify-content-center flex-xl-column formcreatepatient"
      @on-complete="" style="background-color: #fff" ref="assignDriver">
      <!-- personal details -->
      <tab-content title="Booking Information" icon="">
        <div v-if="infoPatient != null">
          <BookingReport :item="infoPatient"></BookingReport>
        </div>
      </tab-content>


      <!-- social link -->
      <tab-content title="Assign Driver" icon="">
        <b-row>
          <b-col cols="12" class="mb-2">
            <h5 class="mb-0">
              Filter Drivers
            </h5>
          </b-col>
          <b-col md="6" class="mb-2">

            <span style="display: block; margin-bottom: calc(0.438rem + 1px)">Filter By</span>
            <v-select v-model="selectedFilterType" :options="filterTypes" label="title"
              :class="{ red_border: fitlerTypeClass }" />
          </b-col>
          <b-col md="6" class="mb-2">

            <b-form-group label="Enter text">
              <b-form-input v-model="filterText" :class="{ red_border: filterTextClass }" style="font-weight: bold" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>

          <b-col cols="12" class="mb-2 text-right">
            <button class="btn btn-primary" @click="filterDrivers()">Filter</button>
          </b-col>
        </b-row>
        <b-row>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Driver Name</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th scope="col" class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(driver, index) in listDrivers" :key="index">
                <th>{{ driver.id }}</th>
                <td>{{ driver.name }} {{ driver.lastname }}</td>
                <td>
                  <span v-if='driver.work_cities[0]'>
                    <span v-for="(city, index) in driver.work_cities" :key="index">
                      <span
                        style="color: white;padding: 4px;margin: 5px;border-radius: 9px;background: green;">{{ city.city }}</span>
                    </span>
                  </span>
                </td>
                <td>
                  <span v-if='driver.work_cities[0]'>
                    <span v-for="(city, index) in driver.work_cities" :key="index">
                      <span
                        style="color: white;padding: 4px;margin: 5px;border-radius: 9px;background: green;">{{ city.state }}</span>
                    </span>
                  </span>
                </td>

                <td class="text-center"><button class="btn btn-primary"
                    @click="formSubmitted(driver.driver_id)">Assign</button></td>
              </tr>

            </tbody>
          </table>
        </b-row>
      </tab-content>
    </form-wizard>

  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import vSelect from 'vue-select'
import { getMessageError } from '@core/utils/utils'
import BookingReport from '@core/components/bookings/BookingReport'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormDatepicker,
  BFormTimepicker,
  BInputGroupPrepend,
  BInputGroup,
} from 'bootstrap-vue'



export default {
  name: 'DetailsAssignDriver',
  components: {
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormDatepicker,
    BFormTimepicker,
    BInputGroup,
    BInputGroupPrepend,
    vSelect,
    ToastificationContent,
    BookingReport
  },
  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    // 15th two months prior
    const minDate = new Date(today)
    minDate.setMonth(minDate.getMonth() - 2)
    minDate.setDate(15)
    // 15th in two months
    const maxDate = new Date(today)
    maxDate.setMonth(maxDate.getMonth() + 2)
    maxDate.setDate(15)
    return {
      dir: 'ltr',
      min: minDate,
      max: maxDate,
      // selected: null,
      option: [
        { title: 'Wait and return' },
        { title: 'Pharmacy stop' },
        { title: 'Additional stop' },
      ],

      listDrivers: [],
      filterTypes: [
        {
          title: 'State',
          value: 'state',
        },
        {
          title: 'City',
          value: 'city',
        },
      ],
      idDriver: '',
      drivers: {},
      carPlatenuber: '',
      modelVehicle: '',
      iterar: 0,
      infoPatient: null,
      reserva: {
        from: '',
        to: {
          from: '',
        },
      },
      editBooking: false,
      selectedFilterType: {},
      filterText: '',
      fitlerTypeClass: false,
      filterTextClass: false
    }
  },
  watch: {
    idDriver() {
      if (this.idDriver !== '') {
        this.getallDriver()
      }
    }
  },
  methods: {
    filterDrivers() {
      console.log(this.filterText, this.selectedFilterType.value)
      if (this.filterText == '' || this.selectedFilterType.value == undefined) {
        if (this.filterText == '') {
          this.filterTextClass = true
        } else {
          this.filterTextClass = false
        }
        if (this.selectedFilterType.value == undefined) {
          this.fitlerTypeClass = true
        } else {
          this.fitlerTypeClass = false
        }

      }
      else {
        this.filterTextClass = false
        this.fitlerTypeClass = false
        this.getFilteredDrivers()
      }

    },
    formSubmitted(driverId) {

      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },

      })
      this.$http.post(`admin/panel/booking/${this.infoPatient.id}/edit_driver/${driverId}`)
        .then((response) => {
          if (this.editBooking != null) {
            this.$router.push({ name: 'details-reservation', params: { id: this.infoPatient.id } })
          }

          this.$swal({
            title: response.data.message,
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
          this.$refs.assignDriver.reset()

        })
        .catch((error) => {
          this.$swal({
            title: getMessageError(error),
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
    },
    getFilteredDrivers() {
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },

      })
      let formData = new FormData();
      formData.append('selectedFilterType', this.selectedFilterType.value)
      formData.append('filterText', this.filterText)
      this.$http.post(`admin/panel/driver/listfiltered?availability=1`, formData)
        .then((response) => {
          this.listDrivers = response.data.data
          this.$swal.close();
        })
        .catch((res) => console.log(res.data))
    },
    getDrivers() {
      this.$http.get(`admin/panel/driver/list?availability=1`)
        .then((response) => {
          this.listDrivers = response.data.data
        })
        .catch((res) => console.log(res.data))
    },
    getallDriver() {
      // iterar el listado de driver para saber cual fue el seleccionado
      for (this.iterar of this.listDrivers) {
        // evaluar si el seleccionado coincide con uno de la lista
        if (this.idDriver === this.iterar.driver_id) {
          // si coincide guardar el resultado y mostrar la información de los datos del vehiculo
          this.drivers = this.iterar;
          this.modelVehicle = this.drivers.vehicle.model;
          this.carPlatenuber = this.drivers.vehicle.plate_number;
        }
      }
    },
    getPatients() {
      for (let infopaciente of this.$store.getters['Users/usersData']) {
        if (parseInt(this.$route.params.id) === infopaciente.id) {
          this.infoPatient = infopaciente;
          this.infoPatient.appoinment_datetime = this.infoPatient.appoinment_datetime.split(' ')[1]
        }
      }
    },
    getBookingById(bookingId) {
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },
      })
      this.$http.get(`admin/panel/booking/${bookingId}/info`).then((response) => {
        this.infoPatient = response.data.data
        this.infoPatient.appoinment_datetime = this.infoPatient.appoinment_datetime.split(' ')[1]
        this.reserva.from = JSON.parse(this.infoPatient.from).from;
        this.reserva.to = JSON.parse(this.infoPatient.to).to;
        console.log(this.infoPatient)
        this.$swal.close();
      }).catch((error) => {
        let message = getMessageError(error)
        console.log(message)
        this.$swal({
          title: message,
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      })
    },
  },
  computed: {},
  created() {
    this.getDrivers()
  },
  beforeUpdate() {

  },
  mounted() {
    this.editBooking = this.$route.params.edit_booking == null ? false : true
    let bookingId = this.$route.params.id

    this.getBookingById(bookingId)

  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.urlPagina {
  text-decoration: none;
}

.urlPagina:hover {
  background: linear-gradient(118deg, #7367f0, rgba(115, 103, 240, 0.7)) !important;
  color: #fff;
}

.list-group-item:hover {
  background: linear-gradient(118deg, #7367f0, rgba(115, 103, 240, 0.7)) !important;
  color: #fff !important;
}

.urlPagina::before {
  background-color: currentColor !important;
  bottom: 0;
  content: "";
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.box {
  box-shadow: 0px 14px 20px 0px rgba(143, 143, 143, 0.2) !important;
}

.red_border {
  // border-color:red;
  border: 1px solid red;
  border-radius: 6px;
}
</style>
