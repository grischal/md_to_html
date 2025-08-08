<script setup lang="ts">
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import { siteStatusStore } from '@/stores/siteStatus'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const FilePond = vueFilePond(FilePondPluginFileValidateType)

const { markdown } = storeToRefs(siteStatusStore())

const onAddFile = (error: any, fileItem: any) => {
  if (!error && fileItem && fileItem.file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      markdown.value = e.target?.result as string
    }
    reader.readAsText(fileItem.file)
  }
}

const onRemoveFile = () => {
  markdown.value = ''
}
</script>

<template>
  <div id="app">
    <file-pond
      name="upload"
      label-idle="Upload Markdown"
      :allow-multiple="false"
      accepted-file-types="text/markdown"
      @addfile="onAddFile"
      @removefile="onRemoveFile"
    />
  </div>
</template>
