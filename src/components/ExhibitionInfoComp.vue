<template>
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
                <el-tag class="hvr-shadow" v-for="tag in form.tag_list"> {{ tag.name }} </el-tag>
            </el-row>
            <el-row class="subscribe_button">
                <div v-if="isLogin && isSubscribed">
                    <el-tag size="large" style="margin-right: 20px;">已订阅</el-tag>
                    <el-tag size="large" style="margin-right: 20px;">订阅时间：{{ subscribeDate }}</el-tag>
                </div>
            </el-row>
            <el-row class="subscribe_button">
                <div v-if="showPopup" class="popup">
                    <ImageDownloadItem :poster_url="form.poster_url" :tolink="form.link" @close="onShareExhibition" />
                </div>
            </el-row>
        </el-col>
    </el-row>

    <el-row class="ex-intro-font">
        <h3>详细介绍</h3>
    </el-row>
    <el-row class="long_intro border_up">
        <div v-html="long_intros"></div>
    </el-row>
</template>

<script>
import axios from '@/http.ts'
import SvgIcon from '@jamescoyle/vue-icon';
import {
    mdiCalendarClock, mdiAccountGroup, mdiCashMultiple,
    mdiMapMarkerRadius, mdiLink, mdiTagHeart, mdiTextBoxEditOutline,
    mdiShareVariantOutline, mdiBellRingOutline, mdiBellCancelOutline
} from '@mdi/js';

export default {
    props: ['form'],
    components: {
        SvgIcon
    },
    methods: {

    },
    mounted() {

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