<template>
  <div id="user-profile">
    <!-- <form @submit.prevent="submitForm()" enctype="multipart/form-data" ref="form" method> -->
    <b-card>
      <b-tabs pills class="mb-2">
        <!-- Tab: Account -->
        <b-tab v-bind:disabled="!account">
          <template #title>
            <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Account</span>
          </template>
          <add-driver-account
            v-on:getAccountData="accountDataFn($event)"
            class="mt-2 pt-75"
          />
        </b-tab>

        <!-- Tab: Information -->
        <!-- <b-tab v-bind:disabled="!vehicle">
          <template #title>
            <feather-icon icon="InfoIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Vehicle</span>
          </template>
          <add-driver-vehicle
            v-on:getVechicalData="vechicalDataFn($event)"
            class="mt-2 pt-75"
          />
        </b-tab> -->

        <!-- Tab: Social -->
        <!-- <b-tab v-bind:disabled="!document">
          <template #title>
            <feather-icon icon="FolderIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Driver documents</span>
          </template>
          <add-driver-document
            v-on:getDocumentData="documentDataFn($event)"
            class="mt-2 pt-75"
          />
        </b-tab> -->
      </b-tabs>
    </b-card>
    <!-- <button
          type="submit"
          class="btn btn-primary"
          v-on:click="submitForm()"
        >
          Submit
        </button> -->
    <!-- </form> -->
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
} from "bootstrap-vue";
import AddDriverVehicle from "@core/components/add-user/AddDriverVehicle.vue";
import AddDriverAccount from "@core/components/add-user/AddDriverAccount.vue";
import AddDriverDocument from "@core/components/add-user/AddDriverDocument.vue";
import BtnValidationDocsDriver from "@core/components/buttonsValidationDocsDriver/BtnValidationDocsDriver";
import { getMessageError } from "@core/utils/utils";
/* eslint-disable global-require */
export default {
  components: {
    AddDriverDocument,
    AddDriverAccount,
    AddDriverVehicle,
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
  },
  data() {
    return {
      infoUser: {},
      userId: 0,
      account: true,
      vehicle: false,
      document: false,
      documentData: "",
      vechicalData: "",
      accountData: "",
      formData: [],

      // account
      name: "",
      lastname: "",
      phone_number: "",
      gender: "",
      birthday: "",
      email: "",
      address: "",
      status: "",
      is_bt: "",
      show_provider: "",
      account_number: "",
      provider_id: "",

      m_1_to_10_oneway: "",
      m_1_to_10_twoway: "",
      m_1_to_10_with: "",

      m_11_to_20_oneway: "",
      m_11_to_20_twoway: "",
      m_11_to_20_with: "",

      m_21_to_40_oneway: "",
      m_21_to_40_twoway: "",
      m_21_to_40_with: "",

      // vehical
      model: "",
      make: "",
      color: "",
      year: "",
      plate_number: "",
      vin_number: "",
      imageFront: "",
      imageRear: "",
      imageSide: "",
      imageInterior: "",

      // documents
      imagenLicense: "",
      imagenInsurance: "",
      licenseExpireyDate: "",
      insuranceExpireyDate: "",
    };
  },
  methods: {
    accountDataFn(data) {
      console.log("add driver:", data);
      // this.accountData = data;
      this.name = data.name;
      this.lastname = data.lastname;
      this.phone_number = data.phone_number;
      this.gender = data.gender;
      this.birthday = data.birthday;
      this.email = data.email;
      this.address = data.address;
      this.status = data.status;
      this.driver_type = data.driver_type;
      this.is_bt = data.is_bt;
      this.show_provider = data.show_provider;
      this.account_number = data.account_number;
      this.provider_id = data.provider_id;

      this.m_1_to_10_oneway = data.rates.m_1_to_10_oneway;
      this.m_1_to_10_twoway = data.rates.m_1_to_10_twoway;
      this.m_1_to_10_with = data.rates.m_1_to_10_with;

      this.m_11_to_20_oneway = data.rates.m_11_to_20_oneway;
      this.m_11_to_20_twoway = data.rates.m_11_to_20_twoway;
      this.m_11_to_20_with = data.rates.m_11_to_20_with;

      this.m_21_to_40_oneway = data.rates.m_21_to_40_oneway;
      this.m_21_to_40_twoway = data.rates.m_21_to_40_twoway;
      this.m_21_to_40_with = data.rates.m_21_to_40_with;

      this.account = false;
      this.vehicle = true;
      this.document = false;
      this.submitForm();
    },
    vechicalDataFn(data) {
      this.model = data.model;
      this.make = data.make;
      this.color = data.color;
      this.year = data.year;
      this.plate_number = data.plate_number;
      this.vin_number = data.vin_number;
      this.imageFront = data.imageFront;
      this.imageRear = data.imageRear;
      this.imageSide = data.imageSide;
      this.imageInterior = data.imageInterior;

      if (data.type == "back") {
        this.account = true;
        this.vehicle = false;
        this.document = false;
      } else {
        this.account = false;
        this.vehicle = false;
        this.document = true;
      }
    },
    documentDataFn(data) {
      if (data.type == "back") {
        this.account = false;
        this.vehicle = true;
        this.document = false;
      } else {
        this.imagenLicense = data.imagenLicense;
        this.imagenInsurance = data.imagenInsurance;
        this.licenseExpireyDate = data.licenseExpireyDate;
        this.insuranceExpireyDate = data.insuranceExpireyDate;
        this.submitForm();
      }
    },

    submitForm() {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      let formData = new FormData();

      //account driver
      formData.append("name", this.name);
      formData.append("lastname", this.lastname);
      formData.append("phone_number", this.phone_number);
      formData.append("birthday", this.birthday);
      formData.append("gender", this.gender);
      formData.append("email", this.email);
      formData.append("address", this.address);
      formData.append("status", this.status);
      formData.append("driver_type", this.driver_type);
      formData.append("is_bt", this.is_bt);
      formData.append("show_provider", this.show_provider);
      formData.append("account_number", this.account_number);
      formData.append("provider_id", this.provider_id);

      //rates
      formData.append("m_1_to_10_oneway", this.m_1_to_10_oneway);
      formData.append("m_1_to_10_twoway", this.m_1_to_10_twoway);
      formData.append("m_1_to_10_with", this.m_1_to_10_with);

      formData.append("m_11_to_20_oneway", this.m_11_to_20_oneway);
      formData.append("m_11_to_20_twoway", this.m_11_to_20_twoway);
      formData.append("m_11_to_20_with", this.m_11_to_20_with);

      formData.append("m_21_to_40_oneway", this.m_21_to_40_oneway);
      formData.append("m_21_to_40_twoway", this.m_21_to_40_twoway);
      formData.append("m_21_to_40_with", this.m_21_to_40_with);

      //vehicle
      this.setVehicleDefaultValues();
      formData.append("model", this.model);
      formData.append("make", this.make);
      formData.append("color", this.color);
      formData.append("year", this.year);
      formData.append("plate_number", this.plate_number);
      formData.append("vin_number", this.vin_number);
      formData.append("vehicle_front_image", this.imageFront);
      formData.append("vehicle_rear_image", this.imageRear);
      formData.append("vehicle_side_image", this.imageSide);
      formData.append("vehicle_interior_image", this.imageInterior);

      formData.append("driver_license", this.imagenLicense);
      formData.append("proof_of_insurance", this.imagenInsurance);
      formData.append("licenseExpireyDate", this.licenseExpireyDate);
      formData.append("insuranceExpireyDate", this.insuranceExpireyDate);


      formData.append("web", "yes");

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      this.$http
        .post("auth/driver/signup", formData, config)
        .then((response) => {
          let driver=response.data.data
          this.$swal.close();
          this.$router.push({ name: "details-driver-view", params: { id: driver.id, tabvehicle:true }  });
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
    setVehicleDefaultValues() {
      this.model = ""
      this.make = ""
      this.color = ""
      this.year = ""
      this.plate_number = ""
      this.vin_number = ""

     this.licenseExpireyDate= ""
     this.insuranceExpireyDate= ""
    },
  },
  mounted() {},
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
</style>