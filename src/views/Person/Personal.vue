<script setup>
import HeaderItem from '../../components/Header.vue'
import MuseumReviewItem from '../../components/MuseumReview.vue'
import MuseumSubmitItem from '../../components/MuseumSubmitted.vue'
import AdminAuditItem from '../../components/AdminAudit.vue'
import AdminPassedItem from '../../components/AdminPassed.vue'
import SubscribeItem from '../../components/SubscribeItem.vue'
</script>

<template>
  <HeaderItem />
  <div class="container">
    <!-- 导航栏 -->
    <div v-if="user.role === '普通用户'">
      <el-menu :default-active="activeIndex" class="menu" mode="horizontal">
        <!--  -->
        <el-menu-item index="1">我的订阅</el-menu-item>
        <el-menu-item index="2">更多</el-menu-item>
      </el-menu>
    </div>
    <div v-else-if="user.role === '博物馆'">
      <!--  -->
      <el-menu :default-active="activeIndex" class="menu" mode="horizontal">
        <el-menu-item index="1" @click="ToReview()">待审核展览</el-menu-item>
        <el-menu-item index="2" @click="ToSubmit()">已审核展览</el-menu-item>
      </el-menu>
    </div>
    <div v-else-if="user.role === '管理员'">
      <!--  -->
      <el-menu :default-active="activeIndex" class="menu" mode="horizontal">
        <el-menu-item index="1" @click="ToAudit()">待审核展览</el-menu-item>
        <el-menu-item index="2" @click="ToPassed()">已审核展览</el-menu-item>
      </el-menu>
    </div>


    <el-row class="main">
      <!-- 左侧头像和个人信息 -->
      <el-col :xs="24" :sm="24" :md="8" class="left-col">
        <el-card class="card">
          <div class="avatar-container">
            <!-- 头像 -->
            <el-upload action="http://localhost:8080/test/upload" :data="{ uid: uid }" :show-file-list="false"
              :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img :src="imageUrl" alt="avatar" class="avatar">

            </el-upload>
            <!-- <img src="../../assets/1.jpg" alt="avatar" class="avatar"> -->

            <div v-if="!isEditing">
              <!-- 昵称 -->
              <h3>{{ user.username }}</h3>
              <!-- 个人简介 -->
              <p class="p-description">个人简介：{{ user.biography }}</p>
              <!-- 修改信息按钮/表单 -->
              <el-button class="button" @click="isEditing = true">修改基本信息</el-button>
            </div>

            <div v-if="isEditing">
              <el-form ref="subuser" :model="subuser" label-position="top" label-width="80px">
                <el-form-item label="ID：">
                  <el-input v-model="subuser.id" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户类型：">
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
                <el-form-item label="邮箱：">
                  <el-input v-model="subuser.email" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="个人简介">
                  <el-input v-model="subuser.biography" maxlength="20" type="textarea"
                    placeholder="请输入个人简介，不超过20字"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button class="button" @click="changeBasicInfo()">保存基本信息</el-button>
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
        <el-card class="card" :body-style="{ padding: '10px', height: '100%', width: '98%' }">
          <!--  -->
          <div v-if="user.role === '普通用户'">
            <h2>我的订阅</h2>
            <div>
              <SubscribeItem />
            </div>
            <!--  -->
          </div>
          <div v-else-if="user.role === '博物馆'">
            <div v-if="museumToReview">
              <MuseumReviewItem />
            </div>
            <div v-else-if="museumSubmitted">
              <MuseumSubmitItem />
            </div>
          </div>
          <div v-else-if="user.role === '管理员'">
            <div v-if="adminAudit">
              <AdminAuditItem />
            </div>
            <div v-else-if="adminPassed">
              <AdminPassedItem />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>
  
<script>
export default {
  data() {
    return {
      uid: this.$cookies.get("cookieAccount"),
      // uid:'1',

      user: [],
      subuser: [],
      isEditing: false, //是否编辑信息
      message: '',      //弹窗信息显示
      imageUrl: '',

      museumToReview: true,
      museumSubmitted: false,
      adminAudit: true,
      adminPassed: false
    }
  },
  created: function () {//根据Id查询用户信息
    this.$axios.get("/user/find/" + this.uid)
      .then((response) => {
        console.log("created:user/find"),
          this.user = response.data//user赋值
        this.subuser = this.user
      })
      .catch(response => {
        console.log("请求失败")
      }),

      this.$axios.get("/user/load_avatar/" + this.uid, {
        responseType: 'arraybuffer',
      })
        .then((response) => {
          const blob = new Blob([response.data], {
            type: 'image/jpeg', // 根据实际情况设置图片类型
          });
          this.imageUrl = URL.createObjectURL(blob);
          console.log("wwwwww")
        })
        .catch((error) => {
          console.error(error);
        });


  },
  methods: {
    //修改基本信息，用户名、性别、出生日期
    changeBasicInfo() {
      //表单信息复制User，传回后端修改用户信息
      this.user.username = this.subuser.username
      this.user.sex = this.subuser.sex
      this.user.biography = this.subuser.biography
      //axios.put更新信息
      this.$axios.put("user", this.user)
        .then((response) => {
          console.log("what+" + response.data),
            this.message = response.data
          //弹框提示信息
          if (this.message) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
          }
          else {
            this.$message({
              message: '没有修改，无需保存！',
              type: 'warning'
            })
          }
        })
        .catch(response => {
          console.log("请求失败")
          this.message = response.data//请求失败
          this.$message({
            message: '请求失败',
            type: 'error'
          })
        })
    },
    cancel() {
      this.isEditing = false
      this.$axios.get("user/find/" + this.uid)
        .then((response) => {
          console.log("created"),
            this.user = response.data
          this.subuser = this.user
        })
        .catch(response => {
          console.log("请求失败")
        })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log("sm+" + this.imageUrl)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isjpg = file.name.endsWith('.jpg');
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isjpg) {
        this.$message.error('上传头像图片后缀只能是 .jpg!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M && isjpg;
    },
    ToReview() {
      this.museumToReview = true;
      this.museumSubmitted = false;
    },
    ToSubmit() {
      this.museumToReview = false;
      this.museumSubmitted = true;
    },
    ToAudit() {
      this.adminAudit = true;
      this.adminPassed = false;
    },
    ToPassed() {
      this.adminAudit = false;
      this.adminPassed = true;
    }
  }
}
</script>
  
<style scoped>
.container {
  margin: 20px;
  /* background-image: url("../assets/personal-bg.jpg"); */
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

.right-col {
  display: flex;
  flex-direction: column;
  height: 100%;
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
  margin: 0 auto;
  display: block;
}
</style>
  