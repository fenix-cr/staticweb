<template>
  <div>
    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <b-row>
        <b-button
          variant="primary"
          class="mb-1 mb-sm-0 mr-0 mr-sm-1 ml-1"
          @click="addAction"
          v-if="actionSeleted == null"
        >
          Add new record
        </b-button>
      </b-row>

      <div md="6" lg="6" v-if="actionSeleted !== null">
        <!-- Table Top -->
        <validation-observer ref="formRules" tag="form">
          <b-form>
            <b-row>
              <b-col cols="12" md="12" lg="6">
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
              <b-col cols="12" md="12" lg="6">
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
              <b-col class="mt-2" cols="12" md="12" lg="12">
                <label for=""></label>
                <b-button
                  variant="danger"
                  class="mb-1 mb-sm-0 mr-0 mr-sm-1 ml-1"
                  @click="cancelAction"
                  style="float: right"
                >
                  Cancel
                </b-button>
                <b-button
                  variant="success"
                  class=""
                  style="float: right"
                  @click="validationForm"
                >
                  {{ actionSeleted }}
                </b-button>
              </b-col>
            </b-row>
            <b-row> </b-row>
          </b-form>
        </validation-observer>
      </div>

      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Showing</label>
            <b-form-select
              v-model="perPage"
              :options="pageOptions"
              id="perPageSelect"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>entries</label>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="search"
                class="d-inline-block mr-1"
                placeholder="Search..."
              />
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table
        ref="refUserListTable"
        class="position-relative"
        responsive
        primary-key="id"
        :items="listPlaces"
        empty-text="No patients found"
        :fields="fields"
        :filter="search"
        :per-page="perPage"
        id="my-table"
        :current-page="currentPage"
        show-empty
      >
        <!-- Column: Actions -->
        <template #cell(actions)="{ item }">
          <b-button
            variant="primary"
            class="mb-1 mb-sm-0 mr-0 mr-sm-1"
            @click="editAction(item)"
          >
            Edit
          </b-button>
          <b-button
            variant="danger"
            class="mb-1 mb-sm-0 mr-0 mr-sm-1"
            @click="deleteRecord(item.id)"
          >
            Delete
          </b-button>
        </template>
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-start
            "
          >
            <span v-if="listPlaces" class="text-muted"
              >Showing {{ perPage }} of {{ listPlaces.length }} entries</span
            >
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-end
            "
          >
            <b-pagination
              :per-page="perPage"
              v-model="currentPage"
              :total-rows="rows"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
              aria-controls="my-table"
            >
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>
  
<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BForm,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BListGroup,
  BListGroupItem,
  BFormSelect,
  BFormGroup,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import { mapGetters } from "vuex";
import { getMessageError } from "@core/utils/utils";

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BForm,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BListGroup,
    BListGroupItem,
    BFormSelect,
    vSelect,
    BFormGroup,
    ValidationProvider,
    ValidationObserver,
  },
  name: "ListStatesCities",
  data() {
    return {
      perPage: 10,
      pageOptions: [3, 5, 10],
      currentPage: 1,
      listPlaces: [],
      search: "",
      fields: ["state","city", "actions"],
      actionSeleted: null,
      drive_id: 0,
      record: {
        id: 0,
        driver_id: 0,
        city: "",
        state: "",
      },
      listStates: [],
      listCities: [],
      selectedState: null,
      selectedCity: null,
    };
  },
  computed: {
    ...mapGetters({
      infoDataDriver: "Users/usersData",
    }),
    rows() {
      if (this.listPlaces) {
        return this.listPlaces.length;
      }
    },
  },
  methods: {
    SelectedCity(loc) {
      console.log(loc);
      var $address = loc.formatted_address;
      $address = $address.split(", ");
      this.record.city = $address[0];
      this.record.state = $address[$address.length - 2];
    },
    getListRecordsByDriverId(driver_id) {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.$http
        .get(`admin/panel/workcity/ListDriverWorkCityByDriver/${driver_id}`)
        .then((response) => {
          this.listPlaces = response.data.data;
          this.$swal.close();
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
    validationForm() {
      return new Promise((resolve, reject) => {
        this.$refs.formRules.validate().then((success) => {
          if (success) {
            this.saveRecord();
          }
        });
      });
    },
    saveRecord() {
      this.record.state=this.selectedState.value;
      this.record.city=this.selectedCity.value;

      let url =
        this.record.id !== null
          ? `admin/panel/workcity/${this.record.id}/modify`
          : `admin/panel/workcity/add`;

      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.$http
        .post(url, this.record)
        .then((response) => {
          this.getListRecordsByDriverId(this.drive_id);
          this.$swal.close();
          this.actionSeleted = null;
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
    editAction(item) {
      this.record.id = item.id;
      this.record.driver_id = item.driver_id;
      this.record.city = item.city;
      this.record.state = item.state;
      this.actionSeleted = "Update";
      this.selectedState=this.listStates.find(x=>x.value===this.record.state);
      this.getCitiesByState(this.record.state,this.record.city);
    },
    addAction() {
      this.record.id = null;
      this.record.driver_id = this.drive_id;
      this.record.city = null;
      this.record.state = null;
      this.actionSeleted = "Save";
      this.selectedState=null;
      this.selectedCity=null;
    },
    cancelAction() {
      this.actionSeleted = null;
    },
    deleteRecord(id) {
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
            .post(`admin/panel/workcity/${id}/delete`)
            .then((res) => {
              this.getListRecordsByDriverId(this.drive_id);
              this.$swal({
                title: res.data.data,
                icon: "success",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
                buttonsStyling: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.$router.push({ name: "all-selfpaids" });
                }
              });
            })
            .catch((error) => {
              console.log(error);
              this.$swal({
                title: error.response.data.message,
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
  },
  mounted() {
  this.getStates(null)
  },
  created() {
    this.drive_id = parseInt(this.$route.params.id);
    this.listPlaces = this.getListRecordsByDriverId(this.drive_id);
  },
};
</script>
  
<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.urlPagina {
  text-decoration: none;
  color: #7367f0;
}

.urlPagina:hover {
  background: linear-gradient(
    118deg,
    #7367f0,
    rgba(115, 103, 240, 0.7)
  ) !important;
  color: #fff;
}

.list-group-item:hover {
  background: linear-gradient(
    118deg,
    #7367f0,
    rgba(115, 103, 240, 0.7)
  ) !important;
  color: #fff !important;
}

.urlPagina::before {
  background-color: currentColor !important;
  bottom: 0;
  content: "";
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.box {
  box-shadow: 0 14px 20px 0 rgba(143, 143, 143, 0.2) !important;
}
</style>
  
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
  