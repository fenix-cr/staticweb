<template>
  <div id="user-profile">
    <component :is="info === undefined ? 'b-card' : 'b-card'">

      <!--       Alert: No item found-->
      <!--            <b-alert-->
      <!--                variant="danger"-->
      <!--                :show="info === undefined"-->
      <!--            >-->
      <!--              <h4 class="alert-heading">-->
      <!--                Error fetching user data-->
      <!--              </h4>-->
      <!--            </b-alert>-->

      <b-tabs pills>

        <!-- Tab: Account -->
        <b-tab active>
          <template #title>
            <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Account</span>
          </template>
          <user-profle-patient :user-data="info" class="mt-2 pt-75" />
        </b-tab>
      </b-tabs>
    </component>

  </div>
</template>

<script>
import { BRow, BCol, BCard, BImg, BButton, BFormGroup, BFormInput, BTabs, BTab, BCardText, BAlert, } from 'bootstrap-vue'
import UserProflePatient from '@core/components/user-details-patient/UserProflePatient'
import UserEditTabInformation from "@core/components/user/UserEditTabInformation";
import UserEditTabSocial from "@core/components/user/UserEditTabSocial";
import UserViewProfileProvider from '@core/components/user-details-providers/UserViewProfileProvider'

/* eslint-disable global-require */
export default {
  components: {
    UserViewProfileProvider,
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
    UserProflePatient,
    UserEditTabInformation,
    UserEditTabSocial,
  },
  name: 'ProfilePatient',
  data() {
    return {
      info: {},
    }
  },
  mounted() {
    this.info = this.$route.params.item;
    if (this.info === undefined) {
      this.$router.push({ name: 'all-patient' })
    }
    console.log(this.info)
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