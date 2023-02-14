<template>

  <div v-if="infoPayment !== ''">
    <!-- Table Container Card -->
    <b-card
        no-body
        class="mb-0"
    >

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col
              cols="12"
              md="6"
              class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Show</label>
            <v-select
                id="perPageSelect"
                v-model="perPage"
                :options="pageOptions"
                class="per-page-selector d-inline-block mx-50"
            />
            <label>entries</label>
          </b-col>

          <!-- Search -->
          <b-col
              cols="12"
              md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                  v-model="searchQuery"
                  class="d-inline-block mr-1"
                  placeholder="Search..."
              />
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
          ref="refUserListTable"
          class="position-relative"
          responsive
          primary-key="id"
          :items="infoPayment.booking"
          empty-text="No trips scheduled"
          show-empty
          :fields="fields"
          :filter="searchQuery"
          :perPage="perPage"
          id="my-table"
          :current-page="currentPage"
      >
        <!-- Column: Actions -->
        <template #cell(actions)="{ item }">
          <b-dropdown
              variant="link"
              no-caret
              :right="$store.state.appConfig.isRTL"
              transition="scale-transition"
              :offset-y="true"
          >
            <template #button-content>
              <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="align-middle text-body"
              />
            </template>
            <template style="padding: 0" v-slot:activator="{ on, attrs }">
              <b-btn color="primary" v-bind="attrs" v-on="on" icon ripple>
              </b-btn>
            </template>
            <b-list-group style="padding: 2px; margin-bottom: 2px" dense rounded>
              <router-link class="urlPagina"
                           :to="{ name: 'details-reservation', params: { id: item.id } }"
              >
                <b-list-group-item style="padding: 0" class="urlPagina" :ripple="false">
                  <b-list-group-item class="font-weight-bold"
                                     style="border: none; padding: 5px"
                  >
                    <feather-icon icon="FileTextIcon"/>
                    Details
                  </b-list-group-item
                  >
                </b-list-group-item>
              </router-link>
            </b-list-group>
            <b-list-group style="padding: 2px; margin-bottom: 2px" dense rounded>
              <router-link class="urlPagina"
                           :to="{ name: 'details-driver-view' }"
              >
                <b-list-group-item style="padding: 0" class="urlPagina" :ripple="false">
                  <b-list-group-item class="font-weight-bold"
                                     style="border: none; padding: 5px"
                  >
                    <feather-icon icon="TrashIcon"/>
                    Delete
                  </b-list-group-item
                  >
                </b-list-group-item>
              </router-link>
            </b-list-group>
          </b-dropdown>
        </template>

      </b-table>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
          <span class="text-muted">Showing {{ perPage }}  of {{
              infoPayment.booking.length
            }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
                :per-page="perPage"
                v-model="currentPage"
                :total-rows="rows"
                first-number
                last-number
                class="mb-0 mt-1 mt-sm-0"
                prev-class="prev-item"
                next-class="next-item"
                aria-controls="my-table"
            >
              <template #prev-text>
                <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>
  </div>
</template>


<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BListGroup, BListGroupItem,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import UserListAddNew from '@core/components/infoClients/UserListAddNew'
import {mapGetters} from "vuex";

export default {
  name: 'ReservasAsignadasAlDriver',
  components: {
    UserListAddNew,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BListGroup,
    BListGroupItem,
    vSelect,
  },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      totalUsers: 0,
      valortotal: 0,
      searchQuery: '',
      pageOptions: [3, 5, 10],
      fields: ['selfpay_id', 'booking_date', 'pickup_time', 'surgery_type', 'appoinment_datetime', 'city', 'actions'],
    }
  },
  methods: {
    getTravelDriver(){
      this.$http.get(`ca/${this.$route.params.id}/panel/client/search`).then((response) => {
        this.listClients = response.data.data;
      }).catch((res) => console.log(res.data))
    }
  },
  computed: {
    ...mapGetters({
      infoPayment: 'Users/usersData'
    }),
    rows() {
      return this.infoPayment.booking.length
    }
  },
}
</script>

<style scoped>

</style>
