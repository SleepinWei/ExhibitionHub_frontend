  <template>
    <div class="table-container">
      <el-table :data="exhibitions" border>
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column prop="id" label="展览ID" align="center"></el-table-column>
        <el-table-column prop="name" label="展览名称" align="center"></el-table-column>
        <el-table-column prop="venue_name" label="展览地点" align="center"></el-table-column>
        <el-table-column prop="organizer" label="主办方" align="center"></el-table-column>
        <el-table-column prop="begin_date" label="展览开始日期" align="center"></el-table-column>
        <el-table-column prop="end_date" label="展览结束日期" align="center"></el-table-column>

        <el-table-column label="待审核" v-slot="{ row }" align="center">
          <el-button type="primary" size="mini" @click="verifyExhibition(row.id)">
            查看详情
          </el-button>
        </el-table-column>

      </el-table>
    </div>
  </template>
  
  <script>
    export default {
        data() {
          return {
              exhibitions: [
              { id: 1, name: "展览A", date: "2023-06-01", venue_name: "上海市某展馆", organizer: "刘欣" , begin_date:"2023-5-7" , end_date:"2023-5-8"},
              { id: 2, name: "展览B", date: "2023-07-01", venue_name: "北京市某展馆", organizer: "小牛" , begin_date:"2023-5-7" , end_date:"2023-5-8" },
              { id: 3, name: "展览C", date: "2023-08-01", venue_name: "广州市某展馆", organizer: "亦菲" , begin_date:"2023-5-7" , end_date:"2023-5-8" }
              ]
          };
        },
        methods:{
          verifyExhibition(row){
            console.log("博物馆查看详情+"+row)
          }
        }
    };
  </script>
  
  <style scoped>
    .table-container {
        width: 100%;
        height: 100%;
    }
    </style>