<template>
    <div class="demo-date-picker">
      <div class="block hvr-shadow">
        <el-date-picker
          v-model="value"
          type="daterange"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          @change="getSelectDate"
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
        name : 'dateSelector',
        data() {
            return{
                value:new Date(),
                startTime:'',
                endTime:''
            } 
        },        
        methods:{
            getSelectDate(data){
                this.startTime=data[0]
                this.endTime=data[1]
                console.log(this.startTime)
                console.log(this.endTime)
            },
            
        }
    }
  </script>
  
  <style scoped>
  .demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
  }
  
  .demo-date-picker .block {
    text-align: center;
    flex: 1;
    width: 100%;
  }
  
  .demo-date-picker .block:last-child {
    border-right: none;
  }


  </style>
  