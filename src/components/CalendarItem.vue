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
        <div v-for="i in arr" :key="i.id">
            <div v-if="data.day==i.date">{{i.content}}</div>
        </div>
    </template>
</el-calendar>
</template>
    
<style scoped>

</style>
<script>
import { ref } from 'vue'

export default {
    name : 'calendar',
    data() {
        return{
            value: new Date(),
            arr:[],
            form:{
                    id:'',
                    date:'',
                    content:''
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
    },
        
    beforeMount() {
        this.loadContent()

    }

}

</script>