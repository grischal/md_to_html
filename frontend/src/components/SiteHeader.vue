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

const fonts = localStorage.getItem('fonts') || [
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
]

const availableFonts = ref(fonts)
const fontFamily = ref(localStorage.getItem('fontFamily') || 'Lexend')
watch(fontFamily, (newFontFamily, oldFontFamily) => {
  if (newFontFamily !== oldFontFamily) {
    const selectedFont = availableFonts.value.find((f) => f.name === newFontFamily)
    document.documentElement.style.setProperty('--user-font-family', newFontFamily)
    localStorage.setItem('fontFamily', newFontFamily)
  }
})

const fontColors = ref([
  { text: 'Black', value: '#000000' },
  { text: 'Grey', value: '#808080' },
  { text: 'Light Grey', value: '#c5c0b9' },
  { text: 'White', value: '#c5c0b9' },
])

const lineHeight = ref('2')
const lineHeights = ref([
  { text: '1', value: '1' },
  { text: '1.5', value: '1.5' },
  { text: '2', value: '2' },
  { text: '2.5', value: '2.5' },
  { text: '3', value: '3' },
])

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
const backgroundColor = ref('#FFFDD0')
const backgroundColors = ref([
  { text: 'Beige', value: '#FFFDD0' },
  { text: 'White', value: '#FFFFFF' },
  { text: 'Peach', value: '#FFE5B4' },
  { text: 'Dark Grey', value: '#26292a' },
])
</script>

<template>
  <header class="header">
    <h3>CSS styling for HTML output:</h3>
    <span>
      Affect current page?
      <input type="checkbox" v-model="cssAffectPage" />
    </span>
    <div class="options">
      Font size:
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
        <option v-for="font in availableFonts" :key="font.name" :style="{ fontFamily: font.name }">
          {{ font.name }}
        </option>
      </select>

      Font Color:
      <select v-model="fontColor">
        <option v-for="color in fontColors" :value="color.value" :key="color.id">
          {{ color.text }}
        </option>
      </select>

      Line Height:
      <select v-model="lineHeight">
        <option v-for="height in lineHeights" :value="height.value" :key="height.id">
          {{ height.text }}
        </option>
      </select>

      Letter Spacing:
      <select v-model="letterSpacing">
        <option v-for="spacing in letterSpacings" :value="spacing.value" :key="spacing.id">
          {{ spacing.text }}
        </option>
      </select>

      Background Color:
      <select v-model="backgroundColor">
        <option v-for="color in backgroundColors" :value="color.value" :key="color.id">
          {{ color.text }}
        </option>
      </select>
    </div>
  </header>
</template>

<style scoped>
.header {
  margin: '100px';
}
.options {
  padding: '10px';
}
</style>
