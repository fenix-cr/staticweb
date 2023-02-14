<template>
  <div v-if="document !== ''">
    <div class="d-flex">
      <feather-icon icon="UserIcon" size="19" />
      <h4 class="mb-0 ml-50 mb-2">Driver documents</h4>
    </div>

    <b-row>
      <b-col cols="12" md="6" lg="4" class="container-docs" >
        <label for="imageInterior">Driver license<span class="text-danger">*</span></label><br>
        <input
          id="imageInterior"
          type="file"
          @change="handleimagenLicense()"
          ref="imagenLicense"
        />
        <b-form-group label="Expirey date">
            <b-form-datepicker v-model="document.licenseExpireyDate"  locale="en" placeholder="0/00/0000"/>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="6" lg="4" class="container-docs">
        <label for="imagenInsurance"
          >Proof of insurance<span class="text-danger">*</span></label></br>

        <input
          id="imagenInsurance"
          type="file"
          @change="handleimagenInsurance()"
          ref="imagenInsurance"
        />
        <b-form-group label="Expirey date">
            <b-form-datepicker v-model="document.insuranceExpireyDate"  locale="en" placeholder="0/00/0000"/>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6"> </b-col>
      <b-col md="6 save-btn">
        <button
          type="submit"
          class="btn btn-primary mr-2"
          v-on:click="setDocumentData((type = 'back'))"
        >
          Back
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          v-on:click="setDocumentData((type = 'save'))"
        >
          Submit
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
  BButton,
  BInputGroup,
  BInputGroupPrepend,
  BImg,
  BFormDatepicker
} from "bootstrap-vue";
import btnValidationDocsDriver from "@core/components/buttonsValidationDocsDriver/BtnValidationDocsDriver";
import { mapGetters } from "vuex";

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    BImg,
    btnValidationDocsDriver,
    BFormDatepicker,
  },
  data() {
    return {
      document: {
        imagenLicense: "",
        imagenInsurance: "",
        insuranceExpireyDate:'',
        licenseExpireyDate:'',
        type: "",
      },
    };
  },
  methods: {
    setDocumentData(type) {
      this.document.type = type;
      if (
        type != "back" &&
        (this.document.imagenLicense === "" ||
          this.document.imagenInsurance === "")
      ) {
        this.$swal({
          title: "Please fill out required fields",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
      } else this.$emit("getDocumentData", this.document);
    },
    handleimagenLicense() {
      this.document.imagenLicense = this.$refs.imagenLicense.files[0];
    },
    handleimagenInsurance() {
      this.document.imagenInsurance = this.$refs.imagenInsurance.files[0];
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

  .btnAllDocuments {
    position: absolute;
    height: 39px;
    width: 38px;
    padding: 7px;
    border-radius: 18px;
    left: 260px;
  }

  .btnCheck {
    @extend .btnAllDocuments;
    top: 176px;
  }

  .btnCancel {
    @extend .btnAllDocuments;
    top: 135px;
  }

  .btnDownload {
    @extend .btnAllDocuments;
    //background-color: #07ff00 !important;
    top: 92px;
  }
}
</style>
