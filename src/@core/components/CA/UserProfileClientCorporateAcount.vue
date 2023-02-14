<template>
  <div v-if="userData !== ''">

    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
            size="70px"
            rounded
            class="backgroundProfile"
        >
          <p class="text-name">
            {{ ProfileName(userData.amera_user.name) }}
          </p>
        </b-avatar>
      </template>
      <h4 class="">
        {{ userData.amera_user.name }} ( <span style="font-size: 0.9rem">
        {{ userData.amera_user.email }}
      </span>)
      </h4>

      <div class="d-flex flex-wrap">
        <b-button
            :variant="inhabilitar === false ? 'primary' : 'outline-secondary'"
            @click="savedInfo === true ? inhabilitar = true : inhabilitar = true"
        >
          <span class="d-none d-sm-inline">Edit</span>
          <feather-icon
              icon="EditIcon"
              class="d-inline d-sm-none"
          />
        </b-button>
        <b-button
            v-if="userData.amera_user.role.id === 3 && inhabilitar ===  true && savedInfo === false"
            :variant="inhabilitar === true ? 'primary' : 'primary' "
            class="ml-1"
            @click="updateCAInfo()"
        >
          <span class="d-none d-sm-inline">Save</span>
          <feather-icon
              icon="TrashIcon"
              class="d-inline d-sm-none"
          />
        </b-button>
        <b-button
            :variant="inhabilitar === true ? 'primary' : 'primary' "
            class="ml-1"
            @click="aprobarCA"
            v-if="userData.amera_user.status === 0"
        >
          <span class="d-none d-sm-inline">Approve</span>
          <feather-icon
              icon="TrashIcon"
              class="d-inline d-sm-none"
          />
        </b-button>
      </div>
    </b-media>

    <!-- form corporate -->
    <b-form>
      <b-row>
        <!-- Field: Username -->
        <b-col
            cols="12"
            md="4"
        >
          <b-form-group
              label="Company Legal Name"

          >
            <b-form-input
                v-model="userData.company_legal_name"
                disabled

            />
          </b-form-group>
        </b-col>

        <!-- Field: Full Name -->
        <b-col
            cols="12"
            md="4"
        >
          <b-form-group
              label="DBA"
          >
            <b-form-input
                v-model="userData.dba"
                :disabled="inhabilitar === false || savedInfo === true"
            />
          </b-form-group>
        </b-col>


        <!-- Field: Email -->
        <b-col
            cols="12"
            md="4"
        >
          <b-form-group
              label="TIN"
          >
            <b-form-input
                v-model="userData.tin"
                :disabled="inhabilitar === false || savedInfo === true"
            />
          </b-form-group>
        </b-col>

      </b-row>
      <b-row>
        <!-- Field: Full Name -->
        <!--        <b-col-->
        <!--            cols="12"-->
        <!--            md="4"-->
        <!--        >-->
        <!--          <b-form-group-->
        <!--              label="Contract start Date"-->
        <!--          >-->
        <!--            <b-form-input-->
        <!--                v-model="userData.contract_start_date"-->
        <!--                disabled-->
        <!--            />-->
        <!--          </b-form-group>-->
        <!--        </b-col>-->

        <!-- Field: Email -->
        <b-col
            cols="12"
            md="4"
        >
          <b-form-group
              label="Office Location Address"
          >
            <b-form-input
                v-model="userData.office_location_address"
                :disabled="inhabilitar === false || savedInfo === true"

            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
            cols="12"
            md="4"
        >
          <b-form-group
              label="Billing Address"
          >
            <b-form-input
                v-model="userData.billing_address"
                disabled
            />
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

import vSelect from 'vue-select'
import {mapGetters} from 'vuex'

export default {
  name: 'UserProfileClientCorporateAcount',
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
  },
  // props: {
  //   userData: {},
  // },
  data() {
    return {
      aprobado: false,
      inhabilitar: false,
      savedInfo: false,
      changeStatus: {
        userId: '',
      },
      option: [
        {
          text: 'Super Admin',
          value: 1
        },
        {
          text: 'Admin',
          value: 2
        },
        {
          text: 'Corporate account',
          value: 3
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      userData: 'Users/usersData'
    }),
  },
  watch: {
    'savedInfo'() {
      if (this.savedInfo === true) {
        this.inhabilitar = false;
        this.savedInfo = false;
      }
    }
  },

  methods: {
    ProfileName(name) {
      return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
    },

    updateCAInfo(){
      this.savedInfo = true
      this.formSubmitted()
    },
    aprobarCA() {
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },
      })
      this.changeStatus.userId = this.$store.getters['Users/usersData'].amera_user.id;
      this.$http.post('admin/panel/users/change-user-status', this.changeStatus)
          .then((response) => {
            this.$swal({
              title: response.data.message,
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            }).then((result) => {
              if (result.isConfirmed) {
                // this.$emit('refresh', this.aprobado = true)
                this.$router.go(0)
              }
            })
          })
          .catch((error) => {
            this.$swal({
              title: error.response.data.message,
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          })
    },

    formSubmitted() {
      this.$http.post(`ca/panel/corporate/${this.userData.id}/modify`, this.userData)
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
            title: res.message,
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
    },

  },
  created() {
  }
}
</script>

<style scoped lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.text-name {
  font-size: 1.5rem;
  margin-bottom: 0 !important;
}

.backgroundProfile {
  background-color: $primary;
}
</style>
