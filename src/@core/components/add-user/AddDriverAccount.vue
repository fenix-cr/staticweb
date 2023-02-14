<template>
  <div v-if="userData !== ''">
    <!-- form Admin -->

    <b-row class="mt-5">
      <b-col md="4" class="mb-2">
        <label for="name">Name <span class="text-danger">*</span></label>
        <b-form-input id="name" v-model="userData.name" />
      </b-col>
      <b-col md="4" class="mb-2">
        <label for="Lastname"
          >Lastname <span class="text-danger">*</span></label
        >
        <b-form-input id="Lastname" v-model="userData.lastname" />
      </b-col>
      <b-col md="4" class="mb-2">
        <label for="gender">Gender <span class="text-danger">*</span></label>
        <b-form-select id="gender" v-model="userData.gender" :options="gender">
        <option value="" >Select Gender</option>
        </b-form-select>
      </b-col>
      <b-col md="4" class="mb-2">
        <label for="birthday"
          >Birthday <span class="text-danger">*</span></label
        >
        <b-form-input id="birthday" v-model="userData.birthday" type="date" />
      </b-col>
      <b-col md="4" class="mb-2">
        <label for="Phone_number"
          >Phone_number <span class="text-danger">*</span></label
        >
        <b-form-input id="Phone_number" v-model="userData.phone_number" />
      </b-col>
      <b-col md="4" class="mb-2">
        <label for="email">Email <span class="text-danger">*</span></label>
        <b-form-input type="email" id="email" v-model="userData.email" />
      </b-col>
       <b-col md="4" class="mb-2">
        <label for="address">Address <span class="text-danger">*</span></label>
        <b-form-input id="address" v-model="userData.address" />
      </b-col>
      <b-col md="4" class="mb-2">
        <label for="status">Status <span class="text-danger">*</span></label>
        <b-form-select id="Status" v-model="userData.status" :options="option">
         <option value="" >Select status</option>
        </b-form-select>
      </b-col>
        <b-col md="4" class="mb-2">
        <label for="status">Driver Type <span class="text-danger">*</span></label>
        <b-form-select id="Status" v-model="userData.driver_type" :options="driver_type" @change="onChange($event)">
         <option value="" >Select type</option>
        </b-form-select>
      </b-col>
      <b-col v-if="userData.is_driver" md="4">
        <b-form-group label="Driver is a BT ?" class="mb-0">
        <validation-provider #default="{ errors }" rules="required">
            <span style="display: flex; gap: 10px">
                <b-form-radio v-model="userData.is_bt"  name="Yes" value="1"
                    class="custom-control-secondary"
                    :state="errors.length > 0 ? false : null">
                    Yes
                </b-form-radio>

                <!-- secondary -->
                <b-form-radio v-model="userData.is_bt" name="No" value="0"
                    class="custom-control-secondary"
                    :state="errors.length > 0 ? false : null">
                    No
                </b-form-radio>

              </span>
            <small class="text-danger" v-if="errors[0]">This field is required</small>
        </validation-provider>
    </b-form-group>
        </b-col>
    </b-row>

    <b-row v-if="userData.show_provider">
      <b-col md="4" class="mb-2" >
          <label for="status">Provider<span class="text-danger">*</span></label>
          <b-form-select id="Status" placeholder="Select Provider" @change="onChangeProvider($event)">
            <option v-for="provider in listProviders" :key="provider.id"
            :value="provider.id+','+provider.account_number"
         >
          {{provider.company_name}}
            </option>
          </b-form-select>
        </b-col>
    </b-row>
    
      <!-- company information -->
      <div v-if="ratesFound && !userData.is_driver">
      <div class="d-flex">
        <h4 class="ml-50 mb-2 mt-2">Company Information</h4>
      </div>
        <b-row>
          <b-col md="4" class="mb-2">
            <label for="address">Company Name <span class="text-danger">*</span></label>
            <b-form-input disabled id="address" v-model="providerRates.provider_info.company_name" />
          </b-col>
          <b-col md="4" class="mb-2">
            <label for="address">Account Number <span class="text-danger">*</span></label>
            <b-form-input disabled id="address" v-model="userData.account_number" />
          </b-col>
          <b-col md="4" class="mb-2" >
              <label for="address">Email <span class="text-danger">*</span></label>
              <b-form-input disabled id="address" v-model="providerRates.provider_info.email" />
          </b-col>
          <b-col md="4" class="mb-2" >
              <label for="address">Phone <span class="text-danger">*</span></label>
              <b-form-input disabled id="address" v-model="providerRates.provider_info.phone" />
          </b-col>
        </b-row>
      </div>
      <!-- rates for provider -->
      <div v-if="ratesFound && !userData.is_driver">
      <div class="d-flex">
        <h4 class="ml-50 mb-2 mt-2">Rates</h4>
      </div>

      <b-row class="ml-4 mr-4">
      <table class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Service Type</th>
          <th scope="col">Base Rate</th>
          <th scope="col">Price Per Hour Wait Time</th>
          <th scope="col">Cancellation Fee</th>
          <th scope="col">Additional Mileage</th>
          <th scope="col">City</th>
          <th scope="col">State</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(wheelchair, index) in providerRates.wc" :key="'wc'+index">
        <th scope="row"></th>
          <td>W/C</td>
          <td><b-form-input disabled  type="number" v-model="wheelchair.base_rate" /></td>
          <td><b-form-input disabled type="number" v-model="wheelchair.wait_rate" /></td>
          <td><b-form-input disabled type="number" v-model="wheelchair.cancel_rate" /></td>
          <td><b-form-input disabled type="number" v-model="wheelchair.additional_mileage" /></td>
          <td><b-form-input disabled type="text" v-model="wheelchair.state" /></td>
          <td><b-form-input disabled type="text" v-model="wheelchair.city" /></td>
        </tr>
        <tr v-for="(ambulance, index) in providerRates.bls" :key="'bls'+index">
          <th scope="row"></th>
          <td>BLC</td>
          <td><b-form-input disabled type="number"  v-model="ambulance.base_rate" /></td>
          <td><b-form-input disabled type="number" v-model="ambulance.wait_rate" /></td>
          <td><b-form-input disabled type="number" v-model="ambulance.cancel_rate" /></td>
          <td><b-form-input disabled type="number" v-model="ambulance.additional_mileage" /></td>
          <td><b-form-input disabled type="text" v-model="ambulance.state" /></td>
          <td><b-form-input disabled type="text" v-model="ambulance.city" /></td>
        </tr>
      </tbody>
     </table>
  </b-row>
      </div>
      <!--rate  for driver -->
      <div v-if="userData.is_driver">
      <div class="d-flex">
        <h4 class="ml-50 mb-2 mt-2">Rates</h4>
      </div>

      <b-row class="ml-4 mr-4">
      <table class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Miles</th>
          <th scope="col">Trip</th>
          <th scope="col">Charges</th>
          <th scope="col">Additional</th>
        </tr>
      </thead>
      <tbody>
        <!-- 1 to 10 -->
        <tr>
          <th scope="row"></th>
          <td>1 to 10 </td>
          <td>One Way Trip</td>
          <td><b-form-input  v-model="driverData.m_1_to_10_oneway" /></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td>1 to 10 </td>
          <td>Round Trip</td>
          <td><b-form-input  v-model="driverData.m_1_to_10_twoway" /></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td>1 to 10 </td>
          <td>With/2hr WT pre-authorized</td>
          <td><b-form-input  v-model="driverData.m_1_to_10_with" /></td>
          <td>Include 2hr WT After $15 per hour</td>
        </tr>
        <tr class="blank_row">
        <td colspan="5"></td>
        </tr>
        <!-- 11 to 20 -->
        <tr>
          <th scope="row"></th>
          <td>11 to 20 </td>
          <td>One Way Trip</td>
          <td><b-form-input  v-model="driverData.m_11_to_20_oneway" /></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td>11 to 20 </td>
          <td>Round Trip</td>
          <td><b-form-input   v-model="driverData.m_11_to_20_twoway" /></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td>11 to 20 </td>
          <td>With/2hr WT pre-authorized</td>
          <td><b-form-input  v-model="driverData.m_11_to_20_with" /></td>
          <td>Include 2hr WT After $15 per hour</td>
        </tr>
        <tr class="blank_row">
        <td colspan="5"></td>
        </tr>
        <!-- 21 to 30 -->
        <tr>
          <th scope="row"></th>
          <td>21 to 40 </td>
          <td>One Way Trip</td>
          <td><b-form-input  v-model="driverData.m_21_to_40_oneway" /></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td>21 to 40 </td>
          <td>Round Trip</td>
          <td><b-form-input   v-model="driverData.m_21_to_40_twoway" /></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td>21 to 40 </td>
          <td>With/2hr WT pre-authorized</td>
          <td><b-form-input  v-model="driverData.m_21_to_40_with" /></td>
          <td>Include 2hr WT After $15 per hour</td>
        </tr>
        
      </tbody>
     </table>
  </b-row>
      </div>
  

    <b-row>
        <b-col md="12 save-btn">
        <button
          type="submit"
          class="btn btn-primary"
          v-on:click="setAccountData((type = 'save'))"
        >
          Submit
        </button>
      </b-col>
    </b-row>
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
  BForm,
  BTable,
  BCard,
  BCardHeader,
  BCardTitle,
  BFormCheckbox,
  BFormSelect,
  BFormRadio
} from "bootstrap-vue";
import vSelect from "vue-select";
import { mapGetters } from "vuex";
import { ValidationProvider, ValidationObserver } from 'vee-validate'
// import useUsersList from '/src/@core/components/user/users-list/useUsersList'

export default {
  components: {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
    vSelect,
    BFormSelect,
    BFormRadio,
    ValidationProvider,
        ValidationObserver,
  },
  data() {
    return {
      src: "",
      btnupdate: false,
      userData: {
        name: "",
        lastname: "",
        gender: "",
        birthday: "",
        email: "",
        phone_number:"",
        address: "",
        status: "",
        driver_type:"",
        show_provider:false,
        account_number:'',
        provider_id:'',
        is_driver:false,
        rates:'',
        is_bt:'',
      },
      driverData:{},
       listProviders:'',
       providerRates:'',
       ratesFound:false,
      option: [
        {
          text: "Approved",
          value: "Approved",
        },
        {
          text: "Not Approved",
          value: "Not Approved",
        },
      ],
      gender: [
        {
          text: "Female",
          value: "Female",
        },
        {
          text: "Male",
          value: "Male",
        },
        {
          text: "Wish not to disclose",
          value: "Wish not to disclose",
        },
      ],
       driver_type: [
        {
          text: "CNA",
          value: "CNA",
        },
        {
          text: "Provider",
          value: "Provider",
        },
      ],
    };
  },
  methods: {
    getProviders() {
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },
      })
      this.$http.get(`admin/panel/providerslistdropdown`)
          .then((response) => {
            this.listProviders = response.data.data.reverse();
            this.$swal.close();
          })
          .catch((res) => console.log(res.response.data))
    },
    providerRatesFn(id) {
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },
      })
      this.$http.get(`admin/panel/providerrates/${id}`)
          .then((response) => {
            this.providerRates = response.data.data;
            console.log(this.providerRates)
            this.$swal.close();
            if(this.providerRates!=null)
            this.ratesFound = true;
            else
            this.ratesFound = false;
          })
          .catch((res) => console.log(res.response.data))
    },
    setAccountData() {
      console.log('this is finla data:',this.userData)
      if (
        this.userData.name === "" ||
        this.userData.lastname === "" ||
        this.userData.gender === "" ||
        this.userData.birthday === "" ||
        this.userData.email === "" ||
        this.userData.address === "" ||
        this.userData.status === "" ||
        this.userData.driver_type === ""
      ) {
        this.$swal({
          title: "Please fill out required fields",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
      } else{
        console.log('driverData:',this.driverData)
         
         this.userData.rates = this.driverData;
         console.log('userData:',this.userData)
        this.$emit("getAccountData", this.userData);
        // driverData
      }
       
    },
    onChange(event) {
            if(event=='Provider'){
              this.userData.show_provider=true;
              this.userData.is_driver = false;
            }
            if(event=='CNA') {
              this.userData.show_provider=false;
              this.userData.is_driver = true;
            }
            console.log('good: ',event)
        },

    onChangeProvider(event) {
         let data =  event.split(",")
         
          this.userData.provider_id=data[0]
          this.userData.account_number=data[1]
          this.providerRatesFn(this.userData.provider_id);
        }
  },
  mounted() {
    this.getProviders()
  }
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";

.text-name-driver {
  font-size: 1.5rem;
  margin-bottom: 0 !important;
}

.backgroundProfile-driver {
  background-color: $primary;
}
.save-btn {
  margin: auto;
  text-align: right;
}
.blank_row{
  height: 50px !important;
  background-color: #FFFFFF;
}
</style>