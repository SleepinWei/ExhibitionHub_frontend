
<template>
    <div class="reset-bg">
      <div class="container">
        <el-steps :active="active" :space="200" finish-status="success" align-center>
          <el-step title="验证邮箱"></el-step>
          <el-step title="输入验证码"></el-step>
          <el-step title="设置新密码"></el-step>
        </el-steps>
        <div v-if="active === 0" class="common_div">
          <el-form :model="Form" class="user-container" label-position="left" label-width="60px" size="default">
            <el-form-item style="float: right; width: 90%" label="邮箱号">
              <el-input type="text" v-model="Form.email" autofocus ref="email" auto-complete="off"
                placeholder="请输入用来找回密码的邮箱" prefix-icon="el-icon-message" spellcheck="false">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="active === 1" class="common_div">
          <el-form :model="codeForm" class="user-container" label-position="left" label-width="60px" size="default">
            <el-form-item style="float: right; width: 80%" label="验证码">
              <el-input type="text" v-model="codeForm.code" autofocus ref="code" auto-complete="off"
                placeholder="请输入邮箱验证码" prefix-icon="el-icon-s-promotion" spellcheck="false">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="active === 2" class="common_div">
          <el-form :model="passwordForm" class="user-container" label-position="left" label-width="60px" size="default">
            <el-form-item style="float: right; width: 80%" label="新密码">
              <el-input type="password" v-model="passwordForm.password" autofocus ref="password" auto-complete="off"
                placeholder="请输入新密码" prefix-icon="el-icon-key">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="common_div" style="text-align: center;justify-content: center;">
          <el-button @click="next" :disabled="disabled" class="action_button">下一步</el-button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import qs from 'qs';
  import 'element-plus/theme-chalk/index.css'
  export default {
    name: "ResetPassword",
  
    data() {
        return {
            active: 0,
            Form: {
                email: '',
            },
            codeForm: {
                code: '',
            },
            passwordForm: {
                password: '',
            },
            disabled: false
        }
    },
    methods: {
        isEmail() {
            let regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
            if (!regEmail.test(this.Form.email)) {
                this.$message({
                    message: '邮箱格式不正确',
                    type: 'error'
                });
                return false;
            }
            return true;
        },
        beforePost() {
            if (this.Form.email === '') {
                this.$message({
                    message: '警告, 邮箱未输入呀',
                    type: 'warning'
                });
                this.$refs.email.focus();
                return false;
            } else {
                //进行邮箱格式的检测与数据库查看是否有该邮箱
                return this.isEmail();
            }
        },
        post() {
            console.log(this.Form.email)
            this.$axios
                .get("/reset/sendVerCodeMail/" + this.Form.email)
                .then(successResponse => {
                    if (successResponse.data === 1) {
                        // 如果返回的结果正确，那么需要发送邮件到对应的用户邮箱中，用户自己登录邮箱后找到对应的链接后才可以输入新密码
                        this.$notify({
                            title: '成功',
                            message: '已向' + this.Form.email + '发送验证码，请在5分钟之内修改密码，否则验证码失效',
                            type: 'success',
                            duration: 2000,
                            offset: 100
                        });
                        //跳转到下一个面板，并且将按钮恢复正常
                        this.active++;
                        this.disabled = false;
                    }
                    else {
                        //如果用户名和密码匹配错误，那么显示错误信息，并让按钮重新可用
                        this.$notify({
                            title: '失败',
                            message: "用户不存在！",
                            type: 'error',
                            duration: 2000,
                            offset: 100,
                        });
                        this.disabled = false;
                    }
                })
                .catch(failResponse => {
                    this.$notify({
                        title: '失败',
                        message: "错误！",
                        type: 'error',
                        duration: 2000,
                        offset: 100,
                    });
                    this.disabled = false;
                })
        },
  
        next() {
            // 当面板为0时，先判断用户名和邮箱是否输入，进行相关的验证
            if (this.active === 0) {
                let isFinished = this.beforePost();
                if (isFinished) {
                    //数据输入正确后，将按钮禁掉，并提示相关信息，然后数据发送到后台
                    this.disabled = true;
                    this.post();
                }
            }
            // 当面板为1时，则到了用户输入验证码的时候, 将验证码传入后台
            if (this.active === 1) {
                // 如果验证码未输入，提示用户
                if (this.codeForm.code === '') {
                    this.$notify({
                        title: '警告',
                        message: '警告, 验证码未输入，请去您邮箱中查看!',
                        type: 'warning',
                        duration: 2000,
                        offset: 100,
                    });
                    this.$refs.code.focus();
                } else {
                    console.log(this.codeForm.code)
                    this.$axios.post('/reset/isVerCodeRight', {
                        email: this.Form.email,
                        code: this.codeForm.code,
                    }).then(successResponse => {
                        console.log(successResponse.data)
                        if (successResponse.data === 0) {
                            //验证码输入正确
                            this.active++;
                            this.$notify({
                                title: '成功',
                                message: '验证码匹配正确！',
                                type: 'success',
                                duration: 2000,
                                offset: 100,
                            });
                        } else if (successResponse.data === -1) {
                            //验证码输入错误
                            this.$notify({
                                title: '错误',
                                message: '验证码不匹配呢，再看看吧',
                                type: 'error',
                                duration: 2000,
                                offset: 100,
                            });
                        } else if (successResponse.data === -2) {
                            //验证码超时
                            this.$notify({
                                title: '错误',
                                message: '验证码已经超时了，请刷新页面重新发送',
                                type: 'error',
                                duration: 2000,
                                offset: 100,
                            });
                        }
                    }).catch(failResponse => {
  
                    })
                }
  
            }
            // 当面板为2时，则到了用户输入密码的时候, 将密码传入后台
            if (this.active === 2) {
                //在发送密码之前，先校验一下是否输入了，不能让用户不小心输入了空密码
                if (this.passwordForm.password === '') {
                    this.$notify({
                        title: '警告',
                        message: '警告, 新密码未输入',
                        type: 'warning',
                        duration: 2000,
                        offset: 100,
                    });
                    //获取焦点
                    this.$refs.password.focus();
                } else {
                  console.log("success")
                    let password_md5 = this.passwordForm.password;
                    this.$axios.post('/reset/resetPassword', {
                        password: password_md5,
                        email: this.Form.email,
                    }).then(successResponse => {
                        if (successResponse.status === 200) {
                            //密码修改成功
                            this.$notify({
                                title: '成功',
                                message: '该账号密码修改正确！',
                                type: 'success',
                                duration: 2000,
                                offset: 100,
                            });
                            let path = this.$route.query.redirect;
                            this.$router.replace({ path: path === '/' || path === undefined ? '/login' : path })
                        } else if (successResponse.status === 400) {
                            //修改密码失败，返回对应信息
                            this.$message.error(successResponse.data.message);
                        }
                    }).catch(failResponse => {
  
                    })
                }
            }
        },
    }
  }
  </script>
  
  <style scoped>
  .reset-bg{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url("../assets/loginbg.png");
    background-size: cover;
  }
  .container {
    background: rgba(229, 236, 238, 0.5);
    border: 1px solid gainsboro;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    margin: 10% auto;
    width: 32% ; /* 修改为更大的宽度 */
    height: 30% ; /* 修改为更大的高度 */
    padding: 25px 30px;
  }
  
  .common_div {
    margin-top: 5% ;
    justify-content: center;
    align-items: center;
  }
  
  .user-container {
    width: 80%;
    background: #fff;
  
  }
  
  .action_button {
    width: 20%;
    margin-top: 3%;
    text-align: center;
  }
  </style>
  
  