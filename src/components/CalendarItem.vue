<template>
<el-calendar v-model="value">
    <template #header="{ date }">
        <div class="leftbutton">
            <el-button size="small" @click="selectDate('prev-year')">
                <span>&lt&lt</span>
            </el-button>
            <el-button size="small" @click="selectDate('prev-month')">
                <span>&lt</span>
            </el-button>
        </div>
        <div class="middlebutton">
            <el-button size="small" @click="selectDate('today')">
                {{ date }}
            </el-button>
        </div>
        <div class="rightbutton">
            <el-button size="small" @click="selectDate('next-month')">
                >
            </el-button>
            <el-button size="small" @click="selectDate('next-year')">
                >>
            </el-button>
        </div>
    </template>

    <template #date-cell="{ data }">
        <div>
            {{ data.day.split("-").slice(2).join("-") }}
            <!-- {{ data.isSelected ? '✔' : ''}} -->
        </div>
        <div>
            <div v-for="i in arr" :key="i.id">
                <div class="item" v-if="data.day==i.date">
                    <el-tooltip :content="i.content">
                        <div :class="i.type==1?'item1':'item2'" @click="selectItem(i.id)">
                        <el-text>{{i.content}}</el-text>
                        </div>
                    </el-tooltip>
                    
                </div>
            </div>
        </div>
        <!-- <div class="item">
            
        </div> -->
        
    </template>
</el-calendar>
</template>
    
<style scoped>

.item{
    text-align: center;
    padding:2%;
    margin:2%;
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

</style>

<script>

export default {
    name : 'calendar',
    data() {
        return{
            value: new Date(),
            arr:[],
            form:{
                    id:'',
                    date:'',
                    type:'',
                    content:'',
                }
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
        loadContent(){
            this.$axios.get('http://localhost:8080/test/schedule').then(res=>res.data).then(res=>{
                console.log(res)
                this.arr=res.data
            })
        },
        selectItem(itemid) {
            console.log(itemid);
            this.$router.push('/Exhibitionid='+itemid)
        },


    },
        
    beforeMount() {
        this.loadContent()

    }

}

</script>