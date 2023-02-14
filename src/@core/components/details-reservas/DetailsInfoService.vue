<template>
  <div>
    <b-row style="margin-bottom: 20px">
      <!-- Resumen Distance an location -->
      <b-col md="12" class="display: flex;">
        <table class="tbTotal">
          <tr v-if="dataRequest.from !== '' && dataRequest.to !== ''">
            <td>
              <span style="font-weight: bold"> Pickup address: </span>
            </td>
            <td>
              {{ reserva.from.from }}
            </td>
          </tr>
          <tr v-if="dataRequest.from !== '' && dataRequest.to !== ''">
            <td>
              <span style="font-weight: bold"> Destination: </span>
            </td>
            <td>
              {{ reserva.to.to }}
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
    </b-row>
    <!-- form Admin -->
    <b-form>
      <validation-observer ref="rulesFormBooking" tag="form">
        <b-row>
          <b-col md="2">
            <b-form-group label="Trip type">
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Trip Type"
              >
                <v-select
                  v-model="selectedTripType"
                  :options="optionsTripType"
                  label="title"
                  placeholder="Please select"
                  @input="calculatePrice()"
                />
                <small class="text-danger" v-if="errors[0]">{{
                  errors[0]
                }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="3" v-if="selfPaySeleted.corporate_account !== null">
            <b-form-group label="Service type">
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Service Type"
              >
                <v-select
                  v-model="selectedService"
                  :options="optionsServiceOptions"
                  label="title"
                  placeholder="Service Type"
                  @input="calculatePrice()"
                />
                <small class="text-danger" v-if="errors[0]">{{
                  errors[0]
                }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="3">
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
                />
                <small class="text-danger" v-if="errors[0]">{{
                  errors[0]
                }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Pickup time">
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="It's pickup on time"
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
            <b-form-group label="Pickup address">
              <b-form-input
                label="Pick up address"
                disabled
                v-model="reserva.from.from"
              />
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
              <b-form-input disabled v-model="reserva.to.to" />
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
                  :disabled="listCities.length==0"
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

          <b-col cols="12" md="3">
            <b-form-group label="Appointment date">
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Appointment date"
              >
                <b-form-datepicker
                  v-model="dataRequest.booking_date"
                  locale="en"
                  placeholder="0/00/0000"
                />
                <small class="text-danger" v-if="errors[0]">{{
                  errors[0]
                }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Appointment time">
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Appointment time"
              >
                <b-form-timepicker
                  local="en"
                  v-model="appoinmentDatetimeSelected"
                />
                <small class="text-danger" v-if="errors[0]">{{
                  errors[0]
                }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Suggested pickup time">
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Suggested pickup time"
              >
                <b-form-timepicker
                  local="en"
                  v-model="dataRequest.pickup_time"
                />
                <small class="text-danger" v-if="errors[0]">{{
                  errors[0]
                }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="3">
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
                  @change="calculatePrice()"
                />
                <small class="text-danger" v-if="errors[0]">{{
                  errors[0]
                }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
      </validation-observer>
    </b-form>

    <b-form>
      <b-row>
        <!-- Field: Username -->
        <b-col cols="12" md="3">
          <b-form-group label="Facility Name">
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="Facility Name"
            >
              <b-form-input v-model="dataRequest.facility_name" />
              <small class="text-danger" v-if="errors[0]">{{
                errors[0]
              }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <!-- Field: Full Name -->
        <b-col cols="12" md="3">
          <b-form-group label="Doctor's Name">
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="Doctor's Name"
            >
              <b-form-input v-model="dataRequest.doctor_name" />
              <small class="text-danger" v-if="errors[0]">{{
                errors[0]
              }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="3">
          <b-form-group label="Facility Phone Number">
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="Facility Phone Number"
            >
              <b-form-input v-model="dataRequest.facility_phone_number" />
              <small class="text-danger" v-if="errors[0]">{{
                errors[0]
              }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group label="Driver price">
              <b-form-input
                v-model="dataRequest.driver_price"
                @keypress="isNumberVar($event)"
              />          
          </b-form-group>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col v-if="enableControl === true" cols="12 text-right">
          <b-button
            class="btn btn-primary"
            @click="saveChanges"
            :disabled="disablebUpdateButton"
            id="updateButton"
          >
            <span v-if="disablebUpdateButton == false">Update</span>
            <span v-if="disablebUpdateButton == true">Please wait...</span>
          </b-button>
        </b-col>
      </b-row>
    </b-form>

    <!-- Additional stops -->
    <b-col md="12">
      <h5 class="mb-0">Additional stops Fee ${{ feeAdditionalStop }}</h5>
      <br />
    </b-col>
    <b-col md="7" v-if="enableControl == true">
      <b-form-group>
        <gmap-autocomplete
          :value="searchAdditionalStop"
          class="form-control"
          @place_changed="initMarkerAdditionalStop"
        >
        </gmap-autocomplete>
      </b-form-group>
      <b-button variant="success" @click="addAdditionalStop">
        Add additional stop
      </b-button>
    </b-col>
    <b-col md="6"> </b-col>
    <b-col md="12" v-if="listAdditionalStopsSelected.length > 0">
      <br />
    </b-col>
    <b-col md="12" v-if="listAdditionalStopsSelected.length > 0">
      <b-table-simple hover small caption-top responsive>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th> List Additional stops</b-th>
            <b-th></b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="item in listAdditionalStopsSelected" :key="item.id">
            <b-td>{{ item.to }} </b-td>
            <b-td>
              <b-button
                v-if="enableControl == true"
                variant="danger"
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
  BCardText,
  BCardHeader,
  BCardTitle,
  BFormCheckbox,
  BFormSelect,
  BModal,
  BInputGroup,
  BInputGroupAppend,
  VBTooltip,
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
import { FormWizard, TabContent } from "vue-form-wizard";
import vSelect from "vue-select";
import Ripple from "vue-ripple-directive";
import { getFeeAdditionalStop, getFeeWaitingTime } from "@core/utils/prices";
import {
  getMenuOptionsTripType,
  getMenuOptionsSurgeryOptions,
  getMenuOptionsServiceType,
  getMenuYesNo,
  getMenuPickupOnTime,
  getMenuTimeZones,
} from "@core/utils/menus";
import{getCentralTime} from  "@core/utils/utils";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { getMessageError } from "@core/utils/utils";
import { toFixed } from "@core/utils/numbers_utils";
import { addAddressToList } from "@core/utils/gps_utils";

export default {
  name: "DetailsInfoService",
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
    BCardText,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
    BFormSelect,
    BModal,
    BInputGroup,
    BInputGroupAppend,
    vSelect,
    BFormDatepicker,
    BFormTimepicker,
    FormWizard,
    BTableSimple,
    BThead,
    BTr,
    BTd,
    BTh,
    BTbody,
    BTfoot,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      dataRequest: {
        booking_date: "",
        from: "",
        to: "",
        pickup_time: "",
        city: "",
        surgery_type: "",
        appoinment_datetime: "",
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
        trip_type: "",
        service_type: "",
        waitingTime: 0,
        totalAdditionalStop: 0,
        totalWaitingTime: 0,
        total_miles: 0,
        listAdditionalStops: [],
        is_pickup_ontime: 0,
        state: "",
        city: "",
        time_zone: "",
        garage_time:"",
      },
      appoinmentDatetimeSelected: "",
      listAdditionalStopsSelected: [],
      fromSelected: "",
      toSelected: "",
      selfPaySeleted: {},
      selectedTripType: {},
      selectedSurgery: {},
      selectedService: {},
      searchAdditionalStop: null,
      searchPickupAddress: null,
      searchDestinationAddress: null,
      additionalStop: null,
      enableControl: true,
      feeAdditionalStop: 0,
      feeWaitingTime: 0,
      reserva: {
        from: "",
        to: {},
      },
      tripSupported: null,
      listAditional: {},
      inhabilitar: true,
      savedInfo: false,
      valonuevo: "",
      adicional: "",
      reservaId: 0,
      listReservas: {},
      data_time: "",
      ap_date: "",
      ap_time: "",
      optionsTripType: [],
      optionsSurgery: [],
      optionsServiceOptions: [],
      optionsTimezone:[],
      disablebUpdateButton: false,
      listAddresses: [],
      listAddressesOrdered: [],
      selectedIsPickupOntime: null,
      listStates: [],
      listCities: [],
      selectedState: null,
      selectedCity: null,
      selectedTimeZone: null,
    };
  },
  methods: {
    //origin address, save address and coordinates
    initMarkerFrom(loc) {
      console.log("initMarkerFrom")
      this.existingPlace = loc;

      this.setStateCity(loc);
      this.reserva.from.from = this.existingPlace.formatted_address;
      this.fromSelected = this.existingPlace.formatted_address;
      this.reserva.from.coordinates =
        this.existingPlace.geometry.location.lat() +
        "," +
        this.existingPlace.geometry.location.lng();
        this.getTimeZone(this.existingPlace.geometry.location.lat(),this.existingPlace.geometry.location.lng());

      this.doCalculations();
    },
    //destiny address, save address and coordinates
    initMarkerTo(loc) {
      this.existingPlace = loc;
      this.reserva.to.to = this.existingPlace.formatted_address;
      this.toSelected = this.existingPlace.formatted_address;
      this.reserva.to.coordinate =
        this.existingPlace.geometry.location.lat() +
        "," +
        this.existingPlace.geometry.location.lng();
      this.doCalculations();
    },
    //additional point, save address and coordinates
    initMarkerAdditionalStop(loc) {
      let existingPlace = loc;
      let to = existingPlace.formatted_address;
      let coordinate =
        existingPlace.geometry.location.lat() +
        "," +
        existingPlace.geometry.location.lng();

      this.additionalStop = {
        service: "Additional Stop",
        to: to,
        to_coordinates: coordinate,
        price: 0,
        booking_id: this.dataRequest.id,
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
    //validate form before send it to server
    validationFormInfoRequest() {
      //validate pickup address
      if (this.reserva.to_coordinates === "") {
        let message = "Must select a pickup address";
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

      //validate destine address
      if (this.reserva.from_coordinates === "") {
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
        return false;
      }

      return new Promise((resolve, reject) => {
        this.$refs.rulesFormBooking.validate().then((success) => {
          if (success) {
            this.formSubmitted();
          } else {
            reject();
          }
        });
      });
    },
    //send the form to server
    formSubmitted() {
      this.dataRequest.appoinment_datetime =
        this.dataRequest.booking_date.split(" ")[0] +
        " " +
        this.appoinmentDatetimeSelected;
      this.dataRequest.to = this.reserva.to;
      this.dataRequest.from = this.reserva.from;

      this.dataRequest.service_type = this.selectedService.value;
      this.dataRequest.surgery_type = this.selectedSurgery.value;
      this.dataRequest.trip_type = this.selectedTripType.value;
      this.dataRequest.total_additional_stops =
        this.listAdditionalStopsSelected.length;
      this.dataRequest.is_pickup_ontime = this.selectedIsPickupOntime.value;
      this.dataRequest.state = this.selectedState.value;
      this.dataRequest.city = this.selectedCity.value;
      this.dataRequest.time_zone=this.selectedTimeZone.value;
      this.dataRequest.garage_time=this.getCentralTime(this.dataRequest,"YYYY-MM-DD HH:mm:ss");

      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      this.$http
        .post(
          `admin/panel/booking/${this.reservaId}/modify_bookingservice`,
          this.dataRequest
        )
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            this.$swal({
              title: "Record modified successfully",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            });
            this.inhabilitar = true;
          } else {
            let message = getMessageError(res);
            this.$swal({
              title: message,
              icon: "error",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            });
          }
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
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.reservaId = this.$route.params.id;

      this.$http
        .get(`admin/panel/booking/${this.reservaId}/info`)
        .then((response) => {
          this.dataRequest = response.data.data;
          this.listAdditionalStopsSelected = this.formatListAdditionalStops(
            response.data.data.additional_service
          );
          this.dataRequest.waitingTime = this.getWaitingTime(
            response.data.data.additional_service
          );
          this.setValuesControls();

          this.reserva.from = JSON.parse(this.dataRequest.from);
          this.reserva.from_coordinates = this.reserva.from.coordinate;
          this.reserva.to = JSON.parse(this.dataRequest.to);
          this.reserva.to_coordinates = this.reserva.to.coordinate;
          this.listAditional = this.listReservas.additional_service;
          this.appoinmentDatetimeSelected =
            this.dataRequest.appoinment_datetime.split(" ")[1];
          this.ap_date = this.data_time[0];
          this.ap_time = this.data_time[1];
          this.selfPaySeleted = response.data.data.self_pay;
          
          this.getStates(this.dataRequest.state);
          this.getCitiesByState(this.dataRequest.state, this.dataRequest.city);

          this.doCalculations();
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
    getTimeZone(lat,long) {
      this.selectedTimeZone=null;
      this.$http
        .get(`/getTimeZone/${lat}/${long}`)
        .then((response) => {         
         let timeZoneId=response.data.timeZoneId
         this.selectedTimeZone=this.optionsTimezone.find(x=>x.value==timeZoneId)
        })
        .catch((error) => {
         console.log(error);
        });
    },
    //call validate form
    saveChanges() {
      this.validationFormInfoRequest();
    },
    //calculate distance and price
    async doCalculations() {
      this.listAddresses = [];
      //add begining
      addAddressToList(
        this.reserva.from.from,
        this.reserva.from.coordinate,
        0,
        0,
        this.listAddresses
      );

      //add additional points
      for (let i = 0; i < this.listAdditionalStopsSelected.length; i++) {
        addAddressToList(
          this.listAdditionalStopsSelected[i].to,
          this.listAdditionalStopsSelected[i].coordinate,
          0,
          0,
          this.listAddresses
        );
      }

      //add ending
      addAddressToList(
        this.reserva.to.to,
        this.reserva.to.coordinate,
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
      this.disablebUpdateButton = true;
      let isCorporate =
        this.selfPaySeleted.corporate_account !== null ? true : false;
      let miles = this.dataRequest.total_miles;
      let waitingTime =
        this.dataRequest.waitingTime === "" ? 0 : this.dataRequest.waitingTime;
      let trip_type =
        this.selectedTripType === undefined
          ? this.optionsTripType[0].value
          : this.selectedTripType.value;
      let additionalStop = this.listAdditionalStopsSelected.length;
      let url = `admin/panel/calculatePriceSelfPay/${miles}/${trip_type}/${waitingTime}/${additionalStop}`;

      if (isCorporate) {
        let corporate_account_id = this.selfPaySeleted.corporate_account.id;
        let servicetype = this.selectedService.value;
        url = `admin/panel/calculate_price_corporate_account/${servicetype}/${miles}/${waitingTime}/${trip_type}/${corporate_account_id}/${additionalStop}`;
      }

      this.$http
        .get(url)
        .then((res) => {
          this.dataRequest.price = res.data.data.totalTrip;
          this.tripSupported = res.data.data.tripSupported;
          this.dataRequest.totalAdditionalStop =
            res.data.data.totalAdditionalStop;
          this.dataRequest.totalWaitingTime = res.data.data.totalWaitingTime;

          this.feeAdditionalStop = getFeeAdditionalStop(
            this.listAdditionalStopsSelected,
            this.dataRequest.totalAdditionalStop
          );
          this.feeWaitingTime = getFeeWaitingTime(
            this.dataRequest.waitingTime,
            this.dataRequest.totalWaitingTime
          );

          this.updatePricesAdditionalStops();
          this.disablebUpdateButton = false;
        })
        .catch((res) => {
          this.disablebUpdateButton = false;
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
    getAdditionalServiceByBookingId(processCalculateDistance) {
      let bookingId = this.dataRequest.id;

      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      this.$http
        .get(`admin/panel/booking/${bookingId}/services/view`)
        .then((response) => {
          this.listAdditionalStopsSelected = this.formatListAdditionalStops(
            response.data.data
          );
          if (processCalculateDistance) {
            this.doCalculations();
          }
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
    deleteAdditionalStop(item) {
      let bookingId = this.dataRequest.id;
      let serviceId = item.id;

      this.$swal({
        title: "Do you want delete this record?",
        text: "Once deleted, you will not be able to recover this record!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((result) => {
        if (result.value) {
          // <-- if confirmed
          this.$swal({
            title: "Please, wait...",
            didOpen: () => {
              this.$swal.showLoading();
            },
          });

          this.$http
            .post(
              `admin/panel/booking/${bookingId}/service/${serviceId}/delete`
            )
            .then((res) => {
              let index = this.listAdditionalStopsSelected.indexOf(item);
              if (index > -1) {
                this.listAdditionalStopsSelected.splice(index, 1);
                this.doCalculations();
                this.formSubmitted();
              }
              this.$swal({
                title: res.data.data,
                icon: "success",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
                buttonsStyling: false,
              });
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
        }
      });
    },
    addAdditionalStop() {
      if (this.additionalStop != null) {
        let bookingId = this.dataRequest.id;

        this.$swal({
          title: "Please, wait...",
          didOpen: () => {
            this.$swal.showLoading();
          },
        });

        this.$http
          .post(
            `admin/panel/booking/${bookingId}/services/add_one`,
            this.additionalStop
          )
          .then((response) => {
            this.$swal({
              title: response.data.message,
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            });
            this.searchAdditionalStop = null;
            this.listAdditionalStopsSelected.push(this.additionalStop);
            this.additionalStop = null;
            this.formSubmitted();
            this.getAdditionalServiceByBookingId(true);
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
      }
    },
    updatePricesAdditionalStops() {
      let bookingId = this.dataRequest.id;
      let totalWaitingTime = this.dataRequest.totalWaitingTime;
      let totalAdditionalStop = this.dataRequest.totalAdditionalStop;
      let waitingTime =
        this.dataRequest.waitingTime === "" ? 0 : this.dataRequest.waitingTime;

      if (this.listAdditionalStopsSelected.length === 0) {
        return false;
      }
      this.$swal({
        title: "Please, wait updating price additional services...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      this.$http
        .post(
          `admin/panel/booking/${bookingId}/update_prices_additonal_services/${totalWaitingTime}/${totalAdditionalStop}/${waitingTime}`
        )
        .then((res) => {
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
    formatListAdditionalStops(data) {
      let res = [];
      let listData = data.filter((x) =>
        x.service.toLowerCase().includes("stop")
      );
      for (let item of listData) {
        let currentData = JSON.parse(item.to);
        res.push({
          id: item.id,
          to: currentData.to,
          coordinate: currentData.coordinate,
        });
      }
      return res;
    },
    getWaitingTime(listData) {
      let result = 0;
      let data = listData.filter((x) =>
        x.service.toLowerCase().includes("wait")
      );
      if (data.length > 0) {
        result = data[0].time;
      }
      return result;
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
    //Set controls page methods
    loadMenus() {
      this.optionsTripType = getMenuOptionsTripType();
      this.optionsSurgery = getMenuOptionsSurgeryOptions();
      this.optionsServiceOptions = getMenuOptionsServiceType();
      this.optionsIsPickupOntime = getMenuPickupOnTime();
      this.optionsTimezone = getMenuTimeZones();

      this.selectedTripType = this.optionsTripType[0];
      this.selectedSurgery = this.optionsSurgery[0];
      this.selectedService = this.optionsServiceOptions[0];
      this.selectedIsPickupOntime = this.optionsIsPickupOntime[0];
    },
    setValuesControls() {
      this.selectedService = this.optionsServiceOptions.find(
        (item) => item.value === this.dataRequest.service_type
      );

      this.selectedTimeZone = this.optionsTimezone.find(
        (item) => item.value === this.dataRequest.time_zone
      );

      if (this.selectedService === undefined) {
        this.selectedService = this.optionsServiceOptions[0];
      }

      this.selectedSurgery = this.optionsSurgery.find(
        (item) => item.value === this.dataRequest.surgery_type
      );
      if (this.selectedSurgery === undefined) {
        this.selectedSurgery = this.optionsSurgery[0];
      }
      

      this.selectedTripType = this.optionsTripType.find(
        (item) => item.value === this.dataRequest.trip_type
      );
      if (this.selectedTripType === undefined) {
        this.selectedTripType = this.optionsTripType[0];
      }

      this.selectedIsPickupOntime = this.optionsIsPickupOntime.find(
        (item) => item.value === this.dataRequest.is_pickup_ontime
      );
      if (this.selectedIsPickupOntime === undefined) {
        this.selectedIsPickupOntime = this.optionsIsPickupOntime[0];
      }

      // if (this.dataRequest.status == 3 || this.dataRequest.status == 4) {
      //   this.enableControl = false;
      // }
    },
    toFixed(data, numFixed) {
      return toFixed(data, numFixed);
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
    getCentralTime(booking)
    {
      let res=""
      if(booking.time_zone)
      {
       res=getCentralTime(booking,"YYYY-MM-DD HH:mm")
      }
      return res
    },
  },
  mounted() {
    console.log("xxxxx")
    this.loadMenus();    
    this.getInfoBooking();

  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";

.circle-number-additional {
  background-color: #332b7b;
  padding: 5px 12px;
  border-radius: 16px;
  color: white;
}

.btn-primary {
  background: #7367f0 !important;
}

.tbTotal,
table.tbTotal th,
table.tbTotal td {
  border: 1px solid #c6c6c6;
  margin-left: auto;
  margin-bottom: 20px;
}
</style>