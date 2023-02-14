<template>
<list-approve-driver></list-approve-driver>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BListGroup, BListGroupItem,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import ListApproveDriver from '@core/layouts/components/admin-components/ListApproveDriver'

import UserListAddNew from '@core/components/infoClients/UserListAddNew'

export default {
  components: {
    UserListAddNew,
    ListApproveDriver,
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
  name: 'Providers',
  data() {
    return {
    }
  },

}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
.urlPagina {
  text-decoration: none;
}

.urlPagina::before {
  background-color: currentColor !important;
  bottom: 0;
  content: "";
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.box {
  box-shadow: 0 14px 20px 0 rgba(143, 143, 143, 0.2) !important;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
