import { markdownToHtml } from './PandocCall'

function isUnsafe(str: string) {
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i)
    if (
      !(47 < charCode && charCode < 58) && // numeric (0-9)
      !(64 < charCode && charCode < 91) && // upper alpha (A-Z)
      !(96 < charCode && charCode < 123) && // lower alpha (a-z)
      !(charCode === 45 || charCode === 46 || charCode === 95) // characters _ and . and -
    ) {
      return true
    }
  }
  return false
}

export async function downloadHTML(filename: string) {
  if (!filename || filename.length > 255 || isUnsafe(filename)) {
    filename = 'md_to.html'
    // TODO: Integrate alert further into site maybe with small
    // notification instead of an alert which you must press OK on
    alert(
      "Filename must only contain letters, numbers, and the characters '_', '-', and '.' while being less than 255 characters long. \nChosen filename will be replaced with md_to.html",
    )
  }
  if (filename.length < 6 || filename.slice(-5) !== '.html') {
    // f.html has length 6 and is the min length filename with .html
    // So any filename less than 6 characters cannot contain .html
    // This is to only do the O(n) operation if necessary
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
