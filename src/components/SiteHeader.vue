<script setup lang="ts">
import SiteSettings from './SiteSettings.vue'
import UpDownLoad from './UpDownLoad.vue'
</script>

<template>
  <header class="header">
    <div class="container-div" id="split">
      <div>
        <SiteSettings />
      </div>
      <div>
        <UpDownLoad />
      </div>
    </div>
  </header>
</template>

<style scoped>
/*  */
#split {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
