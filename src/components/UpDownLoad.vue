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
        <button @click="downloadHTML(filename)" class="button-primary">Download HTML</button>
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

.button-primary {
  background-color: var(--color-background);
  border: solid;
  color: var(--color-text);
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
