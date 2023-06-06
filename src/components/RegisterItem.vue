<template>
  <div class="login-bg">
    <div class="login-box">
      <p id="heading">注册</p>
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
            <el-button size="middle" @click="sendEmail()">发送验证码</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <form>
        <div class="login-button">
          <a href="#"  @click="register()">注册<span></span></a>
        </div>
        <div class="options">
          <a href="/login">已有帐号登录</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import "element-plus/theme-chalk/el-message.css"
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
        code: [
          { required: true, message: "验证码不能为空！", trigger: "blur" },
          { min: 1, max: 6, message: "6位验证码", trigger: "blur" }
        ],
      },
    };
  },
  methods: {
    sendEmail() {
      console.log('https://kjkttt.gardilily.com/api/api/sendRisVerCodeMail/' + this.ruleForm.email);
      this.$axios.get('/api/sendRisVerCodeMail/' + this.ruleForm.email)
        .then(res => {
          console.log(res.data);
          if (res.data == "404") {
            this.$message.error('邮件发送失败，请检查邮箱是否填写正确');
          } else if (res.data == "400") {
            this.$message.error('该邮箱已注册，请更换邮箱');
          } else if (res.data == "2000") {
            this.$message({
              message: '邮件发送成功，请登录邮箱获取验证码',
              type: 'success'
            });
          } else {
            console.log(res.data);
            console.log("出现未知值");
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
          this.$axios.post('https://kjkttt.gardilily.com/api/register',
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
#heading {
  text-align: center;
  /* margin: 1em; */
  color: rgb(255, 255, 255);
  font-size: 2em;
}
.login-bg{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("../assets/loginbg.png");
  background-size: cover;
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 450px;
  padding: 40px;
  padding-top: 0px;
  padding-bottom: 10px;
  transform: translate(-50%, -50%);
  background: rgba(158, 177, 184, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
  /* background-image: url("../assets/lx.jpg"); */
}
.login-box form a {
  position: relative;
  display: inline-block;
  padding: 6px 20px;
  color: #ffffff;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}
.login-button{
  display: flex;
  justify-content: center;
  font-size: 16px;
}
.login-button a:hover {
  background: #788EBD;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #788EBD,
              0 0 10px #788EBD,
              0 0 15px #788EBD,
              0 0 20px #788EBD;
}

.login-button a span {
  position: absolute;
  display: block;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }

  50%,100% {
    left: 100%;
  }
}

.login-button a span:nth-child(1) {
  bottom: 2px;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #788EBD);
  animation: btn-anim1 2s linear infinite;
}
.options {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #fff;
}

.options a {
  text-decoration: none;
  color: #fff;
  transition: all .3s ease;
}

.options a:hover {
  color: #00000096;
}

.frame-input {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 70%;
  height: auto;
  margin-bottom: 5px;
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

.el-form {
  margin-bottom: 0;
}
form {
  margin-top: 0;
}

.el-input {
  border-color: #dcdfe6;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0);
  color: #606266;
}

</style>
