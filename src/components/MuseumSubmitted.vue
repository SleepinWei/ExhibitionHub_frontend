  <template>
    <div class="table-container">
      <el-table :data="exhibitions" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column prop="name" label="展览名称" align="center"></el-table-column>
        <el-table-column prop="date" label="提交时间" align="center"></el-table-column>
        <el-table-column prop="type" label="修改类型" align="center"></el-table-column>
        <el-table-column prop="review_date" label="审核时间" align="center"></el-table-column>
        <el-table-column label="审核状态" v-slot="{ row }" align="center">
          <el-check-tag  :style="{ backgroundColor: row.result == 'pass' ? '#f4f4f5' : '#f4f4f5', color: row.result === 'pass' ? '#43ad60' : '#e25959' }"  @click="handleTagClick(row)">
            {{ row.result === 'pass' ? '通过' : '未通过' }}
          </el-check-tag>
        </el-table-column>
      </el-table>
    </div>

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
            exhibitions: [],
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
          };
        },
        methods:{
          handleTagClick(row){
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
                this.exhibitionViewed.poster_url = this.$posterPath + response.data.poster_url;
          
            });
          }
        },
        mounted() {
          this.$axios.get("/getCheckedEx", {
            params: {
              id : this.uid
            }
          })
          .then((response) => {
            console.log("/getCheckedEx"+this.uid);
            console.log(response.data);
            this.exhibitions = response.data;
          });
        }
    };
  </script>
  
  <style scoped>
    .table-container {
        width: 100%;
        height: 100%;
    }
  </style>