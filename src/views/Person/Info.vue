<template>
  <!-- 个人资料 -->
  <div class="information">
    <el-form ref="user" :model="user" label-width="auto">
      <el-form-item label="ID" >
        <el-input v-model="user.id" placeholder="" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="user.username" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="用户类型" >
        <el-radio-group v-model="user.role" :disabled="true">
          <el-radio label="普通用户" />
          <el-radio label="管理员" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="user.sex">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮箱" :inline="true">
        <el-input v-model="user.email" placeholder="" :disabled="true"></el-input>
      </el-form-item>
      <!-- 修改信息按钮和修改密码按钮 -->
      <el-form-item>
        <el-button type="primary" @click="changeBasicInfo">保存基本信息</el-button>
        <el-button type="warning" @click="inputPassword">修改邮箱</el-button>
        <el-button type="warning" @click="dialogChangePw=true">修改密码</el-button>
      </el-form-item>
    </el-form>
    
  </div>

  <!-- 修改密码对话框 -->
  <el-dialog v-model="dialogChangePw"  title="" :visible.sync="dialogChangePw" :show-close="false">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input v-model="form.oldPassword" placeholder="请输入旧密码" type="password" />
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model="form.newPassword" placeholder="请输入新密码" type="password" />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="form.confirmPassword" placeholder="请确认密码" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="changePassword">保存</el-button>
      <el-button type="danger" size="mini" @click="cancelPassword">关闭</el-button>
    </el-form-item>
    </el-form>
  </el-dialog>

  <!-- 修改邮箱对话框 -->
  <el-dialog v-model="dialogChangEmail"  title="" :visible.sync="dialogChangEmail" :show-close="false">
    <el-form ref="form" :model="form" :rules="rules"  :inline="true" class="demo-form-inline">
      <el-form-item label="新邮箱" prop="newEmail">
        <el-input v-model="form.newEmail" placeholder="请输入新邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getVercode">获取验证码</el-button>
      </el-form-item>
      <el-form-item label="验证码" prop="vercode">
        <el-input v-model="form.vercode" placeholder="请输入验证码"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" size="mini" @click="changeEmail">保存</el-button>
      <el-button type="danger" size="mini" @click="cancelEmail">关闭</el-button>
  </el-dialog>

</template>

<script>
  export default {
    data() {
      //确认旧密码
      const correctPassword = (rule, value, callback) => {
        if (this.user.password !== value) {
          callback(new Error("密码不正确"));
        } 
        else {
          callback();
        }
      };
      //两次密码输入是否相等
      const equalToPassword = (rule, value, callback) => {
        if (this.form.newPassword !== value) {
          callback(new Error("两次输入的密码不一致"));
        } 
        else {
          callback();
        }
      };
      const correctEmail = (rule, value, callback) => {
        if (/^\w{1,64}@[a-z0-9\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(value) == false) {
          callback(new Error("邮箱格式错误"));
        } 
        else{
          callback();
        }
      };
      return {
        //修改信息时使用
        form: {
          oldPassword:'',
          newPassword:'',
          confirmPassword:'',
          newEmail:'',
          vercode:''
        },
        // 表单校验
        rules: {
          oldPassword: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
          { required: true, validator: correctPassword, trigger: "blur" }
          ],
          newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
          ],
          confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" }
          ],
          newEmail:[
          { required: true,message: "请输入邮箱",trigger: "blur"},
          { required: true, validator: correctEmail, trigger: "blur" }
          ],
          vercode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 6, max: 6, message: "验证码长度为6个字符", trigger: "blur" }
          ],
        },
        user:[],      //用户数据
        message:'',   //弹窗信息显示
        confirmVercode:'',//邮箱收到的验证码
        dialogChangePw: false,//修改密码对话框
        dialogChangEmail:false,//修改邮箱对话框
        formLabelWidth: '150px',
        
      
        uid:this.$cookies.get("cookieAccount")
      } 
    },
    created:function(){//根据Id查询用户信息
      this.$axios.get("http://localhost:8080/user/find/"+this.uid)
      .then((response)=>{
        console.log(response),
        this.user=response.data//user赋值
      })
      .catch(response=>{
        console.log("请求失败")
      })
    },
    mounted:function(){
      console.log("组件挂载完毕");
    },
    methods: {
      //修改基本信息，用户名、性别、出生日期
      changeBasicInfo() {
        //axios.put更新信息
        console.log("http://localhost:8080/user"+this.user.username)
        this.$axios.put("user",this.user)
        .then((response)=>{
          console.log(response.data),
          this.message=response.data
          //弹框提示信息
          if(this.message){
            this.$alert('保存成功', '保存个人信息', {
              confirmButtonText: '确定',
              callback:action=>{
                location.reload();
              }
            });
          }
          else{
            this.$alert('没有修改，无需保存', '保存个人信息', {
              confirmButtonText: '确定',
              callback:action=>{
                location.reload();
              }
            });
          }
        })
       .catch(response=>{
          console.log("请求失败")
          this.message=response.data//请求失败
          this.$alert('请求失败', '保存个人信息', {
              confirmButtonText: '确定',
            });
        })
        
        
      },
      //修改密码
      changePassword() {
        this.$refs.form.validate((valid) => {
          if (valid) {//表单验证成功
            //调用接口保存
            this.user.password=this.form.newPassword
            this.$axios.put("http://localhost:8080/user/change",this.user)
            .then((response)=>{
              this.user=response.data
              this.$alert('修改成功', '修改密码', {
              confirmButtonText: '确定',
              });
            })
            .catch(response=>{
              this.$alert('请求失败', '修改密码', {
                confirmButtonText: '确定',
              });
            })
          this.form.oldPassword=''//清空
          this.form.newPassword=''
          this.form.confirmPassword=''
          this.dialogChangePw = false//关闭对话框
          } 
          else {
            this.$message.error('请完善表单相关信息！');
            return false;
          }
        });        
      },
      //取消修改密码
      cancelPassword() {
        this.form.oldPassword=''//清空
        this.form.newPassword=''
        this.form.confirmPassword=''
        this.dialogChangePw = false//关闭对话框
      },
      //修改邮箱前先输入密码
      inputPassword(){
        this.$prompt('请输入密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputErrorMessage: '密码错误',
          inputType:'password',
          inputValidator:(value)=>{
            if(value==this.user.password)
              return true;
            else
              return false;
          },})
          .then(({ value }) => {
            this.dialogChangEmail=true//显示修改邮箱对话框
            console.log("正确")
          })
          .catch(() => {
            console.log("错误")    
          })
      },
      //获取验证码
      getVercode(){
        console.log("获取验证码")
        this.$axios.get("http://localhost:8080/user/sendVerCodeMail/"+this.form.newEmail)
        .then((response)=>{
          if(response.data!="404"){
            console.log("获取验证码成功")
            this.confirmVercode=response.data
          }
          else{
            this.$notify({
              title:'错误',
              message:'验证码获取失败',
              type:'warning',
              offset:100
            })
          }
        })
        .catch(response=>{
          console.log("www="+this.form.newEmail)
          console.log("获取验证码失败")
      })
      },
      //修改邮箱
      changeEmail(){
        //验证码验证成功
        this.$refs.form.validate((valid) => {
          if (valid) {//表单验证成功
            if(this.confirmVercode==this.form.vercode){
              //验证码验证成功
              this.user.email=this.form.newEmail//修改邮箱
              this.$axios.put("user/change",this.user)
              .then((response)=>{
                this.user=response.data
                this.oldinfo=response.data
                this.$alert('修改成功', '修改邮箱', {
                  confirmButtonText: '确定',
                });
              })
              .catch(response=>{
                this.$alert('请求失败', '修改邮箱', {
                confirmButtonText: '确定',
                });
              })
              //关闭对话框
              this.form.newEmail=''
              this.form.vercode=''
              this.confirmVercode=''
              this.dialogChangEmail = false//关闭对话框
            }
            else{
              this.$alert('验证码错误', '修改邮箱', {
                  confirmButtonText: '确定',
              });
            }
          } 
          else {
            this.$message.error('请完善表单相关信息！');
            return false;
          }
        }); 
      },
      cancelEmail(){
        this.form.newEmail=''
        this.form.vercode=''
        this.dialogChangEmail = false
      }
    },
  }
</script>


<style scoped>
.information{
  width: 800px;
  max-width: 100%;
  padding: 20px 35px 0; 
  display:flex;
  margin:20px 0 0 80px;    
}

</style>