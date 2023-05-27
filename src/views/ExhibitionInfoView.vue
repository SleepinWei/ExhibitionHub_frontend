<template>
    <el-row>
        <el-col :span="18">
            <el-row class="basic_info">
                <el-col :span="8" :offset="0" class="poster">
                    <el-row justify="center" class="ex-image">
                        <el-image class="hvr-shadow" :src="form.poster_url" fit="contain" style="width: 80%;">
                        </el-image>
                    </el-row>
                </el-col>
                <el-col :span="12" :offset="0" class="simple_info">
                    <el-row class="sub_info" align="middle">
                        <h2 class="ex-head-font">
                            {{ form.name }}
                        </h2>
                    </el-row>
                    <el-row class="sub_info">
                        <svg-icon class="ex-icon" type="mdi" :path="mdiCalendarClock"></svg-icon>
                        时&ensp;&ensp;间&emsp; {{ form.begin_date }} - {{ form.end_date }}
                    </el-row>
                    <el-row class="sub_info">
                        <svg-icon class="ex-icon" type="mdi" :path="mdiAccountGroup"></svg-icon>
                        主办方&emsp; {{ form.organizer }}
                    </el-row>
                    <el-row class="sub_info">
                        <svg-icon class="ex-icon" type="mdi" :path="mdiCashMultiple"></svg-icon>
                        票&ensp;&ensp;价&emsp; {{ form.ticket_info }}
                    </el-row>
                    <el-row class="sub_info">
                        <svg-icon class="ex-icon" type="mdi" :path="mdiMapMarkerRadius"></svg-icon>
                        地&ensp;&ensp;点&emsp; {{ form.province }} - {{ form.city }} - {{ form.area }} - {{ form.address }}
                    </el-row>
                    <el-row class="sub_info">
                        <svg-icon class="ex-icon" type="mdi" :path="mdiLink"></svg-icon>
                        链&ensp;&ensp;接&emsp;&ensp; <a class="ex-a" :href="form.link">{{ form.link }}</a>
                    </el-row>
                    <el-row class="sub_info">
                        <svg-icon class="ex-icon" type="mdi" :path="mdiTagHeart"></svg-icon>
                        标&ensp;&ensp;签&emsp;
                        <el-tag class="hvr-shadow" v-for="tag in form.tag_list "> {{ tag.name }} </el-tag>
                    </el-row>
                    <el-row class="subscribe_button">
                        <div v-if="isLogin && isSubscribed">
                            <el-tag size="large" style="margin-right: 20px;">已订阅</el-tag>
                            <el-tag size="large" style="margin-right: 20px;">订阅时间：{{ subscribeDate }}</el-tag>
                        </div>
                    </el-row>
                    <el-row class="subscribe_button">
                        <div v-if="showPopup" class="popup">
                            <ImageDownloadItem :poster_url="form.poster_url" :tolink="form.link"
                                @close="onShareExhibition" />
                        </div>
                    </el-row>
                </el-col>
                <el-col :span="2" style="margin-top: 40px;margin-left: 10px;">
                    <button v-if="isAdmin" class="Btn" @click="onChangeInfo">
                        <div class="sign">
                            <svg-icon class="ex-icon" type="mdi" :path="mdiTextBoxEditOutline"></svg-icon>
                        </div>
                        <div class="text">&ensp;&ensp;修改</div>
                    </button>
                    <button v-if="isLogin" class="Btn" @click="onShareExhibition">
                        <div class="sign">
                            <svg-icon class="ex-icon" type="mdi" :path="mdiShareVariantOutline"></svg-icon>
                        </div>
                        <div class="text">&ensp;&ensp;分享</div>
                    </button>
                    <div v-if="isLogin && !isSubscribed" @mouseenter="showDatePicker = true">
                        <button class="Btn">
                            <div class="sign">
                                <svg-icon class="ex-icon" type="mdi" :path="mdiBellRingOutline"></svg-icon>
                            </div>
                            <div class="text">&ensp;订阅</div>
                        </button>
                    </div>
                    <div v-if="showDatePicker" class="ex-datePicker">
                        <el-date-picker v-model="subscribeDate" type="date" placeholder="选择日期" format="YYYY/MM/DD"
                            @change="onSubscribe" value-format="YYYY-MM-DD" :size="small"
                            @visible-change="handleVisibilityChange">
                        </el-date-picker>
                    </div>

                    <button v-if="isLogin && isSubscribed" class="Btn" @click="cancelSub">
                        <div class="sign">
                            <svg-icon class="ex-icon" type="mdi" :path="mdiBellCancelOutline"></svg-icon>
                        </div>
                        <div class="text">&ensp;取消</div>
                    </button>
                </el-col>
            </el-row>

            <el-row class="ex-intro-font">
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
            <el-row style="margin-top:25px">
                <h2 class="ex-head-font" style="font-size: 30px;">
                    推荐展览
                </h2>
            </el-row>
            <el-row>
                <div v-for="recommend in form.recommends">
                    <el-col :span="13">
                        <el-row justify="start" class="re-image">
                            <el-image class="clickable hvr-shadow" :src="recommend.poster_url" fit="contain"
                                style="width: 80%;" @click="jumpToExInfo(recommend.id)">
                            </el-image>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <h2 class="re-header">
                            {{ recommend.name }}
                        </h2>
                        <el-row class="re-time">
                            {{ recommend.begin_date }} - {{ recommend.end_date }}
                        </el-row>
                        <el-row class="sub_info">
                            ￥{{ recommend.ticket_info }}
                        </el-row>
                        <el-row class="re-foot"></el-row>
                    </el-col>
                </div>
            </el-row>
        </el-col>
    </el-row>
</template>

<script setup>
import ImageDownloadItem from '../components/ImageDownloadItem.vue'
</script >

<script>
import axios from '@/http.ts'
import SvgIcon from '@jamescoyle/vue-icon';
import {
    mdiCalendarClock, mdiAccountGroup, mdiCashMultiple,
    mdiMapMarkerRadius, mdiLink, mdiTagHeart, mdiTextBoxEditOutline,
    mdiShareVariantOutline, mdiBellRingOutline, mdiBellCancelOutline
} from '@mdi/js';

export default {
    components: {
        ImageDownloadItem,
        SvgIcon
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
                address: "",
                tag_list: [
                    {
                        id: 1,
                        name: "tag1"
                    },
                    {
                        id: 2,
                        name: "tag2"
                    }
                ],
                introduction: "some long introssssss\nssssssssssssssssssssssssssss\nssssssssssssssssssssss\
            ssssssssssssssssssssssssssssss",
                begin_time: "",
                end_time: "",
                recommends: [],
            },
            isAdmin: false,
            isLogin: false,
            isSubscribed: false,
            subscribeDate: '',
            showPopup: false,
            imageUrl: '',
            showDatePicker: false, // 是否显示日期选择器
        }
    },
    methods: {
        async getRequest() {
            axios.get(`/searchById`,
                {
                    params: {
                        exId: this.$route.params.exId
                    }
                })
                .then((response) => {
                    this.form = response.data;
                    this.form.poster_url = 'http://127.0.0.1:8080/' + response.data.poster_url;
                }).catch((error) => {
                    if (error.response.status == 400) {
                        // exhibition is not found
                        // this.$router.push("/error400")
                    }
                });
        },
        getUserInfo() {
            let role = this.$cookies.get("cookieRole");
            if (role == "博物馆" || role == "管理员") {
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
            this.showDatePicker = false;
            if (this.subscribeDate === '' || this.subscribeDate === null || this.subscribeDate === undefined) {
                this.$message({
                    message: '请选择订阅日期',
                    type: 'warning'
                });
            }
            else {
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
        },
        handleVisibilityChange(visibility) {
            console.log(visibility);
            if (visibility === false) {
                this.showDatePicker = false;
            }
            else
                this.showDatePicker = true;
        },
        searchRecommand() {
            axios.get(`/recommandEx/` + this.$route.params.exId
            ).then((response) => {
                this.form.recommends = []
                //只取两个
                for (var i = 0; i < 2; ++i) {
                    if (i < response.data.length) {
                        this.form.recommends.push(response.data[i]);
                        this.form.recommends[i].poster_url = 'http://127.0.0.1:8080/' + this.form.recommends[i].poster_url
                    }
                }
                console.log(this.form.recommends)
            })
        },
        jumpToExInfo(id) {
            this.$router.push(`/exhibition/${id}`)
        }
    },
    mounted() {
        this.getRequest();
        this.getUserInfo();
        this.getisSub();
        this.searchRecommand();
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

<style scoped>
.ex-image {
    display: flex;
    width: 100%;
    margin: auto;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.poster {
    margin-top: 20px;
    display: flex;
}

.basic_info {
    padding-top: 30px;
    margin-left: 10%;
}

.simple_info {
    margin-right: 5px;
}

.el-tag {
    margin-left: 5px;
}

.sub_info {
    font-weight: 300;
    margin-top: 8px;
    color: #333333;
}

.ex-icon {
    margin-right: 5px;
    color: #fafbfc;
}

.long_intro {
    padding-left: 50px;
    color: #333333;
    line-height: 35px;
    margin-left: 7%;
    width: 90%;
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
}

.ex-datePicker {
    position: relative;
    left: -60px;
    top: 0;
    width: 100%;
    height: 100%;
}

.popup button {
    margin-top: 10px;
}

@font-face {
    font-family: 'SourceHanSerifSC-VF';
    src: url('../assets/fonts/SourceHanSerifSC-VF.ttf') format('truetype');
}

.ex-head-font {
    font-family: 'SourceHanSerifSC-VF', cursive;
    font-size: 30px;
    font-weight: 500;
}

.ex-intro-font {
    padding-left: 50px;
    color: #333333;
    margin-left: 7%;
    line-height: 35px;
    padding-left: 50px;
    width: 90%;
    font-family: 'SourceHanSerifSC-VF', cursive;
    font-size: 20px;
    font-weight: 200;
    margin-top: 20px;
    border-top: 2px solid #00000010;
}

.Btn {
    margin-left: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: #6E84D6;
    margin-bottom: 10px;
}

.ex-a {
    color: #333;
    text-decoration: none;
}

.ex-a:hover {
    border-color: #999;
}

/* plus sign */
.sign {
    width: 100%;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.sign svg {
    width: 17px;
}

.sign svg path {
    fill: white;
}

/* text */
.text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.2em;
    font-weight: 400;
    transition-duration: .3s;
}

/* hover effect on button width */
.Btn:hover {
    width: 115px;
    border-radius: 40px;
    transition-duration: .3s;
}

.Btn:hover .sign {
    width: 30%;
    transition-duration: .3s;
    padding-left: 20px;
}

/* hover effect button's text */
.Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
    padding-right: 10px;
}

/* button click effect*/
.Btn:active {
    transform: translate(2px, 2px);
}

.re-image {
    width: 100%;
}

.re-header {
    font-size: 15px;
    font-weight: 300;
    margin-top: 20px;
}

.re-time {
    font-size: 12px;
    font-weight: 200;
    margin-bottom: 20px;
}

.re-foot {
    border-bottom: 2px solid #00000010;
    margin-bottom: 20px;
}

.clickable {
    cursor: pointer;
}
</style>