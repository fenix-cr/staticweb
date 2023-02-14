<template>
  <div
      id="user-profile"
  >

    <component :is=" 'b-card'">
      <b-tabs
          pills
      >

        <!-- Tab: Account -->
        <b-tab active>
          <template #title>
            <feather-icon
                icon="UserIcon"
                size="16"
                class="mr-0 mr-sm-50"
            />
            <span class="d-none d-sm-inline">Account</span>
          </template>
          <user-view-profile-provider
              :data-provider="infoUserProviders"
              class="mt-2 pt-75"
          />
        </b-tab>

        <!-- Tab: Information -->
        <b-tab >
          <template #title>
            <feather-icon
                icon="InfoIcon"
                size="16"
                class="mr-0 mr-sm-50"
            />
            <span class="d-none d-sm-inline">Information</span>
          </template>
          <user-edit-tab-information
              :info-user="infoUserProviders"
              class="mt-2 pt-75"/>
        </b-tab>

        <!-- Tab: Social -->
        <b-tab>
          <template #title>
            <feather-icon
                icon="CreditCardIcon"
                size="16"
                class="mr-0 mr-sm-50"
            />
            <span class="d-none d-sm-inline">Payment method</span>
          </template>
          <user-edit-tab-social class="mt-2 pt-75"/>
        </b-tab>
      </b-tabs>
    </component>

  </div>
</template>

<script>
import {BRow, BCol, BCard, BImg, BButton, BFormGroup, BFormInput, BTabs, BTab, BCardText, BAlert,} from 'bootstrap-vue'
import UserEditTabAccount from "@core/components/user/UserEditTabAccount";
import UserEditTabInformation from "@core/components/user/UserEditTabInformation";
import UserEditTabSocial from "@core/components/user/UserEditTabSocial";
import UserViewProfileProvider from '@core/components/user-details-providers/UserViewProfileProvider'

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
    UserViewProfileProvider,
    UserEditTabAccount,
    UserEditTabInformation,
    UserEditTabSocial,
  },

  data() {
    return {
      info: {},
      infoUserProviders: {},

      roleid: '',
    }
  },
  methods: {
    getProviders() {
      this.infoUserProviders = this.$route.params.item
      console.log(this.infoUserProviders)
    }
  },
  mounted() {
    this.getProviders()
    // console.log(this.info)
  }
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
