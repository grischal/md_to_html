<script setup lang="ts">
import { ref, watch } from 'vue'
import { siteStatusStore } from '@/stores/siteStatus'
import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'

const store = siteStatusStore()
const { fontSize, fontFamily, fontColor, lineHeight, letterSpacing, backgroundColor } =
  storeToRefs(store)

const oldAP = localStorage.getItem('cssAffectPage')
window.addEventListener('DOMContentLoaded', () => {
  // This enables the user settings to be loaded to the page
  // even if they usually have the cssAffectPage checkbox off
  if (oldAP !== null) {
    cssAffectPage.value = oldAP === 'true'
  }
})

const cssAffectPage = ref(false)
watch(cssAffectPage, (newCSSAffectPage) => {
  localStorage.setItem('cssAffectPage', String(newCSSAffectPage))
})

// INFO: fontSize logic
const getStoredFontSizes = () => {
  let storedFontSizes = localStorage.getItem('fontSizes')
  try {
    return storedFontSizes
      ? (JSON.parse(storedFontSizes) as { name: string; value: string }[])
      : null
  } catch {
    return null
  }
}
const storedFontSizes = getStoredFontSizes()
const fontSizes: Ref<{ name: string; value: string }[]> = ref(
  storedFontSizes || [
    { name: '8', value: '8pt' },
    { name: '9', value: '9pt' },
    { name: '10', value: '10pt' },
    { name: '11', value: '11pt' },
    { name: '12', value: '12pt' },
    { name: '14', value: '14pt' },
    { name: '18', value: '18pt' },
    { name: '24', value: '24pt' },
    { name: '30', value: '30pt' },
    { name: '36', value: '36pt' },
    { name: '48', value: '48pt' },
    { name: '60', value: '60pt' },
    { name: '72', value: '72pt' },
    { name: '96', value: '96pt' },
    { name: 'Custom', value: 'Custom' },
  ],
)
watch(
  fontSize,
  (newFontSize, oldFontSize) => {
    if (newFontSize !== oldFontSize) {
      console.log(fontSize)
      localStorage.setItem('fontSize', newFontSize)
      if (newFontSize !== 'Custom' && cssAffectPage.value == true) {
        document.documentElement.style.setProperty('--user-font-size', newFontSize)
      }
      if (!fontSizes.value.some((size) => size.value === newFontSize)) {
        fontSizes.value.push({ name: newFontSize, value: `${newFontSize}pt` })
        localStorage.setItem('fontSizes', JSON.stringify(fontSizes.value))
      }
    }
  },
  { immediate: true },
)

const availableFonts = ref([
  {
    name: 'Lexend',
    url: 'https://fonts.googleapis.com/css2?family=Lexend:wght@400;700&display=swap',
  },
  {
    name: 'Times New Roman',
    url: 'https://fonts.googleapis.com/css2?family=Times+New+Roman:wght@400;700&display=swap',
  },
  {
    name: 'Comic Sans MS',
    url: 'https://fonts.googleapis.com/css2?family=Comic+Sans+MS:wght@400;700&display=swap',
  },
])
// const fontFamily = ref(localStorage.getItem('fontFamily') || 'Lexend')
watch(
  fontFamily,
  (newFontFamily, oldFontFamily) => {
    if (newFontFamily !== oldFontFamily) {
      if (cssAffectPage.value === true) {
        document.documentElement.style.setProperty('--user-font-family', newFontFamily)
      }
      localStorage.setItem('fontFamily', newFontFamily)
    }
  },
  { immediate: true },
)

// const fontColor = ref(localStorage.getItem('fontColor') || '#000000')
const fontColors = ref([
  { name: 'Black', value: '#000000' },
  { name: 'Grey', value: '#808080' },
  { name: 'Light Grey', value: '#c5c0b9' },
  { name: 'White', value: '#FFFFFF' },
])
watch(
  fontColor,
  (newFontColor, oldFontColor) => {
    if (newFontColor != oldFontColor) {
      if (cssAffectPage.value) {
        document.documentElement.style.setProperty('--color-text', newFontColor)
      }
      localStorage.setItem('fontColor', newFontColor)
    }
  },
  { immediate: true },
)

// const lineHeight = ref(localStorage.getItem('lineHeight') || '2')
const lineHeights = ref(['1', '1.5', '2', '2.5', '3'])
watch(
  lineHeight,
  (newLineHeight, oldLineHeight) => {
    if (newLineHeight != oldLineHeight) {
      if (cssAffectPage.value) {
        document.documentElement.style.setProperty('--user-line-height', newLineHeight)
      }
      localStorage.setItem('lineHeight', newLineHeight)
    }
  },
  { immediate: true },
)

// const letterSpacing = ref(localStorage.getItem('letterSpacing') || '0.1')
const letterSpacings = ref([
  { name: '0.1', value: '0.1rem' },
  { name: '0.2', value: '0.2rem' },
  { name: '0.3', value: '0.3rem' },
  { name: '0.4', value: '0.4rem' },
  { name: '0.5', value: '0.5rem' },
  { name: '0.6', value: '0.6rem' },
  { name: '0.7', value: '0.7rem' },
  { name: '0.8', value: '0.8rem' },
  { name: '0.9', value: '0.9rem' },
  { name: '1', value: '1rem' },
  { name: '1.5', value: '1.5rem' },
  { name: '2', value: '2rem' },
  { name: '2.5', value: '2.5rem' },
  { name: '3', value: '3rem' },
])
watch(
  letterSpacing,
  (newLetterSpacing, oldLetterSpacing) => {
    if (newLetterSpacing != oldLetterSpacing) {
      if (cssAffectPage.value) {
        document.documentElement.style.setProperty('--user-letter-spacing', newLetterSpacing)
      }
      localStorage.setItem('letterSpacing', newLetterSpacing)
    }
  },
  { immediate: true },
)

// const backgroundColor = ref(localStorage.getItem('backgroundColor') || '#FFE5B4')
const backgroundColors = ref([
  { name: 'Peach', value: '#FFE5B4' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Beige', value: '#FFFDD0' },
  { name: 'Dark Grey', value: '#26292a' },
])
watch(
  backgroundColor,
  (newBackgroundColor, oldBackgroundColor) => {
    if (newBackgroundColor != oldBackgroundColor) {
      if (cssAffectPage.value) {
        document.documentElement.style.setProperty('--color-background', newBackgroundColor)
      }
      localStorage.setItem('backgroundColor', newBackgroundColor)
    }
  },
  { immediate: true },
)

const containerColor = ref(localStorage.getItem('containerColor') || '#f5f5f5')
const containerColors = ref([
  { name: 'light-gray', value: '#f5f5f5' },
  { name: 'Dark Grey', value: '#26292a' },
])
watch(
  containerColor,
  (newContainerColor, oldContainerColor) => {
    if (newContainerColor != oldContainerColor) {
      document.documentElement.style.setProperty('--container-background', newContainerColor)
      localStorage.setItem('containerColor', newContainerColor)
    }
  },
  { immediate: true },
)
</script>

<template>
  <header class="header">
    <div class="container-div">
      <div>
        <h3>CSS styling for HTML output:</h3>
        <span>
          Affect current page?
          <input type="checkbox" v-model="cssAffectPage" />
        </span>
        <div>
          Font size:
          <select v-model="fontSize" class="dropdown">
            <option v-for="size in fontSizes" :value="size.value" :key="size.name">
              {{ size.name }}
            </option>
          </select>
          <span v-if="fontSize === 'Custom'">
            <input v-model.lazy="fontSize" style="width: 3rem" />
          </span>

          Font:
          <select v-model="fontFamily" class="dropdown">
            <option
              v-for="font in availableFonts"
              :key="font.name"
              :style="{ fontFamily: font.name }"
            >
              {{ font.name }}
            </option>
          </select>

          Font Color:
          <select v-model="fontColor" class="dropdown">
            <option v-for="color in fontColors" :value="color.value" :key="color.name">
              {{ color.name }}
            </option>
          </select>
        </div>
        <div>
          Line Height:
          <select v-model="lineHeight" class="dropdown">
            <option v-for="(height, idx) in lineHeights" :value="height" :key="idx">
              {{ height }}
            </option>
          </select>

          Letter Spacing:
          <select v-model="letterSpacing" class="dropdown">
            <option v-for="spacing in letterSpacings" :value="spacing.value" :key="spacing.name">
              {{ spacing.name }}
            </option>
          </select>
        </div>
        <div>
          Background Color:
          <select v-model="backgroundColor" class="dropdown">
            <option v-for="color in backgroundColors" :value="color.value" :key="color.name">
              {{ color.name }}
            </option>
          </select>
          Container Color (Site only):
          <select v-model="containerColor" class="dropdown">
            <option v-for="color in containerColors" :value="color.value" :key="color.name">
              {{ color.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/*  */
</style>
