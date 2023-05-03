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
      tolink: {
        type: String
      },
    },
    data(){
      return{
        downloadurl:''
      };     
    },
    methods: {
      getPosterUrl(url){
        console.log("geturl",url);
        this.downloadurl=url;
      },
      downloadImage() {
        // axios.get(this.downloadurl, {responseType: 'blob'})
        // .then(response => {
        //   console.log("yesyes")
        //   const blob = response.data
        //   saveAs(blob, 'poster.png')
        // })
        console.log("IMAGEDOWN",this.downloadurl)
        const link = document.createElement("a");
        link.href = this.downloadurl;
        link.setAttribute('download', 'poster.png')
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
  