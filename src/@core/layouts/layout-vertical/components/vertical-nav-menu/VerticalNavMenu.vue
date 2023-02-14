<template>
  <div
    class="main-menu menu-fixed menu-accordion menu-shadow"
    :class="[
      {
        expanded:
          !isVerticalMenuCollapsed ||
          (isVerticalMenuCollapsed && isMouseHovered),
      },
      skin === 'semi-dark' ? 'menu-dark' : 'menu-light',
    ]"
    @mouseenter="updateMouseHovered(true)"
    @click="updateMouseClicked(true)"
    @mouseleave="updateMouseHovered(false)"
  >
    <!-- main menu header-->
    <div class="navbar-header expanded" style="margin-bottom: 10px">
      <slot
        name="header"
        :toggleVerticalMenuActive="toggleVerticalMenuActive"
        :toggleCollapsed="toggleCollapsed"
        :collapseTogglerIcon="collapseTogglerIcon"
      >
        <ul class="nav navbar-nav flex-row">
          <!-- Logo & Text -->
          <li class="nav-item mr-auto">
            <b-link
              :to="
                ($store.getters['Users/userData'].user)?($store.getters['Users/userData'].user.role.id === 3
                  ? { name: 'home-corporate-account' }
                  : { name: 'home-admin' }):''
              "
              class="brand-logo"
            >
              <b-img
                src="@/assets/images/logo/amera-main.png"
                height="63"
              ></b-img>
            </b-link>
          </li>

          <!-- Toggler Button -->
          <li class="nav-item nav-toggle">
            <b-link class="nav-link modern-nav-toggle">
              <feather-icon
                icon="XIcon"
                size="20"
                class="d-block d-xl-none"
                @click="toggleVerticalMenuActive"
              />
              <feather-icon
                :icon="collapseTogglerIconFeather"
                size="20"
                class="d-none d-xl-block collapse-toggle-icon"
                @click="toggleCollapsed"
              />
            </b-link>
          </li>
        </ul>
      </slot>
    </div>
    <!-- / main menu header-->

    <!-- Shadow -->
    <div :class="{ 'd-block': shallShadowBottom }" class="shadow-bottom" />

    <!-- main menu content-->
    <vue-perfect-scrollbar
      :settings="perfectScrollbarSettings"
      class="main-menu-content scroll-area"
      tagname="ul"
      @ps-scroll-y="
        (evt) => {
          shallShadowBottom = evt.srcElement.scrollTop > 0;
        }
      "
    >
      <!-- CORPORATE ACCOUNT NAVIGATION -->
      <vertical-nav-menu-items
        v-if="(this.$store.getters['Users/userData'].user)?(this.$store.getters['Users/userData'].user.role.id === 3):''"
        :items="
          navMenuItemsSuper.filter(
            (value) => value.meta.role === ROLES.ROL_CORPORATE_ACCOUNT
          )
        "
        class="navigation navigation-main"
      />

      <!-- SUPER ADMIN NAVIGATION -->
      <vertical-nav-menu-items
        v-if="(this.$store.getters['Users/userData'].user)?(this.$store.getters['Users/userData'].user.role.id === 1):''"
        :items="getItemsRolSuperAdmin()"
        class="navigation navigation-main"
      />

      <vertical-nav-menu-items
        v-if="(this.$store.getters['Users/userData'].user)?( this.$store.getters['Users/userData'].user.role.id !== 1 &&
          this.$store.getters['Users/userData'].user.role.id !== 3):''
         
        "
        :items="getItemsByPermision()"
        class="navigation navigation-main"
      />

      <div
        style="position: absolute; top: 80%; margin-left: 16px"
        v-if="(this.$store.getters['Users/userData'].user)?(this.$store.getters['Users/userData'].user.role.id === 3):''"
      >
        <a href="https://www.amerasolutions.com/" target="_blank">
          <h5 style="color: white; font-size: 0.9rem; font-weight: lighter">
            Website:
            <span style="font-weight: 500">{{ infoContact.website }} </span>
          </h5>
        </a>

        <a href="mailto:amera@myamera.com" target="_blank">
          <h4 style="color: white; font-size: 0.9rem; font-weight: lighter">
            Email: <br />
            <span style="font-weight: 500"> {{ infoContact.email }} </span>
          </h4>
        </a>

        <a href="tel:8552637215" target="_blank">
          <h4 style="color: white; font-size: 0.9rem; font-weight: lighter">
            Phone number: <br />
            <span style="font-weight: 500">{{ infoContact.phone_number }}</span>
          </h4>
        </a>
      </div>
    </vue-perfect-scrollbar>
    <!-- /main menu content-->
  </div>
</template>

<script>
import navMenuItems from "@/navigation/vertical/index.js";
import navMenuItemsAdmin from "@/navigation/vertical/infocontact.js";
import navMenuItemsSuper from "@/navigation/vertical/infosuperadmin.js";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { BLink, BImg } from "bootstrap-vue";
import {
  provide,
  computed,
  ref,
  onBeforeMount,
  onMounted,
} from "@vue/composition-api";
import useAppConfig from "@core/app-config/useAppConfig";
import { $themeConfig } from "@themeConfig";
import VerticalNavMenuItems from "./components/vertical-nav-menu-items/VerticalNavMenuItems.vue";
import useVerticalNavMenu from "./useVerticalNavMenu";
import { useStore } from "vuex";
import axios from "axios";
import { ROLES } from "@/@core/utils/rolesNames.js";

export default {
  components: {
    VuePerfectScrollbar,
    VerticalNavMenuItems,
    BLink,
    BImg,
  },
  props: {
    isVerticalMenuActive: {
      type: Boolean,
      required: true,
    },
    toggleVerticalMenuActive: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      ROLES,
      itemsNavigationBar: [],
      listPermissions: [],
    };
  },
  methods: {
    getListPermissions() {
      let data = this.$store.getters["Users/userData"].user.role.permission;
      this.listPermissions = [];
      for (let i = 0; i < data.length; i++) {
        this.listPermissions.push(data[i].slug);
      }
    },
    getItemsRolSuperAdmin() {
      let itemsNavigationBar = navMenuItemsSuper.filter(
        (value) => value.meta.role === ROLES.ROL_SUPER_ADMIN
      );
      return itemsNavigationBar;
    },
    getItemsRolCorporateAccount() {
      let itemsNavigationBar = navMenuItemsSuper.filter(
        (value) => value.meta.role === ROLES.ROL_CORPORATE_ACCOUNT
      );
      return itemsNavigationBar;
    },
    getItemsByPermision() {
      let itemsNavigationBar = this.getFilterItems(this.listPermissions);
      return itemsNavigationBar;
    },
    getFilterItems(listCurrentPermission) {
      let itemsNavigationBar = [];
      let itemNavigationBarParent = [];
      let itemsNavigationBarChildrens = [];

      //loop throw navItems
      for (let i = 0; i < navMenuItemsSuper.length; i++) {
        //get the parent item nav
        itemNavigationBarParent = navMenuItemsSuper[i];

        try {
          //if has not childrens
          if (navMenuItemsSuper[i].children == null) {
            for (let y = 0; y < listCurrentPermission.length; y++) {
              let exist =
                navMenuItemsSuper[i].meta.permission ===
                listCurrentPermission[y];
              //if permission exists a to navigation bar
              if (exist) {
                itemsNavigationBar.push(itemNavigationBarParent);
              }
            }
          }
        } catch (err) {
          console.log(navMenuItemsSuper)
          console.log(err);
        }

        //if it has childrens
        if (navMenuItemsSuper[i].children) {
          let listChildrens = navMenuItemsSuper[i].children;

          //loop throw childrens
          for (let x = 0; x < listChildrens.length; x++) {
            try {
              //if it permision isn't have permission
              if (listChildrens[x].meta.permission) {
                //loop throw list permissions
                for (let w = 0; w < listCurrentPermission.length; w++) {
                  let exist = false;

                  if (listChildrens[x].meta.permission) {
                    exist =
                      listChildrens[x].meta.permission ===
                      listCurrentPermission[w];
                  }

                  //if permission exists a to childrens items
                  if (exist) {
                    itemsNavigationBarChildrens.push(listChildrens[x]);
                  }
                }
              }
            } catch (err) {
              console.log(listChildrens[x])
              console.log(err);
            }
          }
          //if there items in the childrens the add to parent then to nav bar
          if (itemsNavigationBarChildrens.length > 0) {
            itemNavigationBarParent.children = itemsNavigationBarChildrens;
            itemsNavigationBar.push(itemNavigationBarParent);
          }
        }

        itemNavigationBarParent = [];
        itemsNavigationBarChildrens = [];
      }
      return itemsNavigationBar;
    },
    permissionExistInChildren(listChildrens, currentPermission) {
      return listChildrens[x].meta.permission.filter(
        (x) => x == currentPermission
      ).length > 0
        ? true
        : false;
    },
  },
  beforeMount() {
    this.listPermissions = this.$getListPermissions();
  },
  setup(props) {
    const {
      isMouseHovered,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      updateMouseHovered,
      updateMouseClicked,
    } = useVerticalNavMenu(props);

    // const store = useStore();
    const { skin } = useAppConfig();

    // const filtroRoles = () => {
    //   if (store.role.id === 1){}
    //
    //     let v = this.navMenuItemsSuper.map( value => value.meta.permission === '2')
    //   console.log(v)
    // }

    // Shadow bottom is UI specific and can be removed by user => It's not in `useVerticalNavMenu`
    const shallShadowBottom = ref(false);

    provide("isMouseHovered", isMouseHovered);

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    };

    const collapseTogglerIconFeather = computed(() =>
      collapseTogglerIcon.value === "unpinned" ? "CircleIcon" : "DiscIcon"
    );

    // App Name
    const { appName, appLogoImage } = $themeConfig.app;

    // onMounted(() =>{
    //   let filt = this.navMenuItemsSuper.map(value => value.meta.permission === 1);
    //   console.log(filt)
    // })
    let infoContact = ref({});

    const getContactUs = () => {
      axios.get(`https://api.myamera.com/api/v1/contactUs`).then((response) => {
        infoContact.value = response.data.data;
      });
    };

    onMounted(() => getContactUs());

    return {
      navMenuItems,
      navMenuItemsAdmin,
      navMenuItemsSuper,
      perfectScrollbarSettings,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      isMouseHovered,
      updateMouseHovered,
      updateMouseClicked,
      collapseTogglerIconFeather,

      // Shadow Bottom
      shallShadowBottom,

      // Skin
      skin,

      // App Name
      appName,
      appLogoImage,

      infoContact,
    };
  },
};
</script>

<style lang="scss">
@import "~@core/scss/base/core/menu/menu-types/vertical-menu.scss";

.main-menu {
  background-color: #332b7b !important;
}

.main-menu.menu-light .navigation {
  background-color: #332b7b !important;
}

a.nav-link.modern-nav-toggle {
  color: white !important;
}

.main-menu.menu-light .navigation li a {
  color: white !important;
}

[dir] .main-menu.menu-light .navigation > li.open:not(.menu-item-closing) > a,
[dir] .main-menu.menu-light .navigation > li.sidebar-group-active > a {
  background: white;
  color: #6559d6 !important;
}
</style>
