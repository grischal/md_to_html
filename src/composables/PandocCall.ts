import { siteStatusStore } from '@/stores/siteStatus'
import { storeToRefs } from 'pinia'
import DOMPurify from 'dompurify'

export async function markdownToHtml() {
  const store = siteStatusStore()
  const { markdown, fontSize, fontFamily, fontColor, lineHeight, letterSpacing, backgroundColor } =
    store
  const { renderAllowed } = storeToRefs(store)

  try {
    const response = await fetch('https://nd-pandoc-server-c44dc3ac3662.herokuapp.com/:3003', {
      method: 'POST',
      body: JSON.stringify({
        text: markdown,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const responseBody = await response.json()

    const bodyStyle = `
      font-size: ${fontSize};
      font-family: ${fontFamily};
      color: ${fontColor};
      line-height: ${lineHeight};
      letter-spacing: ${letterSpacing};
      background-color: ${backgroundColor};
    `
    let sanitizedOutput

    if (DOMPurify.isSupported) {
      sanitizedOutput = DOMPurify.sanitize(responseBody.output)
    } else {
      // Unsanitized output must never render within RenderField.vue
      renderAllowed.value = false
      sanitizedOutput = responseBody.output
    }
    return `<body style="${bodyStyle}">${sanitizedOutput}</body>`
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message:', error.message)
      return error.message
    } else {
      console.log('unexpected error: ', error)
      return 'An unexpected error occurred'
    }
  }
}
