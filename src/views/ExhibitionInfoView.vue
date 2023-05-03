<script setup>
import ImageDownloadItem from '../components/ImageDownloadItem.vue'
</script>

<template>
<el-row>
    <el-col :span="18">
    <el-row class="basic_info">
        <el-col :span="9" class="poster">
            <el-row justify="center" class="poster-image">
                <el-image style="width: 250px;height: 300px;" :src="form.poster_url" fit="contain">
                </el-image>
            </el-row>
        </el-col>
        <el-col :span="13" :offset="0" class="simple_info">
            <el-row class="sub_info" align="middle">
                <el-col :span="18">
                    <h2>
                        {{this.form.name}}
                    </h2>
                </el-col>
                <el-col :span="6" v-if="isAdmin" class="change_info_button">
                    <el-button type="primary" @click="onChangeInfo">
                        修改信息
                    </el-button>
                </el-col>
            </el-row>
            <el-row class="sub_info">
                时间：{{form.begin_date}} - {{ form.end_date}} {{ form.begin_time }} - {{ form.end_time }}
            </el-row>
            <el-row class="sub_info">
                主办方：{{form.organizer }}
            </el-row>
            <el-row class="sub_info">
                票价: {{form.ticket_info}}
            </el-row>
            <el-row class="sub_info">
                官方链接: 
                <a :href="form.link">
                    {{form.link}}
                </a>
            </el-row>
            <el-row class="sub_info">
                标签: 
                <el-tag v-for="tag in form.tags"> {{tag}} </el-tag>
            </el-row>
            <el-row class="subscribe_button">
                <el-button v-if="isLogin && !isSubscribed" @click="onSubscribe" type="success">订阅</el-button>
                <el-tag v-if="isLogin && isSubscribed">已订阅</el-tag> 
            </el-row>
            <el-row class="subscribe_button">
                <el-button v-if="isLogin" @click="onShareExhibition" type="success">分享展览</el-button>
                <div v-if="showPopup" class="popup">
                    <ImageDownloadItem :poster_url="form.poster_url" :tolink="form.link" @close="onShareExhibition" />
                </div>
            </el-row>

        </el-col>
    </el-row>

    <el-row class="long_intro border_up" style="margin-top: 20px;">
        <h3>详细介绍</h3>
    </el-row>
    <el-row class="long_intro border_up">
        <!-- {{ intro }} -->
        <div v-html="long_intros"></div>
    </el-row>
</el-col>
<el-col :span="1">
<el-divider direction="vertical" />
</el-col>
    <el-col :span="5">
        <!-- 推荐信息 -->
        <el-row>
            <h2>
                推荐展览
            </h2>
        </el-row>
        <el-row>
            <ul>
                <li v-for="recommend in form.recommends">
                    {{recommend}}
                </li>
            </ul>
        </el-row>
    </el-col>
</el-row>

</template>

<script>
import axios from 'axios'

export default {
    components:{
        ImageDownloadItem
      },
    data() {
        return {
            form: {
                exId: this.$route.params.exId,
                poster_url: "/src/assets/posters/saber.png",
                name: "Exhibition 1",
                begin_date: "2001-01-01",
                end_date: "2001-02-02",
                organizer: "og1",
                tickets: "2000RMB",
                link: "https://bilibili.com",
                tags: ["tag1", "tag2"],
                introduction: "some long introssssss\nssssssssssssssssssssssssssss\nssssssssssssssssssssss\
            ssssssssssssssssssssssssssssss",
                begin_time: "",
                end_time: "",
                recommends: ["ex1", "ex2", "ex3"]
            },
            isAdmin: true,
            isLogin: true,
            isSubscribed: false,
            showPopup:false,
            imageUrl:'',
        }
    },
    methods: {
        async getRequest(){
            axios.get(`/searchById`,
                {
                    params: {
                        exId: this.$route.params.exId
                    }
                })
                .then((response) => {
                    this.form = response.data;
                    this.form.poster_url = 'http://127.0.0.1:8080/' + response.data.poster_url;
                    console.log(this.form)
                }).catch((error) => {
                    if (error.response.status == 400) {
                        // exhibition is not found
                        // this.$router.push("/error400")
                    }
                });
        },
        getUserInfo() {
            // let isAdmin = this.$cookies.get("cookieName") != null;
            let isAdmin = true; // TODO: is admin
            let isLogin = (this.$cookies.get("cookieName") != null);
            if (isAdmin != null) {
                this.isAdmin = isAdmin;
            }
            if (isLogin != null) {
                this.isLogin = isLogin;
            }
        },
        onChangeInfo() {
            // TODO: 与 User 登录对接，主要为字段名
            // redirect
            this.$router.push(`/alterinfo/${this.$route.params.exId}`);
        },
        onSubscribe() {
            // TODO: add to subscription sets
        },
        onShareExhibition(){
            console.log("share")
            this.showPopup = !this.showPopup

        }
    },
    mounted() {
        this.getRequest();
        this.getUserInfo();
    },
    computed: {
        long_intros() {
            var arr = this.form.introduction.split("\n");
            var result = ""; 
            arr.forEach((value, index, array) => {
                result += `<p>${value}</p>`
            });
            return result;
        }
    }
}

</script>

<style>
.basic_info{
    padding-top:30px;
}
.simple_info{
    margin-left: 20px;
}

.el-tag{
    margin-left: 5px;
}

.sub_info{
    margin-top: 5px;
}

.long_intro{
    padding-left: 50px;
}
.el-divider{
    height: 100%;
}

.subscribe_button{
    margin-top: 20px;
}

.border_up{
    border-top: 2px solid #00000010;
}

.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;/* 最前显示 */
  }
  
  .popup button {
    margin-top: 10px;
  }

</style>