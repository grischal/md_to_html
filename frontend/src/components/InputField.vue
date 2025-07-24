<script setup lang="ts">
import { watch } from 'vue'
import { siteStatusStore } from '@/stores/siteStatus'
import { storeToRefs } from 'pinia'

const store = siteStatusStore()
const { markdown } = storeToRefs(store)
</script>

<template>
  <div class="container-div">
    Markdown Content:
    <textarea v-model.lazy="markdown" placeholder="add markdown here" name="markdownInput" />
  </div>
</template>

<style scoped>
/**/
textarea {
  width: 100%;
  height: 91%;
  resize: none;
  overflow: scroll;
}
</style>
