<template>
  <div id="user-profile">
    <b-card>
      <b-row class="mt-5">
        <b-col md="4" class="mb-2">
          <label for="name"
            >Company Name <span class="text-danger">*</span></label
          >
          <b-form-input id="name" v-model="providerData.company_name" />
        </b-col>
        <b-col md="4" class="mb-2">
          <label for="Lastname"
            >Company Phone <span class="text-danger">*</span></label
          >
          <b-form-input id="Lastname" v-model="providerData.phone" />
        </b-col>
        <b-col md="4" class="mb-2">
          <label for="Phone_number"
            >Company Email <span class="text-danger">*</span></label
          >
          <b-form-input id="Phone_number" v-model="providerData.email" />
        </b-col>
        <b-col md="4" class="mb-2">
          <label for="Phone_number"
            >Company Address <span class="text-danger">*</span></label
          >
          <b-form-input
            id="Phone_number"
            v-model="providerData.company_address"
          />
        </b-col>
        <b-col md="4" class="mb-2">
          <label for="Phone_number"
            >Point of Contact (Full Name)
            <span class="text-danger">*</span></label
          >
          <b-form-input
            id="Phone_number"
            v-model="providerData.point_of_contact"
          />
        </b-col>
        <b-col md="4" class="mb-2">
          <label for="address"
            >Account Number <span class="text-danger">*</span></label
          >
          <b-form-input
            id="address"
            v-model="providerData.account_number"
            disabled
          />
        </b-col>
      </b-row>
      <div class="d-flex">
        <h4 class="mb-0 ml-50 mb-2">
          Type of vehicle<span class="text-danger">*</span>
        </h4>
      </div>
      <b-row>
        <b-col md="1" class="mb-2"></b-col>
        <b-col md="2" class="mb-2">
          <b-form-checkbox
            name="s"
            class="mr-0 custom_check_box"
            value="s"
            checked="s?1:0"
            v-model="providerData.car_type.s"
          >
            Sedan(S)
          </b-form-checkbox>
        </b-col>
        <b-col md="2" class="mb-2">
          <b-form-checkbox
            name="wc"
            class="mr-0 custom_check_box"
            value="wc"
            checked="wc?0:1"
            v-model="providerData.car_type.wc"
          >
            Wheelchair(WC)
          </b-form-checkbox>
        </b-col>
        <b-col md="3" class="mb-2">
          <b-form-checkbox
            name="bls"
            class="mr-0"
            value="bls"
            checked="bls?1:0"
            v-model="providerData.car_type.bls"
          >
            Basic life support Ambulance(BLS)
          </b-form-checkbox>
        </b-col>
        <b-col md="2" class="mb-2">
          <b-form-checkbox
            name="bls"
            class="mr-0 custom_check_box"
            value="gv"
            checked="gv?1:0"
            v-model="providerData.car_type.gv"
          >
            Gurney Van
          </b-form-checkbox>
        </b-col>
      </b-row>
      <div class="d-flex">
        <h4 class="mb-0 ml-50 mb-2">
          Documents<span class="text-danger">*</span>
        </h4>
      </div>
      <b-row class="ml-1">
        <b-col cols="12" md="6" lg="3" class="container-docs mr-2">
          <label for="imageLicense">Driver license</label><br />
          <input
            id="imageLicense"
            type="file"
            @change="handleimageLicense()"
            ref="imageLicense"
          />
          <div
            v-if="providerData.imageLicense"
            style="display: flex"
            class="mt-2"
          >
            <b-img
              class="doc"
              style="border-radius: 5px; height: 318px"
              :src="traerLicense"
            ></b-img>
          </div>
        </b-col>
        <b-col cols="12" md="6" lg="3" class="container-docs mr-2">
          <label for="imageInsurance">Proof of insurance</label>

          <input
            id="imageInsurance"
            type="file"
            @change="handleimageInsurance()"
            ref="imageInsurance"
          />
          <div
            v-if="providerData.imageInsurance"
            style="display: flex"
            class="mt-2"
          >
            <b-img
              class="doc"
              style="border-radius: 5px; height: 318px"
              :src="traerimageInsurance"
            ></b-img>
          </div>
        </b-col>
        <b-col cols="12" md="6" lg="3" class="container-docs">
          <label for="imageLegalName">Proof of legal name</label>

          <input
            id="imageLegalName"
            type="file"
            @change="handleimageLegalName()"
            ref="imageLegalName"
          />
          <div
            v-if="providerData.imageLegalName"
            style="display: flex"
            class="mt-2"
          >
            <b-img
              class="doc"
              style="border-radius: 5px; height: 318px"
              :src="traerimageLegalName"
            ></b-img>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="12 save-btn text-right">
          <button
            class="btn btn-primary"
            :class="{ no_drop: imageCompressing }"
            :disabled="imageCompressing"
            v-on:click="updateProvider"
          >
            update
          </button>
        </b-col>
      </b-row>
    </b-card>

    <div class="d-flex">
      <h4 class="ml-50 mb-2 mt-2">Rates</h4>
    </div>

    <!-- BEGIN TAB LIST RATES -->
    <b-row class="ml-4 mr-4">
      <b-col md="12 save-btn text-right">
        <div id="wrapper"></div>
        <b-button
          class="btn btn-primary mb-2 ml-2"
          variant="primary"
          v-b-modal.modal-center
          @click="addRate()"
        >
          Add Rate
        </b-button>
      </b-col>
      <div class="search-table-outter">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Service Type</th>
              <th scope="col">Base Rate</th>
              <th scope="col">Price Per Hour Wait Time</th>
              <th scope="col">Cancellation Fee</th>
              <th scope="col">Additional Mileage</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listRates" :key="'wc' + index">
              <td>{{ item.id }}</td>
              <td>
                {{
                  (item.vehicle_type = !undefined
                    ? item.vehicle_type.toUpperCase()
                    : "")
                }}
              </td>
              <td>
                <b-form-input type="number" v-model="item.base_rate" disabled />
              </td>
              <td>
                <b-form-input type="number" v-model="item.wait_rate" disabled />
              </td>
              <td>
                <b-form-input
                  type="number"
                  v-model="item.cancel_rate"
                  disabled
                />
              </td>
              <td>
                <b-form-input
                  type="text"
                  v-model="item.additional_mileage"
                  disabled
                />
              </td>
              <td>
                <b-form-input
                  type="text"
                  :id="'wc_state_id_' + index"
                  v-model="item.state"
                  disabled                 
                />
              </td>
              <td>
                <b-form-input type="text" v-model="item.city" disabled  style="width: 350px"/>
              </td>
              <td class="d-flex">
                <b-icon-pencil-square
                  class="h2 mr-1"
                  tooltip.hover.top
                  title="Edit record"
                  @click="editRate(item)"
                ></b-icon-pencil-square>
                <b-icon-trash-fill
                  class="h2"
                  tooltip.hover.top
                  title="Remove record"
                  variant="danger"
                  @click="removeRowItem(index)"
                ></b-icon-trash-fill>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-row>
    <!-- END TAB LIST RATES -->

    <b-modal class="modal" id="modal-center" centered hide-footer>
      <div class="d-block">
        <h4>Information service</h4>
        <validation-observer ref="accountRules" tag="form">
          <b-row>
            <b-col>
              <b-form-group label="">
                <h5>State</h5>
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
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="">
                <h5>City</h5>
                <validation-provider #default="{ errors }" rules="required">
                  <v-select
                    v-model="selectedCity"
                    label="title"
                    :options="listCities"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h5>Service type</h5>
              <v-select
                v-model="selectedService"
                :options="optionsServiceType"
                label="title"
                placeholder="Please select"
                class="mb-2"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Base Rate ">
                <validation-provider #default="{ errors }" rules="required">
                  <b-form-input
                    type="number"
                    v-model="formData.base_rate"
                    :state="errors.length > 0 ? false : null"
                    :disabled="inhabilitar === true"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Additional mileage">
                <validation-provider #default="{ errors }" rules="required">
                  <b-form-input
                    type="number"
                    v-model="formData.additional_mileage"
                    :state="errors.length > 0 ? false : null"
                    :disabled="inhabilitar === true"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Price per hour wait time">
                <validation-provider #default="{ errors }" rules="required">
                  <b-form-input
                    type="number"
                    v-model="formData.wait_rate"
                    :state="errors.length > 0 ? false : null"
                    :disabled="inhabilitar === true"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Cancellation fee">
                <validation-provider #default="{ errors }" rules="required">
                  <b-form-input
                    type="number"
                    v-model="formData.cancel_rate"
                    :state="errors.length > 0 ? false : null"
                    :disabled="inhabilitar === true"
                  />
                  <small class="text-danger" v-if="errors[0]"
                    >This field is required</small
                  >
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </validation-observer>
      </div>
      <b-row class="mt-3">
        <b-col>
          <b-button
            class="col-7"
            style="float: right"
            variant="success"
            @click="validateForm()"
            block
            >Save</b-button
          >
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BImg,
  BButton,
  BFormGroup,
  BFormInput,
  BFormFile,
  BTabs,
  BTab,
  BFormCheckbox,
  BIconPlusCircleFill,
  BIconTrashFill,
  BIconPenFill,
  BIconPencilSquare,
} from "bootstrap-vue";
import UserDetailsVehicleDriver from "@core/components/user-approve-driver/UserDetailsVehicleDriver";
import UserDetailsAccount from "@core/components/user-approve-driver/UserDetailsAccount";
import UserDetailsDriverDocuments from "@core/components/user-approve-driver/UserDetailsDriverDocuments";
import ReservasAsignadasAlDriver from "@core/components/user-approve-driver/ReservasAsignadasAlDriver";
import BtnValidationDocsDriver from "@core/components/buttonsValidationDocsDriver/BtnValidationDocsDriver";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import {getMessageError } from "@core/utils/utils";
import {getMenuServiceType} from "@core/utils/menus";

/* eslint-disable global-require */
export default {
  components: {
    UserDetailsDriverDocuments,
    UserDetailsAccount,
    UserDetailsVehicleDriver,
    ReservasAsignadasAlDriver,
    BtnValidationDocsDriver,
    BRow,
    BCol,
    BCard,
    BImg,
    BButton,
    BFormGroup,
    BFormInput,
    BFormFile,
    BTabs,
    BTab,
    BFormCheckbox,
    BIconPlusCircleFill,
    BIconTrashFill,
    BIconPenFill,
    BIconPencilSquare,
    ValidationProvider,
    ValidationObserver,
    vSelect,
  },
  computed: {
    traerLicense() {
      let img1 = new Image();
      img1.src = this.providerData.imageLicense;

      img1.onerror = () => {
        this.providerData.imageLicense = "";
      };
      let img = this.providerData.imageLicense;
      return (this.imageLicense = `${img}`);
    },
    traerimageInsurance() {
      let img1 = new Image();
      img1.src = this.providerData.imageInsurance;

      img1.onerror = () => {
        this.providerData.imageInsurance = "";
      };
      let img = this.providerData.imageInsurance;
      return (this.imageInsurance = `${img}`);
    },
    traerimageLegalName() {
      let img1 = new Image();
      img1.src = this.providerData.imageLegalName;

      img1.onerror = () => {
        this.providerData.imageLegalName = "";
      };
      let img = this.providerData.imageLegalName;
      return (this.imageLegalName = `${img}`);
    },
  },
  data() {
    return {
      imageCompressing: false,
      providerData: {},
      ratesData: {},
      userId: 0,
      car_checkboxes: [],
      listRates: [],
      s: "",
      bls: "",
      wc: "",
      gv: "",
      imageLicense: "",
      imageInsurance: "",
      imageLegalName: "",
      imagenLicense: "",
      imagenInsurance: "",
      imagenLegalName: "",
      wheelchairIndex: "",
      ambulanceIndex: "",
      selectedService: { value: "", title: "" },
      selectedVehicletype: {},
      optionsServiceType:[],
      // optionsServiceType: [
      //   { value: "sedan", title: "SEDAN" },
      //   { value: "wc", title: "W/C" },
      //   { value: "bls", title: "BLS" },
      //   { value: "gurneyvan", title: "GURNEY VAN" },
      // ],
      gmapCity: null,
      inhabilitar: false,
      selectedItem: null,
      formData: {
        base_rate: null,
        wait_rate: null,
        cancel_rate: null,
        city: null,
        state: null,
      },
      listStates: [],
      listCities: [],
      selectedState: null,
      selectedCity: null,
    };
  },
  methods: {
    removeRowItem(index) {
      if (this.validateRateRequired(this.listRates[index]) === false) {
        return false;
      }
      console.log(this.listRates);
      return false;
      if (this.listRates[index].id) {
        this.deleteProviderRate(this.listRates[index].id);
        this.listRates.splice(index, 1);
      } else {
        this.listRates.splice(index, 1);
      }
    },
    showMessageError(message) {
      this.$swal({
        title: message,
        icon: "error",
        customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
      });
    },
    validateRateRequired(item) {
      try {
        if (
          item.vehicle_type == "SEDAN" &&
          this.providerData.car_type.s === "s"
        ) {
          if (
            this.listRates.filter((x) => x.vehicle_type == "SEDAN").length === 1
          ) {
            this.showMessageError("It's required at least one Sedan rate");
            return false;
          }
        }
        if (
          item.vehicle_type == "WC" &&
          this.providerData.car_type.wc === "wc"
        ) {
          if (
            this.listRates.filter((x) => x.vehicle_type == "WC").length === 1
          ) {
            this.showMessageError("It's required at least one WC");
            return false;
          }
        }
        if (
          item.vehicle_type == "BLS" &&
          this.providerData.car_type.bls === "bls"
        ) {
          if (
            this.listRates.filter((x) => x.vehicle_type == "BLS").length === 1
          ) {
            this.showMessageError("It's required at least one BLS");
            return false;
          }
        }
        if (
          item.vehicle_type == "GURNEYVAN" &&
          this.providerData.car_type.gv === "gv"
        ) {
          if (
            this.listRates.filter((x) => x.vehicle_type == "GURNEYVAN")
              .length === 1
          ) {
            this.showMessageError("It's required at least one GURNEY VAN");
            return false;
          }
        }
      } catch (err) {}
      return true;
    },
    async getProviderData() {
      console.log(3434);
      this.$store.commit("Users/usersData", "");
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      this.userId = parseInt(this.$route.params.id);
      this.$http
        .post(`admin/panel/provider/${this.userId}/edit`)
        .then((response) => {
          console.log(response);
          // console.log('rates: ',response.data.data[1].wc);
          this.$swal.close();
          this.providerData = response.data.data[0];
          this.setImages(
            this.providerData.imageLegalName,
            this.providerData.imageInsurance,
            this.providerData.imageLicense
          );
          if (response.data.data[1] != null)
            this.ratesData = response.data.data[1];

          this.listRates = this.ratesData.listRates;
          this.s = this.providerData.car_type.s;
          this.wc = this.providerData.car_type.wc;
          this.bls = this.providerData.car_type.bls;

          console.log("rates: ", this.listRates);
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
    async getImage(filePath) {
      let res = "";
      await this.$http
        .get(`private-files/${filePath}`)
        .then((response) => {
          res = response.data;
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
      return res;
    },
    getProviderRates(id) {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      this.$http
        .get(`admin/panel/providerrates/${id}`)
        .then((response) => {
          this.$swal.close();
          this.ratesData = response.data.data;
          this.listRates = this.ratesData.listRates;
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
    getStates(itemSeleted) {
      this.listStates = [];
      this.selectedState=null;
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
      this.selectedCity=null;
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
    updateProvider() {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      setTimeout(this.updateProviderCall, 1000);
    },
    updateProviderCall() {
      console.log("updateProvider");
      let providerDataCarType = JSON.stringify(this.providerData.car_type);
      const wc = JSON.stringify(this.ratesData.wc);
      const bls = JSON.stringify(this.ratesData.bls);
      // exit;
      let formData = new FormData();

      formData.append("company_name", this.providerData.company_name);
      formData.append("ph", this.providerData.phone);
      formData.append("email", this.providerData.email);
      formData.append("company_address", this.providerData.company_address);
      formData.append("point_of_contact", this.providerData.point_of_contact);
      formData.append("account_number", this.providerData.account_number);
      formData.append("car_type", providerDataCarType);

      formData.append("imageLicense", this.imagenLicense);
      formData.append("imageInsurance", this.imagenInsurance);
      formData.append("imageLegalName", this.imagenLegalName);

      formData.append("wheelchairs", []);
      formData.append("ambulances", []);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      this.$http
        .post(`admin/panel/provider/${this.providerData.id}/update`, formData)
        .then((response) => {
          if (response.status === 200) {
            this.providerData.imageLicense = response.data.data.imageLicense;
            this.providerData.imageInsurance =
              response.data.data.imageInsurance;
            this.providerData.imageLegalName =
              response.data.data.imageLegalName;
            this.setImages(
              this.providerData.imageLegalName,
              this.providerData.imageInsurance,
              this.providerData.imageLicense
            );
            console.log("response.status: ", response.data.data);
            this.clearFormData();
            this.selectedItem = null;
            this.getProviderRates(this.providerData.id);
            this.$swal({
              title: response.data.message,
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            });
          }
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
    deleteProviderRate(rateId) {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      rateId = parseInt(rateId);
      this.$http
        .post(`admin/panel/provider/rate/${rateId}/delete`)
        .then((response) => {
          if (response.status === 200) {
            this.$swal({
              title: response.data.message,
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            });
          }
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
    handleimageLicense() {
      this.imagenLicense = this.$refs.imageLicense.files[0];
      this.compressImage(this.imagenLicense, "imagenLicense");
    },
    handleimageInsurance() {
      this.imagenInsurance = this.$refs.imageInsurance.files[0];
      this.compressImage(this.imagenInsurance, "imagenInsurance");
    },
    handleimageLegalName() {
      this.imagenLegalName = this.$refs.imageLegalName.files[0];
      this.compressImage(this.imagenLegalName, "imagenLegalName");
    },
    compressImage(url, type) {
      this.imageCompressing = true;
      const WIDTH = 800;
      let image_file = url;

      let reader = new FileReader();

      reader.readAsDataURL(image_file);

      reader.onload = (event) => {
        let image_url = event.target.result;
        let image = document.createElement("img");
        image.src = image_url;
        image.onload = (e) => {
          let canvas = document.createElement("canvas");
          let ratio = WIDTH / image.width;
          canvas.width = WIDTH;
          canvas.height = image.height * ratio;

          let context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, canvas.width, canvas.height);

          let new_image_url = canvas.toDataURL("image/jpeg", 10);

          let image_file = this.urlToFile(new_image_url);
          if (type == "imagenLicense") {
            this.imagenLicense = image_file;
          }
          if (type == "imagenInsurance") {
            this.imagenInsurance = image_file;
          }
          if (type == "imagenLegalName") {
            this.imagenLegalName = image_file;
          }
        };
        this.imageCompressing = false;
      };
    },
    urlToFile(url) {
      let arr = url.split(",");
      // console.log(arr)
      let mime = arr[0].match(/:(.*?);/)[1];
      let data = arr[1];

      let dataStr = atob(data);
      let n = dataStr.length;
      let dataArr = new Uint8Array(n);

      while (n--) {
        dataArr[n] = dataStr.charCodeAt(n);
      }

      let file = new File([dataArr], "File.jpg", { type: mime });

      return file;
    },
    saveDataRateRate() {
      let url = `admin/panel/add_provider_rate`;

      this.formData.city = this.selectedCity.value;
      this.formData.state = this.selectedState.value;
      this.formData.vehicle_type = this.selectedService.value;

      if (this.formData.id != undefined) {
        url = `admin/panel/update_provider_rate`;
      } else {
        this.formData.taker_id = "pv_" + this.providerData.id;
      }

      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      this.$http
        .post(url, this.formData)
        .then((response) => {
          if (response.status === 200) {
            this.clearFormData();
            this.selectedItem = null;

            this.$swal({
              title: response.data.message,
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            });

            this.getProviderRates(this.providerData.id);

            this.$bvModal.hide("modal-center");
          }
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
    clearFormData() {
      this.formData = {
        base_rate: null,
        wait_rate: null,
        cancel_rate: null,
        city: null,
        state: null,
      };
    },
    async editRate(item) {
      this.selectedItem = item;
      this.formData = this.selectedItem;
      this.selectedService = this.optionsServiceType.find(
        (x) =>
          x.value.toUpperCase() === this.formData.vehicle_type.toUpperCase()
      );

      //get cities and states info
      this.getStates(item.state);
      this.getCitiesByState(item.state, item.city);

      this.ShowModal();
    },
    addRate(type) {
      this.clearFormData();

      this.formData.base_rate = "";
      this.formData.wait_rate = "";
      this.formData.cancel_rate = "";
      this.formData.additional_mileage = "";
      this.formData.city = "";
      this.formData.state = "";
      this.formData.vehicle_type = "sedan";
      this.selectedService = this.optionsServiceType.find(
        (x) =>
          x.value.toUpperCase() === this.formData.vehicle_type.toUpperCase()
      );
      this.selectedCity=null
      this.selectedState=null
    },
    validateForm() {
      //validate form
      this.$refs.accountRules.validate().then((success) => {
        if (success) {
          this.saveDataRateRate();
        } else {
          this.$swal({
            title: "Invalid form data",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        }
      });
    },
    ShowModal() {
      this.$bvModal.show("modal-center");
    },
    closeModal() {
      this.$bvModal.close("modal-center");
    },
    async setImages(imaLegalName, imaInsurance, imaLicense) {
      this.providerData.imageLegalName = await this.getImage(imaLegalName);
      this.providerData.imageInsurance = await this.getImage(imaInsurance);
      this.providerData.imageLicense = await this.getImage(imaLicense);
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
      this.selectedState = this.listStates.filter(
        (x) => x.value == itemSeleted
      );
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
      this.selectedCity = this.listCities.filter((x) => x.value == itemSeleted);
    },
  },
  mounted() {
    this.optionsServiceType=getMenuServiceType()
    this.getProviderData();
    this.getStates("");
  },
};
/* eslint-disable global-require */
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-profile.scss";

.name-corporative {
  margin-left: 15px;
  font-weight: bold;
  font-size: 1.1rem;
}
.custom_check_box {
  width: 1.285rem !important;
  height: 1.285rem !important;
  display: block !important;
}
.doc {
  min-width: 188px;
}
.blank_row {
  height: 50px !important;
  background-color: #ffffff;
}

.modal {
  z-index: 1001 !important;
}
.modal-backdrop {
  z-index: 1000 !important;
}
.pac-container {
  z-index: 1055 !important;
}
.search-table-outter {
  overflow-x: scroll;
}
th,
td {
  min-width: 200px;
}
.no_drop {
  cursor: no-drop !important;
}
</style>
