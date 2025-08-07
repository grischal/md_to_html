<script setup lang="ts">
import { ref, watch } from 'vue'
import { siteStatusStore } from '@/stores/siteStatus'
import { markdownToHtml } from '@/composables/PandocCall'
import { storeToRefs } from 'pinia'

const store = siteStatusStore()
const {
  markdown,
  renderAllowed,
  fontSize,
  fontFamily,
  fontColor,
  lineHeight,
  letterSpacing,
  backgroundColor,
} = storeToRefs(store)

const render = ref(true)
const isFetching = ref(false)

const rawHTML = ref('')
const oldHTML = ref('')

watch(
  [markdown, fontSize, fontFamily, fontColor, lineHeight, letterSpacing, backgroundColor],
  async () => {
    oldHTML.value = rawHTML.value
    isFetching.value = true
    rawHTML.value = await markdownToHtml()
    isFetching.value = false
  },
)
</script>

<template>
  <div class="container-div">
    Render HTML
    <input type="checkbox" v-model="render" name="RenderHTML" />
    <span v-if="!renderAllowed" style="font-style: italic">
      Rendering not supported by browser</span
    >

    <div class="inline-css">
      <div v-if="renderAllowed && render">
        <div v-if="isFetching" v-html="oldHTML" />
        <div v-else v-html="rawHTML" placeholder="HTML Renders Here" />
      </div>
      <div v-else>
        <div v-if="isFetching">
          {{ oldHTML }}
        </div>
        <div v-else>
          {{ rawHTML }}
        </div>
      </div>
    </div>
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
  width: 100%;
  height: 91%;
  resize: none;
  overflow-y: scroll;
  padding-left: 15px;
}
</style>
