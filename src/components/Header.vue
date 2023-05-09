<template>
    <el-row align="middle" class="header">
        <el-col :span="4" :offset="1">
            <router-link class="link" to="/">
                    Exhibition Hub
            </router-link>
        </el-col>
        <el-col :span="4">
            <el-row :gutter="2">
            <el-col :span="8">
                <router-link class="link" to="/">
                        首页
                </router-link>
            </el-col>
            <el-col :span="8">
                <router-link class="link" to="/search">
                        分类
                </router-link>
            </el-col>
            </el-row>
        </el-col>

        <!-- 搜索栏 -->
        <el-col :span="3">
            <!-- 空占位 -->
        </el-col>
        <el-col :span="8">
            <el-input
                v-model="inputText" 
                size="large"
                placeholder="Input"
            >
            <template #prepend>
                <el-button @click="submitSearch">
                    <el-icon>
                        <Search />         
                    </el-icon>
                </el-button>
            </template>
            </el-input>
        </el-col>

        <!-- 用户头像 -->
        <el-col :span="4">
            <el-row v-if="!isLogin" justify="center">
                <router-link class="link" to="/login">
                    登录
                </router-link>
            </el-row>
            <el-row v-if="isLogin" justify="center">
                <!-- <router-link :to="{path:'/personal'}" style="text-decoration: none;"> -->
                    <el-icon>
                        <Avatar/>
                    </el-icon>
                    <el-dropdown>
                        <div class="el-dropdown-link">
                            {{ username }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </div>
                        <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="toPerson()">个人中心</el-dropdown-item>
                            <el-dropdown-item @click="dialogInputPw=true">修改邮箱</el-dropdown-item>
                            <el-dropdown-item @click="dialogChangePw=true">修改密码</el-dropdown-item>
                            <el-dropdown-item @click="logout()">退出账号</el-dropdown-item>
                        </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                <!-- </router-link> -->
            </el-row>
        </el-col>
    </el-row>

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
      <div class="frame-el-button">
        <el-button type="primary" size="mini" @click="changePassword">保存</el-button>
        <el-button size="mini" @click="cancelPassword">关闭</el-button>
      </div>
    </el-form>
    
  </el-dialog>

  <!-- 输入密码对话框 -->
  <el-dialog v-model="dialogInputPw"  title="" :visible.sync="dialogInputPw" :show-close="false">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="密码" prop="oldPassword">
        <el-input v-model="form.oldPassword" placeholder="请输入当前密码" type="password" />
      </el-form-item>
      <div class="frame-el-button">
        <el-button type="primary" size="mini" @click="Next()">下一步</el-button>
        <el-button size="mini" @click="cancelEmail">取消</el-button>
      </div>
    </el-form>
  </el-dialog>

  <!-- 修改邮箱对话框 -->
  <el-dialog v-model="dialogChangEmail"  title="" :visible.sync="dialogChangEmail" :show-close="false">
    <el-form ref="form" :model="form" :rules="rules">
      <el-row>
        <el-space wrap :size="20">
          <el-col>
            <el-form-item  label="新邮箱" prop="newEmail" :label-width="formLabelWidth">
              <el-input v-model="form.newEmail" placeholder="请输入新邮箱"></el-input>
            </el-form-item>
          </el-col>

          <el-form-item>
            <el-button type="primary" size="middle" @click="getVercode">获取验证码</el-button>
          </el-form-item>
        </el-space>
      </el-row>
      
      <el-form-item label="验证码" prop="vercode" :label-width="formLabelWidth">
        <el-input v-model="form.vercode" placeholder="请输入验证码" ></el-input>
      </el-form-item>

      <div class="frame-el-button">
        <el-button type="primary" size="mini" @click="changeEmail">保存</el-button>
        <el-button size="mini" @click="cancelEmail">关闭</el-button> 
      </div>
      
    </el-form>
  </el-dialog>

</template>

<script>
// import { ref } from 'vue'

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
            username: this.$cookies.get("cookieName"),
            uid : this.$cookies.get("cookieAccount"),
            isLogin: false,
            inputText: "",

            user:[],
            message:'',                //弹窗信息显示
            confirmVercode:'',         //邮箱收到的验证码
            dialogChangePw: false,     //修改密码对话框
            dialogChangEmail:false,    //修改邮箱对话框
            dialogInputPw:false,       //修改邮箱前输入密码对话框
            form: {                    //修改信息时使用
                oldPassword:'',
                newPassword:'',
                confirmPassword:'',
                newEmail:'',
                vercode:''
            },
            rules: {// 表单校验
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
                ]
            }
        };
    },
    created:function(){//根据Id查询用户信息
        this.$axios.get("/user/find/"+this.uid)
        .then((response)=>{
            console.log("created:user/find"),
            this.user=response.data//user赋值
            this.subuser=this.user
        })
        .catch(response=>{
            console.log("请求失败")
        }),

        this.$axios.get("/user/load_avatar/"+this.uid,{
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
        checkLoginStatus() {
            if (this.$cookies.get("cookieName") != null) {
                this.isLogin = true;
            }
        },
        submitSearch() {
            this.$router.push({ path: "/search", query: { querytext: this.inputText } });
        },
        keyListener(event) {
            if (event.keyCode == 13) {
                this.submitSearch();
            }
        },
        logout(){
            this.$confirm('您确定要退出当前账户吗?', '提示', {
                confirmButtonText: '确定',  //确认按钮的文字显示
                type: 'warning',
                center: true, //文字居中显示
                })
                .then(() => {
                    this.$axios.post('/logout').then(res=>res.data)
                    .then(res=>{
                        console.log(res)
                        this.$message({
                            type:'success',
                            message:'退出账户成功'
                        })
                        this.isLogin = false
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
        },
        toPerson(){
            console.log("toperson")
            this.$router.push("/personal")
        },
        loadUserName(){
            this.$axios.get("http://localhost:8080/user/find/"+this.uid)
            .then((response)=>{
                console.log(response)
                this.username=response.data.username//user赋值
            })
            .catch(response=>{
                console.log("请求失败")
            })
        },
        //修改密码
        changePassword() {
            this.$refs.form.validate((valid) => {
            if (valid) {//表单验证成功
                //调用接口保存
                this.user.password=this.form.newPassword
                this.$axios.put("user/change",this.user)
                .then((response)=>{
                this.user=response.data
                this.$message({
                    message: '修改密码成功！',
                    type: 'success'
                })
                })
                .catch(response=>{
                this.$message({
                    message: '请求失败！',
                    type: 'error'
                })
                })
                this.$refs["form"].clearValidate()//清空校验规则
                this.form.oldPassword=''
                this.form.newPassword=''
                this.form.confirmPassword=''
                this.form.newEmail=''
                this.form.vercode=''
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
            this.$refs["form"].clearValidate()//清空校验规则
            this.form.oldPassword=''
            this.form.newPassword=''
            this.form.confirmPassword=''
            this.form.newEmail=''
            this.form.vercode=''
            this.dialogChangePw = false//关闭对话框
        },
        Next(){
            this.$refs.form.validate((valid) => {
            if (valid) {//表单验证成功
                this.dialogInputPw=false;
                this.dialogChangEmail=true;
                this.$refs["form"].clearValidate()//清空校验规则
                this.form.oldPassword=''
                this.form.newPassword=''
                this.form.confirmPassword=''
                this.form.newEmail=''
                this.form.vercode=''
            } 
            else {
                this.$message.error('请重新输入密码！');
                return false;
            }
            });        
        },
        //获取验证码
        getVercode(){
            console.log("获取验证码")
            this.$axios.get("/user/sendVerCodeMail/"+this.form.newEmail)
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
            this.$notify({
                title:'错误',
                message:'验证码获取失败',
                type:'warning',
                offset:100
                })
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
                    this.$message({
                    message: '修改邮箱成功！',
                    type: 'success'
                    })
                })
                .catch(response=>{
                    this.$message({
                    message: '修改邮箱请求失败！',
                    type: 'error'
                    })
                })
                //关闭对话框
                this.$refs["form"].clearValidate()//清空校验规则
                this.form.oldPassword=''
                this.form.newPassword=''
                this.form.confirmPassword=''
                this.form.newEmail=''
                this.form.vercode=''
                this.dialogChangEmail = false//关闭对话框
                }
                else{
                this.$message({
                    message: '验证码错误！',
                    type: 'error'
                    })
                }
            } 
            else {
                this.$message.error('请完善表单相关信息！');
                return false;
            }
            }); 
        },
        cancelEmail(){
            this.$refs["form"].clearValidate()//清空校验规则
            this.form.oldPassword=''
            this.form.newPassword=''
            this.form.confirmPassword=''
            this.form.newEmail=''
            this.form.vercode=''
            this.dialogChangEmail = false//关闭对话框
            this.dialogInputPw=false;
        },
        beforeMount() {
            this.loadUserName()
        }
    },
    setup() {

    },
    mounted() {
        this.checkLoginStatus();
        // window.addEventListener('keydown', this.keyListener,true);
    },
    unmounted() {
        // window.removeEventListener('keydown', this.keyListener,false);
    },
    beforeMount() {
        this.loadUserName()
    }
}
</script>

<style>
.header {
    width: 100%;
    height: 70px;
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, .2);
    margin-bottom: 50px;
}
.link{
    text-decoration: none;
}
.frame-el-button {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
</style>