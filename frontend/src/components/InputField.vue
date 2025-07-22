<script setup lang="ts">
const message = ''
</script>

<template>
  Markdown Content:
  <textarea v-model="message" placeholder="add markdown here">This is</textarea>
</template>

<style scoped>
/**/
textarea {
  width: 100%;
  height: 91%;
  resize: none;
}
</style>
