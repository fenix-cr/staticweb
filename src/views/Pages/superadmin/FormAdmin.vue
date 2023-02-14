<template>
  <div class="d-flex justify-content-center">
    <b-card class="col-lg-9">
      <b-row class="containerCreateAdmin">
        <b-col class="container-form">
          <div class="cols-12 col-lg-12 d-flex flex-column">
            <validation-observer ref="accountRules" tag="form">
              <div class="">
                <b-col lg="12">
                  <b-form-group label="Full Name">
                    <validation-provider
                      #default="{ errors }"
                      rules="required"
                      name="name"
                    >
                      <b-form-input
                        v-model="itemAdmin.name"
                        :state="errors.length > 0 ? false : null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col lg="12">
                  <b-form-group label="Email">
                    <validation-provider
                      #default="{ errors }"
                      rules="required|email"
                      name="email"
                    >
                      <b-form-input
                        v-model="itemAdmin.email"
                        :state="errors.length > 0 ? false : null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col lg="12">
                  <b-form-group label="Role">
                    <validation-provider
                      #default="{ errors }"
                      rules="required"
                      name="role"
                    >
                      <b-form-select
                        @change="onChangeRole($event)"
                        v-model="itemAdmin.role"
                        :options="optionsRoles"
                        label="Role"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :state="errors.length > 0 ? false : null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col lg="12 mb-2">
                  <p>This Role contain follwing Permissions</p>
                  <span v-for="(permission ,index) in permissions" :key="index">
                    <small class="permissions">{{permission.name}}</small>
                  </span>
                </b-col>

                <b-row class="m-0" lg="12" v-if="itemAdmin.id === ''">
                  <b-col cols="6">
                    <b-form-group label="Password">
                      <validation-provider
                        #default="{ errors }"
                        name="Password"
                        vid="Password"
                        rules="required"
                      >
                        <b-form-input
                          autocomplete="off"
                          ref="password"
                          type="password"
                          v-model="itemAdmin.password"
                          :state="errors.length > 0 ? false : null"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>

                  <b-col cols="6">
                    <b-form-group label="Confirmation">
                      <validation-provider
                        #default="{ errors }"
                        rules="required|confirmed:Password"
                        name="Password Confirm"
                      >
                        <b-form-input
                          autocomplete="off"
                          type="password"
                          v-model="passwordConfirmation"
                          :state="errors.length > 0 ? false : null"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
              <div class="pl-1">
                <b-button variant="primary" @click="sendForm">
                  <span class="d-none d-sm-inline">Save</span>
                  <feather-icon icon="EditIcon" class="d-inline d-sm-none" />
                </b-button>
              </div>
            </validation-observer>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BLink,
  BButton,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BImg,
  BCard,
  BCardTitle,
  BCardText,
  BFormSelect,
  BFormDatepicker,
} from "bootstrap-vue";
import { required, email } from "@validations";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import Cleave from "vue-cleave-component";
import { optionsRoles } from "@core/utils/optionsRoles";

export default {
  name: "FormAdmin",
  components: {
    BRow,
    BCol,
    BCard,
    BLink,
    BButton,
    BForm,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BImg,
    BCardTitle,
    BCardText,
    BFormSelect,
    BFormDatepicker,
    ValidationProvider,
    ValidationObserver,
    Cleave,
  },
  data() {
    return {
      permissions:[],
      itemAdmin: {
        id: "",
        name: "",
        email: "",
        role: 1,
        password: "",
      },
      passwordConfirmation: "",
      optionsRoles:[       
         {
            text: 'Super Admin',
            value: 1
        },
        {
            text: 'Admin',
            value: 2
        },
        {
            text: 'Dispatch',
            value: 4
        },
        {
            text: 'Care Coordinator',
            value: 5
        },
        {
            text: 'Provider Relations',
            value: 6
        },
        {
            text: 'Human Resource',
            value: 7
        },
        {
            text: 'Billing',
            value: 8
        }
       ],
    };
  },
  methods: {
    onChangeRole($e){
      this.getPermissionsAgainstRole($e)
    },
    getPermissionsAgainstRole(id) {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.$http
        .get(`auth/admin/role/${id}/permission`)
        .then((response) => {
          this.permissions = response.data.data.permission
          this.$swal.close();
        })
    },
    sendForm() {
      this.validateForm();
    },
    saveData() {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.$http
        .post("auth/admin/register", this.itemAdmin)
        .then((response) => {
          this.$swal({
            title: response.data.message,
            icon: "success",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
          this.clearForm();
        })
        .catch((error) => {
          let message =
            error.response.data.data !== undefined
              ? error.response.data.data
              : error.response.data.message;
          this.$swal({
            title: message,
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
    updateData() {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.$http
        .post("auth/admin/update", this.itemAdmin)
        .then((response) => {
          this.$swal({
            title: response.data.message,
            icon: "success",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        })
        .catch((error) => {
          let message =
            error.response.data.data !== undefined
              ? error.response.data.data
              : error.response.data.message;
          this.$swal({
            title: message,
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
    clearForm() {
      this.itemAdmin.name = "";
      this.itemAdmin.email = "";
      this.itemAdmin.role = "";
    },
    validateForm() {
      console.log(434334);
      return new Promise((resolve, reject) => {
        this.$refs.accountRules.validate().then((success) => {
          if (success) {
            if (this.itemAdmin.id > 0) {
              this.updateData();
            } else {
              this.saveData();
            }
          } else {
            reject();
          }
        });
      });
    },
  },
  mounted() {
    let data = this.$route.params.item;
    if (data) {
      this.itemAdmin = data;
      this.itemAdmin.role = data.role.id;
    }
    this.getPermissionsAgainstRole(this.itemAdmin.role)
  },
};
</script>

<style lang="scss" scoped>
.containerCreateAdmin {
  .imgAdmin {
    max-height: 356px;
    border-radius: 14px;
  }

  .container-form {
    display: flex;
    align-items: center;
  }
}

@media screen and(min-width: 320px) and (max-width: 1024px) {
  .containerCreateAdmin {
    flex-direction: column;
    gap: 10px;

    .imgAdmin {
      width: 100%;
    }
  }
}
.permissions{
    background: #332b7b;
    color: white;
    padding: 2px;
    border-radius: 5px;
    margin-right: 10px;
}
</style>
