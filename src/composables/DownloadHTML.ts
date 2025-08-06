import { markdownToHtml } from './PandocCall'

function isUnsafe(str: string) {
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i)
    if (
      !(47 < code && code < 58) && // numeric (0-9)
      !(64 < code && code < 91) && // upper alpha (A-Z)
      !(96 < code && code < 123) && // lower alpha (a-z)
      !(code === 45 || code === 46 || code === 95) // characters _ and . and -
    ) {
      return true
    }
  }
  return false
}

export async function downloadHTML(filename: string) {
  if (!filename || filename.length > 255 || isUnsafe(filename)) {
    filename = 'md_to.html'
    alert(
      "Filename must only contain letters, numbers, and the characters '_', '-', and '.' while being less than 255 characters long",
    )
  }
  if (filename.length < 6 || filename.slice(-5) !== '.html') {
    filename = filename + '.html'
  }

  const html = await markdownToHtml()

  let blob = new Blob([html], { type: 'text/html' })
  let anchor = document.createElement('a')
  anchor.style.display = 'none'
  document.body.appendChild(anchor)

  let url = window.URL.createObjectURL(blob)
  anchor.href = url
  anchor.download = filename

  anchor.click()
  window.URL.revokeObjectURL(url)

  document.body.removeChild(anchor)
}
