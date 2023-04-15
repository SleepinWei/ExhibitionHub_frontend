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
                v-model="input" 
                size="large"
                placeholder="Input"
            >
            <template #prepend>
                <el-button>
                    <el-icon>
                        <Search />         
                    </el-icon>
                </el-button>
            </template>
            </el-input>
        </el-col>

        <!-- 用户头像 -->
        <el-col :span="4">
            <el-row justify="center">
                用户名
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
// import { ref } from 'vue'

</script>

<style>
.header {
    width: 100%;
    height: 50px;
}
.link{
    text-decoration: none;
}
</style>