<template>
<el-calendar v-model="value">
    <template #header="{ date }">
        <div class="currentDate">
            {{ date }}
        </div>
        <div class="rightbutton">
            <el-button class="hvr-grow-shadow" @click="selectDate('prev-year')">
                <div class="order">&lt&lt</div>
            </el-button>
            <el-button class="hvr-grow-shadow" @click="selectDate('prev-month')">
                <div class="order">&lt</div>
            </el-button>
            <el-button class="hvr-grow-shadow" @click="selectDate('next-month')">
                <div class="order">></div>
            </el-button>
            <el-button class="hvr-grow-shadow" @click="selectDate('next-year')">
                <div class="order">>></div>
            </el-button>
        </div>
    </template>

    <template #date-cell="{ data }" >
        <div class="cell-container">
            <div :class="selectWeekendWordStyle(data)"
            >
                {{ data.day.split("-").slice(2).join("-") }}
            </div>

            <div v-for="i in ExhibitonArr" :key="i" >
                <div v-if="data.day==i.visitdate" >
                    <el-tooltip 
                    :content="i.name"
                    :hide-after=0
                    >
                        <div class="card" :class="selectItemStyle(i.tags)"  >
                            <div @click="selectItem(i.ex_id)" >
                                <p>{{i.name}}</p>
                            </div>
                        </div>
                    </el-tooltip>
                </div>
            </div>
            <!-- <div class="item">
                
            </div> -->
            
        </div>
        
    </template>
</el-calendar>
</template>


<script>

export default {
    props:{
        ExhibitonArr:{
            type:Array
        }
    },
    data() {
        return{
            value: new Date(),
        } 
    },
    methods:{
        selectDate(flag) {
            console.log(flag);
            if (flag === 'prev-year') this.value = new Date(this.value.setFullYear(this.value.getFullYear() - 1));
            else if (flag === 'prev-month') this.value = new Date(this.value.setMonth(this.value.getMonth() - 1));
            else if (flag === 'today') this.value = new Date();
            else if (flag === 'next-month') this.value = new Date(this.value.setMonth(this.value.getMonth() + 1));
            else if (flag === 'next-year') this.value = new Date(this.value.setFullYear(this.value.getFullYear() + 1));
        },
        selectItem(itemid) {
            console.log(itemid)
            this.$router.push('/exhibition/'+itemid)
        },
        show(data){
            console.log(data)
        },
        selectWeekendWordStyle(data){
            if(data.date.getDay() == 6 || data.date.getDay() == 0){
                if(data.type=='current-month'){
                    return 'weekend-date-current'
                }
                return 'weekend-date'
            }
        },
        selectItemStyle(tags){
            switch(tags[0]){
                case 1:
                    return 'card1'
                case 2:
                    return 'card2'
                default:
                    return 'card1'
            }
        },
    },
        
    beforeMount() {
        //this.loadContent()

    }

}

</script>


<style scoped>

.order{
    font-weight: 100;
    
}
.currentDate{
    font-weight: 200;
}
:deep(.el-calendar-table thead th){
    font-weight: 200;
}


.el-calendar{
    font-weight: 200;
    --el-calendar-cell-width:auto;
    flex-wrap: wrap;
    --el-button-font-weight:200;
}

:deep(.el-calendar-day){
    min-height: 80px;
}

.weekend-date-current{
    color: rgba(238, 63, 77, 1);
}
.weekend-date{
    color: rgba(227, 180, 184, 1);
}
:deep(hvr-underline-from-center){
    text-align: center;
    padding:2%;
    margin:2% auto;
}
.el-calendar{
width: auto;
height: auto;

}

.card p {
  font-size: 14px;
  font-weight: 400;
  width:auto;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #666;
  margin: 0px 0px;
  padding: 6px 0px;
}

.card {
  display: block;
  position: relative;
  border-radius: 4px;
  text-align:center;
  margin: 6px auto 6px auto;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
  height: 32px;
}

.card:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: -16px;
  right: -16px;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  transform: scale(1);
  transform-origin: 50% 50%;
  transition: transform 0.25s ease-out;
  
}

.card:hover:before {
  transform: scale(21);
}

.card:hover p {
  transition: all 0.3s ease-out;
  color: rgba(255, 255, 255, 0.8);
}

/*type1*/
.card1 {
    background-color: #f2f8f9;
}
.card1:before {
    background: #00838d;
}

.card2 {
    background-color: #fee7e9;
}
.card2:before {
    background: #b4585d;
}



</style>