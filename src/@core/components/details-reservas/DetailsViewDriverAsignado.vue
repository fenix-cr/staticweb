<template>
  <div v-if="dataProvider !== ''">
    <b-media class="mb-2" v-if="dataProvider.driver !== null">
      <template #aside>
        <b-avatar
          ref="previewEl"
          :src="ProfileName(dataProvider.driver.name)"
          size="90px"
          rounded
          class="backgroundProfile-driver"
        >
          <p
            class="text-name-driver"
            v-if="dataProvider.driver.profile_picture === null"
          >
            {{ ProfileName(dataProvider.driver.name) }}
          </p>
        </b-avatar>
      </template>
      <h4 class="">
        {{ dataProvider.driver.name }} (
        <span style="font-size: 0.9rem"> {{ dataProvider.driver.email }} </span
        >)
      </h4>
    </b-media>
    <h4
      class="pt-1 my-3 text-center"
      style="color: #ff0000"
      v-if="dataProvider.driver === null"
    >
      No driver assigned {{ enableControlAssingDriver }}
    </h4>
    <div class="pt-1 my-2 text-center" v-if="dataProvider.driver === null">
      <b-button
        v-if="
          enableControlAssingDriver == true &&
          ($store.getters['Users/userData'].user.role.id === 1 ||
            $store.getters['Users/userData'].user.role.id === 2)
        "
        variant="success"
        @click="openAssingDriver"
      >
        Assign driver
      </b-button>
    </div>

    <div class="pt-1 my-2 text-left" v-if="dataProvider.driver !== null">
      <b-button
        style=""
        v-if="
          enableControlAssingDriver &&
          ($store.getters['Users/userData'].user.role.id === 1 ||
            $store.getters['Users/userData'].user.role.id === 2)
        "
        variant="primary"
        @click="openAssingDriver"
      >
        Assign driver
      </b-button>
    </div>

    <!-- form Admin -->
    <b-form v-if="dataProvider.driver !== null">
      <b-row>
        <!-- Field: Username -->
        <b-col cols="12" md="3">
          <b-form-group label="Name">
            <b-form-input disabled v-model="dataProvider.driver.name" />
          </b-form-group>
        </b-col>

        <!-- Field: Full Name -->
        <b-col cols="12" md="3">
          <b-form-group label="Lastname">
            <b-form-input disabled v-model="dataProvider.driver.lastname" />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="3">
          <b-form-group label="Gender">
            <b-form-input disabled v-model="dataProvider.driver.gender" />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="3">
          <b-form-group label="Birthday">
            <b-form-input disabled v-model="dataProvider.driver.birthday" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>

    <!-- form corporate -->
    <b-form v-if="dataProvider.driver !== null">
      <b-row>
        <!-- Field: Username -->
        <b-col cols="12" md="3">
          <b-form-group label="Phone number">
            <b-form-input v-model="dataProvider.driver.phone_number" disabled />
          </b-form-group>
        </b-col>

        <!-- Field: Full Name -->
        <b-col cols="12" md="3">
          <b-form-group label="Email">
            <b-form-input disabled v-model="dataProvider.driver.email" />
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
} from "bootstrap-vue";
import vSelect from "vue-select";
import { mapGetters } from "vuex";

export default {
  name: "DetailsViewDriverAsignado",
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
      enableControlAssingDriver: true,
    };
  },
  computed: {
    ...mapGetters({
      dataProvider: "Users/usersData",
    }),
  },
  methods: {
    ProfileName(name) {
      if (this.dataProvider.driver.profile_picture === null) {
        return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
      } else {
        return this.dataProvider.driver.profile_picture;
      }
    },
    openAssingDriver() {
      this.$router.push({
        name: "details-assign-driver",
        params: { id: this.dataProvider.id, edit_booking: 1 },
      });
    },
    setAssingDriverStatus() {
      let status = this.dataProvider.status;
      if (status == 3 || status == 4) {
        this.enableControlAssingDriver = false;
      } else {
        this.enableControlAssingDriver = true;
      }
    },
    openEditRates(id) {
      this.$router.push({
        name: "details-driver-view",
        params: { id: this.dataProvider.driver.id },
      });
    },
  },
  mounted() {
    this.setAssingDriverStatus();
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";

.text-name-driver {
  font-size: 1.5rem;
  margin-bottom: 0 !important;
}

.backgroundProfile-driver {
  background-color: $primary;
}
</style>
