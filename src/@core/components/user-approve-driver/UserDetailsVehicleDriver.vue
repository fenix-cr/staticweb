<template>
  <div v-if="userVehicle !== ''">
    <!-- Header: Personal Info -->
    <div class="d-flex">
      <feather-icon icon="InfoIcon" size="19" />
      <h4 class="mb-0 ml-50">Vehicle Information</h4>
    </div>
    <!-- Form: Personal Info Form -->
    <b-form class="mt-1">
      <b-row>
        <!-- Field: Birth Date -->

        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Make">
            <b-form-input v-model="userVehicle.vehicle.make" />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Model">
            <b-form-input v-model="userVehicle.vehicle.model" />
          </b-form-group>
        </b-col>

        <!-- Field: Color -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Color">
            <b-form-input v-model="userVehicle.vehicle.color" />
          </b-form-group>
        </b-col>

        <!-- Field: Year -->
        <b-col cols="12" md="6" lg="3">
          <b-form-group label="Year">
            <b-form-input v-model="userVehicle.vehicle.year" />
          </b-form-group>
        </b-col>

        <!-- Field: Plate number -->
        <b-col cols="12" md="6" lg="3">
          <b-form-group label="Plate number">
            <b-form-input v-model="userVehicle.vehicle.plate_number" />
          </b-form-group>
        </b-col>

        <!-- Field: VIN number -->
        <b-col cols="12" md="6" lg="3">
          <b-form-group label="VIN number">
            <b-form-input v-model="userVehicle.vehicle.vin_number" />
          </b-form-group>
        </b-col>

                <!-- Field: Gender -->
       <b-col cols="12" md="6" lg="3">
          <b-form-group label="Vehicle type">

            <v-select
                v-model="selectedVehicleType"
                :options="optionsVehicleType"
                label="title"
                placeholder="Please select"
                class="mb-2"
              />

          </b-form-group>
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
          class="container-docs mb-5"
          style="height: 100%"
        >
          <b-form-group label="Vehicle front image">
            <input
              type="file"
              @change="handleimageFront()"
              ref="imageFront"
              id="imageFront"
            />
          </b-form-group>
          <div>
            <b-img
              class="imgDocVehicle"
              style="border-radius: 5px; height: 318px"
              :src="userVehicle.vehicle.vehicle_documents.vehicle_front_image"
            >
            </b-img>
            <div style="width: fit-content; padding: 10px">
              <template
                v-if="
                  userVehicle.vehicle.vehicle_documents
                    .vehicle_front_image_verify_at === undefined ||
                  userVehicle.vehicle.vehicle_documents
                    .vehicle_front_image_verify_at === null
                "
              >
                <btn-validation-docs-driver
                  type="vehicle_front_image"
                  :nameVehicle="userVehicle.vehicle.vehicle_documents"
                  :idVehicle="userVehicle.vehicle.id"                  
                  :idDriver="userVehicle.id"
                  @click="btnfront = true"
                  :valueBtnfront="btnfront"
                  v-on:deleteImage="deleteImage($event)"
                />
              </template>
            </div>
          </div>
        </b-col>

        <!-- Field: Address Line 2 -->

        <b-col cols="12" md="6" lg="4" class="container-docs">
          <b-form-group label="Vehicle rear image">
            <input
              type="file"
              @change="handleimageRear()"
              ref="imageRear"
              id="imageRear"
            />
          </b-form-group>
          <div>
            <b-img
              class="imgDocVehicle"
              style="border-radius: 5px; height: 318px"
              :src="userVehicle.vehicle.vehicle_documents.vehicle_rear_image"
            ></b-img>
            <div style="width: fit-content; padding: 10px">
              <template
                v-if="
                  userVehicle.vehicle.vehicle_documents
                    .vehicle_rear_image_verify_at === undefined ||
                  userVehicle.vehicle.vehicle_documents
                    .vehicle_rear_image_verify_at === null
                "
              >
                <btn-validation-docs-driver
                  type="vehicle_rear_image"
                  :idVehicle="userVehicle.vehicle.id"
                  :idDriver="userVehicle.id"
                  :nameVehicle="userVehicle.vehicle.vehicle_documents"
                  :idUserVehicle="userVehicle.id"
                  :valueBtnrear="btnrear"
                  v-on:deleteImage="deleteImage($event)"
                />
              </template>
            </div>
          </div>
        </b-col>

        <!-- Field: Postcode -->
        <b-col cols="12" md="6" lg="4" class="container-docs">
          <b-form-group label="Vehicle side image">
            <input
              type="file"
              @change="handleimageSide()"
              ref="imageSide"
              id="imageSide"
            />
          </b-form-group>
          <div>
            <b-img
              class="imgDocVehicle"
              style="border-radius: 5px; height: 318px"
              :src="userVehicle.vehicle.vehicle_documents.vehicle_side_image"
            ></b-img>
            <div style="width: fit-content; padding: 10px">
              <template
                v-if="
                  userVehicle.vehicle.vehicle_documents
                    .vehicle_side_image_verify_at === undefined ||
                  userVehicle.vehicle.vehicle_documents
                    .vehicle_side_image_verify_at === null
                "
              >
                <btn-validation-docs-driver
                  type="vehicle_side_image"
                  :idVehicle="userVehicle.vehicle.id"
                  :idDriver="userVehicle.id"
                  :nameVehicle="userVehicle.vehicle.vehicle_documents"
                  :idUserVehicle="userVehicle.id"
                  :valueBtnSide="btnsideimg"
                  v-on:deleteImage="deleteImage($event)"
                />
              </template>
            </div>
          </div>
        </b-col>

        <!-- Field: City -->
        <b-col
          cols="12"
          md="6"
          lg="4"
          class="container-docs"
          style="height: 100%"
        >
          <b-form-group label="Vehicle interior image">
            <input
              type="file"
              @change="handleimageInterior()"
              ref="imageInterior"
              id="imageInterior"
            />
          </b-form-group>
          <div>
            <b-img
              class="imgDocVehicle"
              style="border-radius: 5px; height: 318px"
              :src="
                userVehicle.vehicle.vehicle_documents.vehicle_interior_image
              "
            ></b-img>
            <div style="width: fit-content; padding: 10px">
              <template
                v-if="
                  userVehicle.vehicle.vehicle_documents
                    .vehicle_interior_image_verify_at === undefined ||
                  userVehicle.vehicle.vehicle_documents
                    .vehicle_interior_image_verify_at === null
                "
              >
                <btn-validation-docs-driver
                  type="vehicle_interior_image"
                  :idVehicle="userVehicle.vehicle.id"
                  :idDriver="userVehicle.id"
                  :nameVehicle="userVehicle.vehicle.vehicle_documents"
                  :idUserVehicle="userVehicle.id"
                  :valueBtnInterior="btninterior"
                  v-on:deleteImage="deleteImage($event)"
                />
              </template>
            </div>
          </div>
        </b-col>
      </b-row>
      <div class="row">
        <div class="col-12 text-right pr-0">
          <b-button
            variant="primary"
            class="mb-1 mb-sm-0 mr-0 mr-sm-1"
            type="submit"
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
import { getMessageError } from "@core/utils/utils";
import {getMenuServiceType} from "@core/utils/menus";
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
  computed: {
    ...mapGetters({
      userVehicle: "Users/usersData",
    }),
  },
  watch: {
    userVehicle() {      
      this.selectedVehicleType=this.optionsVehicleType.find(x=>x.value==this.userVehicle.vehicle.vehicle_type)
      this.isUploadVehicleFrotImage= true
      this.isUploadVehicleRearImage= true
      this.isUploadVehicleSideImage= true
      this.isUploadVehicleInteriorImage=true
      this.setImages(
        this.userVehicle.vehicle.vehicle_documents.vehicle_front_image,
        this.userVehicle.vehicle.vehicle_documents.vehicle_rear_image,
        this.userVehicle.vehicle.vehicle_documents.vehicle_side_image,
        this.userVehicle.vehicle.vehicle_documents.vehicle_interior_image
      );
    },
  },
  data() {
    return {
      btnrear: true,
      btnsideimg: true,
      btninterior: true,
      btnfront: true,
      imagenFront: "",
      imagenRear: "",
      imagenSide: "",
      imagenInterior: "",

      imageFront: "",
      imageRear: "",
      imageSide: "",
      imageInterior: "",

      isUploadVehicleFrotImage: true,
      isUploadVehicleRearImage: true,
      isUploadVehicleSideImage: true,
      isUploadVehicleInteriorImage: true,
      optionsVehicleType:[],
      selectedVehicleType:null,
    };
  },
  methods: {
    updateDriver(e) {
      e.preventDefault();
      let formData = new FormData();
      formData.append("model", this.userVehicle.vehicle.model);
      formData.append("make", this.userVehicle.vehicle.make);
      formData.append("color", this.userVehicle.vehicle.color);
      formData.append("year", this.userVehicle.vehicle.year);
      formData.append("plate_number", this.userVehicle.vehicle.plate_number);
      formData.append("vin_number", this.userVehicle.vehicle.vin_number);
      formData.append("vehicle_type", this.selectedVehicleType.value);

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
          `auth/driver/${this.userVehicle.id}/vehicle/update`,
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

          this.uploadVehicleImages();
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
    uploadVehicleImages() {
      let formData = new FormData();
      formData.append("vehicle_front_image", this.imageFront);
      formData.append("vehicle_rear_image", this.imageRear);
      formData.append("vehicle_side_image", this.imageSide);
      formData.append("vehicle_interior_image", this.imageInterior);
      this.UploadDriverVehicleFiles(formData);
    },
    uploadVehicleFrotImage() {
      let formData = new FormData();
      formData.append("vehicle_front_image", this.imageFront);
      this.UploadDriverVehicleFiles(formData);
    },
    uploadVehicleRearImage() {
      let formData = new FormData();
      formData.append("vehicle_rear_image", this.imageRear);
      this.UploadDriverVehicleFiles(formData);
    },
    uploadVehicleSideImage() {
      let formData = new FormData();
      formData.append("vehicle_side_image", this.imageSide);
      this.UploadDriverVehicleFiles(formData);
    },
    uploadVehicleInteriorImage() {
      let formData = new FormData();
      formData.append("vehicle_interior_image", this.imageInterior);
      this.UploadDriverVehicleFiles(formData);
    },
    UploadDriverVehicleFiles(formData) {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      this.$swal({
        title: "Please, wait uploading images...",
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
          `auth/driver/${this.userVehicle.id}/document/upload_driver_vehicle_files`,
          formData,
          config
        )
        .then((res) => {
          let vehicleData = JSON.parse(res.data.data);

          this.setImages(
            vehicleData.vehicle_front_image,
            vehicleData.vehicle_rear_image,
            vehicleData.vehicle_side_image,
            vehicleData.vehicle_interior_image
          );

          this.$swal({
            title: "Data updated",
            icon: "success",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
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
    handleimageFront() {
      this.imageFront = this.$refs.imageFront.files[0];
      this.compressImage(this.imageFront, "imageFront");
      this.isUploadVehicleFrotImage = true;
    },
    handleimageRear() {
      this.imageRear = this.$refs.imageRear.files[0];
      this.compressImage(this.imageRear, "imageRear");
      this.isUploadVehicleRearImage = true;
    },
    handleimageSide() {
      this.imageSide = this.$refs.imageSide.files[0];
      this.compressImage(this.imageSide, "imageSide");
      this.isUploadVehicleSideImage = true;
    },
    handleimageInterior() {
      this.imageInterior = this.$refs.imageInterior.files[0];
      this.compressImage(this.imageInterior, "imageInterior");
      this.isUploadVehicleInteriorImage = true;
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
          if (type == "imageFront") {
            this.imageFront = image_file;
          }
          if (type == "imageRear") {
            this.imageRear = image_file;
          }
          if (type == "imageSide") {
            this.imageSide = image_file;
          }
          if (type == "imageInterior") {
            this.imageInterior = image_file;
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
    deleteImage(type) {
      if (type === "vehicle_front_image") {
        this.userVehicle.vehicle.vehicle_documents.vehicle_front_image = "";
      }
      if (type === "vehicle_rear_image") {
        this.userVehicle.vehicle.vehicle_documents.vehicle_rear_image = "";
      }
      if (type === "vehicle_side_image") {
        this.userVehicle.vehicle.vehicle_documents.vehicle_side_image = "";
      }
      if (type === "vehicle_interior_image") {
        this.userVehicle.vehicle.vehicle_documents.vehicle_interior_image = "";
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
    async setImages(
      vehicle_front_image,
      vehicle_rear_image,
      vehicle_side_image,
      vehicle_interior_image
    ) {
      console.log("this.isUploadVehicleFrotImage");
      console.log(this.isUploadVehicleFrotImage);
      if (
        vehicle_front_image != null &&
        this.isUploadVehicleFrotImage == true
      ) {
        this.userVehicle.vehicle.vehicle_documents.vehicle_front_image =
          await this.getImage(vehicle_front_image);
      }
      if (vehicle_rear_image != null && this.isUploadVehicleRearImage == true) {
        this.userVehicle.vehicle.vehicle_documents.vehicle_rear_image =
          await this.getImage(vehicle_rear_image);
      }
      if (vehicle_side_image != null && this.isUploadVehicleSideImage == true) {
        this.userVehicle.vehicle.vehicle_documents.vehicle_side_image =
          await this.getImage(vehicle_side_image);
      }
      if (
        vehicle_interior_image != null &&
        this.isUploadVehicleInteriorImage == true
      ) {
        this.userVehicle.vehicle.vehicle_documents.vehicle_interior_image =
          await this.getImage(vehicle_interior_image);
      }

      this.isUploadVehicleFrotImage = false;
      this.isUploadVehicleRearImage = false;
      this.isUploadVehicleSideImage = false;
      this.isUploadVehicleInteriorImage = false;
    },
  },
  mounted() {
    this.optionsVehicleType=getMenuServiceType()
    console.log(this.userVehicle)
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