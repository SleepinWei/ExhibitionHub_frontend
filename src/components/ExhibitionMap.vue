<template>
  <el-row justify="center">
    <h1 class="title">Exhibition Hub</h1>
    </el-row>
    <div id="allmap"></div>
  </template>
  
  <script>
  import inMap from 'inmap'
  
  export default {
    data () {
      return {
        inmap: '',
        overlay: '',
        animationOverlay: '',
        pointOverlay: '',
      }
    },
    mounted () {
      //待从后端传数据
      var data = [
        { name: '北京', geometry: { type: 'Point', coordinates: ['116.3', '39.9'] }, style: { speed: 1 } }, 
        { name: '上海', geometry: { type: 'Point', coordinates: ['121.29', '31.11'] }, style: { speed: 0.4 } }, 
        { name: '福建', geometry: { type: 'Point', coordinates: ['117.984943', '26.050118'] }, style: { speed: 0.45 } }, 
        { name: '广东', geometry: { type: 'Point', coordinates: ['113.394818', '23.408004'] }, style: { speed: 0.7 } }, 
        { name: '广西', geometry: { type: 'Point', coordinates: ['108.924274', '23.552255'] }, style: { speed: 1 } },]
      this.inmap = new inMap.Map({
        id: 'allmap',
        skin: 'Blueness',
        center: [105.403119, 38.028658],
        zoom: {
          value: 5,
          show: true,
          max: 18,
          min: 5
        }
      })
      this.pointOverlay = new inMap.PointOverlay({
          tooltip: {
            show: true,
            formatter: "{name}"
          },
          style: {
              normal: {
                  backgroundColor: "rgba(255, 255, 255, 1)", // 填充颜色
                  //shadowColor: "rgba(255, 255, 255, 1)", // 投影颜色
                  //shadowBlur: 1, // 投影模糊级数
                  //globalCompositeOperation: "lighter", // 颜色叠加方式
                  size: 5 // 半径
              }
          },
          data: data,
          event: {
              onMouseClick(val) {
                  console.log(val[0].name);
                  //this.getLocation();
                  
                  
              }
          }
      })
      this.animationOverlay = new inMap.PointAnimationOverlay({
        style: {
          fps: 25, // 动画帧数
          color: '#8fb2c9',//红色点？
          size: 15,
          speed: 0.4
        },
        data: data
      })
      this.inmap.add(this.animationOverlay)
      this.inmap.add(this.pointOverlay)
    },
    methods:{
      getLocation(){
        let that=this
        let myGeo = new BMap.Geocoder()
        let address="江苏省盐城市"
        myGeo.getPoint(address,function(point){
        if(point){
            console.log(point.lat)
            console.log(point.lng)
            // that.map.centerAndZoom(point,15)
            // that.latitude=point.lat
            // that.longitude=point.lng
            // that.infoWindowShow=true
        }
        })
      }
    }
  }
  
  </script>
  
  <style>
  .title {
    position: absolute;
    z-index: 2;
    color: #fff;
  }
  #allmap {
    width: 100%;
    height: calc(100vh - 100px);
  }
  </style>