import { ref } from 'vue'
import { defineStore } from 'pinia'

export const siteStatusStore = defineStore('siteStatus', () => {
  const markdown = ref('markdown content')
  const fontSize = ref(localStorage.getItem('fontSize') || '12')
  const fontFamily = ref(localStorage.getItem('fontFamily') || 'Lexend')
  const fontColor = ref(localStorage.getItem('fontColor') || '#000000')
  const lineHeight = ref(localStorage.getItem('lineHeight') || '2')
  const letterSpacing = ref(localStorage.getItem('letterSpacing') || '0.1rem')
  const backgroundColor = ref(localStorage.getItem('backgroundColor') || '#FFE5B4')

  return {
    markdown,
    fontSize,
    fontFamily,
    fontColor,
    lineHeight,
    letterSpacing,
    backgroundColor,
  }
})
