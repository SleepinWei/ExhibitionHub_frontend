<script setup>
import LoginItem from '@/components/LoginItem.vue'
</script>

<template>
    <main>
        <LoginItem />
    </main>
</template>

<!-- 
<template>
    <div class="personform">
        <el-form ref="form" :model="form" label-width="80px" style="text-align: center">
            <el-form-item label="昵称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="性别">
                <el-select v-model="form.sex" placeholder="请选择性别">
                    <el-option label="男" value="shanghai"></el-option>
                    <el-option label="女" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="年龄">
                <el-input v-model="form.age"></el-input>
            </el-form-item>

            <el-form-item label="手机号">
                <el-input v-model="form.phonenumber"></el-input>
            </el-form-item>

            <el-form-item label="邮箱">
                <el-input v-model="form.mail"></el-input>
            </el-form-item>

            <el-form-item label="注册日期">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.signdate"
                        style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存基本信息</el-button>
                <el-button type="warning" @click="sendmessage">修改密码</el-button>
            </el-form-item>

        </el-form>
    </div>

<el-dialog :visible.sync="getmessage">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="收件人：">
                <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="ruleForm" placeholder="标题信息" style="margin-top: 10px;"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-card style="height: 610px;">
                    <quill-editor v-model="content" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
                    </quill-editor>
                </el-card>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" style="float:right">确定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
  
<script>
export default {
    data() {
        return {
            form: {
                name: '',
                sex: '',
                age: '',
                phonenumber: '',
                mail: '',
                signdate: '',
            },
            getmessage: false//弹框
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        sendmessage() {
            this.getmessage = true
        }
    },
}
</script>
  
  
<style>
.personform {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    width: 400px;
    max-width: 100%;
    padding: 20px 35px 0;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -160px 0 0 -200px;

}
</style>
   -->