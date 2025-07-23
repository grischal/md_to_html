<script setup lang="ts">
// import { ref } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import InputField from './components/InputField.vue'
import RenderField from './components/RenderField.vue'
</script>

<template>
  <SiteHeader statusProp="siteStatus" />
  <div class="input-render">
    <InputField class="column" />
    <RenderField class="column" />
  </div>
  <SiteFooter />
</template>

<style scoped>
.input-render {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  min-height: 40em;
}
</style>
