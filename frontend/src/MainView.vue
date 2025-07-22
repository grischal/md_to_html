<script setup lang="ts">
// import { ref } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import InputField from './components/InputField.vue'
import RenderField from './components/RenderField.vue'
</script>

<template>
  <SiteHeader />
  <div class="input-render">
    <div class="column">
      <InputField />
    </div>
    <div class="column">
      <RenderField />
    </div>
  </div>
</template>

<style scoped>
.input-render {
  display: flex;
  flex-direction: row;
  min-height: 40em;
}
.column {
  border-radius: 15px;
  background-color: var(--container-background);
  margin: 10px;
  padding: 15px 45px;
  width: 50%;
  flex: 1;
}
</style>
