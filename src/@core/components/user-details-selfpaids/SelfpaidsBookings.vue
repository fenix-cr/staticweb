<template>
  <div v-if="dataBookingSelfpaid !== ''">
    <div class="text-right mb-2">
      <b-button class=" btn btn-primary ml-1" @click="exportToCsv">
           Export to CSV</b-button>
    </div>

    <h3>Booking</h3>
    
    <table  class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">From</th>
          <th scope="col">To</th>
          <th scope="col">Booking date</th>

          <th scope="col">Pickup time</th>
          <th scope="col">Price</th>
          <th scope="col">Surgery type</th>

          <th scope="col">Appoinment datetime</th>
          <th scope="col">Trip start</th>
          <th scope="col">Trip end</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bookings, i ,index) in dataBookingSelfpaid.booking" :key="index">
         <td><span class="">{{ i + 1 }}</span></td>
          <td>{{reserva.from.from}}</td>
          <td>{{reserva.to.to}}</td>
          <td>{{bookings.booking_date}}</td>

          <td>{{bookings.pickup_time}}</td>
          <td>{{'$ ' + bookings.price}}</td>
          <td>{{bookings.surgery_type}}</td>

          <td>{{bookings.appoinment_datetime}}</td>
          <td>{{bookings.trip_start}}</td>
          <td>{{bookings.trip_end}}</td>

          <td><router-link class="urlPagina"
              :to="{ name: 'details-booking', params: { id: bookings.id } }">Details
              </router-link>
          </td>
          
        </tr>
      
      </tbody>
    </table>
   
    


  </div>
</template>

<script>
import {
  BButton,
  BMedia,
  BAvatar,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BForm,
  BTable,
  BCard,
  BCardHeader,
  BCardTitle,
  BFormCheckbox,
  BFormSelect,
  VBTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  name: "SelfpaidsBookings",
  components: {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BForm,
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
    BFormSelect,
    vSelect,
  },
  data() {
    return {
      reserva: {
        from: '',
        to: {
          from: '',
        },
      },
      dataBookingSelfpaid: {}
    }
  },
  mounted() {
    this.dataBookingSelfpaid = this.$store.getters['Users/usersData'];
    for (let bookingKey of this.$store.getters['Users/usersData'].booking) {
      this.reserva.from = JSON.parse(bookingKey.from);
    }
    for (let bookingTo of this.$store.getters['Users/usersData'].booking) {
      this.reserva.to = JSON.parse(bookingTo.to);
    }
  },
  methods:{
    exportToCsv(){
      this.$swal({
                title: 'Please, wait...',
                didOpen: () => {
                    this.$swal.showLoading()
                }
            })
      let j = JSON.stringify(this.dataBookingSelfpaid);
      let formData = new FormData();

            formData.append("data", j);
            this.$http.post(`admin/panel/download/mastercsv`,formData)
                .then((response) => {
                    console.log('response.data.data: ',response.data.data)
                    let blob = new Blob([response.data], {
                            type: 'application/csv'
                        })
                        let link = document.createElement('a')
                        link.href = window.URL.createObjectURL(blob)
                        link.download = 'download.csv'
                        link.click()
                        this.$swal.close()
                   
                }).catch((error) => {
                    console.log(error)
                })
    }
  }
  // beforeUpdate() {
  //   for (let bookingKey of this.$store.getters['Users/usersData'].booking) {
  //     console.log(JSON.parse(bookingKey.from))
  //     this.reserva.from = JSON.parse(bookingKey.from);
  //   }
  //   for (let bookingTo of this.$store.getters['Users/usersData'].booking) {
  //     console.log(JSON.parse(bookingTo.to))
  //     this.reserva.to = JSON.parse(bookingTo.to);
  //   }
  // }
}
</script>

<style scoped>
.circle-number-additional {
  background-color: #332b7b;
  padding: 5px 12px;
  border-radius: 16px;
  color: white;

}
</style>