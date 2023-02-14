<template>
  <div v-if="driverDocuments !== ''">
    <!-- Header: Personal Info -->
    <div class="d-flex">
      <feather-icon icon="UserIcon" size="19" />
      <h4 class="mb-0 ml-50">Driver documents</h4>
    </div>
    <b-form class="mt-1">
      <b-row>
        <b-col
          cols="12"
          md="6"
          lg="4"
          class="container-docs"
          style="height: 100%"
        >
          <b-form-group label="Driver license">
            <input
              id="imageInterior"
              type="file"
              @change="handleimagenLicense()"
              ref="imagenLicense"
            />
          </b-form-group>
          <div style="d">
            <b-img
              class="imgDocVehicle"
              id="driver_license"
              style="border-radius: 5px; height: 318px"
              :src="this.driverDocuments.driver_documents.driver_license"
            ></b-img>
            <div style="width: fit-content; padding: 10px">
              <template
                v-if="
                  driverDocuments.driver_documents.driver_license_verify_at ===
                    undefined ||
                  driverDocuments.driver_documents.driver_license_verify_at ===
                    null
                "
              >
                <btn-validation-docs-driver
                  v-if="driverDocuments.driver_documents.driver_license != ''"
                  :driverDocs="driverDocuments.driver_documents"
                  :idVehicle="driverDocuments.id"
                  :idDriver="driverDocuments.id"
                  :valueBtnlicense="btnlicense"
                  :type="licenseType"
                  v-on:deleteImage="deleteImage($event)"
                />
              </template>
            </div>
          </div>
          <b-form-group
            v-if="driverDocuments.driver_documents.driver_license != ''"
            class="mt-1"
            label="Expirey date"
          >
            <b-form-datepicker
              v-model="driverDocuments.driver_documents.licenseExpireyDate"
              locale="en"
              placeholder="0/00/0000"
            />
          </b-form-group>
        </b-col>
        <b-col
          cols="12"
          md="6"
          lg="4"
          class="container-docs"
          v-if="
            this.$hasPermission('driver-sensitive-information-with-bank-inf')
          "
        >
          <b-form-group label="Proof of insurance">
            <input
              id="imagenInsurance"
              type="file"
              @change="handleimagenInsurance()"
              ref="imagenInsurance"
            />
          </b-form-group>
          <div id="divImgDocVehicle">
            <b-img
              class="imgDocVehicle"
              id="proof_of_insurance"
              style="border-radius: 5px; height: 318px"
              :src="this.driverDocuments.driver_documents.proof_of_insurance"
            ></b-img>
            <div style="width: fit-content; padding: 10px">
              <template
                v-if="
                  driverDocuments.driver_documents
                    .proof_of_insurance_verify_at === undefined ||
                  driverDocuments.driver_documents
                    .proof_of_insurance_verify_at === null
                "
              >
                <btn-validation-docs-driver
                  :driverDocs="driverDocuments.driver_documents"
                  :idVehicle="driverDocuments.id"
                  :idDriver="driverDocuments.id"
                  :valueBtninsure="btninsure"
                  v-on:deleteImage="deleteImage($event)"
                  type="insurance"
                />
              </template>
            </div>
          </div>
          <b-form-group
            v-if="driverDocuments.driver_documents.proof_of_insurance != ''"
            class="mt-1"
            label="Expirey date"
          >
            <b-form-datepicker
              v-model="driverDocuments.driver_documents.insuranceExpireyDate"
              locale="en"
              placeholder="0/00/0000"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <div class="row">
        <div class="col-12 text-right pr-0">
          <b-button
            variant="primary"
            class="mb-1 mb-sm-0 mr-0 mr-sm-1"
            @click="updateDriver()"
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
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BInputGroup,
  BInputGroupPrepend,
  BImg,
  BFormDatepicker,
} from "bootstrap-vue";
import btnValidationDocsDriver from "@core/components/buttonsValidationDocsDriver/BtnValidationDocsDriver";
import { mapGetters } from "vuex";
import { getMessageError } from "@core/utils/utils";

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
    BFormDatepicker,
    btnValidationDocsDriver,
  },
  computed: {
    ...mapGetters({
      driverDocuments: "Users/usersData",
    }),
  },
  watch: {
    driverDocuments() {
      this.setImages(
        this.driverDocuments.driver_documents.driver_license,
        this.driverDocuments.driver_documents.proof_of_insurance
      );
    },
  },
  data() {
    return {
      btnlicense: true,
      btninsure: true,

      imagenLicense: "",
      imagenInsurance: "",

      imageLicense: "",
      imageInsurance: "",

      licenseType: "license",
      InsuranceType: "insurance",

      licenseVerify: false,
      InsuranceVerify: false,
      countUploadedImages: 0,
    };
  },
  methods: {
    handleimagenLicense() {
      this.imageLicense = this.$refs.imagenLicense.files[0];
      this.compressImage(this.imageLicense, "imageLicense");
    },
    handleimagenInsurance() {
      this.imageInsurance = this.$refs.imagenInsurance.files[0];
      this.compressImage(this.imageInsurance, "imageInsurance");
    },
    compressImage(url, type) {
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
          if (type == "imageLicense") {
            this.imageLicense = image_file;
          }
          if (type == "imageInsurance") {
            this.imageInsurance = image_file;
          }
        };
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
    updateDriver(e) {
      // e.preventDefault()
      let formData = new FormData();
      formData.append(
        "licenseExpireyDate",
        this.driverDocuments.driver_documents.licenseExpireyDate
      );
      formData.append(
        "insuranceExpireyDate",
        this.driverDocuments.driver_documents.insuranceExpireyDate
      );

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

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
          `auth/driver/${this.driverDocuments.id}/document/update`,
          formData,
          config
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

          this.uploadDriverLicenseImage();
          this.uploadProofInsuranceImage();
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
    uploadDriverLicenseImage() {
      let formData = new FormData();
      formData.append("driver_license", this.imageLicense);
      this.uploadImage(formData, "driver_license");
    },
    uploadProofInsuranceImage() {
      let formData = new FormData();
      formData.append("proof_of_insurance", this.imageInsurance);
      this.uploadImage(formData, "proof_of_insurance");
    },
    uploadImage(formData, imageType) {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      this.$swal({
        title: "Please, wait processing data...",
        didOpen: () => {
          this.$swal.showLoading();
        },
        customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
      });

      this.$http
        .post(
          `auth/driver/${this.driverDocuments.id}/document/upload_driver_documents_files`,
          formData,
          config
        )
        .then((res) => {
          this.countUploadedImages++;
          let documentData = JSON.parse(res.data.data);

          let timestamp = new Date().getTime();
          this.driverDocuments.driver_documents.driver_license = timestamp;
          this.driverDocuments.driver_documents.proof_of_insurance = timestamp;

          if (imageType == "driver_license") {
            this.setImages(documentData.driver_license, null);
          }
          if (imageType == "proof_of_insurance") {
            this.setImages(null, documentData.proof_of_insurance);
          }

          if (this.countUploadedImages == 2) {
            this.$swal({
              title: "Data updated",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            });
            this.countUploadedImages = 0;
          }
        })
        .catch((error) => {
          this.countUploadedImages = 0;
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
    deleteImage(type) {
      if (type === "license") {
        this.driverDocuments.driver_documents.driver_license = "";
      }
      if (type === "insurance") {
        this.driverDocuments.driver_documents.proof_of_insurance = "";
      }
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
    async setImages(licenseExpireyDate, insuranceExpireyDate) {
      if (insuranceExpireyDate != null) { 
        this.driverDocuments.driver_documents.proof_of_insurance =
          await this.getImage(insuranceExpireyDate);
      }
      if (licenseExpireyDate != null) {
        this.driverDocuments.driver_documents.driver_license =
          await this.getImage(licenseExpireyDate);
      }
    },
  },
  mounted() {},
  created() {},
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
