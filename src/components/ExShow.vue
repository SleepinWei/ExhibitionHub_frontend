<template>
    <h1 class="exhibition-info">展览信息</h1>
    <div class="exhibition-container">
      <el-row :gutter="20" class="exhibition-list">
        <el-col :span="8" v-for="exhibition in exhibitions" :key="exhibition.id">
            <el-card shadow="hover" class="exhibition-card"  @click="jumpToExhibition(exhibition.id)">
                <el-row>
                    <el-col :span="10" class="exhibition-image">
                        <img :src="this.$posterPath + exhibition.poster_url" alt="Exhibition Image" />
                    </el-col>
                    <el-col :span="14" class="exhibition-info">
                        <h2 class="exhibition-title">{{ exhibition.name }}</h2>
                        <p class="exhibition-time">{{ exhibition.begin_date }}至{{ exhibition.end_date }}</p>
                        <p class="exhibition-location">{{ exhibition.address }}</p>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        exhibitions: [],
      };
    },
    methods: {
      jumpToExhibition(id) {
          this.$router.push({ path: `/exhibition/${id}` })
      },
    },
    created: function () {
        this.$axios.get("/getExPoster")
        .then((response) => {
            console.log(response.data)
            this.exhibitions=response.data
        })
        .catch(response => {
            console.log("error")
        })
    }
  };
  </script>
  
  <style scoped>
  .exhibition-info{
    font-family: Arial, sans-serif; /* 修改字体 */
    text-align: center;
  }
  .exhibition-title {
    font-family: Arial, sans-serif; 
  }
  .exhibition-container {
    padding: 20px;
    /* margin-top:40px; */
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .exhibition-list {
    margin: 0 -10px;
  }
  
  .exhibition-card {
    cursor: pointer;
    margin-bottom: 20px;
  }

.exhibition-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.exhibition-info {
  padding-left: 20px; /* 调整文字信息与图片之间的间距 */
}

.exhibition-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.exhibition-time,
.exhibition-location {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}


  </style>
  