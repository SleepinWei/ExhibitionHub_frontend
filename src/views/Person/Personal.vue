<script setup>
import HeaderItem from '../../components/Header.vue'
</script>
<template>
    <HeaderItem />
    <el-container>
        <!--标题-->
        
        
        <el-container>
            <!--侧边栏-->
            <el-aside width="200px">
                <el-menu
                    :default-active="this.$router.path"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    :router="true"
                    >
                <!--个人资料-->
                <el-menu-item index = "/info">
                    <i class="el-icon-menu"></i>
                    <span slot="title">个人资料</span>
                </el-menu-item>
                <!--我的订阅-->
                 <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">我的订阅</span>
                </el-menu-item>
                <!--更多-->
                <el-menu-item index="3">
                    <i class="el-icon-menu"></i>
                    <span slot="title">更多</span>
                </el-menu-item>
                </el-menu>
            </el-aside>

            <!--主体区域-->
            <el-main>
                <router-view></router-view>
            </el-main>

        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "index",
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
        height:100%
        
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 100vh;
        height:100vh;
    }

    .el-main {
        background-color: #ffffff;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 100%;
    }
</style>

