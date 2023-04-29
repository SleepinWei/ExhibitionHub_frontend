<template>
    <div>
      <img :src="poster_url" alt="image" />
      <el-button @click="downloadImage">下载图片</el-button>
      <el-button @click="close">关闭</el-button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      poster_url: {
        type: String
      },
    },
    methods: {
      downloadImage() {
        const link = document.createElement('a');
        link.href = this.imageUrl;
        link.download = 'image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      close() {
        this.$emit('close');
      }
    },
  };
  </script>
  
  <style>
  img {
    max-width: 100%;
    max-height: 100%;
  }
  </style>
  