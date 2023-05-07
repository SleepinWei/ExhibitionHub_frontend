<!--
 * @Author: yingxin wang
 * @Date: 2023-04-25 17:20:15
 * @LastEditors: yingxin wang
 * @LastEditTime: 2023-05-07 15:30:47
 * @Description: 卡片布局修改为动态效果
-->
<template>
    <div class="container">
        <div v-for="item in this.result">
            <div class="card" style="margin-bottom: 35px;" @click.native="jumpToExInfo(item.id)">
                <div class="content">
                    <div class="back">
                        <div class="back-content">
                            <img :src="'http://127.0.0.1:8080/' + item.poster_url" style="width: 100%">
                        </div>
                    </div>
                    <div class="front">

                        <div class="img">
                            <div class="circle">
                            </div>
                            <div class="circle" id="right">
                            </div>
                            <div class="circle" id="bottom">
                            </div>
                        </div>

                        <div class="front-content">
                            <small class="title">{{ item.name }}</small>
                            <div class="description-box">
                                <div class="description">
                                    <p class="description">
                                        <strong>{{ item.introduction }}</strong>
                                    </p>
                                </div>
                                <p class="card-footer">
                                    {{ item.begin_date }} - {{ item.end_date }}
                                </p>
                            </div>
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
.container {
    gap: 40px;
    padding: 30px;
    column-count: 4;
    display: flow-root;
    flex-direction: row;
    text-align: left;
    margin-left: 50px;
}

.container>div {
    flex: 1 0 0;
    line-height: 1.2;
}

.card {
    overflow: visible;

    /**要改大小在这里改 */
    width: 250px;
    height: 340px;
}

.content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 300ms;
    box-shadow: 0px 0px 10px 1px #000000ee;
    border-radius: 5px;
}

.front,
.back {
    background-color: #D4DFE6;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 5px;
    overflow: hidden;
}

.back {
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    overflow: hidden;
}

.back::before {
    position: absolute;
    content: ' ';
    display: block;
    width: 160px;
    height: 160%;
    background: linear-gradient(90deg, transparent, #11659a, #4c40d7, #8fb0e4, #9d9bd0, transparent);
    animation: rotation_481 5000ms infinite linear;
}

.back-content {
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

.card:hover .content {
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

.front {
    transform: rotateY(180deg);
    color: white;
}

.front .front-content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}


.front-content .title {
    margin-right: 5px;
    width: fit-content;
    font-size: x-large;
    color: dimgrey;
}

.description-box {
    box-shadow: 0px 0px 10px 5px #00000088;
    width: 100%;
    padding: 10px;
    background-color: #00000099;
    backdrop-filter: blur(5px);
    border-radius: 5px;
}

.description {
    font-size: 13px;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
}

.description p {
    width: 80%;
}

.card-footer {
    color: #ffffff88;
    margin-top: 5px;
    font-size: 16px;
}

.front .img {
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
  