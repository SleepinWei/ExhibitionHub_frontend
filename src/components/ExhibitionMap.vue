<template>
  <el-row justify="center">
    <h1 class="title">Exhibition Hub</h1>
    </el-row>
    <div id="allmap"></div>
  </template>
  
  <script>
  import inMap from 'inmap'
  import ShanghaiGeoData from '../assets/上海市.json'
  
  export default {
    data () {
      return {
        inmap: '',
        overlay: '',
        animationOverlay: '',
        pointOverlay: '',
        geodata:ShanghaiGeoData,
      }
    },
    mounted () {
      
      //待从后端传数据
      var data = [
          { name: '北京', geometry: { type: 'Point', coordinates: ['116.3', '39.9'] }, style: { speed: 1 } },
          { name: '上海', geometry: { type: 'Point', coordinates: ['121.29', '31.11'] }, style: { speed: 0.4 } },
          { name: '福建', geometry: { type: 'Point', coordinates: ['117.984943', '26.050118'] }, style: { speed: 0.45 } },
          { name: '广东', geometry: { type: 'Point', coordinates: ['113.394818', '23.408004'] }, style: { speed: 0.7 } },
        { name: '广西', geometry: { type: 'Point', coordinates: ['108.924274', '23.552255'] }, style: { speed: 1 } }];
      this.inmap = new inMap.Map({
        id: 'allmap',
        skin: 'Blueness',
        center: ["121.0585508638092", "31.092552191760852"],
        zoom: {
          value: 10,
          show: true,
          max: 22,
          min: 5
        }
      })
      var overlay = new inMap.PolygonOverlay({
        style: {
            normal: {
                borderWidth: 1.5,        
                backgroundColor: "rgba(252,196,95,0.71)",
                label: {
                  show: true, // 是否显示
                  font: "13px bold ",
                  color: "rgba(224, 238, 251,1)"
                }
              },
        },
        data: ShanghaiGeoData.features,
    });
     
    // this.inmap.add(overlay);
    // // 将地图视图调整到合适的显示范围
    // this.inmap.setFitView([overlay]);

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
                  let myGeo = new BMap.Geocoder()
                  let address="上海市"
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
      })
      this.inmap.add(this.pointOverlay)

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
      this.inmap.add(overlay)
    },
    methods:{
      getLocation(){
        let that=this
        
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