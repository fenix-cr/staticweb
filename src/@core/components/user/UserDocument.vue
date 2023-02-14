<template>
  <div>
    <div class="d-flex">
      <h4 class="mb-0 ml-50 mb-2">Document</h4>
    </div>

    <b-row class="ml-2">
      <b-col cols="12" md="6" lg="4" class="container-docs">
        <label for="imageContract"
          >Contract<span class="text-danger">*</span></label
        ><br />
        <input
          id="imageContract"
          type="file"
          @change="handleimagenContract()"
          ref="imageContract"
          multiple
        />
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <div v-if="fileExtesion != 'pdf'" class="mt-2">
          <a class="">
            <b-img
              class="doc"
              id="dataImageContract"
              style="border-radius: 5px; height: 318px"
              :src="imageContract"
            ></b-img>
          </a>

          <div class="row">
            <span class="mt-2 ml-2" 
              ><a
                v-if="imageContract.length > 0"
                :href="imageContract"
                download="data.jpg"
                target="_new"
                >Download</a
              ></span
            >
          </div>
        </div>
        <div v-if="fileExtesion == 'pdf'" style="display: flex" class="mt-2">
          <b-img
            class="doc"
            style="border-radius: 5px; height: 318px; cursor: pointer"
            src="@/assets/images/pages/document.jpg"
            @click="getFile(imageContract)"
          ></b-img>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-2 text-right">
        <button
          class="btn btn-primary"
          :class="{ no_drop: imageCompressing }"
          :disabled="imageCompressing"
          @click="updateDocument()"
        >
          Update
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
  BFormSelect,
  BImg,
} from "bootstrap-vue";
import Stripe from "stripe";
import infocontact from "@/navigation/vertical/infocontact";
import { mapGetters } from "vuex";
import { exit } from "process";
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
    BFormSelect,
    BImg,
  },
  computed: {
    ...mapGetters({
      userData: "Users/usersData",
    }),
  },
  watch: {
    userData() {
      this.setImages(
        this.userData.corporate_account_personal_info.imageContract
      );
    },
  },
  props: {
    infoPayment: {},
  },
  data() {
    return {
      imageContract: "",
      imagenContract: "",
      imageCompressing: false,
      fileExtesion: "",
      currentImage: "",
      formData: new FormData(),
    };
  },
  methods: {
    handleimagenContract() {
      if (
        !(
          this.$refs.imageContract.files[0].type.includes("image") ||
          this.$refs.imageContract.files[0].type.includes("pdf")
        )
      ) {
        this.$swal({
          title: "Only images or pdf files is allowed",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
        return false;
      }
      if (this.$refs.imageContract.files.length > 0) {
        this.imageCompressing = true;
        this.formData.append("id", this.userData.id);
        this.formData.append("length", this.$refs.imageContract.files.length);
        if (this.$refs.imageContract.files[0].type.includes("pdf")) {
          this.formData.append(
            "imageContract0",
            this.$refs.imageContract.files[0]
          );
        }
        this.imagenContract = this.$refs.imageContract.files;
        for (var $i = 0; $i < this.$refs.imageContract.files.length; $i++) {
          if (this.$refs.imageContract.files[0].type.includes("image")) {
            this.compressImage(this.$refs.imageContract.files[$i], $i);
          }
        }
        this.imageCompressing = false;
      }
    },
    compressImage(url, index) {
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

          this.formData.append("imageContract" + index, image_file);
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

      let file = new File([dataArr], "File.jpg", {
        type: mime,
      });

      return file;
    },
    updateDocument() {
      if (this.$refs.imageContract.files.length == 0) {
        return false;
      }
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      this.$http
        .post("auth/ca/corporate/updatedocument", this.formData, config)
        .then((res) => {
          console.log("updateDocument");
          let imageContract = res.data.data.imageContract;
          this.setImages(imageContract);

          this.$swal({
            title: "Record Modified",
            icon: "success",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          }).then((result) => {});
        })
        .catch((error) => {
          console.log(error);
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
    async getFile(filePath) {
      let res = "";
      await this.$http
        .get(`download_file_private_storage/${filePath}`, {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/pdf",
          },
        })
        .then((response) => {
          res = response.data;

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "file.pdf"); //or any other extension
          document.body.appendChild(link);
          link.click();

          console.log("getFile");
          console.log(res);
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
    isFileImage(file) {
      file = file.split(".").pop();
      const acceptedImageTypes = ["gif", "jpeg", "png", "jpg"];
      let res = file && acceptedImageTypes.includes(file);
      if (res == true) {
        this.fileExtesion = "image";
      } else {
        this.fileExtesion = file;
      }
      return res;
    },
    async setImages(imageContract) {
      this.imageContract = "ima.png";
      if (this.isFileImage(imageContract)) {
        this.imageContract = await this.getImage(imageContract);
      } else {
        this.imageContract = imageContract;
      }
    },
  },
  mounted() {
  },
};
</script>

<style>
.no_drop {
  cursor: no-drop !important;
}
</style>
