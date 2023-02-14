<template>
  <div class="cols-12 col-xl-12" style="margin: 0 auto" id="aride">
    <form-wizard
      color="#7367F0"
      :title="null"
      :subtitle="null"
      finish-button-text="Request"
      back-button-text="Previous"
      next-button-text="Next"
      class="
        steps-transparent
        mb-3
        d-lg-flex d-xl-flex d-md-flex
        justify-content-center
        flex-xl-column
        formcreatepatient
      "
      @on-complete="formRequest"
      style="background-color: #fff"
      ref="requestTrip"
    >
      <!-- personal details -->
      <tab-content title="Search Info">
        <b-row>
          <b-col md="4">
            <b-form-group label="Phone">
              <v-select
                :disabled="disablePhone === true"
                @open="numberFieldOpen()"
                @close="numberField()"
                v-model="currentPhone"
                :options="usersList"
                label="phone"
              >
                <template #option="{ phone }">
                  {{ phone }}
                </template>
              </v-select>
            </b-form-group>
          </b-col>

          <b-col md="4 mt-2">
            <p class="text-danger" id="paragraphNumber">
              This phone number doesn't have an account yet, click on button to
              create an account
            </p>
          </b-col>
          <b-col md="4 text-right m-auto">
            <b-button
              variant="success"
              class="btn btn-primary"
              @click="createSelfpaid()"
            >
              Create Account
            </b-button>
          </b-col>
        </b-row>
      </tab-content>
      <!-- personal details -->
      <tab-content title="Contact  Info" :before-change="validationForm">
        <validation-observer ref="accountRules" tag="form">
          <b-row>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">Contact Information</h5>
              <small class="text-muted" style="color: #000000d6 !important"
                >Enter Contact Information.</small
              >
            </b-col>

            <b-col md="4">
              <b-form-group label="Name">
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Name"
                >
                  <b-form-input
                    v-model="fname"
                    disabled
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Last Name">
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Last Name"
                >
                  <b-form-input
                    v-model="lastnombre"
                    disabled
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Contact Number">
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Contact Numbe"
                >
                  <b-form-input
                    v-model="contact"
                    :state="errors.length > 0 ? false : null"
                    disabled
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Email">
                <validation-provider
                  #default="{ errors }"
                  rules="required|email"
                  name="Email"
                >
                  <b-form-input
                    v-model="getEmailPatient"
                    :state="errors.length > 0 ? false : null"
                    disabled
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>

      <!-- personal details -->
      <tab-content title="Info" :before-change="validationFormInfo">
        <validation-observer ref="accountRulesFacilityName" tag="form">
          <b-row>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">Information</h5>
              <small class="text-muted" style="color: #000000d6 !important"
                >Enter information.</small
              >
            </b-col>
            <b-col md="4">
              <b-form-group label="Facility Name">
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Facility Name"
                >
                  <b-form-input
                    :state="errors.length > 0 ? false : null"
                    v-model="dataRequest.facility_name"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Doctor's Name">
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Doctor's Name"
                >
                  <b-form-input
                    v-model="dataRequest.doctor_name"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Facility Phone Number">
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Facility Phone Number"
                >
                  <b-form-input
                    v-model="dataRequest.facility_phone_number"
                    :state="errors.length > 0 ? false : null"
                    @keypress="isNumberVar($event)"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>

      <!-- address -->
      <tab-content
        title="Preschedule"
        :before-change="validationFormInfoRequest"
      >
        <validation-observer ref="infoRulesRequest" tag="form">
          <b-row>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">Preschedule date</h5>
              <small class="text-muted"></small>
            </b-col>

            <!-- Resumen Distance an location -->
            <b-col md="12" class="display: flex;">
              <table class="tbTotal">
                <tr v-if="dataRequest.from !== '' && dataRequest.to !== ''">
                  <td>
                    <span style="font-weight: bold"> Pickup address: </span>
                  </td>
                  <td>
                    {{ dataRequest.from }}
                  </td>
                </tr>
                <tr v-if="dataRequest.from !== '' && dataRequest.to !== ''">
                  <td>
                    <span style="font-weight: bold"> Destination: </span>
                  </td>
                  <td>
                    {{ dataRequest.to }}
                  </td>
                </tr>
                <tr v-if="dataRequest.from !== '' && dataRequest.to !== ''">
                  <td>
                    <span style="font-weight: bold"> Distance: </span>
                  </td>
                  <td>{{ toFixed(dataRequest.total_miles, 0) }} miles</td>
                </tr>
                <tr v-if="dataRequest.from !== '' && dataRequest.to !== ''">
                  <td>
                    <span style="font-weight: bold"> Price: </span>
                  </td>
                  <td>
                    {{ toFixed(dataRequest.price, 2) }}
                  </td>
                </tr>
                <tr v-if="tripSupported === 'no'">
                  <td>
                    <span style="font-weight: bold">Trip Supported</span>
                  </td>
                  <td>
                    {{ tripSupported }}
                  </td>
                </tr>
              </table>
            </b-col>
            <!--End Resumen Distance an location -->

            <b-col md="4">
              <b-form-group label="Trip type">
                <validation-provider #default="{ errors }" rules="required">
                  <v-select
                    v-model="selectedTripType"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="optionsTriptype"
                    label="title"
                    placeholder="Please select some item"
                    :state="errors.length > 0 ? false : null"
                    @input="calculatePrice"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="4">
              <b-form-group label="Reason of Visit">
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Reason of Visit"
                >
                  <v-select
                    v-model="selectedSurgery"
                    :options="optionsSurgery"
                    label="title"
                    placeholder="Please select some item"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="4">
              <b-form-group label="Pickup time">
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Pickup time"
                >
                  <v-select
                    v-model="selectedIsPickupOntime"
                    :options="optionsIsPickupOntime"
                    label="title"
                    placeholder="Please select some item"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group label="Pick up location">
                <b-form-input v-model="dataRequest.pick_up_location" />
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group label="Drop off location">
                <b-form-input v-model="dataRequest.drop_off_location" />
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group label="Pick up address">
                <b-form-input disabled v-model="dataRequest.from" />
                <gmap-autocomplete
                  class="form-control"
                  :value="searchPickupAddress"
                  @place_changed="initMarkerFrom"
                >
                </gmap-autocomplete>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Destination address">
                <b-form-input disabled v-model="dataRequest.to" />
                <gmap-autocomplete
                  class="form-control"
                  :value="searchDestinationAddress"
                  @place_changed="initMarkerTo"
                >
                </gmap-autocomplete>
              </b-form-group>
            </b-col>

            <b-col md="3">
              <b-form-group label="State">
                <validation-provider #default="{ errors }" rules="required">
                  <v-select
                    v-model="selectedState"
                    label="title"
                    :options="listStates"
                    @input="getCitiesByState(selectedState.value, '')"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group label="City">
                <validation-provider #default="{ errors }" rules="required">
                  <v-select
                    v-model="selectedCity"
                    label="title"
                    :options="listCities"
                    :disabled="listCities.length == 0"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="3">
              <b-form-group label="Time zone">
                <validation-provider #default="{ errors }" rules="required">
                  <v-select
                    v-model="selectedTimeZone"
                    label="title"
                    :options="optionsTimezone"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="4">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  rules="required|integer"
                  name="Waiting time"
                >
                  <label for=""
                    >Waiting time(hours) Fee ${{ feeWaitingTime }}/hour</label
                  >
                  <b-form-input
                    v-model="dataRequest.waitingTime"
                    :state="errors.length > 0 ? false : null"
                    @change="calculatePrice"
                  />
                  <small class="text-danger" v-if="errors[0]">{{
                    errors[0]
                  }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="4">
              <b-form-group label="Appointment date">
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Appointment date"
                >
                  <b-form-datepicker
                    v-model="appointmentdate"
                    :min="min"
                    :max="max"
                    locale="en"
                    placeholder="0/00/0000"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Appointment time">
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Appointment time"
                >
                  <b-form-timepicker
                    local="en"
                    v-model="appointmenttime"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Suggested pick up time">
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Suggested pick up time"
                >
                  <b-form-timepicker
                    locale="en"
                    v-model="dataRequest.pickup_time"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Notes">
                <b-form-input v-model="notes" />
              </b-form-group>
            </b-col>

            <!-- Additional stops -->
            <b-col md="12">
              <h5 class="mb-0">
                Additional stops Fee ${{ feeAdditionalStop }}
              </h5>
              <br />
            </b-col>
            <b-col md="5">
              <b-form-group>
                <gmap-autocomplete
                  :value="searchAdditionalStop"
                  class="form-control"
                  @place_changed="initMarkerAdditionalStop"
                >
                </gmap-autocomplete>
              </b-form-group>
            </b-col>
            <b-col md="7">
              <b-button variant="success" @click="addAdditionalStop">
                Add additional stop
              </b-button>
            </b-col>
            <b-col md="12" v-if="dataRequest.listAdditionalStops.length > 0">
              <h5 class="mb-0">List Additional stops</h5>
              <br />
            </b-col>
            <b-col md="12" v-if="dataRequest.listAdditionalStops.length > 0">
              <b-table-simple hover small caption-top responsive>
                <b-thead head-variant="dark">
                  <b-tr>
                    <b-th>Additional stop info</b-th>
                    <b-th></b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr
                    v-for="item in dataRequest.listAdditionalStops"
                    :key="item.id"
                  >
                    <b-td> {{ item.to }}</b-td>
                    <b-td>
                      <b-button
                        variant="danger"
                        class="btn btn-primary"
                        @click="deleteAdditionalStop(item)"
                      >
                        Delete
                      </b-button>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
            <!-- End Additional stops -->
          </b-row>
        </validation-observer>
      </tab-content>

      <!-- confirmation details -->
      <tab-content title="Confirmation" :before-change="validationFormInfo">
        <!-- Applicant -->
        <b-row class="invoice-heading">
          <b-col md="12">
            <h3 class="">Contact Information</h3>
          </b-col>
        </b-row>

        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Name</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 class="">{{ fname }}</h4>
          </b-col>
        </b-row>
        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Last Name</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 class="">{{ lastnombre }}</h4>
          </b-col>
        </b-row>
        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Contact Number</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 class="">{{ contact }}</h4>
          </b-col>
        </b-row>
        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Email</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 class="">{{ getEmailPatient }}</h4>
          </b-col>
        </b-row>

        <!-- Information -->
        <b-row class="invoice-heading">
          <b-col md="12">
            <h3 class="">Facility Information</h3>
          </b-col>
        </b-row>

        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Facility Name</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 class="">{{ dataRequest.facility_name }}</h4>
          </b-col>
        </b-row>
        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Doctor's Name</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 class="">{{ dataRequest.doctor_name }}</h4>
          </b-col>
        </b-row>
        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Facility Phone Number</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 class="">{{ dataRequest.facility_phone_number }}</h4>
          </b-col>
        </b-row>

        <!-- preschedule -->
        <b-row class="invoice-heading">
          <b-col md="12">
            <h3 class="">Booking details</h3>
          </b-col>
        </b-row>

        <b-row class="row-data"> </b-row>
        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Trip Type</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 class="">
              {{ selectedTripType ? selectedTripType.title : "" }}
            </h4>
          </b-col>
        </b-row>
        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Trip Distance(miles)</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 class="">{{ Math.round(dataRequest.total_miles) }}</h4>
          </b-col>
        </b-row>

        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Waiting time(hours)</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 class="">{{ dataRequest.waitingTime }}</h4>
          </b-col>
        </b-row>

        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Additional Stops</h4>
          </b-col>
          <b-col
            md="6"
            v-if="dataRequest.listAdditionalStops.length > 0"
            class="text-right"
          >
            <b-col
              v-for="item in dataRequest.listAdditionalStops"
              :key="item.id"
              md="12"
              class="text-right"
            >
              <h4 class="">*{{ item.to }}</h4>
            </b-col>
          </b-col>
        </b-row>

        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Price</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 class="">${{ dataRequest.price.toFixed(2) }}</h4>
          </b-col>
        </b-row>

        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Pickup Address</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 class="" id="initMarkerToId2">{{ dataRequest.from }}</h4>
          </b-col>
        </b-row>
        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Destination</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 class="" id="initMarkerFromId2">{{ dataRequest.to }}</h4>
          </b-col>
        </b-row>
        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Surgery Type</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 class="">{{ selectedSurgery ? selectedSurgery.title : "" }}</h4>
          </b-col>
        </b-row>
        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Appointment date</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 class="">{{ appointmentdate }}</h4>
          </b-col>
        </b-row>
        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Appointment time</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 v-if="selectedTripType" class="">{{ appointmenttime }}</h4>
          </b-col>
        </b-row>
        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Suggested pick up time</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 class="">{{ dataRequest.pickup_time }}</h4>
          </b-col>
        </b-row>
        <b-row class="row-data" v-if="show === true">
          <b-col md="6">
            <h4 class="">Price</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 class="">{{ resultValor }}</h4>
          </b-col>
        </b-row>
        <b-row class="row-data">
          <b-col md="6">
            <h4 class="">Notes</h4>
          </b-col>
          <b-col md="6" class="text-right">
            <h4 class="">{{ notes }}</h4>
          </b-col>
        </b-row>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import vSelect from "vue-select";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import { getFeeAdditionalStop, getFeeWaitingTime } from "@core/utils/prices";
import { getMessageError } from "@core/utils/utils";
import { toFixed } from "@core/utils/numbers_utils";
import { addAddressToList } from "@core/utils/gps_utils";

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
  BThead,
  BTr,
  BTd,
  BTh,
  BTbody,
  BTfoot,
} from "bootstrap-vue";
import {
  getMenuOptionsTripType,
  getMenuOptionsSurgeryOptions,
  getMenuOptionsServiceType,
  getMenuYesNo,
  getMenuPickupOnTime,
  getMenuTimeZones,
} from "@core/utils/menus";
import{getCentralTime} from  "@core/utils/utils";

export default {
  components: {
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BFormRadio,
    BFormSelect,
    BFormDatepicker,
    BFormTimepicker,
    vSelect,
    BTableSimple,
    BThead,
    BTr,
    BTd,
    BTh,
    BTbody,
    BTfoot,
    ToastificationContent,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 15th two months prior
    const minDate = new Date(today);
    minDate.setMonth(minDate.getMonth() - 1);
    minDate.setDate(15);
    // 15th in two months
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(15);
    return {
      searchingNumber: "",
      dir: "ltr",
      dataCa: {},
      listClients: [],
      additionalStop: null,
      searchAdditionalStop: null,
      searchPickupAddress: null,
      searchDestinationAddress: null,
      postData: {
        number: "",
      },
      currentPhone: "",
      dataRequest: {
        booking_date: "",
        from: "",
        to: "",
        pickup_time: "",
        city: "",
        surgery_type: "",
        appoinment_datetime: "",
        to_coordinates: "",
        from_coordinates: "",
        trip_distance: 0,
        service_fee: 0,
        price: 0,
        facility_name: "",
        doctor_name: "",
        facility_phone_number: "",
        approximately_return_time: "",
        status: "",
        selfpay_id: "",
        notes: "",
        service_type: "",
        waitingTime: 0,
        total_additional_stops: 0,
        totalWaitingTime: 0,
        total_miles: 0,
        listAdditionalStops: [],
        is_pickup_ontime: 0,
        pick_up_location: "",
        drop_off_location: "",
        state: "",
        city: "",
        time_zone: "",
        garage_time: "",
      },
      tripSupported: null,
      disablebUpdateButton: true,
      disablePhone: true,
      pricesSettings: null,
      feeAdditionalStop: 0,
      feeWaitingTime: 0,
      //tomar dirección de api google
      getlocationlong: "",
      getlocationlati: "",

      getlocationFromLong: "",
      getlocationFromLati: "",

      center: {
        lat: 39.7837304,
        lng: -100.4458825,
      },
      locationMarkers: [],
      locPlaces: [],
      existingPlace: {},

      lispatient: [],
      usersList: [],
      idpaciente: 0,
      fecha: "",
      tiempo: "",
      appointmentdate: "",
      appointmenttime: "",
      min: minDate,
      max: maxDate,
      appointment: "",

      //nuevo agregado
      lastnombre: "",
      fname: "",
      contact: "",
      getEmailPatient: "",
      getInfoPat: [],
      address: "",
      gps_address: "",
      //fin nuevo agregado

      resultValor: 0,
      show: false,
      searchWait: "",
      millas: 0.621371,
      notes: "",
      phoneFieldEmpty: true,
      segundos: 1800, //30 minutos
      tiempoEstimado: 0,
      selectedTripType: null,
      selectedSurgery: null,
      selectedIsPickupOntime: null,
      ubicacion: "",
      optionsTriptype: [],
      optionsSurgery: [],
      optionsIsPickupOntime: [],
      listAddresses: [],
      listAddressesOrdered: [],
      listStates: [],
      listCities: [],
      selectedState: null,
      selectedCity: null,
      selectedTimeZone: null,
      optionsTimezone: [],
    };
  },
  watch: {
    currentPhone() {
      this.lispatient.forEach((element) => {
        if (element.phone_number == this.currentPhone.phone) {
          this.phoneFieldEmpty = false;
          this.fname = element.name;
          this.lastnombre = element.lastname;
          this.contact = element.phone_number;
          this.getEmailPatient = element.email;
          this.address = element.address;
          this.gps_address = element.gps_address;
          this.idpaciente = element.id;

          this.dataRequest.from = this.address;
          this.dataRequest.from_coordinates = this.gps_address;
        }
      });
    },
    selfpay_id() {
      let { selfpay_id, status } = this.$store.getters["Users/userData"];
      this.dataCa.selfpay_id = selfpay_id;
      this.dataCa.status = status;
    },
    tiempoEstimado() {
      if (
        this.dataRequest.from !== "" &&
        this.dataRequest.to !== "" &&
        this.tiempoEstimado !== 0
      ) {
        let resultSegundos = this.tiempoEstimado + this.segundos;
        let getMinutos = resultSegundos / 60;
        let horas = this.tiempo.slice(0, 2);
        let minutos = this.tiempo.slice(3, 5);
        let horaMin = horas * 60;
        let valorEnminutos = horaMin - Math.round(getMinutos);
        let pasar = valorEnminutos * 60;
        let hour = Math.floor(pasar / 3600);
        hour = hour < 10 ? "0" + hour : hour;
        let minute = Math.floor((pasar / 60) % 60);
        minute = minute < 10 ? "0" + minute : minute;
        let second = pasar % 60;
        second = second < 10 ? "0" + second : second;
        this.dataRequest.pickup_time = hour + ":" + minute + ":" + second;
        this.timeReturn();
      }
    },
  },
  computed: {
    infopersonaselec() {
      for (let lispatientKey of this.lispatient) {
        if (lispatientKey.id === lispatientKey.id) {
          let arrat = this.lispatient;
          for (let ki of arrat) {
            if (ki.id === lispatientKey.id) {
              // console.log(ki.lastname)
            }
          }
        }
      }
    },
  },
  methods: {
    initMarker(loc) {
      this.existingPlace = loc;
      this.dataRequest.city = this.existingPlace.formatted_address;
      console.log(this.dataRequest.city);
    },
    initMarkerTo(loc) {
      this.existingPlace = loc;
      this.dataRequest.to = this.existingPlace.formatted_address;
      this.dataRequest.to_coordinates =
        this.existingPlace.geometry.location.lat() +
        "," +
        this.existingPlace.geometry.location.lng();
      this.doCalculations();
      this.searchPickupAddress = null;
    },
    initMarkerFrom(loc) {
      this.existingPlace = loc;
      this.setStateCity(loc);
      this.getTimeZone(
        this.existingPlace.geometry.location.lat(),
        this.existingPlace.geometry.location.lng()
      );

      this.dataRequest.from = this.existingPlace.formatted_address;
      this.dataRequest.from_coordinates =
        this.existingPlace.geometry.location.lat() +
        "," +
        this.existingPlace.geometry.location.lng();
      this.doCalculations();

      let hourestimado = Math.floor(this.tiempoEstimado / 3600);
      hourestimado = hourestimado < 10 ? "0" + hourestimado : hourestimado;
      let minutetimado = Math.floor((this.tiempoEstimado / 60) % 60);
      minutetimado = minutetimado < 10 ? "0" + minutetimado : minutetimado;
      let secondestimado = this.tiempoEstimado % 60;
      secondestimado =
        secondestimado < 10 ? "0" + secondestimado : secondestimado;
      this.dataRequest.approximately_return_time =
        hourestimado + ":" + minutetimado + ":" + secondestimado;
      this.searchDestinationAddress = null;
    },
    initMarkerAdditionalStop(loc) {
      let existingPlace = loc;
      let to = existingPlace.formatted_address;
      let coordinate =
        existingPlace.geometry.location.lat() +
        "," +
        existingPlace.geometry.location.lng();

      this.additionalStop = {
        to: to,
        coordinate: coordinate,
      };
    },
    setStateCity(loc) {
      //get state and city
      let state = this.getStateFromApiRespGoogle(loc);
      let city = this.getCityFromApiRespGoogle(loc);
      let county = this.getCountyFromApiRespGoogle(loc);
      let place = `${county}, ${city}`;
      //load menu
      this.getStates(state);
      this.getCitiesByState(state, place);
    },
    validationForm() {
      return new Promise((resolve, reject) => {
        this.$refs.accountRules.validate().then((success) => {
          if (success) {
            resolve(true);
          } else {
            reject();
          }
        });
      });
    },
    validationNumber() {
      return new Promise((resolve, reject) => {
        this.$refs.accountNumber.validate().then((success) => {
          if (success) {
            resolve(true);
          } else {
            reject();
          }
        });
      });
    },
    validationFormInfo() {
      return new Promise((resolve, reject) => {
        this.$refs.accountRulesFacilityName.validate().then((success) => {
          if (success) {
            resolve(true);
          } else {
            reject();
          }
        });
      });
    },
    validationFormInfoRequest() {
      //validate destine address
      if (
        this.dataRequest.from_coordinates === "" ||
        this.dataRequest.from_coordinates === null
      ) {
        let message = "Must select a pickup address";
        this.$swal({
          title: message,
          icon: "error",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });

        //validate pickup address
        if (
          this.dataRequest.to_coordinates === "" ||
          this.dataRequest.to_coordinates === null
        ) {
          let message = "Must select a Destination";
          this.$swal({
            title: message,
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });

          return false;
        }

        return false;
      }
      return new Promise((resolve, reject) => {
        this.$refs.infoRulesRequest.validate().then((success) => {
          if (success) {
            if (this.tripSupported === "no") {
              let message = "Trip is not supported.";
              this.$swal({
                title: message,
                icon: "error",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
                buttonsStyling: false,
              });
              reject();
            } else {
              resolve(true);
            }
          } else {
            reject();
          }
        });
      });
    },
    getClientes() {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.$http
        .get("/admin/panel/ca/list")
        .then((response) => {
          this.listClients = response.data.data;
          this.$swal.close();
        })
        .catch((res) => {
          let message = getMessageError(res);
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
    getPricesSettings() {
      if (this.optionsTriptype.length == 0) {
        return false;
      }

      let miles = this.dataRequest.total_miles;
      let tripType =
        this.selectedTripType == null
          ? this.optionsTriptype[0].value
          : this.selectedTripType.value;

      this.$http
        .get(
          `/admin/panel/get_prices_selfpay_by_miles_triptype/${miles}/${tripType}`
        )
        .then((response) => {
          this.pricesSettings = response.data.data;
        })
        .catch((res) => {
          let message = getMessageError(res);
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
    //get the info of the booking
    getInfoBooking() {
      this.dataCa = this.$store.getters["Users/userData"].user;
    },
    getStates(itemSeleted) {
      this.listStates = [];
      this.selectedState = null;
      this.$http
        .get(`states_cities/get_states`)
        .then((response) => {
          this.loadMenuStates(response.data.data, itemSeleted);
        })
        .catch((error) => {
          this.$swal({
            title: getMessageError(error),
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
    getCitiesByState(state, city) {
      this.listCities = [];
      this.selectedCity = null;
      this.$http
        .get(`states_cities/get_cities_bystate/${state}`)
        .then((response) => {
          this.loadMenuCities(response.data.data, city);
        })
        .catch((error) => {
          this.$swal({
            title: getMessageError(error),
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
    //send the form to server
    async formRequest() {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.dataRequest.selfpay_id = parseInt(this.idpaciente);
      this.dataRequest.status = this.dataCa.status;
      this.dataRequest.booking_date =
        this.appointmentdate + " " + this.appointmenttime;
      this.dataRequest.appoinment_datetime =
        this.appointmentdate + " " + this.appointmenttime;
      this.dataRequest.trip_type = this.selectedTripType.value;
      this.dataRequest.surgery_type = this.selectedSurgery.value;
      this.dataRequest.notes = this.notes;
      this.dataRequest.totalAdditionalStop =
        this.dataRequest.listAdditionalStops.length;
      this.dataRequest.is_pickup_ontime = this.selectedIsPickupOntime.value;
      this.dataRequest.state = this.selectedState.value;
      this.dataRequest.city = this.selectedCity.value;
      this.dataRequest.time_zone = this.selectedTimeZone.value;
      this.dataRequest.garage_time = this.getCentralTime(
        this.dataRequest,
        "YYYY-MM-DD HH:mm:ss"
      );

      await this.$http
        .post("admin/panel/booking/add", this.dataRequest)
        .then((response) => {
          if (response.data.status === 200) {
            this.$swal({
              title: response.data.message,
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            });
            this.$router.push({ name: "assign-driver" });
          } else {
            this.$swal({
              title: response.data.message,
              icon: "error",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            });
          }
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
          console.log("no cumplido" + 5);
        });
    },
    addAdditionalStop() {
      if (this.additionalStop != null) {
        this.dataRequest.listAdditionalStops.push(this.additionalStop);
        this.searchAdditionalStop = null;
        this.additionalStop = null;
        this.doCalculations();
      }
    },
    deleteAdditionalStop(item) {
      let index = this.dataRequest.listAdditionalStops.indexOf(item);
      if (index > -1) {
        this.dataRequest.listAdditionalStops.splice(index, 1);
        this.doCalculations();
      }
    },
    //calculate distance and price
    async doCalculations() {
      this.listAddresses = [];
      //add begining
      addAddressToList(
        this.dataRequest.from,
        this.dataRequest.from_coordinates,
        0,
        0,
        this.listAddresses
      );

      //add additional points
      for (let i = 0; i < this.dataRequest.listAdditionalStops.length; i++) {
        addAddressToList(
          this.dataRequest.listAdditionalStops[i].to,
          this.dataRequest.listAdditionalStops[i].coordinate,
          0,
          0,
          this.listAddresses
        );
      }

      //add ending
      addAddressToList(
        this.dataRequest.to,
        this.dataRequest.to_coordinates,
        0,
        0,
        this.listAddresses
      );

      if (this.listAddresses.length > 1) {
        //calculate distance
        await this.calculateDistanceIncludingAdditionalPoints(
          this.listAddresses
        );

        //calculate price
        this.calculatePrice();
      }
    },
    //calculate the distance between the start and each point then sort each point by distance between start and the point
    async calculateDistancesFromStartToPoints() {
      let self = this;
      self.listAddressesOrdered = [];

      //set the origin point
      let from = {
        address: this.listAddresses[0].address,
        coordinates: this.listAddresses[0].coordinates,
        distanceFromStart: 0,
        distanceBetwentPoints: 0,
      };

      //set the additional point and the end destination point
      for (let i = 0; i < this.listAddresses.length; i++) {
        //get the info of the current point and save into "to" variable
        let to = {
          address: this.listAddresses[i].address,
          coordinates: this.listAddresses[i].coordinates,
          distanceFromStart: null,
          distanceBetwentPoints: null,
        };

        //if is the begining or the ending dont do calculations
        if (i === 0 || i === this.listAddresses.length - 1) {
          self.listAddressesOrdered.push(to);
          continue;
        }

        //proccess the point to call google api map
        let searchComa = to.coordinates.indexOf(",");
        let latud = to.coordinates.substring(0, searchComa);
        let longi = to.coordinates.substring(
          searchComa + 1,
          from.coordinates.length
        );

        //longitúd y latitúd from
        let searchComaFrom = from.coordinates.indexOf(",");
        let latudFrom = from.coordinates.substring(0, searchComaFrom);
        let longiFrom = from.coordinates.substring(
          searchComaFrom + 1,
          to.coordinates.length
        );

        let origin1 = new google.maps.LatLng(latud, longi);
        let origin2 = to.address;
        let destinationA = from.address;
        let destinationB = new google.maps.LatLng(latudFrom, longiFrom);

        //call the google maps api
        let service = new google.maps.DistanceMatrixService();
        await service.getDistanceMatrix(
          {
            origins: [origin1, origin2],
            destinations: [destinationA, destinationB],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
          },
          function (response, status) {
            if (response) {
              if (response.rows[0].elements[0].distance) {
                to.distanceFromStart =
                  response.rows[0].elements[0].distance.value / 1609.34;

                //add item to listAddress
                self.listAddressesOrdered.push(to);

                //order the listAddresses according to distanceFromStart
                self.listAddressesOrdered.sort(function (a, b) {
                  return (
                    parseFloat(a.distanceFromStart) -
                    parseFloat(b.distanceFromStart)
                  );
                });
              }
            }
          }
        );
      }
    },
    //calculate the distance including the additional points
    async calculateDistanceIncludingAdditionalPoints() {
      let self = this;
      self.dataRequest.total_miles = 0;

      await self.calculateDistancesFromStartToPoints();

      //set the additional point and the end destination point
      for (let i = 1; i < self.listAddressesOrdered.length; i++) {
        let from = self.listAddressesOrdered[i - 1];
        let to = self.listAddressesOrdered[i];

        //proccess the point to call google api map
        let searchComa = to.coordinates.indexOf(",");
        let latud = to.coordinates.substring(0, searchComa);
        let longi = to.coordinates.substring(
          searchComa + 1,
          from.coordinates.length
        );

        //longitúd y latitúd from
        let searchComaFrom = from.coordinates.indexOf(",");
        let latudFrom = from.coordinates.substring(0, searchComaFrom);
        let longiFrom = from.coordinates.substring(
          searchComaFrom + 1,
          to.coordinates.length
        );

        let origin1 = new google.maps.LatLng(latud, longi);
        let origin2 = to.address;
        let destinationA = from.address;
        let destinationB = new google.maps.LatLng(latudFrom, longiFrom);

        //call the google maps api
        let service = new google.maps.DistanceMatrixService();
        await service.getDistanceMatrix(
          {
            origins: [origin1, origin2],
            destinations: [destinationA, destinationB],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
          },
          function (response, status) {
            if (response) {
              if (response.rows[0].elements[0].distance) {
                let distance =
                  response.rows[0].elements[0].distance.value / 1609.34;
                self.dataRequest.total_miles += distance;
              }
            }
          }
        );
      }
    },
    calculatePrice() {
      let miles = this.dataRequest.total_miles;
      let waitingTime = this.dataRequest.waitingTime;
      let tripType =
        this.selectedTripType.value === null
          ? this.optionsTriptype[0].value
          : this.selectedTripType.value;
      let additionalStop = this.dataRequest.listAdditionalStops.length;

      this.$swal({
        title: "Please, wait calculating price...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      this.$http
        .get(
          `admin/panel/calculatePriceSelfPay/${miles}/${tripType}/${waitingTime}/${additionalStop}`
        )
        .then((res) => {
          this.dataRequest.price = res.data.data.serviceTotal;
          this.tripSupported = res.data.data.tripSupported;
          this.dataRequest.total_additional_stops =
            res.data.data.totalAdditionalStop;
          this.dataRequest.totalWaitingTime = res.data.data.totalWaitingTime;
          this.feeAdditionalStop = getFeeAdditionalStop(
            this.dataRequest.listAdditionalStops,
            this.dataRequest.total_additional_stops
          );
          this.feeWaitingTime = getFeeWaitingTime(
            this.dataRequest.waitingTime,
            this.dataRequest.totalWaitingTime
          );
          this.$swal.close();
        })
        .catch((res) => {
          this.$swal({
            title: getMessageError(res),
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
    searchNummber() {
      let self = this;
      this.$http
        .post(`ca/1/panel/selfpay/searchNumber`, this.postData)
        .then((res) => {
          self.usersList = res.data.data;
          self.disablePhone = false;
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
    numberFieldOpen() {
      const $nextBtn = document.querySelectorAll("#aride .wizard-footer-right");
      const $createBtn = document.querySelectorAll(
        ".col-md-4.text-right.m-auto"
      );
      const $paragraphNumber = document.getElementById("paragraphNumber");

      console.log(($nextBtn[0].style.display = "none"));
      console.log(($createBtn[0].style.display = "none"));
      console.log(($paragraphNumber.style.display = "none"));
      this.phoneFieldEmpty = true;
    },
    numberField() {
      const $nextBtn = document.querySelectorAll("#aride .wizard-footer-right");
      const $createBtn = document.querySelectorAll(
        ".col-md-4.text-right.m-auto"
      );
      const $paragraphNumber = document.getElementById("paragraphNumber");
      if (this.phoneFieldEmpty == true) {
        console.log(($nextBtn[0].style.display = "none"));
        console.log(($createBtn[0].style.display = "block"));
        $paragraphNumber.style.display = "block";
      } else {
        console.log(($nextBtn[0].style.display = "block"));
        console.log(($createBtn[0].style.display = "none"));
        $paragraphNumber.style.display = "none";
      }
    },
    isNumberVar: function (event) {
      let regex = new RegExp("^[-Z0-9 ]+$");
      let key = String.fromCharCode(
        !event.charCode ? event.which : event.charCode
      );
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    },
    createSelfpaid() {
      this.$router.push({
        name: "create-selfpaid",
        query: { plan: "private" },
      });
    },
    timeReturn() {
      if (
        this.dataRequest.from !== "" &&
        this.dataRequest.to !== "" &&
        this.tiempoEstimado !== 0
      ) {
        let hourestimado = Math.floor(this.tiempoEstimado / 3600);
        hourestimado = hourestimado < 10 ? "0" + hourestimado : hourestimado;
        let minutetimado = Math.floor((this.tiempoEstimado / 60) % 60);
        minutetimado = minutetimado < 10 ? "0" + minutetimado : minutetimado;
        let secondestimado = this.tiempoEstimado % 60;
        secondestimado =
          secondestimado < 10 ? "0" + secondestimado : secondestimado;
        this.dataRequest.approximately_return_time =
          hourestimado + ":" + minutetimado + ":" + secondestimado;
      }
    },
    loadMenus() {
      this.optionsTriptype = getMenuOptionsTripType();
      this.optionsSurgery = getMenuOptionsSurgeryOptions();
      this.optionsIsPickupOntime = getMenuPickupOnTime();
      this.optionsIsPickupOntime = getMenuPickupOnTime();
      this.optionsTimezone = getMenuTimeZones();

      this.selectedTripType = this.optionsTriptype[0];
      this.selectedSurgery = this.optionsSurgery[0];
      this.selectedIsPickupOntime = this.optionsIsPickupOntime[0];
    },
    toFixed(data, numFixed) {
      return toFixed(data, numFixed);
    },
    loadMenuStates(listData, itemSeleted) {
      this.listStates = [];
      listData.forEach((element) => {
        let data = {
          value: `${element.state_full}`,
          title: `${element.state_full}`,
        };
        this.listStates.push(data);
      });
      this.selectedState = this.listStates.find((x) => x.value == itemSeleted);
    },
    loadMenuCities(listData, itemSeleted) {
      this.listCities = [];
      listData.forEach((element) => {
        let data = {
          value: `${element.county}, ${element.city}`,
          title: `${element.county}, ${element.city}`,
        };
        this.listCities.push(data);
      });
      this.selectedCity = this.listCities.find((x) => x.value == itemSeleted);
    },
    getCityFromApiRespGoogle(data) {
      let item = "0";
      try {
        item = data.address_components.find((x) => x.types[0] == "locality");
        item = item.long_name;
        item = item.toUpperCase();
      } catch (error) {}
      return item;
    },
    getStateFromApiRespGoogle(data) {
      let item = "0";
      try {
        item = data.address_components.find(
          (x) => x.types[0] == "administrative_area_level_1"
        );
        item = item.long_name;
        item = item.toUpperCase();
      } catch (error) {}
      return item;
    },
    getCountyFromApiRespGoogle(data) {
      let item = "0";
      try {
        item = data.address_components.find(
          (x) => x.types[0] == "administrative_area_level_2"
        );
        item = item.long_name;
        item = item.toUpperCase();
        item = item.replace("COUNTY", "");
        item = item.replace("CONDADO DE", "");
        item = item.trim();
      } catch (error) {}
      return item;
    },
    getCentralTime(booking) {
      let res = "";
      if (booking.time_zone) {
        res = getCentralTime(booking, "YYYY-MM-DD HH:mm");
      }
      return res;
    },
    getTimeZone(lat, long) {
      this.selectedTimeZone = null;
      this.$http
        .get(`/getTimeZone/${lat}/${long}`)
        .then((response) => {
          let timeZoneId = response.data.timeZoneId;
          this.selectedTimeZone = this.optionsTimezone.find(
            (x) => x.value == timeZoneId
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  beforeMount() {
    this.getInfoBooking();
  },
  mounted() {
    this.loadMenus();
    this.getClientes();
    this.searchNummber();
    this.getPricesSettings();
    this.$http.get(`ca/1/panel/selfpay/search`).then((res) => {
      if (res.data.message) {
        this.lispatient = res.data.data;
      }
    });
    this.getStates("");
    this.selectedTripType = this.optionsTriptype[0];
  },
};
</script>
<style lang="scss">
#aride .wizard-footer-right,
.col-md-4.text-right.m-auto,
#paragraphNumber {
  display: none;
}

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

table.tbTotal,
table.tbTotal th,
table.tbTotal td {
  border: 1px solid #c6c6c6;
  margin-left: auto;
  margin-bottom: 20px;
}

@import "@core/scss/vue/libs/vue-select.scss";
</style>