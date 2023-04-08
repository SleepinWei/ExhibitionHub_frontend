<!--
 * @Author: yingxin wang
 * @Date: 2023-04-04 16:20:22
 * @LastEditors: yingxin wang
 * @LastEditTime: 2023-04-08 15:51:21
 * @Description: Login Item
-->
<template>
    <div class="frame">
        <div class="frame-input">
            <h1>登录</h1>
            <el-input class="frame-el-input" v-model="input" placeholder="用户名" />
            <el-input class="frame-el-input" v-model="input" placeholder="密码" />
            <div class="frame-el-button">
                <el-button type="primary" size="large">登录</el-button>
            </div>
            <el-row style="text-align: center;justify-content: center;margin-left: 10px;">
                <el-link type="primary">用户注册</el-link>
                <el-link type="primary" style="margin-left: 10px;">忘记密码</el-link>
            </el-row>
        </div>
    </div>
</template>

<style scoped>
.frame {
    border: 1px solid gainsboro;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    width: 400px;
    height: 350px;
    padding: 20px 35px 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -210px 0 0 -300px;
}

.frame h1 {
    text-align: center;
}

.frame-input {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 70%;
    height: auto;
    margin-bottom: 10px;
    margin: auto;
}

.frame-input> :not(:last-child) {
    margin-bottom: 20px;
}

.frame-el-input {
    margin-bottom: 20px;
    height: 40px;
}

.frame-el-button {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
</style>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')
</script>
