<template>
  <div>

    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar size="70px" rounded class="backgroundProfile">
          <p class="text-name">
            {{ ProfileName(userData.name) }}
          </p>
        </b-avatar>
      </template>
      <h4 class="">
        {{ userData.name }} ( <span style="font-size: 0.9rem">
          {{ userData.email }}
        </span>)
      </h4>


      <div class="d-flex flex-wrap">
        <b-button :variant="inhabilitar === true ? 'primary' : 'outline-secondary'" @click="inhabilitar = false">
          <span class="d-none d-sm-inline">Edit</span>
          <feather-icon icon="EditIcon" class="d-inline d-sm-none" />
        </b-button>

        <b-button v-if="inhabilitar === false" :variant="inhabilitar === true ? 'primary' : 'primary'" class="ml-1"
          @click="saveChanges">
          <span class="d-none d-sm-inline">Save</span>
          <feather-icon icon="TrashIcon" class="d-inline d-sm-none" />
        </b-button>
      </div>

    </b-media>

    <!-- form Admin -->
    <b-form v-if="userData.role.id !== 3">
      <b-row>
        <!-- Field: Username -->
        <b-col cols="12" md="4">
          <b-form-group label="Name">
            <b-form-input v-model="userData.name" :disabled="inhabilitar === true" />
          </b-form-group>
        </b-col>

        <!-- Field: Full Name -->
        <b-col cols="12" md="4">
          <b-form-group label="Email">
            <b-form-input v-model="userData.email" :disabled="inhabilitar === true" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>

    <!-- form corporate -->
    <b-form v-if="userData.role.id === 3">
      <b-row>
        <!-- Field: Username -->
        <b-col cols="12" md="4">
          <b-form-group label="Company Legal Name">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input id="autocomplete" v-model="userData.corporate_account.company_legal_name"
                :state="errors.length > 0 ? false : null" :disabled="inhabilitar === true" />
              <small class="text-danger" v-if="errors[0]">This field is required</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Field: Full Name -->
        <b-col cols="12" md="4">
          <b-form-group label="DBA">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input id="autocomplete" v-model="userData.corporate_account.dba"
                :state="errors.length > 0 ? false : null" :disabled="inhabilitar === true" />
              <small class="text-danger" v-if="errors[0]">This field is required</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col cols="12" md="4">
          <b-form-group label="TIN">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input id="autocomplete" v-model="userData.corporate_account.tin"
                :state="errors.length > 0 ? false : null" :disabled="inhabilitar === true" />
              <small class="text-danger" v-if="errors[0]">This field is required</small>
            </validation-provider>
          </b-form-group>
        </b-col>

      </b-row>
      <b-row>
        <!-- Field: Email -->
        <b-col cols="12" md="4">
          <b-form-group label="Office Location Address">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input id="autocomplete" v-model="userData.corporate_account.office_location_address"
                :state="errors.length > 0 ? false : null" :disabled="inhabilitar === true" />
              <small class="text-danger" v-if="errors[0]">This field is required</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col cols="12" md="4">
          <b-form-group label="Billing Address">
            <validation-provider #default="{ errors }" rules="required">
              <b-form-input id="autocomplete" v-model="userData.corporate_account.billing_address"
                :state="errors.length > 0 ? false : null" :disabled="inhabilitar === true" />
              <small class="text-danger" v-if="errors[0]">This field is required</small>
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
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
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { getMessageError } from '@core/utils/utils'

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
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    userData: {},
  },
  data() {
    return {
      nameProfile: '',
      inhabilitar: true,
    }
  },
  methods: {
    ProfileName(name) {
      return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
    },
    saveChanges() {
      if (this.userData.role.id === 3) {
        this.formValuesCorpAcc()
      }
      if (this.userData.role.id !== 3) {
        this.formValuesAdmin()
      }
    },
    formValuesCorpAcc() {
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },
      })
      this.$http.post(`ca/panel/corporate/${this.userData.corporate_account.id}/modify`, this.userData.corporate_account)
        .then((res) => {
          if (res.data.status === 200) {
            this.$swal({
              title: "Record modified successfully",
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
            this.inhabilitar = true;

          } else {
            this.$swal({
              title: res.data.message,
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        })
        .catch((res) => {
          console.log(res)
          this.$swal({
            title: getMessageError(res),
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
    },
    formValuesAdmin() {
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },
      })
      const data = { ...this.userData };
      data.role = this.userData.role.id
      this.$http.post(`admin/panel/user/${this.userData.id}?action=modify`, data)
        .then((res) => {
          if (res.data.status === 200) {
            this.$swal({
              title: "Record modified successfully",
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
            this.inhabilitar = true;

          } else {
            this.$swal({
              title: res.data.message,
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        })
        .catch((res) => {
          console.log(res)
          this.$swal({
            title: getMessageError(res),
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
    },
  },
  mounted() {
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.text-name {
  font-size: 1.5rem;
  margin-bottom: 0 !important;
}

.backgroundProfile {
  background-color: $primary;
}
</style>