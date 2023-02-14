<template>
  <div v-if="userVehicle !== ''">
    <!-- Header: Personal Info -->
    <div class="d-flex">
      <feather-icon icon="InfoIcon" size="19" />
      <h4 class="mb-0 ml-50 mb-2">Vehicle Information</h4>
    </div>
    <!-- Form: Personal Info Form -->

    <b-row>
      <!-- Field: Birth Date -->
      <b-col cols="12" md="6" lg="4" class="mb-2">
        <label for="Model">Make <span class="text-danger">*</span></label>
        <b-form-input id="model" v-model="userVehicle.make" />
      </b-col>

      <b-col cols="12" md="6" lg="4" class="mb-2">
        <label for="Model">Model <span class="text-danger">*</span></label>
        <b-form-input id="model" v-model="userVehicle.model" />
      </b-col>
      
      <!-- Field: Mobile -->
      <b-col cols="12" md="6" lg="4" class="mb-2">
        <label for="color">Color <span class="text-danger">*</span></label>
        <b-form-input id="color" v-model="userVehicle.color" />
      </b-col>

      <!-- Field: Website -->
      <b-col cols="12" md="6" lg="4" class="mb-2">
        <label for="year">Year <span class="text-danger">*</span></label>
        <b-form-input id="year" v-model="userVehicle.year" />
      </b-col>

      <!-- Field: Language -->
      <b-col cols="12" md="6" lg="4" class="mb-2">
        <label for="Plate_number"
          >Plate number <span class="text-danger">*</span></label
        >
        <b-form-input id="Plate_number" v-model="userVehicle.plate_number" />
      </b-col>

      <!-- Field: Gender -->
      <b-col cols="12" md="6" lg="4" class="mb-2">
        <label for="vin_number"
          >VIN number <span class="text-danger">*</span></label
        >
        <b-form-input id="vin_number" v-model="userVehicle.vin_number" />
      </b-col>
    </b-row>

    <!-- Header: Personal Info -->
    <div class="d-flex mt-2">
      <feather-icon icon="MapPinIcon" size="19" />
      <h4 class="mb-0 ml-50">Vehicle Documents</h4>
    </div>

    <!-- Form: Personal Info Form -->
    <b-row class="mt-1">
      <!-- Field: Address Line 1 -->
      <b-col
        cols="12"
        md="6"
        lg="4"
        class="container-docs mb-2"
        style="height: 100%"
      >
       
          <label for="imageFront">Vehicle front image <span class="text-danger">*</span></label>
          <input type="file" @change="handleimageFront()" ref="imageFront" id="imageFront" />
        
      </b-col>

      <b-col cols="12" md="6" lg="4" class="container-docs mb-2">
       
          <label for="imageRear">Vehicle rear image <span class="text-danger">*</span></label>
          <input type="file" @change="handleimageRear()" ref="imageRear" id="imageRear" />
        
      </b-col>

      <b-col cols="12" md="6" lg="4" class="container-docs mb-2">
        
           <label for="imageSide">Vehicle side image <span class="text-danger">*</span></label>
          <input type="file" @change="handleimageSide()" ref="imageSide" id="imageSide" />
       
      </b-col>

      <b-col
        cols="12"
        md="6"
        lg="4"
        class="container-docs mb-2"
        style="height: fit-content"
      >
       
           <label for="imageInterior">Vehicle interior image <span class="text-danger">*</span></label>
          <input
            id="imageInterior"
            type="file"
            @change="handleimageInterior()"
            ref="imageInterior"
          />
       
      </b-col>
      <b-col md="4"> </b-col>
      <b-col md="4 save-btn">
        <button
          type="submit"
          class="btn btn-primary mr-2"
          v-on:click="setVechicalData((type = 'back'))"
        >
          Back
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          v-on:click="setVechicalData((type = 'next'))"
        >
          Next
        </button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormRadioGroup,
  BFormCheckboxGroup,
  BButton,
  BImg,
} from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
import vSelect from "vue-select";
import BtnValidationDocsDriver from "@core/components/buttonsValidationDocsDriver/BtnValidationDocsDriver";
import { mapGetters } from "vuex";

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    flatPickr,
    BFormInput,
    vSelect,
    BFormRadioGroup,
    BFormCheckboxGroup,
    BButton,
    BImg,
    BtnValidationDocsDriver,
  },

  data() {
    return {
      btnrear: true,
      btnsideimg: true,
      btninterior: true,
      btnfront: true,

      userVehicle: {
        model: "",
        make:"",
        color: "",
        year: "",
        plate_number: "",
        vin_number: "",
        imageFront: "",
        imageRear: "",
        imageSide: "",
        imageInterior: "",
        type: "",
      },
    };
  },
  methods: {
    setVechicalData(type) {
      this.userVehicle.type = type;
      if ( type != 'back' &&(
        this.userVehicle.model === "" ||
        this.userVehicle.color === "" ||
        this.userVehicle.year === "" ||
        this.userVehicle.plate_number === "" ||
        this.userVehicle.vin_number === "" ||
        this.userVehicle.imageFront === "" ||
        this.userVehicle.imageRear === "" ||
        this.userVehicle.imageSide === "" ||
        this.userVehicle.imageInterior === "" ||
        this.userVehicle.make === "")
      ) {
        this.$swal({
          title: "Please fill out required fields",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
      } else 
      this.$emit("getVechicalData", this.userVehicle);
    },

    handleimageFront() {
      this.userVehicle.imageFront = this.$refs.imageFront.files[0];
    },
    handleimageRear() {
      this.userVehicle.imageRear = this.$refs.imageRear.files[0];
    },
    handleimageSide() {
      this.userVehicle.imageSide = this.$refs.imageSide.files[0];
    },
    handleimageInterior() {
      this.userVehicle.imageInterior = this.$refs.imageInterior.files[0];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@core/scss/vue/libs/vue-flatpicker.scss";

.container-docs {
  position: relative;

  .imgDocVehicle {
    min-width: 188px;
  }
}
</style>