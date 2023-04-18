<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item index="0">首页</el-menu-item>
      <div class="flex-grow" />
      <el-sub-menu index="1">
        <template #title>
            Welcome
            <div v-if="user.account">,{{ user.account }}</div>
        </template> 
        <el-menu-item index="1-1">个人中心</el-menu-item>
        <el-menu-item index="1-2" @click="logout()">退出账号</el-menu-item>
      </el-sub-menu>
    </el-menu>
</template>

<script>
    export default {
            data() {return {
                user : {
                    // 这里的数据保证跟数据接口一致
                    account : '',
                    password : '',
                }
            }},
            methods : {
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
                     
                    
                    
				// this.$axios.post('http://localhost:8080/login',qs.stringify(this.user)) // 加了个stringify就不404辣？!
				// .then(res=>{
				// 	if(res.data.code == 300 ){// 300：是普通用户，跳转普通用户界面
				// 		this.$router.replace("/regularuser");//用户主页
				// 	}
                //     else if(res.data.code == 400){// 400：是管理员，跳转管理员界面
                //         this.$router.replace("/administrator");//管理员主页
                //     }
                //     else{
                //         console.log(res.data.msg);
                //     }
				// })
				// .catch(err=>{
				// 	console.log(err);
				// })
			}
            }
        }
</script>