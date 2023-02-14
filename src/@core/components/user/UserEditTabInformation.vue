<template>
  <div v-if="infoUser !== ''">
    <!-- Header: Personal Info -->
    <div class="d-flex">
      <feather-icon icon="UserIcon" size="19" />
      <h4 class="mb-0 ml-50">Contact Information</h4>
    </div>

    <div class="d-flex flex-wrap mt-2">
      <b-button
        :variant="inhabilitar === true ? 'primary' : 'outline-secondary'"
        @click="inhabilitar = false"
      >
        <span class="d-none d-sm-inline">Edit</span>
        <feather-icon icon="EditIcon" class="d-inline d-sm-none" />
      </b-button>

      <b-button
        v-if="inhabilitar === false"
        :variant="inhabilitar === true ? 'primary' : 'primary'"
        class="ml-1"
        @click="saveChanges"
      >
        <span class="d-none d-sm-inline">Save</span>
        <feather-icon icon="TrashIcon" class="d-inline d-sm-none" />
      </b-button>
    </div>

    <!-- Form: Personal Info Form -->
    <b-form
      class="mt-1"
      v-if="
        $store.getters['Users/userData'].user.role.id === 1 ||
        $store.getters['Users/userData'].user.role.id === 2 ||
        $store.getters['Users/userData'].user.role.id === 3
      "
    >
      <b-row>
        <!-- Field: Birth Date -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Telephone Number">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input
                id="autocomplete"
                v-model="
                  infoUser.corporate_account_personal_info.telephone_number
                "
                :state="errors.length > 0 ? false : null"
                :disabled="inhabilitar === true"
              />
              <small class="text-danger" v-if="errors[0]"
                >This field is required</small
              >
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Field: Website -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Email">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input
                id="autocomplete"
                v-model="infoUser.corporate_account_personal_info.email"
                :state="errors.length > 0 ? false : null"
                :disabled="inhabilitar === true"
              />
              <small class="text-danger" v-if="errors[0]"
                >This field is required</small
              >
            </validation-provider>
          </b-form-group>
        </b-col>


        <!-- Field: Language -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Website">
            <b-form-input
              id="autocomplete"
              v-model="infoUser.corporate_account_personal_info.website"
              :disabled="inhabilitar === true"
            />
          </b-form-group>
        </b-col>

        
                <!-- Field: Mobile -->
                <b-col cols="12" md="12" lg="12">
          <b-form-group label="Fax Number">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input
                id="autocomplete"
                v-model="infoUser.corporate_account_personal_info.fax_number"
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
      <div v-if="$store.getters['Users/userData'].user.role.id != 3">
        <div class="d-flex">
          <feather-icon icon="UserIcon" size="19" />
          <h4 class="mb-0 ml-50">Login Information</h4>
        </div>
        <b-row>
          <!-- Field: Birth Date -->

          <!-- Field: Website -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="Email">
              <validation-provider #default="{ errors }" rules="required">
                <b-form-input
                  id="autocomplete"
                  v-model="infoUser.corporate_account_personal_info.email"
                  :state="errors.length > 0 ? false : null"
                  :disabled="inhabilitar === true"
                />
                <small class="text-danger" v-if="errors[0]"
                  >This field is required</small
                >
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Field: Language -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="password">
              <b-form-input
                type="password"
                id="autocomplete"
                v-model="infoUser.corporate_account_personal_info.password"
                :disabled="inhabilitar === true"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <!-- Header: Personal Info -->
      <div class="d-flex mt-2">
        <feather-icon icon="UserPlusIcon" size="19" />
        <h4 class="mb-0 ml-50">Additional contact</h4>
        <b-button
          v-if="
            inhabilitar === false &&
            $store.getters['Users/userData'].user.role.id != 3
          "
          class="btn btn-primary ml-4"
          @click="addMoreAdditionalInfo()"
        >
          Add New
        </b-button>
      </div>

      <b-row
        v-for="(amerPersonalInfo, index) in infoUser.amerPersonalInfo"
        :key="index"
        class="mt-1"
      >
        <!-- Field: Address Line 1 -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Additional Contact Name">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input
                id="autocomplete"
                v-model="amerPersonalInfo.additional_contact_name"
                :state="errors.length > 0 ? false : null"
                :disabled="inhabilitar === true"
              />
              <small class="text-danger" v-if="errors[0]"
                >This field is required</small
              >
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Field: Postcode -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Additional Contact Number">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input
                id="autocomplete"
                v-model="amerPersonalInfo.additional_contact_number"
                :state="errors.length > 0 ? false : null"
                :disabled="inhabilitar === true"
              />
              <small class="text-danger" v-if="errors[0]"
                >This field is required</small
              >
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Field: City -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Additional Contact Email">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input
                id="autocomplete"
                v-model="amerPersonalInfo.additional_contact_email"
                :state="errors.length > 0 ? false : null"
                :disabled="inhabilitar === true"
              />
              <small class="text-danger" v-if="errors[0]"
                >This field is required</small
              >
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Notes">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input
                id="autocomplete"
                v-model="amerPersonalInfo.notes"
                :state="errors.length > 0 ? false : null"
                :disabled="inhabilitar === true"
              />
              <small class="text-danger" v-if="errors[0]"
                >This field is required</small
              >
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col
          v-if="$store.getters['Users/userData'].user.role.id != 3"
          cols="12"
          md="6"
          lg="8"
          class="delete_button"
        >
          <b-form-group>
            <b-icon-trash-fill
              class="h2"
              tooltip.hover.top
              variant="danger"
              v-show="index != 0"
              @click="removeAdditionalInfo(index)"
            ></b-icon-trash-fill>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>

    <!-- Info corporate account -->
    <b-form class="mt-1" v-else>
      <b-row>
        <!-- Field: Birth Date -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Telephone Number">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input
                id="autocomplete"
                v-model="
                  infoUser.corporate_account_personal_info.telephone_number
                "
                :state="errors.length > 0 ? false : null"
                :disabled="inhabilitar === true"
              />
              <small class="text-danger" v-if="errors[0]"
                >This field is required</small
              >
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Field: Website -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Email">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input
                id="autocomplete"
                v-model="infoUser.corporate_account_personal_info.email"
                :state="errors.length > 0 ? false : null"
                :disabled="inhabilitar === true"
              />
              <small class="text-danger" v-if="errors[0]"
                >This field is required</small
              >
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Field: Language -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Website">
            <b-form-input
              id="autocomplete"
              v-model="infoUser.corporate_account_personal_info.website"
              :disabled="inhabilitar === true"
            />
          </b-form-group>
        </b-col>
      </b-row>

             <!-- Field: Mobile -->
             <b-col cols="12" md="12" lg="12">
          <b-form-group label="Fax Numberx">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input
                id="autocomplete"
                v-model="infoUser.corporate_account_personal_info.fax_number"
                :state="errors.length > 0 ? false : null"
                :disabled="inhabilitar === true"
              />
              <small class="text-danger" v-if="errors[0]"
                >This field is required</small
              >
            </validation-provider>
          </b-form-group>
        </b-col>

      <!-- Header: Personal Info -->
      <div class="d-flex mt-2">
        <feather-icon icon="UserPlusIcon" size="19" />
        <h4 class="mb-0 ml-50">Additional contact</h4>
      </div>

      <!-- Form: Personal Info Form -->
      <b-row class="mt-1">
        <!-- Field: Address Line 1 -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Additional Contact Name">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input
                id="autocomplete"
                v-model="
                  infoUser.corporate_account_personal_info
                    .additional_contact_name
                "
                :state="errors.length > 0 ? false : null"
                :disabled="inhabilitar === true"
              />
              <small class="text-danger" v-if="errors[0]"
                >This field is required</small
              >
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Field: Postcode -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Additional Contact Number">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input
                id="autocomplete"
                v-model="
                  infoUser.corporate_account_personal_info
                    .additional_contact_number
                "
                :state="errors.length > 0 ? false : null"
                :disabled="inhabilitar === true"
              />
              <small class="text-danger" v-if="errors[0]"
                >This field is required</small
              >
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Field: City -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Additional Contact Email">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input
                id="autocomplete"
                v-model="
                  infoUser.corporate_account_personal_info
                    .additional_contact_email
                "
                :state="errors.length > 0 ? false : null"
                :disabled="inhabilitar === true"
              />
              <small class="text-danger" v-if="errors[0]"
                >This field is required</small
              >
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Notes">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input
                id="autocomplete"
                v-model="infoUser.corporate_account_personal_info.notes"
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
  BIconPlusCircleFill,
  BIconTrashFill,
} from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
import vSelect from "vue-select";
import { mapGetters } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";

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
    ValidationProvider,
    ValidationObserver,
    BIconPlusCircleFill,
    BIconTrashFill,
  },
  props: {
    infoCa: {},
  },
  data() {
    return {
      inhabilitar: true,
      additionalInfos: [],
    };
  },
  computed: {
    ...mapGetters({
      infoUser: "Users/usersData",
    }),
  },
  methods: {
    ProfileName(name) {
      return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
    },
    saveChanges() {
      this.formSubmitted();
    },
    addMoreAdditionalInfo() {
      this.infoUser.amerPersonalInfo.push({});
    },
    removeAdditionalInfo(index) {
      if (this.infoUser.amerPersonalInfo[index].id) {
        this.deleteAdditionalInfo(this.infoUser.amerPersonalInfo[index].id);
        this.infoUser.amerPersonalInfo.splice(index, 1);
      } else {
        this.infoUser.amerPersonalInfo.splice(index, 1);
      }
    },
    deleteAdditionalInfo(infoId) {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      infoId = parseInt(infoId);
      this.$http
        .post(`ca/panel/corporate/${infoId}/deletePersonalInfo`)
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
            title: error.response.data.data,
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
    formSubmitted() {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      this.$http
        .post(
          `ca/panel/corporate/${this.infoUser.id}/modifyPersonalInfo`,
          this.infoUser
        )
        .then((res) => {
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
            this.$swal({
              title: res.data.message,
              icon: "error",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            });
          }
        })
        .catch((res) => {
          console.log(res);
          this.$swal({
            title: res.message,
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
.btn-primary {
  background: #7367f0 !important;
  border: none !important;
}
.delete_button {
  text-align: end;
  margin-top: 32px;
}
</style>