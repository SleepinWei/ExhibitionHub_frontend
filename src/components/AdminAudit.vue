<template class="wrapper">
  <el-row>
      <!-- <el-col :span="12" :offset="2">
      <h1>审核信息</h1>
      </el-col> -->
  </el-row>
  <el-row justify="left">
  <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="展览名称" align="center"/>
      <el-table-column prop="organizer" label="主办方" align="center"/>
      <el-table-column prop="date" label="提交时间"  align="center"/>
      <el-table-column label="查看详情" align="center">
          <template #default="scope">
              <el-button  @click="view(scope.row)">
                查看
              </el-button>
          </template>
      </el-table-column>
      <el-table-column label="审核" align="center">
          <template #default="scope">
            <el-button type="success" @click="approve(scope.row)">
                通过
            </el-button>
            <el-button type="danger" @click="refuse(scope.row)">
                不通过
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
          uid: this.$cookies.get("cookieAccount"),
          tableData: [],
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
            console.log(response.data)
            this.$axios.get("/admin/getUnchecked")
            .then((response) => {
              console.log("/admin/getUnchecked/pass")
              console.log(response.data);
              this.tableData = response.data;
            });
          });
        },
        refuse(row) {
          this.$axios.get(
            `/audit/refuse`,
            {
              params: {
                  id : parseInt(row.id)
              }
            }
          ).then((response) => {
            this.$axios.get("/admin/getUnchecked")
              .then((response) => {
                console.log("/admin/getUnchecked/refuse")
                console.log(response.data);
                this.tableData = response.data;
              });
          });
        }
    },
    mounted() {
      this.$axios.get("/admin/getUnchecked")
        .then((response) => {
          console.log("/admin/getUnchecked/mounted")
          console.log(response.data);
          this.tableData = response.data;
        });
    }
}

</script>

<style scoped>

</style>