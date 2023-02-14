<template>
  <div v-if="userData !== ''">
    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
          ref="previewEl"
          :src="ProfileName(userData.name)"
          size="90px"
          rounded
          class="backgroundProfile-driver"
        >
          <p class="text-name-driver" v-if="userData.profile_picture === null">
            {{ ProfileName(userData.name) }}
          </p>
        </b-avatar>
      </template>
      <h4 class="">
        <span class="name-corporative">{{
          userData.name + " " + userData.lastname
        }}</span>
      </h4>
      <div class="pl-1">
        <span> Gender: {{ userData.gender }} </span>
        <br />
        <span> Email: {{ userData.email }} </span>
      </div>
    </b-media>

    <!-- form Admin -->
    <b-form>
      <b-row class="mt-5">
        <b-col md="4">
          <b-form-group label="Name">
            <b-form-input v-model="userData.name" />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Lastname">
            <b-form-input v-model="userData.lastname" />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Gender">
            <b-form-select
              id="gender"
              v-model="userData.gender"
              :options="gender"
            >
              <option value="">Select Gender</option>
            </b-form-select>

            <!-- <b-form-input
                v-model="userData.gender"
      
            /> -->
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Birthday">
            <b-form-input v-model="userData.birthday" type="date" />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Phone_number">
            <b-form-input v-model="userData.phone_number" />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Email">
            <b-form-input v-model="userData.email" disabled />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Address">
            <b-form-input v-model="userData.address" />
          </b-form-group>
        </b-col>
        <b-col md="2">
          <label for="status">Status <span class="text-danger">*</span></label>
          <b-form-select
            id="Status"
            v-model="userData.status"
            :options="option"
          >
            <option value="">Select status</option>
          </b-form-select>
        </b-col>
        <b-col md="2" class="mb-2">
          <label for="status"
            >Driver Type <span class="text-danger">*</span></label
          >
          <b-form-select
            id="Status"
            v-model="userData.driver_type"
            :options="driver_type"
          >
            <option value="">Select type</option>
          </b-form-select>
        </b-col>

        <b-col md="4">
          <b-form-group label="Availability">
            <b-form-select
              disabled
              id="Status"
              v-model="userData.availability"
              :options="driver_availability"
            >
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-col v-if="userData.is_driver || userData.driver_type == 'CNA'" md="4">
        <b-form-group label="Driver is a BT ?" class="mb-0">
          <validation-provider #default="{ errors }" rules="">
            <span style="display: flex; gap: 10px">
              <b-form-radio
                v-model="userData.is_bt"
                name="1"
                value="1"
                class="custom-control-secondary"
                :state="errors.length > 0 ? false : null"
              >
                Yes
              </b-form-radio>

              <!-- secondary -->
              <b-form-radio
                v-model="userData.is_bt"
                name="0"
                value="0"
                class="custom-control-secondary"
                :state="errors.length > 0 ? false : null"
              >
                No
              </b-form-radio>
            </span>
            <small class="text-danger" v-if="errors[0]"
              >This field is required</small
            >
          </validation-provider>
        </b-form-group>
      </b-col>
      <b-row
        v-if="
          userData.show_provider == true || userData.driver_type == 'Provider'
        "
      >
        <b-col md="4" class="mb-2">
          <label for="status">Provider<span class="text-danger">*</span></label>
          <b-form-select
            id=""
            :value="prvider_current_data"
            @change="onChangeProvider($event)"
          >
            <option
              v-for="provider in listProviders"
              :key="provider.id"
              :value="provider.id + ',' + provider.account_number"
              :v-selected="provider.id == userData.provider_id ? true : false"
            >
              {{ provider.company_name }}
            </option>
          </b-form-select>
        </b-col>
      </b-row>
      <!-- company information -->
      <div v-if="userData.driver_type == 'Provider' && provider_info != null">
        <div class="d-flex">
          <h4 class="ml-50 mb-2 mt-2">Company Information</h4>
        </div>
        <b-row>
          <b-col md="4" class="mb-2">
            <label for="address"
              >Company Name <span class="text-danger">*</span></label
            >
            <b-form-input
              disabled
              id="address"
              v-model="provider_info.company_name"
            />
          </b-col>
          <b-col md="4" class="mb-2">
            <label for="address"
              >Account Number <span class="text-danger">*</span></label
            >
            <b-form-input
              disabled
              id="address"
              v-model="provider_info.account_number"
            />
          </b-col>
          <b-col md="4" class="mb-2">
            <label for="address"
              >Email <span class="text-danger">*</span></label
            >
            <b-form-input disabled id="address" v-model="provider_info.email" />
          </b-col>
          <b-col md="4" class="mb-2">
            <label for="address"
              >Phone <span class="text-danger">*</span></label
            >
            <b-form-input disabled id="address" v-model="provider_info.phone" />
          </b-col>
        </b-row>
      </div>
      <!-- rates for provider -->
      <div v-if="userData.driver_type == 'Provider' && !userData.is_driver">
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
                <th scope="col">Cencellation Fee</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(wheelchair, index) in provider_rates.wc"
                :key="'wc' + index"
              >
                <th scope="row"></th>
                <td v-show="index == 0">W/C</td>
                <td v-show="index != 0"></td>
                <td>
                  <b-form-input
                    disabled
                    type="number"
                    v-model="wheelchair.base_rate"
                  />
                </td>
                <td>
                  <b-form-input
                    disabled
                    type="number"
                    v-model="wheelchair.wait_rate"
                  />
                </td>
                <td>
                  <b-form-input
                    disabled
                    type="number"
                    v-model="wheelchair.cancel_rate"
                  />
                </td>
                <td>
                  <b-form-input
                    disabled
                    type="text"
                    v-model="wheelchair.city"
                  />
                </td>
                <td>
                  <b-form-input
                    disabled
                    type="text"
                    v-model="wheelchair.state"
                  />
                </td>
              </tr>
              <tr
                v-for="(ambulance, index) in provider_rates.bls"
                :key="'bls' + index"
              >
                <th scope="row"></th>
                <td v-show="index == 0">BLC</td>
                <td v-show="index != 0"></td>
                <td>
                  <b-form-input
                    disabled
                    type="number"
                    v-model="ambulance.base_rate"
                  />
                </td>
                <td>
                  <b-form-input
                    disabled
                    type="number"
                    v-model="ambulance.wait_rate"
                  />
                </td>
                <td>
                  <b-form-input
                    disabled
                    type="number"
                    v-model="ambulance.cancel_rate"
                  />
                </td>
                <td>
                  <b-form-input disabled type="text" v-model="ambulance.city" />
                </td>
                <td>
                  <b-form-input
                    disabled
                    type="text"
                    v-model="ambulance.state"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </b-row>
      </div>
      <!--rate  for driver -->
      <div v-if="userData.is_driver || userData.driver_type == 'CNA'">
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
                <td>1 to 10</td>
                <td>One Way Trip</td>
                <td><b-form-input v-model="driverRates.m_1_to_10_oneway" /></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>1 to 10</td>
                <td>Round Trip</td>
                <td><b-form-input v-model="driverRates.m_1_to_10_twoway" /></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>1 to 10</td>
                <td>With/2hr WT pre-authorized</td>
                <td><b-form-input v-model="driverRates.m_1_to_10_with" /></td>
                <td>Include 2hr WT After $15 per hour</td>
              </tr>
              <tr class="blank_row">
                <td colspan="5"></td>
              </tr>
              <!-- 11 to 20 -->
              <tr>
                <th scope="row"></th>
                <td>11 to 20</td>
                <td>One Way Trip</td>
                <td>
                  <b-form-input v-model="driverRates.m_11_to_20_oneway" />
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>11 to 20</td>
                <td>Round Trip</td>
                <td>
                  <b-form-input v-model="driverRates.m_11_to_20_twoway" />
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>11 to 20</td>
                <td>With/2hr WT pre-authorized</td>
                <td><b-form-input v-model="driverRates.m_11_to_20_with" /></td>
                <td>Include 2hr WT After $15 per hour</td>
              </tr>
              <tr class="blank_row">
                <td colspan="5"></td>
              </tr>
              <!-- 21 to 30 -->
              <tr>
                <th scope="row"></th>
                <td>21 to 40</td>
                <td>One Way Trip</td>
                <td>
                  <b-form-input v-model="driverRates.m_21_to_40_oneway" />
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>21 to 40</td>
                <td>Round Trip</td>
                <td>
                  <b-form-input v-model="driverRates.m_21_to_40_twoway" />
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>21 to 40</td>
                <td>With/2hr WT pre-authorized</td>
                <td><b-form-input v-model="driverRates.m_21_to_40_with" /></td>
                <td>Include 2hr WT After $15 per hour</td>
              </tr>
            </tbody>
          </table>
        </b-row>
      </div>

      <div class="row">
        <div class="col-12 text-right pr-0 mt-1">
          <b-button
            variant="primary"
            class="mb-1 mb-sm-0 mr-0 mr-sm-1"
            @click="updateDriver"
          >
            Update
          </b-button>
        </div>
      </div>
    </b-form>
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
  BFormRadio,
} from "bootstrap-vue";
import vSelect from "vue-select";
import { mapGetters } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
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
    ValidationProvider,
    ValidationObserver,
    BFormRadio,
  },
  data() {
    return {
      src: "",
      btnupdate: false,
      show_provider: false,
      account_number: "",
      provider_id: "",
      listProviders: "",
      is_driver: false,
      ratesFound: false,
      providerRates: "",
      couter: 0,
      infoUser: "",
      provider_info: null,
      provider_rates: null,
      driverRates: {
        m_1_to_10_oneway: "",
        m_1_to_10_twoway: "",
        m_1_to_10_with: "",

        m_11_to_20_oneway: "",
        m_11_to_20_twoway: "",
        m_11_to_20_with: "",

        m_21_to_40_oneway: "",
        m_21_to_40_twoway: "",
        m_21_to_40_with: "",
      },
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
      driver_availability: [
        {
          text: "Available",
          value: 1,
        },
        {
          text: "No available",
          value: 0,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      userData: "Users/usersData",
    }),
    prvider_current_data: function () {
      return this.userData.provider_id + "," + this.userData.account_number;
    },
  },
  methods: {
    getProviders() {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.$http
        .get(`admin/panel/providerslistdropdown`)
        .then((response) => {
          this.listProviders = response.data.data.reverse();
          this.$swal.close();
        })
        .catch((res) => console.log(res.response.data));
    },
    providerRatesFn(id) {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.$http
        .get(`admin/panel/providerrates/${id}`)
        .then((response) => {
          console.log(response.data.data);
          this.providerRates = response.data.data;
          this.provider_info = this.providerRates.provider_info;
          this.provider_rates = this.providerRates;
          this.$swal.close();
          if (this.providerRates != null) this.ratesFound = true;
          else this.ratesFound = false;
        })
        .catch((res) => console.log(res));
    },
    ProfileName(name) {
      if (this.userData.profile_picture === null) {
        return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
      } else {
        return this.userData.profile_picture;
      }
    },
    updateDriver() {
      if (this.userData.driver_type == "CNA") {
        this.userData.rates = this.driverRates;
      }

      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
        timer: 1000,
        customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
      });

      this.$http
        .post(
          `auth/driver/${this.userData.driver_id}/account/update`,
          this.userData
        )
        .then((res) => {
          this.$swal({
            title: res.data.message,
            icon: "success",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        })
        .catch((error) => {
          this.$swal({
            title: error.message,
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
    onChange(event) {
      if (event == "Provider") {
        this.userData.show_provider = true;
        this.userData.is_driver = false;
        this.userData.driver_type = "Provider";
      }
      if (event == "CNA") {
        this.userData.show_provider = false;
        this.userData.is_driver = true;
        this.userData.driver_type = "CNA";
      }
      console.log("good: ", event);
    },
    onChangeProvider(event) {
      let data = event.split(",");

      this.userData.provider_id = data[0];
      this.userData.account_number = data[1];
      this.providerRatesFn(this.userData.provider_id);
      console.log("good2: ", data);
    },
    getInformationDriver() {
      this.$store.commit("Users/usersData", "");
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.userId = parseInt(this.$route.params.id);
      this.$http
        .get(`admin/panel/driver/${this.userId}/info`)
        .then((response) => {
          this.infoUser = response.data.data;
          this.provider_rates = this.infoUser;
          console.log("this.infoUser: ", this.infoUser);
          this.$store.commit("Users/usersData", this.infoUser);
          this.$swal.close();
        })
        .catch((error) => {
          this.$swal({
            title: error.response.data.data,
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
  },
  mounted() {
    this.getProviders();
    this.provider_info = this.userData.provider_info;
    this.provider_rates = this.userData;
  },
  updated() {
    if (this.couter < 2) {
      this.couter++;
      if (
        this.userData.driver_type == "Provider" &&
        this.userData.rates != null
      ) {
        this.ratesFound = true;
        this.providerRates = this.userData.rates;
      } else this.ratesFound = false;

      if (this.userData.driver_type == "CNA" && this.userData.rates != null) {
        this.driverRates = this.userData.rates;
      }
    }
  },
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
.blank_row {
  height: 50px !important;
  background-color: #ffffff;
}
</style>