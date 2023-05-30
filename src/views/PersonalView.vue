<script setup>
import HeaderItem from '../components/Header.vue'
import MuseumReviewItem from '../components/MuseumReview.vue'
import MuseumSubmitItem from '../components/MuseumSubmitted.vue'
import AdminAuditItem from '../components/AdminAudit.vue'
import AdminPassedItem from '../components/AdminPassed.vue'
import SubscribeItem from '../components/SubscribeItem.vue'
import CalendarView from '../views/CalendarView.vue'
</script>

<template>
  <div class="personal-bg">
    <HeaderItem />
    <div class="container">
      <!-- 导航栏 -->
      <div v-if="user.role === '普通用户'">
        <el-menu :default-active="activeIndex" class="menu" mode="horizontal">
          <!--  -->
          <el-menu-item index="1" @click="ToSubscribe()">我的订阅</el-menu-item>
          <el-menu-item index="2" @click="ToCalender()">我的日历</el-menu-item>
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


      <el-row v-if="!userCalenderToReview" class="main">
        <!-- 左侧头像和个人信息 -->
        <el-col :xs="24" :sm="24" :md="8" class="left-col">
          <el-card class="card">
            <div class="avatar-container">
              <!-- 头像 -->
              <el-upload action="http://localhost:8080/test/upload" :data="{ uid: uid }" :show-file-list="false"
                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img :src="imageUrl" alt="avatar" class="avatar">
              </el-upload>

              <div v-if="!isEditing">
                <!-- 昵称 -->
                <h3>{{ user.username }}</h3>
                <el-form ref="user" :model="user" label-position="top" label-width="80px">
                  <el-form-item label="ID：">
                    <el-input v-model="user.id" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="用户类型：">
                    <el-input v-model="user.role" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱：">
                    <el-input v-model="user.email" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="个人简介">
                    <el-input v-model="user.biography" :disabled="true" type="textarea"></el-input>
                  </el-form-item>
                </el-form>
                <!-- 修改信息按钮/表单 -->
                <el-button class="button" @click="isEditing = true">修改基本信息</el-button>
              </div>

              <div v-if="isEditing">
                <el-form ref="subuser" :model="subuser" label-position="top" label-width="80px">
                  <el-form-item label="昵称：">
                    <el-input v-model="subuser.username"></el-input>
                  </el-form-item>
                  <el-form-item label="性别：">
                    <el-radio-group v-model="subuser.sex">
                      <el-radio label="男" />
                      <el-radio label="女" />
                    </el-radio-group>
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
          <el-card class="card" :body-style="{ padding: '8px', height: '100%', width: '98%' }">
            <!--  -->
            <div v-if="user.role === '普通用户'">
              <div v-if="userSubscribeToReview">
                <h2>我的订阅</h2>
                <SubscribeItem />
              </div>
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
                <!-- <AuditView /> -->
              </div>
              <div v-else-if="adminPassed">
                <AdminPassedItem />
              </div>
            </div>
          </el-card>
        </el-col>

      </el-row>

      <!-- 普通用户的日历信息查看 --->
      <el-row v-if="user.role === '普通用户' && userCalenderToReview" :xs="24" :sm="24" :md="16">
        <CalendarView />
      </el-row>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      uid: this.$cookies.get("cookieAccount"),
      user: [],
      subuser: [],
      isEditing: false, //是否编辑信息
      message: '',      //弹窗信息显示
      imageUrl: '',

      userSubscribeToReview: true,
      userCalenderToReview: false,
      museumToReview: true,
      museumSubmitted: false,
      adminAudit: true,
      adminPassed: false
    }
  },
  created: function () {//根据Id查询用户信息
    this.$axios.get("/user/find/" + this.uid)
      .then((response) => {
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
      //更新信息用户信息
      this.$axios.put("user", this.subuser)
        .then((response) => {
          this.message = response.data
          //弹框提示信息
          if (this.message) {
            this.$axios.get("/user/find/" + this.uid)
              .then((response) => {
                this.user = response.data
                this.subuser = this.user
              })
              .catch(response => {
                console.log("请求失败")
              }),
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
    },
    ToSubscribe() {
      this.userSubscribeToReview = true;
      this.userCalenderToReview = false;
    },
    ToCalender() {
      this.userSubscribeToReview = false;
      this.userCalenderToReview = true;
      console.log(this.userCalenderToReview)
    }
  }
}
</script>
  
<style scoped>
.personal-bg {
  background-image: url("../assets/personal-bg.jpg");
  background-size: cover;
}

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
  height: 100%;
  flex-grow: 1;
  /* margin-bottom: 80px; */
}

.right-col {
  display: flex;
  flex-direction: column;
  weight: 100%;
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
  