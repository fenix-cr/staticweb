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
          <user-profile-client-corporate-acount class="mt-2 pt-75" />
        </b-tab>

        <!-- Tab: Information -->
        <b-tab>
          <template #title>
            <feather-icon icon="InfoIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Information</span>
          </template>
          <user-edit-tab-information class="mt-2 pt-75" />
        </b-tab>

        <!-- Tab: Social -->
        <b-tab v-if="this.$hasPermission('client-sensitive-information')">
          <template #title>
            <feather-icon icon="CreditCardIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Payment method</span>
          </template>
          <user-edit-tab-social :corporateAccountId="corporateAccountId" class="mt-2 pt-75" />
        </b-tab>

        <!-- Tab: Pacientes de la clínica -->
        <b-tab>
          <template #title>
            <feather-icon icon="UsersIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Patients</span>
          </template>
          <list-patient-c-a :info-payment="listClients" class="mt-2 pt-75" />
        </b-tab>

        <!-- documents -->
        <b-tab>
          <template #title>
            <feather-icon icon="FolderIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Document</span>
          </template>
          <user-document class="mt-2 pt-75" />

        </b-tab>

        <b-tab @click="openCAfees" v-if="this.$hasPermission('modifying-rates')">
          <template #title>
            <feather-icon icon="FolderIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Corporate account prices</span>
          </template>
        </b-tab>

        <b-tab v-if="this.$hasPermission('can-create-update-notes')">
          <template #title>
            <feather-icon icon="FolderIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Notes</span>
          </template>
          <user-notes class="mt-2 pt-75" />
        </b-tab>
      </b-tabs>
    </component>

  </div>
</template>

<script>
import { BRow, BCol, BCard, BImg, BButton, BFormGroup, BFormInput, BTabs, BTab, BCardText, BAlert, } from 'bootstrap-vue'
import UserProfileClientCorporateAcount from '@core/components/CA/UserProfileClientCorporateAcount'
import UserEditTabInformation from "@core/components/user/UserEditTabInformation";
import UserEditTabSocial from "@core/components/user/UserEditTabSocial";
import UserNotes from "@core/components/user/UserNotes";
import UserDocument from "@core/components/user/UserDocument";
import ListPatientCA from '@core/components/CA/ListPatientCA'
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
    UserProfileClientCorporateAcount,
    UserEditTabInformation,
    UserEditTabSocial,
    ListPatientCA,
    UserDocument,
    UserNotes
  },
  name: 'DetailsClientsCorporateAccount',
  data() {
    return {
      infomation: '',
      idCA: null,
      listClients: [],
      infoPago: {},
      corporateAccountId: 0,
    }
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
      this.idCA = parseInt(this.$route.params.id);
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
    refresh(aprobado) {
      if (aprobado === true) {
        this.$http.get(`admin/panel/ca/${this.idCA}/info`).then((response) => {
          this.listClients = response.data.data;
          this.$store.commit('Users/usersData', this.listClients)
          this.$swal.close();
        }).catch((res) => {
          this.$swal.close();
          console.log(res.data)
        })
      }

    },
    openCAfees() {
      this.$router.push({ name: `all-prices-corporate-account`, params: { ca_id: this.idCA } })
    },
  },
  mounted() {
    this.getInformationCorporate();
    this.getVerifyInfoCard();
  },
  beforeMount() {
    this.corporateAccountId = window.location.pathname.split('/').pop()
  },
  created() {
  }
  ,
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
</style>
