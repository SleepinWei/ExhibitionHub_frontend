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
  import html2canvas from 'html2canvas'
  
  export default {
    components:{
        PosterWithQRcode,
        html2canvas
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
        url_base64:'',
      };     
    },
    methods: {
      getPosterUrl(url){
        console.log("geturl",url);
        this.url_base64=url;
      },
      downloadImage() {
        html2canvas(document.querySelector(".posterQRcode")).then(function (canvas) {undefined
          var image = canvas.toDataURL("image/png");
          let $a = document.createElement('a');
          $a.setAttribute("href", image);
          $a.setAttribute("download", "poster.png"  );
          $a.click();
        });
        this.$message({type:'success',message: '已下载展览海报'});
      },




      close() {
        this.$emit('close');
      }
    },
  };
  </script>
  
  <style>

  </style>
  