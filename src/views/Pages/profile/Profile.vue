<template>
  <div id="user-profile">
    <component :is="listClients === undefined ? 'b-card' : 'b-card'">

      <b-tabs pills>

        <!-- Tab: Account -->
        <b-tab active>
          <template #title>
            <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Account</span>
          </template>
          <user-edit-tab-account :userData="userInfo" class="mt-2 pt-75" />
        </b-tab>

        <!-- Tab: Information -->
        <b-tab  v-if="userInfo.role.id === 3">
          <template #title>
            <feather-icon icon="InfoIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Information</span>
          </template>
          <user-edit-tab-information class="mt-2 pt-75" />
        </b-tab>

        <!-- Tab: Change password -->
        <b-tab>
          <template #title>
            <feather-icon icon="KeyIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Change Password</span>
          </template>
          <user-edit-tab-password :userData="userInfo" class="mt-2 pt-75" />
        </b-tab>

        <!-- Tab: Social -->
        <b-tab v-if="userInfo.role.id === 3">
          <template #title>
            <feather-icon icon="CreditCardIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Payment method</span>
          </template>
          <user-edit-tab-social  :corporateAccountId="corporateAccountId" class="mt-2 pt-75" />
        </b-tab>

      </b-tabs>
    </component>

  </div>
</template>

<script>
import { BRow, BCol, BCard, BImg, BButton, BFormGroup, BFormInput, BTabs, BTab, BCardText, BAlert, } from 'bootstrap-vue'
import UserEditTabAccount from "@core/components/user/UserEditTabAccount";
import UserEditTabInformation from "@core/components/user/UserEditTabInformation";
import UserEditTabPassword from "@core/components/user/UserEditTabPassword";
import UserEditTabSocial from "@core/components/user/UserEditTabSocial";
import { mapGetters } from "vuex";

/* eslint-disable global-require */
export default {
  components: {
    BRow,
    BCol,
    BCard,
    BImg,
    BButton,
    BFormGroup,
    BFormInput,
    BTabs,
    BTab,
    BCardText,
    BAlert,

    //componente
    UserEditTabAccount,
    UserEditTabInformation,
    UserEditTabSocial,
    UserEditTabPassword
  },
  data() {
    return {
      userInfo: {},
      listClients: [],
    }
  },
  created() {

  },
  methods: {
    getInformationCorporate() {
      this.$store.commit('Users/usersData', '')
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },
      })
      this.idCA = this.$store.getters["Users/userData"].user.corporate_account.id

      this.$http.get(`admin/panel/ca/${this.idCA}/info`).then((response) => {
        this.listClients = response.data.data;
        this.$store.commit('Users/usersData', this.listClients)
        this.$swal.close();
      }).catch((res) => {
        this.$swal.close();
        console.log(res.data)
      })
    },
    getVerifyInfoCard() {
      if (this.$store.getters['Users/userData'].user.role.id === 1 || this.$store.getters['Users/userData'].user.role.id === 2) {
        this.$http.get(`admin/panel/ca/${this.$route.params.id}/paymentMethod`)
          .then((response) => {
            if (response.status !== 200) {
              this.infoPago = {}
              console.log(this.infoPago)
            } else {
              this.infoPago = response.data.data;
            }

          })
      }
    },
  },
  mounted() {
  },
  beforeMount() {
    this.userInfo = this.$store.getters['Users/userData'].user

    if(this.userInfo.corporate_account)
    {
      this.getInformationCorporate();
      this.corporateAccountId = this.userInfo.corporate_account.id
    }
  },
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-profile.scss';

.name-corporative {
  margin-left: 15px;
  font-weight: bold;
  font-size: 1.1rem;
}

.rol-persona {
  margin-left: 15px;
  font-size: 0.9rem;
}
</style>