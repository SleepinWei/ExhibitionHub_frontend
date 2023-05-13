<template>
    <el-row>
        <!-- <el-col :span="12" :offset="2">
        <h1>审核信息</h1>
        </el-col> -->
    </el-row>
    <el-row justify="left">
    <el-table :data="tableData" stripe style="width: 80%">
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column prop="name" label="Exhibition Name"/>
        <el-table-column prop="date" label="Edit Time"/>
        <el-table-column label="Operations">
            <template #default="scope">
                <el-button size="small" @click="view(scope.row)">
                    View
                </el-button>
                <el-button size="small" type="info" @click="approve(scope.row)">
                    Approve
                </el-button>
                <el-button size="small" type="danger" @click="refuse(scope.row)">
                    Decline
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    </el-row>

    <!-- dialog -->
    <el-dialog 
        v-model="dialogVisible" 
        title="Changes"
        width="100%"
    >

    <ExhibitionInfoComp :form="exhibitionViewed" />

    <template #footer>
        <span style="margin-right:10px">
            <el-button type="primary" @click="dialogVisible=false">
                Confirm
            </el-button>
        </span>
    </template>
    </el-dialog>
</template>

<script>
import ExhibitionInfoComp from '@/components/ExhibitionInfoComp.vue'

export default {
    data() {
        return {
            tableData: [
                {
                    name : "Tom",
                    date: "2002-04-01 23:00:00",
                    exId : 2
                },
                {
                    name : "Jerry",
                    date: "2002-04-02 21:00:00",
                    exId: 1 
                }
            ],
            exhibitionViewed: {
                exId: this.$route.params.exId,
                poster_url: "/src/assets/posters/saber.png",
                name: "Exhibition 1",
                begin_date: "2001-01-01",
                end_date: "2001-02-02",
                organizer: "og1",
                tickets: "2000RMB",
                link: "https://bilibili.com",
                tags: ["tag1", "tag2"],
                introduction: "some long introssssss\nssssssssssssssssssssssssssss\nssssssssssssssssssssss\
            ssssssssssssssssssssssssssssss",
                begin_time: "",
                end_time: "",
                recommends: ["ex1", "ex2", "ex3"]
          
            },
            dialogVisible : false
        }
    },
    methods: {
        // dbclick(row,col,event){
        //     var exId = row.exId;
        //     // this.$router.push(`/exhibition/${exId}`)
        // },
        view(row) {
            // 查看展览具体信息
            console.log(row);
            this.dialogVisible = true;
            this.$axios.get(
                `/audit/view`, {
                params: {
                    id : parseInt(row.id)
                }
            }
            ).then((response) => {
                //
                this.exhibitionViewed = response.data; 
            });
        },
        approve(row) {
            // 通过
            this.$axios.get(
                `/audit/pass`, {
                    params: {
                        id : parseInt(row.id)
                    }
                }
            ).then((response) => {

            });
        },
        refuse(row) {
            // 
            this.$axios.get(
                `/audit/refuse`,
                {
                    params: {
                        id : parseInt(row.id)
                    }
                }
            ).then((response) => {
                
            });
        }
    },
    mounted() {
        this.$axios.get("/getUncheckedEx")
            .then((response) => {
                console.log(response.data);
                this.tableData = response.data;
            });
    }
}

</script>

<style>

</style>