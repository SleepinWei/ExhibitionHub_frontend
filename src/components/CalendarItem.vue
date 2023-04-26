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

            <div v-for="i in scheduleData" :key="i.date" >
                <div v-if="data.day==i.date" >
                    <div v-for="j in i.content" :key="j.id">
                        <el-tooltip 
                        :content="j.name"
                        hide-after=0
                        >
                            <div class="card" :class="selectItemStyle(j.type)"  >
                                <div @click="selectItem(j.id)">
                                    <p>{{j.name}}</p>
                                </div>
                            </div>
                        </el-tooltip>
                    </div>
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
    name : 'calendar',
    data() {
        return{
            value: new Date(),
            scheduleData:[
                {
                    date:'2023-04-23',
                    content:[
                        {id:1,type:1,name:'玉石展'},
                        {id:2,type:1,name:'美食展'},
                        {id:4,type:2,name:'画展'},
                    ]
                },
                {
                    date:'2023-04-17',
                    content:[
                        {id:3,type:2,name:'书法展'}
                    ]
                }
            ]
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
        // loadContent(){
        //     this.$axios.get('http://localhost:8080/searchByKeyword').then(res=>res.data).then(res=>{
        //         console.log(res)
        //         //this.arr=res.data
        //     })
        // },
        selectItem(itemid) {
            console.log(itemid)
            this.$router.push('/Exhibitionid='+itemid)
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
        selectItemStyle(type){
            switch(type){
                case 1:
                    return 'card1'
                case 2:
                    return 'card2'
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
  line-height: 1px;
  color: #666;
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