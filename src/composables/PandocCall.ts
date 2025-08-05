import { siteStatusStore } from '@/stores/siteStatus'
import DOMPurify from 'dompurify'

export async function markdownToHtml() {
  const { markdown, fontSize, fontFamily, fontColor, lineHeight, letterSpacing, backgroundColor } =
    siteStatusStore()
  try {
    const response = await fetch('http://localhost:3030', {
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

    let purifiedHtml = ''
    if (DOMPurify.isSupported) {
      purifiedHtml = DOMPurify.sanitize(responseBody.output)
    } else {
      purifiedHtml // WARN: IMPLEMENT BACKUP PLAN
      alert('Input could not be verified, please use a supported browser')
    }
    return `<body style="font-size:${fontSize}; font-family:${fontFamily};
color:${fontColor}; line-height:${lineHeight}; letter-spacing:${letterSpacing};
background-color:${backgroundColor}">${purifiedHtml}</body>`
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
