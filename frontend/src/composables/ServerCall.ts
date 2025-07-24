import { siteStatusStore } from '@/stores/siteStatus'

export async function markdownToHtml() {
  const { markdown, fontSize, fontFamily, fontColor, lineHeight, letterSpacing, backgroundColor } =
    siteStatusStore()
  try {
    const response = await fetch(' http://localhost:3031', {
      method: 'POST',
      body: JSON.stringify({
        text: markdown,
        css: {
          'font-size': fontSize,
          'font-family': fontFamily,
          'font-color': fontColor,
          'line-height': lineHeight,
          'letter-spacing': letterSpacing,
          'background-color': backgroundColor,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const result = (await response.json()) as String
    return result
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message)
      return error.message
    } else {
      console.log('unexpected error: ', error)
      return 'An unexpected error occurred'
    }
  }
}
