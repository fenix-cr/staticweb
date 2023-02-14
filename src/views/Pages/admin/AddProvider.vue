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
          <b-form-input type="number" id="Lastname" v-model="providerData.ph" />
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
            name="is-menu-visible"
            class="mr-0"
            value="s"
            @change="changedOptionCarType()"
            v-model="providerData.car_type"
          >
            Sedan(S)
          </b-form-checkbox>
        </b-col>
        <b-col md="2" class="mb-2">
          <b-form-checkbox
            name="is-menu-visible"
            class="mr-0"
            value="wc"
            @change="changedOptionCarType()"
            v-model="providerData.car_type"
          >
            Wheelchair(WC)
          </b-form-checkbox>
        </b-col>
        <b-col md="3" class="mb-2">
          <b-form-checkbox
            name="is-menu-visible"
            class="mr-0"
            value="bls"
            @change="changedOptionCarType()"
            v-model="providerData.car_type"
          >
            Basic life support Ambulance(BLS)
          </b-form-checkbox>
        </b-col>
        <b-col md="2" class="mb-2">
          <b-form-checkbox
            name="is-menu-visible"
            class="mr-0"
            value="gv"
            @change="changedOptionCarType()"
            v-model="providerData.car_type"
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
      <b-row>
        <b-col md="1" class="mb-2"></b-col>
        <b-col cols="12" md="6" lg="3" class="container-docs">
          <label for="imageLicense">Driver license</label><br />
          <input
            id="imageLicense"
            type="file"
            @change="handleimageLicense()"
            ref="imageLicense"
          />
        </b-col>
        <b-col cols="12" md="6" lg="3" class="container-docs">
          <label for="imageInsurance">Proof of insurance</label>

          <input
            id="imageInsurance"
            type="file"
            @change="handleimageInsurance()"
            ref="imageInsurance"
          />
        </b-col>
        <b-col cols="12" md="6" lg="3" class="container-docs">
          <label for="imageLegalName">Proof of legal name</label>

          <input
            id="imageLegalName"
            type="file"
            @change="handleimageLegalName()"
            ref="imageLegalName"
          />
        </b-col>
      </b-row>
      <div class="d-flex">
        <h4 class="ml-50 mb-2 mt-2">Rates<span class="text-danger">*</span></h4>
      </div>
      <b-row class="ml-4 mr-4">
        <button
          v-if="providerData.car_type.find((e) => e == 's')"
          class="btn btn-primary"
          @click="addMoreItems('sedan')"
        >
          Add Sedan
        </button>
        <button
          v-if="providerData.car_type.find((e) => e == 'wc')"
          class="btn btn-primary ml-2"
          @click="addMoreItems('wc')"
        >
          Add W/C
        </button>
        <button
          v-if="providerData.car_type.find((e) => e == 'bls')"
          class="btn btn-primary ml-2"
          @click="addMoreItems('bls')"
        >
          Add BLS
        </button>
        <button
          v-if="providerData.car_type.find((e) => e == 'gv')"
          class="btn btn-primary ml-2"
          @click="addMoreItems('gurney van')"
        >
          Add Gurney Van
        </button>
      </b-row>
      <b-row class="ml-4 mr-4">
        <div class="search-table-outter">
          <table class="table mt-2" v-show="listItems.length > 0">
            <thead>
              <tr>
                <th scope="col">Service Type</th>
                <th scope="col">Base Rate</th>
                <th scope="col">Price Per Hour Wait Time</th>
                <th scope="col">Cancellation Fee</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th></th>
              </tr>
            </thead>
            <!-- list of items -->
            <tbody>
              <!-- Ambulance list-->
              <tr v-for="(item, index) in listItems" :key="'blc' + index">
                <td>{{ item.type.toUpperCase() }}</td>
                <td>
                  <b-form-input type="number" v-model="item.base_rate" />
                </td>
                <td>
                  <b-form-input type="number" v-model="item.wait_rate" />
                </td>
                <td>
                  <b-form-input type="number" v-model="item.cancel_rate" />
                </td>
                <td>
                  <gmap-autocomplete
                    class="form-control map"
                    tabindex="1"
                    :value="item.city"
                    @click="shareListItemsIndex(index)"
                    @place_changed="itemCitySelect"
                    style="width: 300px"
                  >
                  </gmap-autocomplete>
                </td>
                <td>
                  <b-form-input
                    type="text"
                    :id="'state_id_' + index"
                    v-model="item.state"
                    
                    style="width: 350px"
                  />
                </td>
                <td class="d-flex">
                  <b-icon-trash-fill
                    class="h2"
                    tooltip.hover.top
                    title="Add new record"
                    variant="danger"
                    @click="removeRowListItems(index)"
                  ></b-icon-trash-fill>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-row>
      <b-row>
        <b-col md="12 save-btn">
          <button class="btn btn-primary" v-on:click="addProvider">Save</button>
        </b-col>
      </b-row>
    </b-card>
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
  BootstrapVueIcons,
  BIconArrowUp,
  BIconPlusCircleFill,
  BIconTrashFill,
} from "bootstrap-vue";
import vSelect from "vue-select";
import { mapGetters } from "vuex";
import { getMessageError } from '@core/utils/utils'
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
    BootstrapVueIcons,
    BIconArrowUp,
    BIconPlusCircleFill,
    BIconTrashFill,
  },
  data() {
    return {
      src: "",
      btnupdate: false,
      providerData: {
        company_name: "",
        ph: "",
        email: "",
        company_address: "",
        point_of_contact: "",
        account_number: "",
        car_type: [],
        imageLicense: "",
        imageInsurance: "",
        imageLegalName: "",
      },
      existingPlace: "",
      listItems: [],
      sedans: [],
      wheelchairs: [],
      ambulances: [],
      gurneyVans: [],
      listItemsIndex: "",
      sedanIndex: "",
      wheelchairIndex: "",
      ambulanceIndex: "",
      gurneyVanIndex: "",
    };
  },
  methods: {
    //add item to arrays
    addMoreItems(pType) {
      let data = {
        type: pType,
        base_rate: "",
        wait_rate: "",
        cancel_rate: "",
        city: "",
        state: "",
      };
      this.listItems.push(data);
    },
    //remove items to arrays
    removeRowListItems(index) {
      this.listItems.splice(index, 1);
    },
    //share index
    shareListItemsIndex(index) {
      this.listItemsIndex = index;
    },
    //city selected
    itemCitySelect(loc) {
      var $address = loc.formatted_address;
      $address = $address.split(", ");
      this.listItems[this.listItemsIndex].city = $address[0];
      this.listItems[this.listItemsIndex].state = $address[$address.length - 2];
      document.getElementById("state_id_" + this.listItemsIndex).value =
        this.listItems[this.listItemsIndex].state;
    },
    validateForm() {
      if (this.providerData.company_name === "") {
        this.showMessageError("Company name required");
        return false;
      }
      if (this.providerData.ph === "") {
        this.showMessageError("Company phone required");
        return false;
      }
      if (this.providerData.email === "") {
        this.showMessageError("Company Email required");
        return false;
      }
      if (this.providerData.company_address === "") {
        this.showMessageError("Company Address required");
        return false;
      }
      if (this.providerData.point_of_contact === "") {
        this.showMessageError("Point of Contact (Full Name) required");
        return false;
      }
      if (this.providerData.car_type.length == 0) {
        this.showMessageError("Type of vehicle required");
        return false;
      }
      if (this.providerData.car_type.find((e) => e == "s")) {
        if (!this.listItems.find((x) => x.type == "sedan")) {
          this.showMessageError("Sedan rates are required");
          return false;
        }
      }
      if (this.providerData.car_type.find((e) => e == "wc")) {
        if (!this.listItems.find((x) => x.type == "wc")) {
          this.showMessageError("W/C rates are required");
          return false;
        }
      }
      if (this.providerData.car_type.find((e) => e == "bls")) {
        if (!this.listItems.find((x) => x.type == "bls")) {
          this.showMessageError("BLS rates are required");
          return false;
        }
      }
      if (this.providerData.car_type.find((e) => e == "gv")) {
        if (!this.listItems.find((x) => x.type == "gurney van")) {
          this.showMessageError("Gurney Van rates are required");
          return false;
        }
      }     

    },
    validateRates() {
      let message = "";
      for (let i = 0; i < this.listItems.length; i++) {
        let data = this.listItems[i];
        if (data.base_rate === "") {
          message = `Base rate must have a value (Service  ${data.type})`;
          this.showMessageError(message);
          return false;
        }
        if (data.wait_rate === "") {
          message = `Price per hour wait time must have a value (Service ${data.type})`;
          this.showMessageError(message);
          return false;
        }
        if (data.cancel_rate === "") {
          message = `Cancellation fee must have a value (Service ${data.type})`;
          this.showMessageError(message);
          return false;
        }
        if (data.city === "") {
          message = `City must have a value (Service ${data.type})`;
          this.showMessageError(message);
          return false;
        }
        if (data.state === "") {
          message = `State must have a value (Service ${data.type})`;
          this.showMessageError(message);
          return false;
        }
      }
    },
    //this format the structure of wheelchair and ambulance
    //parameter values wc or bls
    formatItems() {
      for (let i = 0; i < this.listItems.length; i++) {
        let type=this.listItems[i].type
        if (type === "wc") {
          this.listItems[i]["wc_base_rate"] = this.listItems[i].base_rate;
          this.listItems[i]["wc_wait_rate"] = this.listItems[i].wait_rate;
          this.listItems[i]["wc_cancel_rate"] = this.listItems[i].cancel_rate;
          this.listItems[i]["additional_mileage"] = this.listItems[i].additional_mileage;
          this.listItems[i]["wc_city"] = this.listItems[i].city;
          this.listItems[i]["wc_state"] = this.listItems[i].state;
        }
        if (type === "bls") {
          this.listItems[i]["blc_base_rate"] = this.listItems[i].base_rate;
          this.listItems[i]["blc_wait_rate"] = this.listItems[i].wait_rate;
          this.listItems[i]["blc_cancel_rate"] = this.listItems[i].cancel_rate;
          this.listItems[i]["additional_mileage"] = this.listItems[i].additional_mileage;
          this.listItems[i]["blc_city"] = this.listItems[i].city;
          this.listItems[i]["blc_state"] = this.listItems[i].state;
        }
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
    addProvider() {
      if (this.validateForm() == false) {
        return false;
      }

      if (this.validateRates() == false) {
        return false;
      }

      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      let formData = new FormData();

      formData.append("company_name", this.providerData.company_name);
      formData.append("ph", this.providerData.ph);
      formData.append("email", this.providerData.email);
      formData.append("company_address", this.providerData.company_address);
      formData.append("point_of_contact", this.providerData.point_of_contact);
      formData.append("car_type", this.providerData.car_type);

      formData.append("imageLicense", this.providerData.imageLicense);
      formData.append("imageInsurance", this.providerData.imageInsurance);
      formData.append("imageLegalName", this.providerData.imageLegalName);

      this.formatItems()
      formData.append("sedans", JSON.stringify(this.listItems.filter(x=>x.type==='sedan'))); 
      formData.append("wheelchairs", JSON.stringify(this.listItems.filter(x=>x.type==='wc')));
      formData.append("ambulances", JSON.stringify(this.listItems.filter(x=>x.type==='bls')));
      formData.append("gurneyvans", JSON.stringify(this.listItems.filter(x=>x.type==='gurney van')));
      

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      this.$http
        .post("admin/panel/addprovider", formData, config)
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

          this.$router.push({ name: "provider" });
        })
        .catch((error) => {
          this.$swal({
                        title: getMessageError(error),
                        icon: 'error',
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                        buttonsStyling: false,
                    })
        });
    },
    handleimageLicense() {
      this.providerData.imageLicense = this.$refs.imageLicense.files[0];
      this.compressImage(this.providerData.imageLicense,'imagenLicense')
    },
    handleimageInsurance() {
      this.providerData.imageInsurance = this.$refs.imageInsurance.files[0];
      this.compressImage(this.providerData.imageInsurance,'imageInsurance')
    },
    handleimageLegalName() {
      this.providerData.imageLegalName = this.$refs.imageLegalName.files[0];
      this.compressImage(this.providerData.imageLegalName,'imageLegalName')
    },
    compressImage(url,type){
      const WIDTH = 800
      let image_file = url

      let reader = new FileReader();

      reader.readAsDataURL(image_file);
      
      reader.onload = (event) => {
          let image_url = event.target.result;
          let image = document.createElement('img');
          image.src = image_url;
          image.onload = (e) => {

              let canvas = document.createElement('canvas');
              let ratio = WIDTH / image.width;
              canvas.width = WIDTH;
              canvas.height = image.height * ratio;

              let context = canvas.getContext('2d');
              context.drawImage(image, 0, 0, canvas.width, canvas.height);

              let new_image_url = canvas.toDataURL('image/jpeg', 10)

              let image_file = this.urlToFile(new_image_url)
              if(type == 'imagenLicense'){
                this.providerData.imageLicense = image_file
              }
              if(type == 'imageInsurance'){
                this.providerData.imageInsurance = image_file
              }
              if(type == 'imageLegalName'){
                this.providerData.imageLegalName = image_file
              }
              
          } 

      }
    },
    urlToFile(url) {

      let arr = url.split(",")
      // console.log(arr)
      let mime = arr[0].match(/:(.*?);/)[1]
      let data = arr[1]

      let dataStr = atob(data)
      let n = dataStr.length
      let dataArr = new Uint8Array(n)

      while(n--)
      {
          dataArr[n] = dataStr.charCodeAt(n)
      }

      let file  = new File([dataArr], 'File.jpg', {type: mime})

      return file
    },
    changedOptionCarType() {
      if (!this.providerData.car_type.find((e) => e == "s")) {
        this.listItems = this.arrayRemove(this.listItems, "sedan");
      }
      if (!this.providerData.car_type.find((e) => e == "wc")) {
        this.listItems = this.arrayRemove(this.listItems, "wc");
      }
      if (!this.providerData.car_type.find((e) => e == "bls")) {
        this.listItems = this.arrayRemove(this.listItems, "bls");
      }
      if (!this.providerData.car_type.find((e) => e == "gv")) {
        this.listItems = this.arrayRemove(this.listItems, "gurney van");
      }
    },
    arrayRemove(arr, value) {
      return arr.filter(function (ele) {
        return ele.type != value;
      });
    },
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
.save-btn {
  margin: auto;
  text-align: right;
}
.blank_row {
  height: 50px !important;
  background-color: #ffffff;
}
.search-table-outter {
  overflow-x: scroll;
}
th,
td {
  min-width: 200px;
}
</style>

</style>