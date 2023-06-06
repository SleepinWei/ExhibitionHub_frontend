<template>
    <div class="carousel-container">
        <el-carousel :interval="4000" type="card" height="450px" class="custom-carousel">
            <el-carousel-item v-for="item in searchResult.slice(0,6)" :key="item.id" class="carousel-item">
                <div class="carousel-slide" @click="jumpToExInfo(item.id)">
                    <div class="carousel-image-container">
                        <img :src="'https://kjkttt.gardilily.com/api/' + item.poster_url" alt="Card Image" class="carousel-image"/>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import CardItem from '../components/CardItem.vue';
export default {
    data(){
        return{
            searchResult:[]
        }
    },
    created: function () {
        this.$axios.get("/getExPoster")
        .then((response) => {
            console.log(response.data)
            this.searchResult=response.data
        })
        .catch(response => {
            console.log("error")
        })
    },
    methods:{
        jumpToExInfo(id){
            console.log("jumptpEx")
            this.$router.push(`/exhibition/${id}`)
        },
        getExInfo(){
            
        }
    }
}
</script>
  
<style scoped>
.carousel-container {
  width: 100%;
  overflow: hidden;
  margin-top:40px;
}

.custom-carousel {
  margin: 0 -10px; /* 调整carousel-item之间的间距 */
}

.carousel-item {
    width: 50%;
}

.carousel-slide {
  cursor: pointer;
}

.carousel-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* 图片自适应卡片大小 */
}
</style>