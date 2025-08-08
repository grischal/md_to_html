<script setup lang="ts">
import { siteStatusStore } from '@/stores/siteStatus'
import { storeToRefs } from 'pinia'

const { markdown, fontSize, fontFamily, fontColor, lineHeight, letterSpacing, backgroundColor } =
  storeToRefs(siteStatusStore())
</script>

<template>
  <div class="container-div">
    Markdown Content:
    <textarea
      v-model="markdown"
      placeholder="Add Markdown Here"
      name="markdownInput"
      class="inline-css"
    />
  </div>
</template>

<style scoped>
/**/
.inline-css {
  font-size: v-bind(fontSize);
  font-family: v-bind(fontFamily);
  color: v-bind(fontColor);
  line-height: v-bind(lineHeight);
  letter-spacing: v-bind(letterSpacing);
  background-color: v-bind(backgroundColor);
}
</style>
