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
      <div class="cols-12 col-xl-12 " style="margin: 0 auto">
        <!-- <button v-if="enableControl==true" type="button" class="btn btn-primary mb-2" @click="openUpdateBooking">Edit
          booking</button> -->
          <button v-if="enableControl==true" type="button" class="btn btn-primary mb-2" @click="download_csv_file">Download CSV
          </button>
    
        <div v-if="booking">
          <!-- Applicant -->
          <div v-if="booking.self_pay.corporate_account">
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
                <h4 class="">{{ booking.self_pay.corporate_account.amera_user.name }}</h4>
              </b-col>
            </b-row>
    
            <b-row class="row-data">
              <b-col md="4">
                <h4 class="detail">Company Name</h4>
              </b-col>
              <b-col md="8" class="text-left">
                <h4 class="">{{ booking.self_pay.corporate_account.company_legal_name }}</h4>
              </b-col>
            </b-row>
    
            <b-row class="row-data">
              <b-col md="4">
                <h4 class="detail">Contact Number</h4>
              </b-col>
              <b-col md="8" class="text-left">
                <h4 class="">{{ booking.self_pay.corporate_account.corporate_account_personal_info.telephone_number }}</h4>
              </b-col>
            </b-row>
            <b-row class="row-data">
              <b-col md="4">
                <h4 class="detail">Email</h4>
              </b-col>
              <b-col md="8" class="text-left">
                <h4 class="">{{ booking.self_pay.corporate_account.corporate_account_personal_info.email }}</h4>
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
            <b-col md="8" class="text-left" v-if="listAdditionalStops.length>0">
              <span v-for="item in listAdditionalStops" :key="item.id"  class="text-left">
                  <h4 class="">* {{JSON.parse(item.to).to }}</h4>
                </span>
            </b-col>
            <b-col md="8" class="text-left" v-if="listAdditionalStops.length==0">
              <h4 class="">0</h4>
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
              <h4 class="">{{ booking.driver?(booking.driver.name +" " + booking.driver.lastname):'Not assigned' }}</h4>
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
    
          <b-row class="row-data" v-if="booking.service_type!=null">
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
        </div>
      </div>
    </template>
        
    <script>
    import { FormWizard, TabContent } from 'vue-form-wizard'
    import vSelect from 'vue-select'
    import { ValidationProvider, ValidationObserver } from 'vee-validate'
    import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
    import 'vue-form-wizard/dist/vue-form-wizard.min.css'
    import { getMessageError } from '@core/utils/utils'
    import {
      BRow,
      BCol,
      BFormGroup,
      BFormInput,
      BFormRadio,
      BFormSelect,
      BFormDatepicker,
      BFormTimepicker,
    } from 'bootstrap-vue'
    import axios from 'axios'
    import { mounted } from 'vue-echarts'
    
    export default {
      components: {
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
          booking: null,
          enableControl: false,
          listAdditionalStops: [],
          waitingTime: 0,
        }
      },
      methods: {
        download_csv_file() {
          var csvFileData = [
       [
        this.booking.self_pay.name+' '+this.booking.self_pay.lastname,
        this.booking.appoinment_datetime.split(" ")[0],
        JSON.parse(this.booking.from).from.split(",")[0],
        JSON.parse(this.booking.to).to.split(",")[0],
        ' ',
        this.booking.total_miles,
        this.waitingTime,
        ' ',
        ' ',
        this.booking.price
      ],
       
    ];
    //define the heading for each row of the data
    var csv = 'Name of Client,Date of Service,Pickup Address,Drop Off Address,Base,Milage,Wait Time,Wait Time Fee ,Cancellation Fee,Total Amount \n';
    
    //merge the data with CSV
    csvFileData.forEach(function(row) {
            csv += row.join(',');
            csv += "\n";
    });
    
    //display the created CSV data on the web browser 
    // document.write(csv);
    
    
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    
    //provide the name for the CSV file to be downloaded
    hiddenElement.download = 'Famous Personalities.csv';
    hiddenElement.click();
    },
        getBookingById(bookingId) {
          this.$swal({
            title: 'Please, wait...',
            didOpen: () => {
              this.$swal.showLoading()
            },
          })
          this.$http.get(`admin/panel/booking/${bookingId}/info`).then((response) => {
            this.booking = response.data.data
            this.setValuesControls()
            this.getaditionalStops()
            this.$swal.close();
    
          }).catch((error) => {
            let message = getMessageError(error)
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
        getWaitTime(booking) {
          if (this.booking.additional_service) {
            this.waitingTime = this.booking.additional_service.find(element => JSON.parse(element.service.toLowerCase().includes('wait')));
          }
        },
        getaditionalStops() {
          if (this.booking.additional_service.length>0) {
            this.listAdditionalStops = this.booking.additional_service.filter(element => JSON.parse(element.service.toLowerCase().includes('stop')))
          }
        },
        openUpdateBooking() {
          this.$router.push({ name: 'details-reservation', params: { id: this.booking.id } })
        },
        setValuesControls() {
          if (this.booking.status == 3 || this.booking.status == 4) {
            this.enableControl = false
          } else {
            this.enableControl = true
          }
        }
      },
      beforeMount() {
        let bookid = this.$route.params.id
    
        if (bookid == null) {
          this.$router.go(-1)
        } else {
          this.getBookingById(bookid)
        }
      },
      mounted() {
      }
    }
    </script>
    <style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';
    </style>