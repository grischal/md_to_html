<script setup lang="ts">
import { ref, watch } from 'vue'
import { siteStatusStore } from '@/stores/siteStatus'
import { markdownToHtml } from '@/composables/ServerCall'
import { storeToRefs } from 'pinia'
import DOMPurify from 'dompurify'

const store = siteStatusStore()
const { markdown } = storeToRefs(store)

const render = ref(false)
let rawHTML = ''

watch(markdown, (newMarkdown, oldMarkdown) => {
  if (newMarkdown !== oldMarkdown) {
    rawHTML = DOMPurify.sanitize(markdownToHtml(newMarkdown))
  }
})
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
