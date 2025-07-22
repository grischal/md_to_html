<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

// const arrayRange = (start, stop, step) =>
//   Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step)
const cssAffectPage = ref(localStorage.getItem('cssAffectPage') === 'true')
watch(cssAffectPage, (newCSSAffectPage) => {
  localStorage.setItem('cssAffectPage', String(newCSSAffectPage))
})

const fontSize = ref(localStorage.getItem('fontSize') || '12')
const fontSizes: Ref<string[]> = ref(
  localStorage.getItem('fontSizes')?.split(',') || [
    '8',
    '9',
    '10',
    '11',
    '12',
    '14',
    '18',
    '24',
    '30',
    '36',
    '48',
    '60',
    '72',
    '96',
    'Custom',
  ],
)
watch(
  fontSize,
  (newFontSize, oldFontSize) => {
    if (newFontSize !== oldFontSize) {
      localStorage.setItem('fontSize', newFontSize)
      if (newFontSize !== 'Custom' && cssAffectPage.value == true) {
        document.documentElement.style.setProperty('--user-font-size', `${newFontSize}pt`)
      }
      if (!fontSizes.value.some((size) => size === newFontSize)) {
        fontSizes.value.push(newFontSize)
        localStorage.setItem('fontSizes', fontSizes.value.join(','))
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
const fontFamily = ref(localStorage.getItem('fontFamily') || 'Lexend')
watch(
  fontFamily,
  (newFontFamily, oldFontFamily) => {
    if (newFontFamily !== oldFontFamily) {
      if (cssAffectPage.value) {
        document.documentElement.style.setProperty('--user-font-family', newFontFamily)
      }
      localStorage.setItem('fontFamily', newFontFamily)
    }
  },
  { immediate: true },
)

const fontColor = ref(localStorage.getItem('fontColor') || '#000000')
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

const lineHeight = ref(localStorage.getItem('lineHeight') || '2')
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

const letterSpacing = ref(localStorage.getItem('letterSpacing') || '0.1')
const letterSpacings = ref(['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'])
watch(
  letterSpacing,
  (newLetterSpacing, oldLetterSpacing) => {
    if (newLetterSpacing != oldLetterSpacing) {
      if (cssAffectPage.value) {
        document.documentElement.style.setProperty(
          '--user-letter-spacing',
          `${newLetterSpacing}rem`,
        )
      }
      localStorage.setItem('letterSpacing', newLetterSpacing)
    }
  },
  { immediate: true },
)

const backgroundColor = ref(localStorage.getItem('backgroundColor') || '#FFE5B4')
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

const renderMD = () => {
  const json = {}
  console.log('Button Works')
}

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
          <button @click="renderMD">Convert MD to HTML</button>
        </span>
        <div>
          Font size:
          <select v-model="fontSize" class="dropdown">
            <option v-for="(size, idx) in fontSizes" :value="size" :key="idx">
              {{ size }}
            </option>
          </select>
          <span v-if="fontSize === 'Custom'">
            <input v-model.lazy="fontSize" />
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

          Line Height:
          <select v-model="lineHeight" class="dropdown">
            <option v-for="(height, idx) in lineHeights" :value="height" :key="idx">
              {{ height }}
            </option>
          </select>

          Letter Spacing:
          <select v-model="letterSpacing" class="dropdown">
            <option v-for="(spacing, idx) in letterSpacings" :value="spacing" :key="idx">
              {{ spacing }}
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
