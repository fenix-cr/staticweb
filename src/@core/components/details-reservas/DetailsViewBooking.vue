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

.detail {
  font-weight: 800;
}

.row-data {
  padding: 15px 25px 5px 25px;
}

.text-right {
  text-align: right;
}
</style>
<template>
  <div class="cols-12 col-xl-12" style="margin: 0 auto">
    <button
      v-if="enableControl == true && this.$hasPermission('edit-booking')"
      type="button"
      class="btn btn-primary mb-2"
      @click="openUpdateBooking"
    >
      Edit booking
    </button>

    <div v-if="booking">
      <!-- Applicant -->
      <div v-if="booking.self_pay.corporate_account!=null">
        <b-row class="invoice-heading text-left">
          <b-col md="12">
            <h3 class="">Applicant</h3>
          </b-col>
        </b-row>

        <b-row class="row-data">
          <b-col md="4">
            <h4 class="detail">Name</h4>
          </b-col>
          <b-col md="8" class="text-left">
            <h4 class="">
              {{ booking.self_pay.corporate_account.amera_user.name }}
            </h4>
          </b-col>
        </b-row>

        <b-row class="row-data">
          <b-col md="4">
            <h4 class="detail">Company Name</h4>
          </b-col>
          <b-col md="8" class="text-left">
            <h4 class="">
              {{ booking.self_pay.corporate_account.company_legal_name }}
            </h4>
          </b-col>
        </b-row>

        <b-row class="row-data">
          <b-col md="4">
            <h4 class="detail">Contact Number</h4>
          </b-col>
          <b-col md="8" class="text-left">
            <h4 class="">
              {{
                booking.self_pay.corporate_account
                  .corporate_account_personal_info.telephone_number
              }}
            </h4>
          </b-col>
        </b-row>
        <b-row class="row-data">
          <b-col md="4">
            <h4 class="detail">Email</h4>
          </b-col>
          <b-col md="8" class="text-left">
            <h4 class="">
              {{
                booking.self_pay.corporate_account
                  .corporate_account_personal_info.email
              }}
            </h4>
          </b-col>
        </b-row>
      </div>

      <!-- Patient Information -->

      <b-row class="invoice-heading">
        <b-col md="12">
          <h3 class="detail">Patient Information</h3>
        </b-col>
      </b-row>

      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">First Name</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ booking.self_pay.name }}</h4>
        </b-col>
      </b-row>
      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Last Name</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ booking.self_pay.lastname }}</h4>
        </b-col>
      </b-row>
      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Contact Number</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ booking.self_pay.phone_number }}</h4>
        </b-col>
      </b-row>
      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Email</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ booking.self_pay.email }}</h4>
        </b-col>
      </b-row>

      <!-- Information -->
      <b-row class="invoice-heading">
        <b-col md="12">
          <h3 class="detail">Facility Information</h3>
        </b-col>
      </b-row>

      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Facility Name</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ booking.facility_name }}</h4>
        </b-col>
      </b-row>
      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Doctor's Name</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ booking.doctor_name }}</h4>
        </b-col>
      </b-row>
      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Facility Phone Number</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ booking.facility_phone_number }}</h4>
        </b-col>
      </b-row>

      <!-- preschedule -->
      <b-row class="invoice-heading">
        <b-col md="12">
          <h3 class="detail">Booking details</h3>
        </b-col>
      </b-row>

      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Trip Type</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ booking.trip_type }}</h4>
        </b-col>
      </b-row>

      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Trip Distance(miles)</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ booking.total_miles }}</h4>
        </b-col>
      </b-row>

      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Additional stops</h4>
        </b-col>
        <b-col md="8" class="text-left" v-if="listAdditionalStops.length > 0">
          <span
            v-for="item in listAdditionalStops"
            :key="item.id"
            class="text-left"
          >
            <h4 class="">* {{ JSON.parse(item.to).to }}</h4>
          </span>
        </b-col>
        <b-col md="8" class="text-left" v-if="listAdditionalStops.length == 0">
          <h4 class="">0</h4>
        </b-col>
      </b-row>

      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Is pickup on time</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ getIsPickupOnTime(booking) }}</h4>
        </b-col>
      </b-row>

      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Waiting time(minutes)</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ waitingTime }}</h4>
        </b-col>
      </b-row>

      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Driver</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">
            {{
              booking.driver
                ? booking.driver.name + " " + booking.driver.lastname
                : "Not assigned"
            }}
          </h4>
        </b-col>
      </b-row>

      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Price</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">${{ booking.price }}</h4>
        </b-col>
      </b-row>

      <b-row class="row-data" v-if="booking.service_type != null">
        <b-col md="4">
          <h4 class="detail">Service Type</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ booking.service_type }}</h4>
        </b-col>
      </b-row>
      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Pickup Address</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ JSON.parse(booking.from).from }}</h4>
        </b-col>
      </b-row>
      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Destination</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ JSON.parse(booking.to).to }}</h4>
        </b-col>
      </b-row>
      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Surgery Type</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ booking.surgery_type }}</h4>
        </b-col>
      </b-row>
      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Appointment Date</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ booking.appoinment_datetime.split(" ")[0] }}</h4>
        </b-col>
      </b-row>
      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Appointment Time</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ booking.appoinment_datetime.split(" ")[1] }}</h4>
        </b-col>
      </b-row>
      <b-row class="row-data">
        <b-col md="4">
          <h4 class="detail">Suggested Pickup Time</h4>
        </b-col>
        <b-col md="8" class="text-left">
          <h4 class="">{{ booking.pickup_time }}</h4>
        </b-col>
      </b-row>
      <b-row  class="invoice-heading" id="booking_notes">
        <b-col md="12">
          <h3 class="detail">Notes Details</h3>
        </b-col>
      </b-row>
      <b-row >
        <b-col md="12 text-right mb-1">
          <button v-b-modal.bv-modal-example class="btn btn-primary">Add New Note</button>
        </b-col>
      </b-row>
      <table v-if="booking.Bookinglogs !=''" class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">User</th>
          <th scope="col">Comment</th>
          <th scope="col">Status</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(log , index) in booking.Bookinglogs" :key="index">
          <td>{{log.user}}</td>
          
          <td>{{getComment(log.comments)[0]}}</br><small v-if="getComment(log.comments)[1]">&nbsp; This note was sent to {{getComment(log.comments)[1]}} via SMS </small></td>
          <td>{{log.status}}</td>
          <td>{{log.datetime_log}}</td>
        </tr>
      
      </tbody>
    </table>
    </div>
    <b-modal id="bv-modal-example" centered hide-footer>
            <div class="d-block text-center">
            <h3>Write a Note</h3>
            <b-col>
                <b-form-group >
                        <b-form-input v-model="messageText" @mouseover="changeColorMessage()" v-bind:class="{ 'border border-danger' : isMessageText == false}"/>
                </b-form-group>
            </b-col>
            <b-col >
                <b-form-group  class="mb-1">
                    
                    <div style="display: flex; gap: 10px">
                        <b-form-checkbox
                            id="passanger"
                           v-model="messageSendTo"
                            name="passanger"
                            value="passanger"
                            unchecked-value="">
                            Send SMS note to Passenger
                            </b-form-checkbox>
                    </div>
                        
                </b-form-group>
                <b-form-group class="mb-0">
                    
                    <div style="display: flex; gap: 10px">
                        <b-form-checkbox
                            id="driver"
                            v-model="messageSendTo"
                            name="driver"
                            value="driver"
                            unchecked-value="">
                            Send SMS note to Driver
                            </b-form-checkbox>
                    </div>
                
                </b-form-group>

            </b-col>
            </div>
            <b-row class="mt-3">
                <b-col >
                    <b-button  block  @click="saveNote()">Save</b-button>
                </b-col>
                <b-col>
                    <b-button  block @click="$bvModal.hide('bv-modal-example')">Close</b-button>
                </b-col>
            </b-row>
        </b-modal>
  </div>
</template>
    
<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import vSelect from "vue-select";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import { getMessageError } from "@core/utils/utils";
import { getItemWaitingTime } from "@core/utils/additionalServices";
import { getItemsAdditionalStops } from "@core/utils/additionalServices";

import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormRadio,
  BFormSelect,
  BFormDatepicker,
  BFormTimepicker,
  BFormCheckbox,
  BButton,
} from 'bootstrap-vue'
import axios from 'axios'
import { mounted } from 'vue-echarts'

export default {
  components: {
    BButton,
    BFormCheckbox,
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormRadio,
    BFormSelect,
    BFormDatepicker,
    BFormTimepicker,
    vSelect,
    ToastificationContent,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      messageSendTo:[],
      id:'',
      messageText:'',
      isMessageText:true,
      booking: null,
      enableControl: false,
      listAdditionalStops: [],
      waitingTime: 0,
    };
  },
  methods: {
    getComment(comment){
      return comment.split('array')
      // return comment;
    },
    changeColorMessage(){
            this.isMessageText = true
        },
        saveNote(){
            console.log('messageSendTo: ',this.messageSendTo,this.currentId,this.messageText)
            if(this.messageText === ''){
                this.isMessageText = false
            }
            else{
                this.$bvModal.hide('bv-modal-example')

                this.$swal({
                title: 'Please, wait...',
                didOpen: () => {
                    this.$swal.showLoading()
                },
            })
            let formData = new FormData();
            formData.append("text", this.messageText);
            formData.append("messageSendTo", this.messageSendTo);
            formData.append("status", this.booking.status);
            this.$http.post(`/admin/panel/booking/${this.id}/saveBookingNote`,formData)
                .then((res) => {
                    this.$swal({
                        title: res.data.message,
                        icon: 'success',
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                        buttonsStyling: false,
                    }).then((result) => {
                      this.messageText=''
                      this.getBookingById(this.id)
                    })

                }).catch((error) => {
                    this.$swal({
                        title: getMessageError(error),
                        icon: 'error',
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                        buttonsStyling: false,
                    })
                })
            }
        },
    getBookingById(bookingId) {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.$http
        .get(`admin/panel/booking/${bookingId}/info`)
        .then((response) => {
          this.booking = response.data.data;
          this.setValuesControls();
          this.getaditionalStops();
          this.$swal.close();
        })
        .catch((error) => {
          let message = getMessageError(error);
          this.$swal({
            title: message,
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
    getWaitTime(booking) {
      if (this.booking.additional_service) {
        this.waitingTime = this.booking.additional_service.find((element) =>
          JSON.parse(element.service.toLowerCase().includes("wait"))
        );
      }
    },
    getaditionalStops() {
      if (this.booking.additional_service) {
        this.listAdditionalStops = this.booking.additional_service.filter(
          (element) =>
            JSON.parse(element.service.toLowerCase().includes("stop"))
        );
      }
    },
    getIsPickupOnTime(booking) {
      let res = "I prefer to call Amera when ready";
      if (booking.is_pickup_ontime) {
        res = booking.is_pickup_ontime == 0 ? "I prefer to call Amera when ready" : "Amera will pick me up at specified time";
      }
      return res;
    },
    openUpdateBooking() {
      this.$router.push({
        name: "details-reservation",
        params: { id: this.booking.id },
      });
    },
    setValuesControls() {
      if (this.booking.status == 3 || this.booking.status == 4) {
        this.enableControl = false;
      } else {
        this.enableControl = true;
      }
    },
    scroll() {  
      console.log('this is scrool')
      document.getElementById('booking_notes').scrollIntoView({
      behavior: "smooth"
      });
  },
  },
  beforeMount() {
    this.id = this.$route.params.id;
    let bookid = this.$route.params.id

    if (bookid == null) {
      this.$router.go(-1);
    } else {
      this.getBookingById(bookid);
    }
  },
  mounted() {
    if(this.$route.name == 'details-booking-notes'){
      setTimeout(() => {
      this.scroll()
      }, 2000)
    }
   
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>