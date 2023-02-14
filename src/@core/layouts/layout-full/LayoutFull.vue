<template>
 <div :class="contentWidth === 'boxed' ? 'container p-0' : null">
 <!-- <div class="cantainer p-4">--> 
    <router-view />
  </div>
</template>

<script>
import useAppConfig from '@core/app-config/useAppConfig'

export default {
  setup() {
    const { contentWidth } = useAppConfig()
    return { contentWidth }
  },
}
</script>
