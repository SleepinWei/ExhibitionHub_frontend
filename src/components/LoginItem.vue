<!--
 * @Author: yingxin wang
 * @Date: 2023-04-04 16:20:22
 * @LastEditors: yingxin wang
 * @LastEditTime: 2023-04-08 16:28:06
 * @Description: Login Item
-->
<template>
    <div class="frame">
        <div class="frame-input">
            <h1>登录</h1>
            <el-input class="frame-el-input" v-model="user.idOrEmail" placeholder="用户名" />
            <el-input class="frame-el-input" v-model="user.password" placeholder="密码" type="password"/>
            <div class="frame-el-button">
                <el-button type="primary" size="large" @click="login()">登录</el-button>
            </div>
            <el-row style="text-align: center;justify-content: center;margin-left: 10px;">
                <!-- <el-link type="primary">用户注册</el-link> -->
                <router-link to="/register" type="primary">用户注册</router-link>
                <!-- <el-link type="primary" style="margin-left: 10px;">忘记密码</el-link> -->
                <router-link to="/resetPassword" style="margin-left:10px">忘记密码</router-link>
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


<script>
    import qs from 'qs';
    import {ElMessage} from 'element-plus'
    export default {
            data() {return {
                user : {
                    // 这里的数据保证跟数据接口一致
                    idOrEmail : '',
                    password : '',
                }
            }},
            methods : {
                /*register() {
                    this.$Axios.post(
                        "https://www.xxx.com/member/xxxxx.php",
                        qs.stringify(this.user),
                        {
                            // 这里qs使用的stringify方法可以将对象序列化，形成json的形式进行数据获取
                            headers : {"content-type": "application/x-www-form-urlencoded"}
                        }
                    ).then( res => {
                        console.log(res);
                        // 当获取数据的状态码等于1时，相当于获取到了
                        if(res.data.status == 1) {
                            var flag = window.confirm("确定注册码");
                            if(flag) {
                                // 跳转到登录页面
                                this.$router.replace("/login");
                            }
                        }
                    })
                },*/
                login(){
				this.$axios.post('/login',qs.stringify(this.user)) // 加了个stringify就不404辣？!
				.then((res)=>{
					if(res.data.code == 300 ){// 300：是普通用户，跳转普通用户界面
						this.$router.push("/personal");//用户主页
                        this.$message({
                            message:'登陆成功！',
                            type:'success'
                        })
					}
                    else if(res.data.code == 400){// 400：是管理员，跳转管理员界面
                        this.$router.push("/personal");//管理员主页
                        this.$message({
                            message:'登陆成功！',
                            type:'success'
                        })
                    }
                    else{
                        console.log(res);
                        console.log(res.data.msg);
                        this.$message({
                            message:'账号不存在或密码错误，登陆失败！',
                            type:'success'
                        })
                    }
				})
				.catch(err=>{
					console.log(err);
				})
			}
            }
        }
</script>
    


