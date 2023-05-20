<template>
  <el-row justify="center">
    <h1 class="title">Exhibition Hub</h1>
    </el-row>
    <div id="allmap"></div>
  </template>
  
  <script>
  import inMap from 'inmap'
  import ShanghaiGeoData from '../assets/上海市.json'

  let location;
  export default {
    data () {
      return {
        inmap: '',
        polygonOverlay: '',
        animationOverlay: '',
        pointOverlay: '',
        venue : [
          {venue_name:'-1',venue_address:'-1'}
        ],
        //data:[]
      }
    },
    mounted () {
      this.getVenues()
    },
    methods:{
      getVenues(){
        this.$axios.get(`/ExhibitionMap/getAllVenue`)
        .then((response) => {
          this.venue=response.data
          this.getLocationData()
          //this.loadMap()
        }).catch((error) => {
            if (error.response.status == 400) {
                // exhibition is not found
                // this.$router.push("/error400")
            }
        });
      },
      getLocationData() {
        let venuedata = [];
        const promises = this.venue.map((item) => {
          return new Promise((resolve) => {
            let myGeo = new BMap.Geocoder();
            myGeo.getPoint(item.venue_address, function (point) {
              if (point) {
                let newList = {
                  name: item.venue_name,
                  geometry: {
                    type: 'Point',
                    coordinates: [String(point.lng), String(point.lat)],
                  },
                  style: {
                    speed: Math.random() + 0.3,
                  },
                };
                venuedata.push(newList);
              }
              resolve(); // Resolve the promise after processing the item
            });
          });
        });
        Promise.all(promises).then(() => {
          location = venuedata; // Assign the completed venuedata to location
          this.loadMap();
        });//使用promise来确保在location已经被正确赋值
      },
      loadMap(){
        this.inmap = new inMap.Map({
        id: 'allmap',
        skin: 'Blueness',
        center: ["121.27931842594131", "31.236916805104883"],
        zoom: {
          value: 10,
          show: true,
          max: 22,
          min: 5
        }
      })

      this.polygonOverlay = new inMap.PolygonOverlay({
        style: {
            normal: {
                borderWidth: 1.5,        
                backgroundColor: "rgba(134,157,157,0.7)",
                label: {
                  show: true, // 是否显示
                  font: "13px bold ",
                  color: "rgba(224, 238, 251,1)"
                }
              },
        },
        data: ShanghaiGeoData.features,
      });
      this.inmap.add(this.polygonOverlay);
      // 将地图视图调整到合适的显示范围
      this.inmap.setFitView([this.polygonOverlay]);
     
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
          data: location,
          event: {
              onMouseClick(val) {
                  console.log(val[0].name);   
                  //todo：传入展馆名称进入筛选界面，跳出该展馆的所有展览
                  //this.$router.push({ path: "/search", query: { querytext: this.inputText } });             
              }
          }
      })
    
      this.inmap.add(this.pointOverlay)
      console.log(this.pointOverlay.getRenderData())

      this.animationOverlay = new inMap.PointAnimationOverlay({
        style: {
          fps: 25, // 动画帧数
          color: '#f07c82',//红色点？
          size: 20,
          speed: 0.4
        },
        data: location
      })
      this.inmap.add(this.animationOverlay)
      
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