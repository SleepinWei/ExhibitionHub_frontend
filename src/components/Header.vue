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
            <el-row v-if="!isLogin" justify="center">
                <router-link class="link" to="/login">
                    登录
                </router-link>
            </el-row>
            <el-row v-if="isLogin" justify="center">
                <!-- <router-link :to="{path:'/personal'}" style="text-decoration: none;"> -->
                    <el-icon>
                        <Avatar/>
                    </el-icon>
                    <el-dropdown>
                        <div class="el-dropdown-link">
                            {{ username }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </div>
                        <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="toPerson()">个人中心</el-dropdown-item>
                            <el-dropdown-item @click="logout()">退出账号</el-dropdown-item>
                        </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                <!-- </router-link> -->
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
// import { ref } from 'vue'

export default {
    data() {
        return {
            username: this.$cookies.get("cookieName"),
            uid : this.$cookies.get("cookieAccount"),
            isLogin: false,
            inputText: "",
        };
    },
    methods: {
        checkLoginStatus() {
            if (this.$cookies.get("cookieName") != null) {
                this.isLogin = true;
            }
        },
        submitSearch() {
            this.$router.push({ path: "/search", query: { querytext: this.inputText } });
        },
        keyListener(event) {
            if (event.keyCode == 13) {
                this.submitSearch();
            }
        },
        logout(){
            this.$confirm('您确定要退出当前账户吗?', '提示', {
                confirmButtonText: '确定',  //确认按钮的文字显示
                type: 'warning',
                center: true, //文字居中显示
                })
                .then(() => {
                    this.$axios.post('/logout').then(res=>res.data)
                    .then(res=>{
                        console.log(res)
                        this.$message({
                            type:'success',
                            message:'退出账户成功'
                        })
                        this.isLogin = false
                        this.$router.push("/login")
                        sessionStorage.clear()
                    })
                .catch(() => {
                    this.$message({
                        type:'info',
                        message:'取消退出登录'
                    })
                })    
            })
        },
        toPerson(){
            console.log("toperson")
            this.$router.push("/personal")
        },
        loadUserName(){
            this.$axios.get("http://localhost:8080/user/find/"+this.uid)
            .then((response)=>{
                console.log(response)
                this.username=response.data.username//user赋值
            })
            .catch(response=>{
                console.log("请求失败")
            })
        },
    },
    setup() {

    },
    mounted() {
        this.checkLoginStatus();
        // window.addEventListener('keydown', this.keyListener,true);
    },
    unmounted() {
        // window.removeEventListener('keydown', this.keyListener,false);
    },
    beforeMount() {
        this.loadUserName()
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