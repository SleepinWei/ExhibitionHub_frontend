<!--
 * @Author: yingxin wang
 * @Date: 2023-04-04 16:20:22
 * @LastEditors: yingxin wang
 * @LastEditTime: 2023-04-08 14:44:18
 * @Description: Login Item
-->
<template>
    <div class="frame">
        <div class="frame-input">
            <h1 class="">登录</h1>
            <el-input class="frame-el-input" v-model="input" placeholder="用户名" />
            <el-input class="frame-el-input" v-model="input" placeholder="密码" />
            <div class="frame-el-button">
                <el-button type="primary" size="large">登录</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.frame {
    border: 1px solid gainsboro;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    height: 350px;
    width: 420px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.frame h1 {
    text-align: center;
}

.frame-input {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 60%;
    height: auto;
    margin-bottom: 10px;
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
