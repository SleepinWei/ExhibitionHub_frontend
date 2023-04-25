<script setup>
import AddressSelectorItem from '../components/AddressSelectorItem.vue';
import CalendarItem from '../components/CalendarItem.vue'
import DateSelectorItem from '../components/DateSelectorItem.vue';
import TypeSelectorItem from '../components/TypeSelectorItem.vue';
import MuseumSelectorItem from '../components/MuseumSelectorItem.vue';
</script>

<template>
    <body>
        <div class="calendar">
            <CalendarItem />
        </div>
        <div class="Selector">
            <div class="demonstration">日程显示</div>
            <div class="selectBlock">
                <div class="demonstration">展览日期</div>
                <el-radio-group 
                v-model="ifDateLimit"
                @change="selectIfDateLimit"
                >
                    <el-radio label="noDateLimit" size="large">日期不限</el-radio>
                    <el-radio label="DateLimit" size="large">选择日期</el-radio>
                    <div class="selectItem" v-if="showDateSelector==1">
                        <DateSelectorItem />
                    </div>
                </el-radio-group>
                <br/>
                <div class="demonstration">展览地点</div>
                <el-radio-group 
                v-model="ifLocationLimit"
                @change="selectIfLocationLimit"
                >
                    <el-radio label="noLocationLimit" size="large">地点不限</el-radio>
                    <el-radio label="LocationLimit" size="large">选择地点</el-radio>
                    <div class="selectItem" v-if="showLocationSelector==1">
                        <AddressSelectorItem/>   
                    </div>
                </el-radio-group>
                <div class="demonstration">展览类型</div>
                <TypeSelectorItem/>
                <div class="demonstration">展览地点</div>
                <MuseumSelectorItem/>
            </div>
                 
                
        </div>

    </body>
</template>

<script>
export default {
      data() {
          return{
              ifDateLimit:'noDateLimit',
              ifLocationLimit:'noLocationLimit',
              showDateSelector:0,
              showLocationSelector:0,
          } 
      },        
      methods:{
          selectIfDateLimit(data){
            if(data=='DateLimit'){
                this.showDateSelector=1
            }else{
                this.showDateSelector=0
            }
          },
          selectIfLocationLimit(data){
            if(data=='LocationLimit'){
                this.showLocationSelector=1
            }else{
                this.showLocationSelector=0
            }
          },
          
      }
  }
</script>

<style scoped>

.calendar{
    position: relative;
    display: inline-block;
    width:67%;
    margin:1%;
}
.Selector{
    position: absolute;
    display: inline-block;
    width:30%;
    margin-top: 2%;
}

.demonstration{
    font-weight:bold;
    size: 20px;
}

.selectBlock .demonstration{
    font-weight: 400;
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom:10px;
}


.selectBlock{
    margin-top: 5%;
}

.selectItem{
    margin-left: 125px;
}

.el-radio-group{
    margin-bottom: 10px;
}

</style>
