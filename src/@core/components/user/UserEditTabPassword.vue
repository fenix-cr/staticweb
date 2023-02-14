<template>
  <div>
    <!-- Header: Personal Info -->
    <div class="d-flex">
      <feather-icon icon="UserIcon" size="19" />
      <h4 class="mb-0 ml-50">Change Password</h4>
    </div>

    <!-- Form: Personal Info Form -->
    <b-form class="mt-1">
      <b-row>
        <!-- Field: Birth Date -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Email">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input
                id="autocomplete"
                v-model="userData.email"
               disabled
              />
              <small class="text-danger" v-if="errors[0]"
                >This field is required</small
              >
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Field: Mobile -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Password">
            <b-form-input type="password" v-model="password" />
          </b-form-group>
        </b-col>

        <!-- Field: Website -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Confirm Password">
            <b-form-input type="password" v-model="confirm_password" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" class="text-right">
          <b-button :variant="'primary'" class="ml-1" @click="saveChanges">
            <span class="d-none d-sm-inline">Update</span>
            <feather-icon icon="TrashIcon" class="d-inline d-sm-none" />
          </b-button>
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
} from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
import vSelect from "vue-select";
import { mapGetters } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { getMessageError } from "@core/utils/utils";

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
  },
  props: {
    userData: {},
  },
  data() {
    return {
      inhabilitar: true,
      password: "",
      confirm_password: "",
      amera_user: [],
    };
  },
  computed: {
    ...mapGetters({
      infoUser: "Users/userData",
    }),
  },
  methods: {
    ProfileName(name) {
      return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
    },
    saveChanges() {
      this.formSubmitted();
    },
    formSubmitted() {
      if (this.password.length < 6) {
        this.$swal({
          title: "Password length should at least 6 character",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
        return false;
      }
      if (this.password != this.confirm_password) {
        if (this.password.length < 6) {
          var $title = "Password length should a tleast 6 character";
        } else {
          var $title = "Password does't match";
        }
        this.$swal({
          title: $title,
          icon: "error",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
        this.inhabilitar = true;
      } else {
        this.$swal({
          title: "Please, wait...",
          didOpen: () => {
            this.$swal.showLoading();
          },
        });
        let formData = new FormData();

        let user = this.infoUser.user;

        formData.append("id", user.id);
        formData.append("email", user.email);
        formData.append("password", this.password);

        let url = `auth/admin/changePassword/${user.id}`;

        if (user.role.id === 3) {
          url = "ca/panel/corporate/modifyPassword";
        }

        this.$http
          .post(url, formData)
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
            this.$swal({
              title: getMessageError(res),
              icon: "error",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            });
          });
      }
    },
  },
  mounted() {
    console.log(909);
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>