<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

// const arrayRange = (start, stop, step) =>
//   Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step)

const cssAffectPage = ref(false)

const fontSize = ref(localStorage.getItem('fontSize') || '12')
const fontSizes: Ref<string[]> = ref(
  localStorage.getItem('fontSizes') || [
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
watch(fontSize, (newFontSize, oldFontSize) => {
  if (newFontSize !== oldFontSize) {
    localStorage.setItem('fontSize', newFontSize)
    if (newFontSize !== 'Custom' && cssAffectPage.value == true) {
      document.documentElement.style.setProperty('--user-font-size', `${newFontSize}pt`)
    }
    if (!fontSizes.value.some((size) => size === newFontSize)) {
      fontSizes.value.push(newFontSize)
      localStorage.setItem('fontSizes', fontSizes)
    }
  }
})

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
watch(fontFamily, (newFontFamily, oldFontFamily) => {
  if (newFontFamily !== oldFontFamily) {
    const selectedFont = availableFonts.value.find((f) => f.name === newFontFamily)
    document.documentElement.style.setProperty('--user-font-family', newFontFamily)
    localStorage.setItem('fontFamily', newFontFamily)
  }
})

const fontColor = ref(localStorage.getItem('fontColor') || '#000000')
const fontColors = ref([
  { name: 'Black', value: '#000000' },
  { name: 'Grey', value: '#808080' },
  { name: 'Light Grey', value: '#c5c0b9' },
  { name: 'White', value: '#FFFFFF' },
])
watch(fontColor, (newFontColor, oldFontColor) => {
  if (newFontColor != oldFontColor) {
    const selectedColor = fontColors.value.find((f) => f.name === newFontColor)
    document.documentElement.style.setProperty('--color-text', newFontColor)
    localStorage.setItem('fontColor', newFontColor)
  }
})

const lineHeight = ref(localStorage.getItem('lineHeight') || '1.5')
const lineHeights = ref([
  { name: '1', value: '1' },
  { name: '1.5', value: '1.5' },
  { name: '2', value: '2' },
  { name: '2.5', value: '2.5' },
  { name: '3', value: '3' },
])
watch(lineHeight, (newLineHeight, oldLineHeight) => {
  if (newLineHeight != oldLineHeight) {
    const selectedColor = lineHeights.value.find((f) => f.name === newLineHeight)
    document.documentElement.style.setProperty('--user-line-height', newLineHeight)
    localStorage.setItem('lineHeight', newLineHeight)
  }
})

const letterSpacing = ref('1')
const letterSpacings = ref([
  { text: '1', value: '1' },
  { text: '1.1', value: '1.1' },
  { text: '1.2', value: '1.2' },
  { text: '1.3', value: '1.3' },
  { text: '1.4', value: '1.4' },
  { text: '1.5', value: '1.5' },
  { text: '1.6', value: '1.6' },
  { text: '1.7', value: '1.7' },
  { text: '1.8', value: '1.8' },
  { text: '1.9', value: '1.9' },
  { text: '2', value: '2' },
])
const backgroundColor = ref(localStorage.getItem('backgroundColor') || '#FFE5B4')
const backgroundColors = ref([
  { name: 'Peach', value: '#FFE5B4' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Beige', value: '#FFFDD0' },
  { name: 'Dark Grey', value: '#26292a' },
])
watch(backgroundColor, (newBackgroundColor, oldBackgroundColor) => {
  if (newBackgroundColor != oldBackgroundColor) {
    const selectedColor = backgroundColors.value.find((f) => f.value === newBackgroundColor)
    document.documentElement.style.setProperty('--color-background', newBackgroundColor)
    localStorage.setItem('backgroundColor', newBackgroundColor)
  }
})
</script>

<template>
  <div class="container-div">
    <header class="header">
      <h3>CSS styling for HTML output:</h3>
      <span>
        Affect current page?
        <input type="checkbox" v-model="cssAffectPage" />
      </span>
      <div class="options">
        newFontFamily Font size:
        <select v-model="fontSize">
          <option v-for="size in fontSizes" :value="size">
            {{ size }}
          </option>
        </select>
        <span v-if="fontSize === 'Custom'">
          <input v-model.lazy="fontSize" />
        </span>

        Font:
        <select v-model="fontFamily">
          <option
            v-for="font in availableFonts"
            :key="font.name"
            :style="{ fontFamily: font.name }"
          >
            {{ font.name }}
          </option>
        </select>

        Font Color:
        <select v-model="fontColor">
          <option v-for="color in fontColors" :value="color.value">
            {{ color.name }}
          </option>
        </select>

        Line Height:
        <select v-model="lineHeight">
          <option v-for="height in lineHeights" :value="height.value">
            {{ height.name }}
          </option>
        </select>

        Letter Spacing:
        <select v-model="letterSpacing">
          <option v-for="spacing in letterSpacings" :value="spacing">
            {{ spacing }}
          </option>
        </select>

        Background Color:
        <select v-model="backgroundColor">
          <option v-for="color in backgroundColors" :value="color.value">
            {{ color.name }}
          </option>
        </select>
      </div>
    </header>
  </div>
</template>

<style scoped>
.header {
  margin: '100px';
}
.options {
  padding: '10px';
}
</style>
