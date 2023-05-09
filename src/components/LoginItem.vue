<template>
  <div class="login-bg">
    <div class="login-box">
      <form>
        <p id="heading">Login</p>
        <div class="user-box">
          <input type="text" v-model="user.idOrEmail" name="" required="">
          <label>ID/Email</label>
        </div>
        <div class="user-box">
          <input type="password" v-model="user.password" name="" required="">
          <label>Password</label>
        </div>
        <div class="login-button">
          <a href="#" @click="login()">登录<span></span></a>
        </div>
        <div class="options">
          <a href="/resetPassword">忘记密码</a>
          <span>  </span>
          <a href="/register">注册</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import qs from 'qs';
  import "element-plus/theme-chalk/el-message.css"
  import {ElMessage} from 'element-plus'
  export default {
    data() {
      return {
        user : {
          // 这里的数据保证跟数据接口一致
          idOrEmail : '',
          password : '',
        }
    }},
    methods: {
      login() {
        console.log("login");
        this.$axios.post('/login', qs.stringify(this.user)) // 加了个stringify就不404辣？!
          .then((res) => {
            console.log(res.data.code)
            if (res.data.code != -100) {// -100：错误
              this.$router.push("/personal");//用户主页
              this.$message({
                  message: '登陆成功！',
                  type: 'success'
              })
            }
            else {
              console.log(res);
              console.log(res.data.msg);
              this.$message({
                  message: '账号不存在或密码错误，登陆失败！',
                  type: 'error'
              })
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
  }
}
</script>

<style scoped>
#heading {
  text-align: center;
  margin: 1em;
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
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(158, 177, 184, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}
.login-box .user-box {
  position: relative;
}
.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}
.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #070707;
  font-size: 12px;
}
.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
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
  margin: 0 10px;
  transition: all .3s ease;
}

.options a:hover {
  color: #788EBD;
}
</style>
