<template>
<el-calendar v-model="value">
    <template #header="{ date }">
        <div class="leftbutton">
            <el-button @click="selectDate('prev-year')">
                <span>&lt&lt</span>
            </el-button>
            <el-button @click="selectDate('prev-month')">
                <span>&lt</span>
            </el-button>
        </div>
        <div class="middlebutton">
            <el-button @click="selectDate('today')">
                {{ date }}
            </el-button>
        </div>
        <div class="rightbutton">
            <el-button @click="selectDate('next-month')">
                >
            </el-button>
            <el-button @click="selectDate('next-year')">
                >>
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
                    <div class="item" v-for="j in i.content" :key="j.id">
                        <el-tooltip :content="j.name">
                            <div :class="selectItemStyle(j.type)" @click="selectItem(j.id)">
                                <el-text >{{j.name}}</el-text>
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
    
<style scoped>
.el-calendar{
    --el-calendar-cell-width:auto;
    flex-wrap: wrap;
}

.weekend-date-current{
    color: rgba(238, 63, 77, 1);
}
.weekend-date{
    color: rgba(227, 180, 184, 1);
}
.item{
    text-align: center;
    padding:2%;
    margin:2% auto;
}

.item1 {
    border-radius:50px;
    background: rgba(73, 92, 105, 0.5);
}

.item1:hover{
    background: rgba(94, 121, 135, 0.5);
}

.item2 {
    border-radius:50px;
    background: rgba(32, 137, 77, 0.5);
    
}

.item2:hover{
    background: rgba(131, 161, 147, 0.5);
}

.item .el-text{
    color:white;
    
}

.el-calendar{
width: auto;
height: auto;

}


</style>

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
                    return 'item1'
                case 2:
                    return 'item2'
            }
        },
    

    },
        
    beforeMount() {
        //this.loadContent()

    }

}

</script>