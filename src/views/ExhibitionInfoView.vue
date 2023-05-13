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
                                {{ form.name }}
                            </h2>
                        </el-col>
                        <el-col :span="6" v-if="isAdmin" class="change_info_button">
                            <el-button type="primary" @click="onChangeInfo">
                                修改信息
                            </el-button>
                        </el-col>
                    </el-row>
                    <el-row class="sub_info">
                        时&ensp;&ensp;间&emsp;{{ form.begin_date }} - {{ form.end_date }}
                    </el-row>
                    <el-row class="sub_info">
                        主办方&emsp;{{ form.organizer }}
                    </el-row>
                    <el-row class="sub_info">
                        票价&emsp; {{ form.tickets }}
                    </el-row>
                    <el-row>
                        地点 {{ form.province }} - {{ form.city }} - {{ form.area }} - {{ form.address}}
                    </el-row>
                    <el-row class="sub_info">
                        官方链接&emsp;
                        <a :href="form.link">
                            {{ form.link }}
                        </a>
                    </el-row>
                    <el-row class="sub_info">
                        标签&emsp;
                        <el-tag v-for="tag in form.tags"> {{ tag.name }} </el-tag>
                    </el-row>
                    <el-row class="subscribe_button">
                        <div v-if="isLogin && !isSubscribed">
                            <el-date-picker v-model="subscribeDate" type="date" placeholder="选择日期"
                                style="margin-right: 20px;" format="YYYY/MM/DD" value-format="YYYY-MM-DD"></el-date-picker>
                            <el-button @click="onSubscribe" type="success">订阅</el-button>
                        </div>
                        <div v-if="isLogin && isSubscribed">
                            <el-tag size="large" style="margin-right: 20px;">已订阅</el-tag>
                            <el-tag size="large" style="margin-right: 20px;">订阅时间：{{ subscribeDate }}</el-tag>
                            <el-button @click="cancelSub" type="success">取消订阅</el-button>
                        </div>
                    </el-row>
                    <el-row class="subscribe_button">
                        <el-button v-if="isLogin" @click="onShareExhibition" type="success">分享展览</el-button>
                        <div v-if="showPopup" class="popup">
                            <ImageDownloadItem :poster_url="form.poster_url" :tolink="form.link"
                                @close="onShareExhibition" />
                        </div>
                    </el-row>
                </el-col>
            </el-row>

            <el-row class="long_intro border_up" style="margin-top: 20px;">
                <h3>详细介绍</h3>
            </el-row>
            <el-row class="long_intro border_up">
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
                        {{ recommend }}
                    </li>
                </ul>
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
                <el-tag v-for="tag in form.tags"> {{tag.name}} </el-tag>
            </el-row>
            <el-row v-if="isLogin" class="subscribe_button">
                <el-button v-if="isLogin && !isSubscribed" @click="onSubscribe" type="success">订阅</el-button>
                <el-tag v-if="isLogin && isSubscribed">已订阅</el-tag> 
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import axios from '@/http.ts'
export default {
    components: {
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
                province: "",
                city: "",
                area: "",
                address : "",
                tags: [  
                    {
                        id:1,
                        name: "tag1"
                    },
                    {
                        id:2,
                        name: "tag2"
                    }
                ],
                introduction: "some long introssssss\nssssssssssssssssssssssssssss\nssssssssssssssssssssss\
            ssssssssssssssssssssssssssssss",
                begin_time: "",
                end_time: "",
                recommends: ["ex1", "ex2", "ex3"]
            },
            isAdmin: false,
            isLogin: false,
            isSubscribed: false,
            subscribeDate: '',
            showPopup: false,
            imageUrl: '',
        }
    },
    methods: {
        async getRequest() {
            axios.get(`/searchById`,
                {
                    params : {
                        exId: this.$route.params.exId
                    }
                })
                .then((response) => {
                    this.form = response.data;
                    this.form.poster_url = 'http://127.0.0.1:8080/' + response.data.poster_url;
                    console.log(this.form);

                    axios.get("/searchTagById", {
                        params: {
                            ex_id: this.$route.params.exId
                        }
                    }).then((response) => {
                        console.log(response.data);
                        this.form.tags = response.data
                    })
                }).catch((error) => {
                    if (error.response.status == 400) {
                        // exhibition is not found
                        // this.$router.push("/error400")
                    }
                });
        },
        getUserInfo() {
            // let isAdmin = this.$cookies.get("cookieName") != null;
            let role = this.$cookies.get("cookieRole");
            console.log(role);
            if( role == "博物馆" || role == "管理员") {
                this.isAdmin = true;
            }

            let isLogin = (this.$cookies.get("cookieName") != null);

            if (isLogin != null) {
                this.isLogin = isLogin;
            }
        },
        getisSub() {
            axios.post(`/subscribe/isSub`, {
                user_id: this.$cookies.get("cookieAccount"),
                ex_id: this.$route.params.exId
            }).then((response) => {
                if (response.data === 1) {
                    this.isSubscribed = true;
                    this.getSubDate();
                }
                else if (response.data === 0) {
                    this.isSubscribed = false;
                }
                else {
                    console.log("获取订阅信息失败")
                }
            }).catch((error) => {
                console.log(error)
            });
        },
        getSubDate() {
            axios.post(`/subscribe/getSubDate`, {
                user_id: this.$cookies.get("cookieAccount"),
                ex_id: this.$route.params.exId
            }).then((response) => {
                if (response.data !== -1) {
                    this.isSubscribed = true;
                    this.subscribeDate = response.data;
                    console.log(this.subscribeDate);
                }
                else {
                    console.log("获取订阅信息失败")
                }
            }).catch((error) => {
                console.log(error)
            });
        },
        onChangeInfo() {
            // TODO: 与 User 登录对接，主要为字段名
            // redirect
            this.$router.push(`/alterinfo/${this.$route.params.exId}`);
        },
        onSubscribe() {
            console.log(this.subscribeDate)
            if (this.subscribeDate === '' || this.subscribeDate === null || this.subscribeDate === undefined) {
                this.$message({
                    message: '请选择订阅日期',
                    type: 'warning'
                });
            }
            else {
                console.log(this.subscribeDate)
                axios.post(`/subscribe/postUesrSub`, {
                    user_id: this.$cookies.get("cookieAccount"),
                    ex_id: this.$route.params.exId,
                    date: this.subscribeDate
                }).then((response) => {
                    if (response.data === 1) {
                        this.$message({
                            message: '订阅成功',
                            type: 'success'
                        });
                        this.isSubscribed = true;
                    }
                    else if (response.data === -1) {
                        this.$message({
                            message: '订阅时间不在展览时间内',
                            type: 'warning'
                        });
                    }
                    else {
                        this.$message({
                            message: '订阅失败',
                            type: 'error'
                        });
                    }
                }).catch((error) => {
                    this.$message({
                        message: '订阅失败',
                        type: 'error'
                    });
                });
            }
        },
        cancelSub() {
            console.log(this.subscribeDate)
            axios.post(`/subscribe/cancelUesrSub`, {
                user_id: this.$cookies.get("cookieAccount"),
                ex_id: this.$route.params.exId
            }).then((response) => {
                if (response.data === 1) {
                    this.$message({
                        message: '成功取消订阅',
                        type: 'success'
                    });
                    this.isSubscribed = false;
                }
                else {
                    this.$message({
                        message: '取消订阅失败',
                        type: 'error'
                    });
                }
            }).catch((error) => {
                this.$message({
                    message: '取消订阅失败',
                    type: 'error'
                });
            });
        },
        onShareExhibition() {
            console.log("share")
            this.showPopup = !this.showPopup

        }
    },
    mounted() {
        this.getRequest();
        this.getUserInfo();
        this.getisSub();
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
.basic_info {
    padding-top: 30px;
}

.simple_info {
    margin-left: 20px;
}

.el-tag {
    margin-left: 5px;
}

.sub_info {
    margin-top: 5px;
}

.long_intro {
    padding-left: 50px;
}

.el-divider {
    height: 100%;
}

.subscribe_button {
    margin-top: 20px;
}

.border_up {
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
    z-index: 100;
    /* 最前显示 */
}

.popup button {
    margin-top: 10px;
}
</style>