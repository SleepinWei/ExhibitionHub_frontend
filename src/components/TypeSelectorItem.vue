<template>
    <div class="typeSelecotr">
        <el-checkbox-group 
        v-model="value" 
        size="small"
        @change="getType"
        >
            <el-checkbox-button v-for="i in types" :key="i.id" :label="i.id">
                {{ i.name }}
            </el-checkbox-button>
        </el-checkbox-group>
    </div>
    
</template>
  
  <script>
  export default {
        data() {
            return{
                value:[],
                types: [
                    {id:1,name:'美术'},
                    {id:2,name:'书法'},
                    {id:3,name:'美食'},
                    {id:4,name:'时尚'},
                    {id:5,name:'现代'},
                    {id:6,name:'古典'},
                ],
                str:""
            } 
        },        
        methods:{
            getType(data){     
                this.$emit('selectType', data);
            },
    }
  }
  </script>
  
  <style scoped>
  
.typeSelecotr {
    margin-top:15px;
    margin-bottom:20px;
    flex: 1;
  }
 
  </style>