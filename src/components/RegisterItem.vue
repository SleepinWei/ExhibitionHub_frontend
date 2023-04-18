<!--
 * @Author: yang duan
 * @Date: 2023-04-17 16:20:22
 * @LastEditors: yingxin wang
 * @LastEditTime: 2023-04-18 21:20:11
 * @Description: Regiter Item
-->
<template>
  <div class="frame">
    <div class="frame-input">
      <h1>注册</h1>
      <el-form class="login-from" :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item class="frame-el-item" label="昵称" prop="username" label-width=90px>
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item class="frame-el-item" label="密码" prop="password" label-width=90px>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="frame-el-item" label="确认密码" prop="passwordconfirm" label-width=90px>
          <el-input type="password" v-model="ruleForm.passwordconfirm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="frame-el-item" label="邮箱" prop="email" label-width=90px>
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="15">
            <el-form-item class="frame-el-item" label="验证码" prop="code" label-width=90px>
              <el-input v-model="ruleForm.code"></el-input>
            </el-form-item>
          </el-col>
          <el-form-item>
            <el-button type="primary" size="middle" @click="sendEmail()">发送验证码</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="frame-el-button">
        <el-button type="primary" size="large" @click="register()">用户注册</el-button>
      </div>
      <el-row style="text-align: center;justify-content: center">
        <!-- <el-link type="primary" href="" @click="gotoLogin()">已有账号登录</el-link> -->
        <router-link type="primary" to="/login" style="text-decoration: none;">已有帐号登录</router-link>
      </el-row>
    </div>
  </div>
</template>


<script>
import qs from 'qs';
export default {
  data() {

    return {
      ruleForm: {
        username: "",
        password: "",
        passwordconfirm: "",
        email: "",
        code: "",
      },
      rules: {
        username: [
          { required: true, message: "昵称不能为空！", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空！", trigger: "blur" },
          { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, message: '须同时包含数字与字母,长度为 8-20位', trigger: "blur" },
        ],
        passwordconfirm: [
          { required: true, message: "确认密码不能为空！", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.ruleForm.password) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: "邮箱不能为空！", trigger: "blur" },
          { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: "邮箱格式不正确", trigger: "blur" }
        ],
        confirmcode: [
          { required: true, message: "验证码不能为空！", trigger: "blur" },
          { min: 1, max: 6, message: "6位验证码", trigger: "blur" }
        ],
      },
    };
  },
  methods: {
    // gotoLogin() {
    //   // let target = this.$refs.target
    //   // target.setAttribute('href', window.location.origin + '/home/integral-record')
    //   // target.click()

    // },


    sendEmail() {
      console.log('http://localhost:8080//api/sendRisVerCodeMail/' + this.ruleForm.email);
      this.$axios.get('/api/sendRisVerCodeMail/' + this.ruleForm.email)
        .then(res => {
          console.log(res.data);
          if (res.data === "404") {
            this.$message.error('邮件发送失败，请检查邮箱是否填写正确');
          } else if (res.data === "400") {
            this.$message.error('该邮箱已注册，请更换邮箱');
          } else {
            this.$message({
              message: '邮件发送成功，请登录邮箱获取验证码',
              type: 'success'
            });
          }
        })
        .catch(err => {
          console.log(err);
        })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },


    // 用户注册
    register() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$axios.post('http://localhost:8080/register',
            {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              email: this.ruleForm.email,
              code: this.ruleForm.code
            })
            .then(res => {
              if (res.data === true) {
                this.$message({
                  showClose: true,
                  message: '注册成功，正在跳转到登录界面...',
                  type: 'success'
                })
                setTimeout(() => {
                  this.$router.push('/login')
                }, 2000)
              } else {
                this.$message({
                  message: '验证失败',
                  type: 'error'
                })
                console.log(res.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
            })
        }
      })
    }

  },
};
</script>

<style scoped>
.frame {
  border: 1px solid gainsboro;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  width: 400px;
  height: 520px;
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

.frame-el-item {
  margin-bottom: 20px;
  height: 40px;
  margin-left: -30px;
  margin-right: 5px;

}

.frame-el-button {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

}
</style>
<!-- 
<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')

</script> -->
