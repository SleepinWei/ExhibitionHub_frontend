<template>
    <div class="posterQRcode">
        <!-- 提高分辨率 -->
      <canvas ref="canvas" width="480" height="640" ></canvas>
    </div>
  </template>
  
  <script>
  import QRCode from 'qrcode';
  
  export default {
    name: 'Poster',
    props:{
        backgroundImage:{
            type:String
        },
        qrCodeContent:{
            type:String
        },
    },
    data() {
      return {
        //backgroundImage: '/src/assets/posters/saber.png', // 背景图片地址
        ImageWidth0:480,//图片宽度
        ImageHeight:640,//图片高度
        //qrCodeContent: 'https://www.baidu.com/', // 二维码内容，即要跳转的网页地址
        qrCodeSize: 90, // 二维码大小
        qrCodeX: 0, // 二维码横坐标
        qrCodeY: 0, // 二维码纵坐标

        text: '这是一段示例文字', // 要添加的文字
        font: 'bold 18px Arial', // 文字样式
        textColor: '#FFFFFF', // 文字颜色
        textX: 50, // 文字横坐标
        textY: 50, // 文字纵坐标

        posterImageUrl:''
      };
    },
    mounted() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');

      this.qrCodeX=this.ImageWidth-this.qrCodeSize
      this.qrCodeY=this.ImageHeight-this.qrCodeSize
  
      // 加载背景图片
      const backgroundImage = new Image();
      backgroundImage.setAttribute("crossOrigin", "anonymous");
      backgroundImage.onload = () => {
        console.log("onload background")
        ctx.drawImage(backgroundImage, 0, 0, this.ImageWidth, this.ImageHeight);
  
        // 添加文字
        // ctx.font = this.font;
        // ctx.fillStyle = this.textColor;
        // ctx.fillText(this.text, this.textX, this.textY);

        // 生成二维码
        QRCode.toDataURL(this.qrCodeContent, { width: this.qrCodeSize }, (err, url) => {
          console.log("onload qrcode")
          if (err) throw err;
  
          // 添加二维码
          const qrCodeImageObj = new Image();
          qrCodeImageObj.setAttribute("crossOrigin", "anonymous");
          qrCodeImageObj.onload = () => {
            ctx.drawImage(qrCodeImageObj, this.qrCodeX, this.qrCodeY, this.qrCodeSize, this.qrCodeSize);
          };
          qrCodeImageObj.src = url;
        });
      };
      backgroundImage.src = this.backgroundImage;
      this.posterImageUrl = canvas.toDataURL('image/png');//得到图片的base64编码数据
      this.$emit('getPosterUrl', this.posterImageUrl);
    },

  };
  </script>
  
  <style>
  .posterQRcode {
    position: relative;
    width: 480px;
    height: 640px;
  }
  
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  </style>
  
