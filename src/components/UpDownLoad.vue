<script setup lang="ts">
import { downloadHTML } from '@/composables/DownloadHTML'
import { ref } from 'vue'
import FilePond from './FilePond.vue'

const filename = ref('')
</script>

<template>
  <div id="split">
    <div></div>
    <div>
      <span>
        <button @click="downloadHTML(filename)" class="button-primary">Download Markdown</button>
        <input v-model="filename" placeholder="Enter Filename" />
      </span>
      <FilePond />
    </div>
  </div>
</template>

<style scoped>
/*  */
#split {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
