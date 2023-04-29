<template>
    <el-row>
        <el-col :span="12" :offset="2">
        <h1>审核信息</h1>
        </el-col>
    </el-row>
    <el-row justify="center">
    <el-table :data="tableData" stripe style="width: 80%" @row-dblclick="dbclick">
        <el-table-column prop="name" label="Exhibition Name"/>
        <el-table-column prop="last_edit" label="Last Edit"/>
    </el-table>
    </el-row>
</template>

<script>
import { ClickOutside } from 'element-plus';


export default {
    data() {
        return {
            tableData: [
                {
                    name : "Tom",
                    last_edit : "2002-04-01 23:00:00",
                    exId : 2
                },
                {
                    name : "Jerry",
                    last_edit : "2002-04-02 21:00:00",
                    exId: 1 
                }
            ]
        }
    },
    methods: {
        dbclick(row,col,event){
            var exId = row.exId;
            this.$router.push(`/exhibition/${exId}`)
        }

    }
}

</script>

<style>

</style>