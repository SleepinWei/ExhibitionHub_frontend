<template>
  <!-- 个人资料 -->
  <div class="information">
    <el-form ref="user" :model="user" label-width="auto">
      <el-form-item label="ID" >
        <el-input v-model="user.id" placeholder="" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="user.username" placeholder="请输入昵称"></el-input>
      </el-form-item>
    </el-form>

    <!-- <el-table
      :data="user"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="password"
        label="地址">
      </el-table-column>
    </el-table> -->
    
  </div>

  <!-- 修改密码对话框 -->
  <el-dialog v-model="dialogFormVisible"  title="" :visible.sync="dialogFormVisible" >
    <el-form :model="form" label-position="right">
      <el-form-item label="请输入原密码：" :required="true"  :label-width="formLabelWidth">
        <el-input v-model="form.old_password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="请输入新密码："  :required="true"  :label-width="formLabelWidth">
        <el-input v-model="form.new_password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="再次输入新密码 ："  :required="true"  :label-width="formLabelWidth">
        <el-input v-model="form.confirm_password" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="dialogFormVisible = false">取消修改</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确认修改</el-button>
    </div>
  </el-dialog>

</template>

<script>
  export default {
    data() {
      return {
        form: {
          ID:'',
          type:'',
          name: '',
          sex: '',
          phonenumber:'',
          mail:'',
          birthday: '',
          old_password:'',
          new_password:'',
          confirm_password:'',
        },
        user:[],
        dialogFormVisible: false,
        formLabelWidth: '150px'
      } 
     
    },
    created:function(){
      this.$axios.get("user")
      .then((response)=>{
        console.log(response),
        this.user=response.data
      })
    },
    mounted:function(){
      console.log("组件挂载完毕");
    },
    methods: {
      onSubmit() {
        console.log('submit!');
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