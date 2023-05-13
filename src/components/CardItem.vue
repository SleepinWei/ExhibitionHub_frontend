<!--
 * @Author: yingxin wang
 * @Date: 2023-04-25 17:20:15
 * @LastEditors: yingxin wang
 * @LastEditTime: 2023-05-13 15:27:38
 * @dis: 卡片布局修改为动态效果
-->
<template>
    <div class="top">
        <div v-for="item in this.result" class="it" style="margin-bottom: 35px;" @click.native="jumpToExInfo(item.id)">
            <div class="content">
                <div class="card-back">
                    <div class="card-back-content">
                        <img :src="'http://127.0.0.1:8080/' + item.poster_url" style="width: 100%">
                    </div>
                </div>
                <div class="card-front">

                    <div class="img">
                        <div class="circle">
                        </div>
                        <div class="circle" id="right">
                        </div>
                        <div class="circle" id="bottom">
                        </div>
                    </div>

                    <div class="card-front-content">
                        <div class="card-title">{{ item.name }}</div>
                        <div class="dis-box">
                            <div class="dis">
                                <p class="dis">
                                    <strong>{{ item.introduction }}</strong>
                                </p>
                            </div>
                            <p class="it-footer">
                                {{ item.begin_date }} - {{ item.end_date }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: ['result'],
    mounted() {
        console.log(this.params);
    },
    methods: {
        jumpToExInfo(id) {
            this.$router.push(`/exhibition/${id}`)
        }
    }
};
</script>

<style>
.top {
    display: grid;
    grid-template-columns: repeat(4, 225px);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
}

.top>div {
    flex: 1 0 0;
    line-height: 1.2;
}

.top .it {
    width: 210px;
    height: 280px;
    overflow: visible;
    margin-bottom: 10px;
    margin-right: 10px;
}

.top .it:nth-of-type(4n) {
    margin-right: 0;
}

.content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 300ms;
    box-shadow: 0px 0px 10px 1px #000000ee;
    border-radius: 5px;
}

.card-front,
.card-back {
    background-color: #D4DFE6;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-card-backface-visibility: hidden;
    border-radius: 5px;
    overflow: hidden;
}

.card-back {
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    overflow: hidden;
}

.card-back::before {
    position: absolute;
    content: ' ';
    display: block;
    width: 160px;
    height: 160%;
    background: linear-gradient(90deg, transparent, #11659a, #4c40d7, #8fb0e4, #9d9bd0, transparent);
    animation: rotation_481 5000ms infinite linear;
}

.card-back-content {
    position: absolute;
    width: 99%;
    height: 99%;
    background-color: #D4DFE6;
    border-radius: 5px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
}

.it:hover .content {
    transform: rotateY(180deg);
}

@keyframes rotation_481 {
    0% {
        transform: rotateZ(0deg);
    }

    0% {
        transform: rotateZ(360deg);
    }
}

.card-front {
    transform: rotateY(180deg);
    color: white;
}

.card-front .card-front-content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}


.card-front-content .card-title {
    margin-right: 5px;
    width: fit-content;
    font-size: 18px;
    color: dimgrey;
    text-align: left;
}

.dis-box {
    box-shadow: 0px 0px 10px 5px #00000088;
    width: 100%;
    padding: 8px;
    background-color: #00000099;
    backdrop-filter: blur(5px);
    border-radius: 5px;
    justify-content: left;
    text-align: left;
}

.dis {
    font-size: 12px;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
}

.dis p {
    width: 85%;
}

.it-footer {
    color: #ffffff88;
    margin-top: 5px;
    font-size: 15px;
}

.card-front .img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.circle {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: #ffbb66;
    position: relative;
    filter: blur(15px);
    animation: floating 2600ms infinite linear;
}

#bottom {
    background-color: #ff8866;
    left: 50px;
    top: 0px;
    width: 150px;
    height: 150px;
    animation-delay: -800ms;
}

#right {
    background-color: #ff2233;
    left: 160px;
    top: -80px;
    width: 30px;
    height: 30px;
    animation-delay: -1800ms;
}

@keyframes floating {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(10px);
    }

    100% {
        transform: translateY(0px);
    }
}
</style>
  