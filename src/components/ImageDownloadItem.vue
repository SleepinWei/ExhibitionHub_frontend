<script setup>
import PosterWithQRcode from './PosterWithQRcode.vue'
</script>

<script setup>
import PosterWithQRcode from './PosterWithQRcode.vue'
</script>

<template>
    <div>
      <PosterWithQRcode 
      :backgroundImage="poster_url" 
      :qrCodeContent="tolink"
      @getPosterUrl="getPosterUrl"
      />
      <el-button @click="downloadImage">下载图片</el-button>
      <el-button @click="close">关闭</el-button>
    </div>
  </template>
  
  <script>

  import { saveAs } from 'file-saver'
  import axios from 'axios'

  export default {
    components:{
        PosterWithQRcode
      },
    props: {
      poster_url: {
        type: String
      },
    },
    methods: {
      getPosterUrl(url){
        console.log("geturl",url);
        this.downloadurl=url;
      },
      downloadImage() {
        const link = document.createElement('a');
        link.href = this.poster_url;
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

  </style>
  