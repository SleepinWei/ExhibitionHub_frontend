<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item index="0"><router-link to="/" style="text-decoration: none;">首页</router-link></el-menu-item>
      <div class="flex-grow" />
      <el-sub-menu index="1">
        <template #title>
            Welcome
            <div v-if="username">,{{ username }}</div>
        </template> 
        <el-menu-item index="1-1" @click="toPerson()">个人中心</el-menu-item>
        <el-menu-item index="1-2" @click="logout()">退出账号</el-menu-item>
      </el-sub-menu>
    </el-menu>
</template>

<script>
    export default {
            data() {return {
                username : '',
                uid : this.$cookies.get("cookieAccount")
            }},
            methods : {
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
                logout(){
                    this.$confirm('您确定要退出当前账户吗?', '提示', {
                        confirmButtonText: '确定',  //确认按钮的文字显示
                        type: 'warning',
                        center: true, //文字居中显示
                        })
                        .then(() => {
                            this.$axios.get('http://localhost:8080/logout').then(res=>res.data)
                            .then(res=>{
                                console.log(res)
                                this.$message({
                                    type:'success',
                                    message:'退出账户成功'
                                })
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
            },
            beforeMount() {
                this.loadUserName()
            }
            
        }
</script>