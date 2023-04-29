<script setup>
    import HeaderItem from '../../components/HeaderMenu.vue'
</script>

<template>
    <HeaderItem />
    <div class="container">
        <!-- 导航栏 -->
        <el-menu :default-active="activeIndex" class="menu" mode="horizontal">
            <el-menu-item index="1">我的订阅</el-menu-item>
            <el-menu-item index="2">更多</el-menu-item>
        </el-menu>
  
        <el-row class="main">
            <!-- 左侧头像和个人信息 -->
            <el-col :xs="24" :sm="24" :md="8" class="left-col">
                <el-card class="card">
                    <div class="avatar-container">
                        <!-- 头像 -->
                        <img src="../../assets/1.jpg" alt="avatar" class="avatar">
                        <div v-if="!isEditing" >
                            <!-- 昵称 -->
                            <h3>{{ user.username }}</h3>
                            <!-- 个人简介 -->
                            <p class="p-description">个人简介：{{ user.biography }}</p>
                            <!-- 修改信息按钮/表单 -->
                            <el-button class="button" @click="isEditing = true">修改基本信息</el-button>
                        </div>
                        
                        <div v-if="isEditing" >
                            <el-form  ref="subuser" :model="subuser" label-position="top" label-width="80px">
                                <el-form-item label="ID：">
                                    <el-input v-model="subuser.id" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="用户类型：" >
                                    <el-input v-model="subuser.role" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="昵称：">
                                    <el-input v-model="subuser.username"></el-input>
                                </el-form-item>
                                <el-form-item label="性别：">
                                    <el-radio-group v-model="subuser.sex">
                                        <el-radio label="男" />
                                        <el-radio label="女" />
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="邮箱：" >
                                    <el-input v-model="subuser.email" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="个人简介">
                                    <el-input  v-model="subuser.biography" maxlength="20" type="textarea" placeholder="请输入个人简介" ></el-input>
                                </el-form-item>

                                <el-form-item>
                                    <el-button class="button" @click="changeBasicInfo">保存基本信息</el-button>
                                </el-form-item>
                                <el-form-item>
                                    <el-button class="button" @click="cancel()">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        
                    </div>
                </el-card>
            </el-col>
  
            <!-- 右侧更多信息 -->
            <el-col :xs="24" :sm="24" :md="16" class="right-col">
            <el-card class="card">
                <h2>个人订阅</h2>
            </el-card>
            </el-col>
      </el-row>
      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        uid:'1',
        user:[],
        subuser:[],
        isEditing:false, //是否编辑信息
        message:'',      //弹窗信息显示
      }
    },
    created:function(){//根据Id查询用户信息
      this.$axios.get("user/find/"+this.uid)
      .then((response)=>{
        console.log("created"),
        this.user=response.data//user赋值
        this.subuser=this.user
      })
      .catch(response=>{
        console.log("请求失败")
      })
    },
    methods: {
      //修改基本信息，用户名、性别、出生日期
      changeBasicInfo() {
        //表单信息复制User，传回后端修改用户信息
        this.user.username=this.subuser.username
        this.user.sex=this.subuser.sex
        this.user.biography=this.subuser.biography
        //axios.put更新信息
        this.$axios.put("user",this.user)
        .then((response)=>{
          console.log("what+"+response.data),
          this.message=response.data
          //弹框提示信息
          if(this.message){
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
          }
          else{
            this.$message({
              message: '没有修改，无需保存！',
              type: 'warning'
            })
          }
        })
       .catch(response=>{
          console.log("请求失败")
          this.message=response.data//请求失败
          this.$message({
            message: '请求失败',
            type: 'error'
          })
        })
      },
      cancel(){
        this.isEditing = false
        this.$axios.get("user/find/"+this.uid)
        .then((response)=>{
            console.log("created"),
            this.user=response.data
            this.subuser=this.user
        })
        .catch(response=>{
            console.log("请求失败")
        })
      }
    }
  }
  </script>
  
  <style scoped>
    .container {
        margin: 20px;
    }
    
    .menu {
        border: none;
        background-color: transparent;
        display: flex;
        justify-content: center;
    }

    .main {
        margin-top: 20px;
    }
    
    .left-col {
        display: flex;
        justify-content: center;
        align-items: center;
        /* margin-bottom: 80px; */
    }
    
    .card {
        display: flex;
        align-items: center;
    }
    
    .avatar {
    display: block;
    margin: 0 auto;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    }

    .name {
    font-size: 24px;
    margin-bottom: 10px;
    }

    .description {
    margin-bottom: 5px;
    }

    .list {
    list-style: none;
    margin: 0;
    padding: 0;
    }

    .list li {
    margin-bottom: 20px;
    }

    .list h3 {
    margin-bottom: 5px;
    }

    .list p {
        margin: 0;
    }

    .avatar-container {
    display: flex;
    flex-direction: column;
    }

    .button {
    width: 200px;
    margin: 0 auto; display: block;
    }

</style>
  