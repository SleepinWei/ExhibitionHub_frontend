<template>
  <div>
    <button @click="downloadFile">下载文件</button>
  </div>
</template>

<script>
export default {
  methods: {
    downloadFile() {
      const apiUrl = '/api/download';
      window.open(apiUrl, '_blank');
    }
  }
}
</script>
