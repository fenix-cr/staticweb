<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div
      class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex"
    >
      <!--      <dark-Toggler class="d-none d-lg-block"/>-->
      <feather-icon
        icon="ArrowLeftCircleIcon"
        size="2x"
        class="mr-0 mr-sm-50"
        @click="returnWindows"
        style="color: #9186f2; cursor: pointer"
        tooltip="return"
      ></feather-icon>
    </div>
    <div
      v-if="($store.getters['Users/userData'].user)?($store.getters['Users/userData'].user.role.id == 1):''"
      class="
        bookmark-wrapper
        align-items-right
        flex-grow-1
        d-none d-lg-flex
        mr-2
      "
    >
        <div v-if="searchResults != ''" class="dropdown" id="dropDownSearch">
          <div
            id="dropDownSearchItems"
            class="dropdown-content"
            style="display: block; border: none; overflow: auto;"
            autocomplete="off"
          >
            <router-link
              v-for="(searchResult, index) in searchResults"
              :key="index"
              class="urlPagina"
              :to="{
                name: 'details-selfpaids',
                params: { client_id: searchResult.client_id },
              }"
            >
              <b-list-group-item
                class="urlPagina"
                :ripple="false"
                @click="hideDropDown()"
              >
                {{ searchResult.name }}&nbsp;{{
                  searchResult.lastname
                }}
                &nbsp;({{ searchResult.email }},&nbsp;{{
                  searchResult.phone_number
                }}) &nbsp;{{ lastService(searchResult.booking) }} &nbsp;{{
                  NextService(searchResult.booking)
                }}
              </b-list-group-item>
            </router-link>
            <!-- <a  v-for="searchResult in searchResults" :key="index" href="#about" >{{searchResult.name }}&nbsp;{{searchResult.lastname}} &nbsp;({{searchResult.email}})</a> -->
          </div>
        </div>
 

      <b-form-input
        @keyup="masterSearch('by_key_up')"
        type="text"
        v-model="searchingText"
        style="font-weight: bold"
        @keyup.enter="masterSearch()"
      />
    </div>
    <feather-icon
      v-if="($store.getters['Users/userData'].user)?($store.getters['Users/userData'].user.role.id == 1):''"
      icon="SearchIcon"
      @click="masterSearch()"
      size="2x"
      class="mr-1"
      style="color: #9186f2; cursor: pointer"
      tooltip="return"
    ></feather-icon>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ ($store.getters["Users/userData"].user)?($store.getters["Users/userData"].user.name):'' }}
            </p>
            <span class="user-status">
              {{ ($store.getters["Users/userData"].user)?($store.getters["Users/userData"].user.role.role):'' }}
            </span>
          </div>
          <b-avatar size="40px" rounded class="backgroundProfile-navbar">
            <p class="text-name-navbar">
              {{ ProfileName(($store.getters["Users/userData"].user)?($store.getters["Users/userData"].user.name):'') }}
            </p>
          </b-avatar>
        </template>

        <b-dropdown-item link-class="d-flex align-items-center">
          <router-link :to="{ name: 'profile' }" style="width: 100%">
            <feather-icon size="16" icon="UserIcon" class="mr-50" />
            <span>Profile</span>
          </router-link>
        </b-dropdown-item>

        <b-dropdown-divider />
        <b-dropdown-item link-class="d-flex align-items-center" @click="logOut">
          <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink,
  BNavbarNav,
  BNavItemDropdown,
  BDropdownItem,
  BDropdownDivider,
  BAvatar,
  BButton,
  BFormGroup,
  BFormInput,
  BListGroup,
  BListGroupItem,
} from "bootstrap-vue";
import DarkToggler from "@core/layouts/components/app-navbar/components/DarkToggler.vue";
import { email, required } from "@core/utils/validations/validations";
import vSelect from "vue-select";
export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    BButton,
    BFormGroup,
    BFormInput,
    // Navbar Components
    DarkToggler,
    vSelect,
    BListGroup,
    BListGroupItem,
  },
  data() {
    return {
      searchingText: "",
      searchResults: [],
      filteredSelpays: [],
    };
  },
  methods: {
    lastService(booking) {
      let currentDateLastService = null;
      if (Object.keys(booking).length > 0) {
        let LastService = "";
        booking.forEach((element) => {
          let bookingDate = new Date(element.booking_date);
          var todayDate = new Date();

          if (element.status != 0 && bookingDate < todayDate) {
            if (bookingDate > currentDateLastService) {
              currentDateLastService = bookingDate;
            }

            let LastServiceDate =
              currentDateLastService.getMonth() +
              1 +
              "/" +
              currentDateLastService.getDate() +
              "/" +
              currentDateLastService.getFullYear().toString().substr(-2);
            LastService = "Last Service: " + LastServiceDate + " ,";
          } else {
            LastService;
          }
        });
        return LastService;
      }
    },
    NextService(booking) {
      let NextService = "";
      let NextServiceDate = null;
      let currentDateNextService = null;

      
      if (Object.keys(booking).length > 0) {
        booking.forEach((element) => {
          if (element.status == 0) {
            var date1 = element.booking_date;
            var todayDate = new Date();
            var month = todayDate.getMonth() + 1;
            var date2 =
              todayDate.getFullYear() +
              "-" +
              month +
              "-" +
              todayDate.getDate() +
              " " +
              todayDate.getHours() +
              ":" +
              todayDate.getMinutes() +
              ":" +
              todayDate.getSeconds();

            // To calculate the time difference of two dates

            var dateBooking = new Date(date1);
            var dateToday = new Date(date2);

            var Difference_In_Time = dateBooking - dateToday;

            // To calculate the no. of days between two dates
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

            //if (Difference_In_Days >= 1) {
            if (dateBooking > dateToday) {
              let b = new Date(element.booking_date);

              //Get the next service date
              if (
                currentDateNextService > b ||
                currentDateNextService == null
              ) {
                currentDateNextService = b;
                
              }

              NextServiceDate =
                currentDateNextService.getMonth() +
                1 +
                "/" +
                currentDateNextService.getDate() +
                "/" +
                currentDateNextService.getFullYear().toString().substr(-2);

              NextService = "Next Service: " + NextServiceDate;
            } else {
              NextService;
            }
          }
        });
        return NextService;
      }
    },
    masterSearch($even_type) {
      this.clearSearch();
      this.getClients($even_type);
    },
    clearSearch() {
      this.currentDateLastService = null;
      this.searchResults = [];
    },
    hideDropDown() {
      var dropDownSearchItems = document.getElementById("dropDownSearchItems");
      if (dropDownSearchItems != null) {
        dropDownSearchItems.style = "display:none";
      }
    },
    searchFieldFunction() {
      var dropDownSearchItems = document.getElementById("dropDownSearchItems");
      if (dropDownSearchItems != null) {
        dropDownSearchItems.style = "display:block";
      }
    },
    getClients(event_type) {
      
      if (this.searchingText.trim().length > 0) {
        if(event_type != 'by_key_up'){
            this.$swal({
            title: "Please, wait...",
            didOpen: () => {
              this.$swal.showLoading();
            },
          });
        }
        

        this.$http
          .get(`admin/panel/mastersearch/list?search=${this.searchingText}`)
          .then((response) => {
            this.searchResults = response.data.data.reverse();
            this.$swal.close();
          })
          .catch((res) => {
            let message = getMessageError(error);
            this.$swal({
              title: message,
              icon: "error",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            });
          });
      }
    },
    ProfileName(name) {
      return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
    },
    logOut() {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.$store
        .dispatch("Users/destroyToken", "/auth/users/logout")
        .then(() => {
          this.$swal({
            icon: "success",
            title: "Logout successfully",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
          this.$router.push({ name: "login" });
        })
        .catch((error) => {
          this.$swal({
            icon: "error",
            title: error.response,
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
    returnWindows() {
      window.history.back();
    },
    setEventJavascript() {
      var body = document.getElementsByTagName("body")[0];
      let dropDownSearchItems = document.getElementById("dropDownSearchItems");

      body.addEventListener(
        "click",
        function () {
          dropDownSearchItems = document.getElementById("dropDownSearchItems");
          if (dropDownSearchItems != null) {
            dropDownSearchItems.style = "display:none";
          }
        },
        false
      );
    },
  },
  mounted() {
    this.setEventJavascript();

  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";

.text-name-navbar {
  font-size: 1.1rem;
  margin-bottom: 0 !important;
}

.backgroundProfile-navbar {
  background-color: $primary;
  border-radius: 100% !important;
}

.dropbtn {
  background-color: #04aa6d;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropbtn:hover,
.dropbtn:focus {
  background-color: #3e8e41;
}

#myInput {
  box-sizing: border-box;

  background-position: 14px 12px;
  background-repeat: no-repeat;
  font-size: 16px;
  padding: 14px 20px 12px 45px;
  border: none;
  border-bottom: 1px solid #ddd;
}

#myInput:focus {
  outline: 3px solid #ddd;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f6f6f6;
  min-width: 230px;
  overflow: auto;
  border: 1px solid #ddd;
  z-index: 1;
  margin-top: 41px;
  width: 732px;
}

.dropdown-content a div {
  color: black;
  padding: 10px 16px;
  text-decoration: none;
  display: block;
}

.dropdown a div:hover {
  background-color: #ddd;
}

.show {
  display: block;
}
</style>
