<template>
  <div v-if="dataProvider !== ''">
    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar ref="previewEl" :src="dataProvider.self_pay.profile_picture" size="90px" rounded
          class="backgroundProfile-driver">
          <p class="text-name-driver" v-if='dataProvider.self_pay.profile_picture === null'>
            {{ ProfileName(dataProvider.self_pay.name) }}
          </p>
        </b-avatar>
      </template>

      <h4 class="">
        {{ dataProvider.self_pay.name }} ( <span style="font-size: 0.9rem">
          {{ dataProvider.self_pay.email }}
        </span>)
      </h4>
    </b-media>

    <!-- form Admin -->
    <b-form>
      <b-row>
        <!-- Field: Username -->
        <b-col cols="12" md="3">
          <b-form-group label="Name">
            <b-form-input :disabled="true" v-model="dataProvider.self_pay.name" />
          </b-form-group>
        </b-col>
        <!-- Field: Full Name -->
        <b-col cols="12" md="3">
          <b-form-group label="Lastname">
            <b-form-input :disabled="true" v-model="dataProvider.self_pay.lastname" />
          </b-form-group>
        </b-col>
        <!-- Field: Gender -->
        <b-col cols="12" md="3">
          <b-form-group label="Gender">
            <b-form-select :disabled="true" id="gender" v-model="dataProvider.self_pay.gender" :options="gender">
              <option value="">Select Gender</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <!-- Field: Birthday -->
        <b-col cols="12" md="3">
          <b-form-group label="Birthday">
            <b-form-input :disabled="true" v-model="dataProvider.self_pay.birthday" type="date" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>

    <!-- form corporate -->
    <b-form>
      <b-row>
        <!-- Field: Phone number -->
        <b-col cols="12" md="3">
          <b-form-group label="Phone number">
            <b-form-input :disabled="true" v-model="dataProvider.self_pay.phone_number" />
          </b-form-group>
        </b-col>
        <!-- Field: Full Name -->
        <b-col cols="12" md="3">
          <b-form-group label="Email">
            <b-form-input :disabled="true" v-model="dataProvider.self_pay.email" />
          </b-form-group>
        </b-col>
        <!-- Field: Address -->
        <b-col cols="12" md="3">
          <b-form-group label="Address">
            <b-form-input :disabled="true" v-model="dataProvider.self_pay.address" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <!-- Field: Note -->
        <b-col cols="12" md="3">
          <b-form-group label="Note">
            <b-form-textarea :disabled="true" v-model="dataProvider.self_pay.note" />
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
  BFormTextarea,
  BForm,
  BTable,
  BCard,
  BCardHeader,
  BCardTitle,
  BFormCheckbox,
  BFormSelect,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { mapGetters } from "vuex";

export default {
  name: 'DetailsViewReserva',
  components: {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BForm,
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
    BFormSelect,
    vSelect,
  },
  data() {
    return {
      nameProfile: '',
      inhabilitar: true,
      gender: [
        {
          text: "Female",
          value: "Female",
        },
        {
          text: "Male",
          value: "Male",
        },
        {
          text: "Wish not to disclose",
          value: "Wish not to disclose",
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      dataProvider: 'Users/usersData'
    }),
  },
  methods: {
    ProfileName(name) {
      if (this.dataProvider.self_pay.profile_picture === null) {
        return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
      } else {
        return this.dataProvider.self_pay.profile_picture;
      }
    },
    saveChanges() {
      this.formSubmitted()
    },
    formSubmitted() {
      this.$http.post(`admin/panel/selfpay/${this.dataProvider.self_pay.client_id}/modify`, this.dataProvider.self_pay)
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

    // sendCode() {
    //   this.$swal({
    //     title: 'Please, wait...',
    //     didOpen: () => {
    //       this.$swal.showLoading()
    //     },
    //     customClass: {
    //       confirmButton: 'btn btn-primary',
    //     },
    //     buttonsStyling: false,
    //   })
    //   this.$http.post(`ca/panel/reservationCode/generate?user_id=${this.dataProvider.id}`)
    //       .then((response) => {
    //         this.$swal({
    //           title: 'Reservation code sent successfully',
    //           subtitle: response.data,
    //           icon: 'success',
    //           customClass: {
    //             confirmButton: 'btn btn-primary',
    //           },
    //           buttonsStyling: false,
    //         })
    //       })
    //       .catch((error) => {
    //         this.$swal({
    //           title: error.message,
    //           icon: 'error',
    //           customClass: {
    //             confirmButton: 'btn btn-primary',
    //           },
    //           buttonsStyling: false,
    //         })
    //       })
    // }
  }

}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.text-name-driver {
  font-size: 1.5rem;
  margin-bottom: 0 !important;
}

.backgroundProfile-driver {
  background-color: $primary;
}

.btn-primary {
  background: #7367f0 !important;
}
</style>