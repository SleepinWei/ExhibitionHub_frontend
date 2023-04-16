<template>
    <el-row align="middle" class="header">
        <el-col :span="4" :offset="1">
            <router-link class="link" to="/">
                    Exhibition Hub
            </router-link>
        </el-col>
        <el-col :span="4">
            <el-row :gutter="2">
            <el-col :span="8">
                <router-link class="link" to="/">
                        首页
                </router-link>
            </el-col>
            <el-col :span="8">
                <router-link class="link" to="/search">
                        分类
                </router-link>
            </el-col>
            </el-row>
        </el-col>

        <!-- 搜索栏 -->
        <el-col :span="3">
            <!-- 空占位 -->
        </el-col>
        <el-col :span="8">
            <el-input
                v-model="inputText" 
                size="large"
                placeholder="Input"
            >
            <template #prepend>
                <el-button @click="submitSearch">
                    <el-icon>
                        <Search />         
                    </el-icon>
                </el-button>
            </template>
            </el-input>
        </el-col>

        <!-- 用户头像 -->
        <el-col :span="4">
            <el-row v-if="isLogin" justify="center">
                <router-link to="/login">
                    登录
                </router-link>
            </el-row>
            <el-row v-if="!isLogin" justify="center">
                <router-link :to="{path:'/personal'}">
                {{ username }}
                </router-link>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
// import { ref } from 'vue'

export default {
    data() {
        return {
            username: "test_username",
            isLogin: false,
            inputText: "",
        };
    },
    methods: {
        checkLoginStatus() {

        },
        submitSearch() {
            this.$router.push({ path: "/search", query: { querytext: this.inputText } });
        },
        keyListener(event) {
            if (event.keyCode == 13) {
                this.submitSearch();
            }
        }
    },
    setup() {

    },
    mounted() {
        this.checkLoginStatus();
        window.addEventListener('keydown', this.keyListener,true);
    },
    unmounted() {
        window.removeEventListener('keydown', this.keyListener,false);
    }
}
</script>

<style>
.header {
    width: 100%;
    height: 70px;
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, .2);
}
.link{
    text-decoration: none;
}
</style>