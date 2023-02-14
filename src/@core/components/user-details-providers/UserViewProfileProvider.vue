<template>
  <div>
    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
            ref="previewEl"
            src="@/assets/images/avatars/13-small.png"
            size="90px"
            rounded
        />
      </template>
      <h4 class="">
        {{ dataProvider.amera_user.name }} ( <span style="font-size: 0.9rem">
        {{ dataProvider.amera_user.email }}
      </span>)
      </h4>

      <div class="d-flex flex-wrap">
        <b-button
            :variant="inhabilitar === true ? 'primary' : 'outline-secondary'"
            @click="inhabilitar = false"
        >
          <span class="d-none d-sm-inline">Update</span>
          <feather-icon
              icon="EditIcon"
              class="d-inline d-sm-none"
          />
        </b-button>
        <b-button
            v-if="dataProvider.amera_user.role.id === 3 && inhabilitar ===  false"
            :variant="inhabilitar === true ? 'primary' : 'primary' "
            class="ml-1"
        >
          <span class="d-none d-sm-inline">Saved</span>
          <feather-icon
              icon="TrashIcon"
              class="d-inline d-sm-none"
          />
        </b-button>
        <b-button
            :variant="inhabilitar === true ? 'primary' : 'primary' "
            class="ml-1"
            @click="aprobarCA"
        >
          <span class="d-none d-sm-inline">Approve</span>
          <feather-icon
              icon="TrashIcon"
              class="d-inline d-sm-none"
          />
        </b-button>
      </div>
    </b-media>

    <!-- form Admin -->
    <b-form>
      <b-row>
        <!-- Field: Username -->
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Name"

          >
            <b-form-input
                disabled
                v-model="dataProvider.amera_user.name"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Full Name -->
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Email"
          >
            <b-form-input
                :disabled="inhabilitar === true"
                v-model="dataProvider.amera_user.email"
            />
          </b-form-group>
        </b-col>

        <!-- Field: role -->
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Role"
          >
            <template v-if="inhabilitar === true">
              <b-form-input
                  v-model="dataProvider.amera_user.role.role"
                  :disabled="inhabilitar === true"
              />
            </template>

            <template v-if="inhabilitar === false">
              <b-form-select
                  :disabled="inhabilitar === true"
                  v-model="changeStatus.userId"
                  :options="option" label="Role"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              >
              </b-form-select>
              <!--              <v-select-->
              <!--                  :disabled="inhabilitar === true"-->
              <!--                  :options="option"-->
              <!--                  v-model="roleid"-->
              <!--                  label="Role"-->
              <!--                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"-->
              <!--              />-->
            </template>

          </b-form-group>
        </b-col>
      </b-row>
    </b-form>

    <!-- form corporate -->
    <b-form>
      <b-row>
        <!-- Field: Username -->
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Company Legal Name"

          >
            <b-form-input
                v-model="dataProvider.company_legal_name"
                disabled

            />
          </b-form-group>
        </b-col>

        <!-- Field: Full Name -->
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="DBA"
          >
            <b-form-input
                disabled
                v-model="dataProvider.dba"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Company Type"
          >
            <b-form-input
                v-model="dataProvider.company_type"
                disabled
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="TIN"
          >
            <b-form-input
                disabled
                v-model="dataProvider.tin"
            />
          </b-form-group>
        </b-col>

      </b-row>
      <b-row>
        <!-- Field: Username -->
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Nature of Business"

          >
            <b-form-input
                disabled
                v-model="dataProvider.nature_of_business"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Full Name -->
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Contract start Date"
          >
            <b-form-input
                disabled
                v-model="dataProvider.contract_start_date"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Office Location Address"
          >
            <b-form-input
                disabled
                v-model="dataProvider.office_location_address"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Billing Address"
          >
            <b-form-input
                disabled
                v-model="dataProvider.billing_address"
            />
          </b-form-group>
        </b-col>

      </b-row>
    </b-form>


    <!-- Action Buttons -->
    <!--        <b-button-->
    <!--            variant="primary"-->
    <!--            class="mb-1 mb-sm-0 mr-0 mr-sm-1"-->
    <!--            :block="$store.getters['app/currentBreakPoint'] === 'xs'"-->
    <!--        >-->
    <!--          Save Changes-->
    <!--        </b-button>-->
    <!--        <b-button-->
    <!--            variant="outline-secondary"-->
    <!--            type="reset"-->
    <!--            :block="$store.getters['app/currentBreakPoint'] === 'xs'"-->
    <!--        >-->
    <!--          Reset-->
    <!--        </b-button>-->
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
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
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
    BFormSelect,
    vSelect,
  },
  props: {
    dataProvider: {},
  },
  data() {
    return {
      inhabilitar: true,
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
  methods: {
    aprobarCA() {
     this.changeStatus.userId = this.dataProvider.amera_user.id;
      this.$http.post('admin/panel/users/change-user-status', this.changeStatus)
          .then((response) => {
            this.$swal({
              title: response.data.message,
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          })
          .catch((error) => {
            this.$swal({
              title: error.response.data.data,
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          })
    }
  },
  mounted() {
    console.log(this.dataProvider)
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
