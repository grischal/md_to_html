<script setup lang="ts">
//
</script>

<template>
  <div class="container-div">
    Render HTML
    <input type="checkbox" v-model="render" />
    <div>
      <div v-if="render" v-html="rawHTML"></div>
      <div v-else="render">
        {{ rawHTML }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/**/
.container-div {
  overflow: scroll;
}
</style>
