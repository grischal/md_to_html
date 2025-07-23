<script setup lang="ts">
const message = ''
</script>

<template>
  <div class="container-div">
    Markdown Content:
    <textarea v-model.lazy="message" placeholder="add markdown here">This is</textarea>
  </div>
</template>

<style scoped>
/**/
textarea {
  width: 100%;
  height: 91%;
  resize: none;
}
</style>
