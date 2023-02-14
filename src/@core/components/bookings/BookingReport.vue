
<template>
  <div class="cols-12 col-xl-12 " style="margin: 0 auto">
    <!-- Applicant -->
    <div v-if="dataCa!=null">
      <b-row class="invoice-heading">
        <b-col md="12">
          <h3 class="">Account Corporate</h3>
        </b-col>
      </b-row>
      <b-row class="row-data">
        <b-col md="4">
          <h4 class="">Name</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ dataCa.amera_user.name }}</h4>
        </b-col>
      </b-row>
      <b-row class="row-data">
        <b-col md="4">
          <h4 class="">Company Name</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ dataCa.company_legal_name }}</h4>
        </b-col>
      </b-row>
      <b-row class="row-data">
        <b-col md="4">
          <h4 class="">Contact Number</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ dataCa.corporate_account_personal_info.telephone_number }}</h4>
        </b-col>
      </b-row>
      <b-row class="row-data">
        <b-col md="4">
          <h4 class="">Email</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ dataCa.amera_user.email }}</h4>
        </b-col>
      </b-row>
    </div>



    <!-- Patient Information -->
    <b-row class="invoice-heading">
      <b-col md="12">
        <h3 class="">Patient Information</h3>
      </b-col>
    </b-row>
    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">First Name</h4>
      </b-col>
      <b-col md="8" class="text-left">
        <h4 class="">{{ dataPatient.name }}</h4>
      </b-col>
    </b-row>
    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">Last Name</h4>
      </b-col>
      <b-col md="8" class="text-left">
        <h4 class="">{{ dataPatient.lastname }}</h4>
      </b-col>
    </b-row>
    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">Contact Number</h4>
      </b-col>
      <b-col md="8" class="text-left">
        <h4 class="">{{ dataPatient.phone_number }}</h4>
      </b-col>
    </b-row>
    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">Email</h4>
      </b-col>
      <b-col md="8" class="text-left">
        <h4 class="">{{ dataPatient.email }}</h4>
      </b-col>
    </b-row>

    <!-- Information -->
    <b-row class="invoice-heading">
      <b-col md="12">
        <h3 class="">Facility Information</h3>
      </b-col>
    </b-row>

    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">Facility Name</h4>
      </b-col>
      <b-col md="8" class="text-left">
        <h4 class="">{{ dataBooking.facility_name }}</h4>
      </b-col>
    </b-row>
    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">Doctor's Name</h4>
      </b-col>
      <b-col md="8" class="text-left">
        <h4 class="">{{ dataBooking.doctor_name }}</h4>
      </b-col>
    </b-row>
    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">Facility Phone Number</h4>
      </b-col>
      <b-col md="8" class="text-left">
        <h4 class="">{{ dataBooking.facility_phone_number }}</h4>
      </b-col>
    </b-row>

    <!-- preschedule -->
    <b-row class="invoice-heading">
      <b-col md="12">
        <h3 class="">Booking details</h3>
      </b-col>
    </b-row>

    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">Trip Type</h4>
      </b-col>
      <b-col md="8" class="text-left">
        <h4 class="">{{ dataBooking.trip_type }}</h4>
      </b-col>
    </b-row>

    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">Trip Distance(miles)</h4>
      </b-col>
      <b-col md="8" class="text-left">
        <h4 class="">{{ dataBooking.total_miles }}</h4>
      </b-col>
    </b-row>

    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">Waiting time(hours)</h4>
      </b-col>
      <b-col md="8" class="text-left">
        <h4 class="">{{ dataWaitingTime.time }} hours</h4>
      </b-col>
    </b-row>

    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">Additional Stops</h4>
      </b-col>
      <b-col md="8" class="text-left" v-if="dataListAdditionalStops.length>0">
        <span v-for="item in dataListAdditionalStops" >
          <h4 class=""> * {{ item}}</h4>
        </span>
      </b-col>
      <b-col md="8" class="text-left" v-if="dataListAdditionalStops.length==0">
        <h4 class="">0</h4>
      </b-col>
    </b-row>

    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">Price</h4>
      </b-col>
      <b-col md="8" class="text-left">
        <h4 class="">${{ dataBooking.price }} </h4>
      </b-col>
    </b-row>

    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">Service Type</h4>
      </b-col>
      <b-col md="8" class="text-left">
        <h4 class="">{{ dataBooking.service_type }}</h4>
      </b-col>
    </b-row>
    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">Pickup Address</h4>
      </b-col>
      <b-col md="8" class="text-left">
        <h4 class="" id="initMarkerToId2">{{ dataBooking.from }}</h4>
      </b-col>
    </b-row>
    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">Destination</h4>
      </b-col>
      <b-col md="8" class="text-left">
        <h4 class="" id="initMarkerFromId2">{{ dataBooking.to }}</h4>
      </b-col>
    </b-row>
    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">Surgery Type</h4>
      </b-col>
      <b-col md="8" class="text-left">
        <h4 class="">{{ dataBooking.surgery_type }}</h4>
      </b-col>
    </b-row>
    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">Appointment Date</h4>
      </b-col>
      <b-col md="8" class="text-left">
        <h4 class="">{{dataBooking.booking_date }}</h4>
      </b-col>
    </b-row>
    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">Appointment Time</h4>
      </b-col>
      <b-col md="8" class="text-left">
        <h4 class="">{{ dataBooking.appoinment_datetime }}</h4>
      </b-col>
    </b-row>
    <b-row class="row-data">
      <b-col md="4">
        <h4 class="">Suggested Pickup Time</h4>
      </b-col>
      <b-col md="8" class="text-left">
        <h4 class="">{{ dataBooking.pickup_time }}</h4>
      </b-col>
    </b-row>
  </div>
</template>
  
<script>
import { getMessageError } from '@core/utils/utils'
import { getItemWaitingTime, getItemsAdditionalStops } from '@core/utils/additionalServices'

import {
  BRow,
  BCol,
  BButton,
  BFormGroup,
  BFormInput,
  BFormRadio,
  BFormSelect,
  BFormDatepicker,
  BFormTimepicker,
  BTableSimple,
  BThead, BTr, BTd, BTh, BTbody, BTfoot,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BFormRadio,
    BFormSelect,
    BFormDatepicker,
    BFormTimepicker,
    BTableSimple,
    BThead, BTr, BTd, BTh, BTbody, BTfoot,
  },
  props: {
    item: {},
  },
  data() {
    return {
      dataCa: null,
      dataPatient: null,
      dataAdditionalServices: null,
      dataWaitingTime: 0,
      dataListAdditionalStops: [],
      dataBooking: {},
    }
  },
  methods: {
    setAdditionalServices(data) {
      this.dataWaitingTime = getItemWaitingTime(data)
      this.dataListAdditionalStops = getItemsAdditionalStops(data)
      console.log(this.dataListAdditionalStops)
    },
    convertData() {
      try {
        this.dataBooking.to = JSON.parse(this.dataBooking.to).to
        this.dataBooking.from = JSON.parse(this.dataBooking.from).from
        this.dataBooking.booking_date = this.dataBooking.booking_date.split(' ')[0]
        this.dataBooking.total_miles==null?0:this.dataBooking.total_miles.toFixed(0)
        this.dataBooking.price==null?0:this.dataBooking.price.toFixed(2)
        
        let listTmp = []
        this.dataListAdditionalStops.forEach(element => {
          listTmp.push(JSON.parse(element.to).to)
        });
        this.dataListAdditionalStops = listTmp
        
      } catch (err) {
        console.error(err)
      }
    },
  },
  created() {
    this.dataBooking = this.item
    this.dataCa = this.item.self_pay.corporate_account
    this.dataPatient = this.item.self_pay
    this.dataAdditionalServices = this.item.additional_service
    this.setAdditionalServices(this.dataAdditionalServices)
    this.convertData()
  },
  mounted()
  {
  }
}
</script>

<style>
.invoice-heading {
  background: #eee;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
  margin-top: 10px;
}

.invoice-heading h3 {
  margin: auto;
  padding: 7px;
  font-weight: 600;
  text-align: left;
}

.row-data {
  padding: 15px 25px 5px 25px;
}

.text-right {
  text-align: right;
}
</style>
 
  
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>