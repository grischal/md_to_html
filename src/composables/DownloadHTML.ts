import { markdownToHtml } from './PandocCall'

function isSafe(str: string) {
  var code, i, len

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i)
    if (
      !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123) && // lower alpha (a-z)
      !(code === 45 || code === 46 || code === 95) // characters _ and . and -
    ) {
      return false
    }
  }
  return true
}

export async function downloadHTML(filename: string) {
  let fails_checks = false
  const str_split = filename.split('.')
  if (str_split.length === 2 || str_split.length === 1) {
    isSafe(filename)
  } else {
    fails_checks = true
  }
  if (!filename || fails_checks) {
    filename = 'md_to.html'
  }
  const html = await markdownToHtml()

  let blob = new Blob([html], { type: 'text/html' })
  let anchor = document.createElement('a')
  document.body.append(anchor)
  anchor.style = 'display:none;'

  let url = window.URL.createObjectURL(blob)
  anchor.href = url
  anchor.download = filename

  anchor.click()
  window.URL.revokeObjectURL(url)
}
