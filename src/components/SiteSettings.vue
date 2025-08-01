<script setup lang="ts">
import { siteStatusStore } from '@/stores/siteStatus'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

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

const fontSizes = ref([
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
])

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

const fontColors = ref([
  { name: 'Black', value: '#000000' },
  { name: 'Grey', value: '#808080' },
  { name: 'Light Grey', value: '#c5c0b9' },
  { name: 'White', value: '#FFFFFF' },
])

const lineHeights = ref(['1', '1.5', '2', '2.5', '3'])

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

const backgroundColors = ref([
  { name: 'Peach', value: '#FFE5B4' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Beige', value: '#FFFDD0' },
  { name: 'Dark Grey', value: '#26292a' },
])

const containerColor = ref(localStorage.getItem('containerColor') || '#f5f5f5')
const containerColors = ref([
  { name: 'light-gray', value: '#f5f5f5' },
  { name: 'Dark Grey', value: '#26292a' },
])

const cssPropsAndLocalStorage = [
  ['--user-font-size', 'fontSize'],
  ['--user-font-family', 'fontFamily'],
  ['--color-text', 'fontColor'],
  ['--user-line-height', 'lineHeight'],
  ['--user-letter-spacing', 'letterSpacing'],
  ['--color-background', 'backgroundColor'],
]
watch(
  [fontSize, fontFamily, fontColor, lineHeight, letterSpacing, backgroundColor],
  (newValues, oldValues) => {
    if (oldValues) {
      for (let i = 0; i < newValues.length; i++) {
        if (oldValues[i] !== newValues[i]) {
          if (cssAffectPage.value === true) {
            document.documentElement.style.setProperty(cssPropsAndLocalStorage[i][0], newValues[i])
          }
          localStorage.setItem(cssPropsAndLocalStorage[i][1], newValues[i])
        }
      }
    }
  },
)

watch(containerColor, (newContainerColor, oldContainerColor) => {
  if (newContainerColor !== oldContainerColor) {
    document.documentElement.style.setProperty('--container-background', newContainerColor)
  }
})
</script>

<template>
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

    Font:
    <select v-model="fontFamily" class="dropdown">
      <option v-for="font in availableFonts" :key="font.name" :style="{ fontFamily: font.name }">
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
</template>

<style scoped>
/*  */
</style>
