<template>
    <el-row style="margin-bottom: 50px; margin-top: 50px;" align="middle">
        <el-col :span="12" :offset="6"> 
            <el-input
                v-model="inputText" 
                size="large"
                placeholder="Input"
                >
                <template #prepend>
                    <!-- <el-button @click="submitSearch"> -->
                        <el-icon>
                            <Search />         
                        </el-icon>
                    <!-- </el-button> -->
                </template>
            </el-input>
        </el-col>
        <el-col :span="3" style="height: 100%; margin-left: 10px;">
            <el-button @click="submitSearch">搜索</el-button>
        </el-col>
    </el-row>

    <!-- <ExThumbnail v-for="result in searchResult" :params="{ -->
    <ExThumbnail :params="{
        id : result.id,
        poster_url: result.poster_url,
        name : result.name,
        location : result.location,
        begin_date : result.begin_date,
        end_date : result.end_date
    }"> -->
    </ExThumbnail>
</template>

<script>
import ExThumbnail from '@/components/ExThumbnail.vue';
import axios from 'axios';
export default {
    components:{ExThumbnail},
    data() {
        return {
            inputText: "",
            // searchResult: 
            result:
                {
                    id : 0,
                    name: "Ex1",
                    poster_url : "/src/assets/posters/saber.png",
                    location: "locaiton1",
                    begin_date: "2001-02-02",
                    end_date: "2002-03-03",
                },
            // TODO: searchResult should be an array [] 
        }
    },
    methods: {
        submitSearch() {
            this.$router.replace({
                path: "/search" , query: { querytext: this.inputText }
            });
            // 调用一次查询
            this.searchRequest(this.inputText);
        },
        searchRequest(query) {
            console.log(query);
            axios.get(
                `/searchByKeyword`,
                {
                    params: {
                        querytext: String(query)
                    }
                }
            ).then(
                (response) => {
                    // this.searchResult = response.data;
                    // console.log(response.data);
                    this.result = response.data;
                    //TODO: this.searchResult should be an array
                }
            );
        },
        keyListener(event) {
            if (event.keyCode == 13) {
                this.submitSearch();
            }
        },

    },
    watch: {
        'route'(to, from) {
            let that = this;
            if (to.params.id != from.params.id) {
                that.id = to.params.id;
                that.getData(); // 重新加载数据
            }
        }
    },
    mounted() {
        // 从其他页面跳转过来，需要进行一次查询
        if (this.$route.query.querytext != null) {
            this.inputText = this.$route.query.querytext;
        }
        this.searchRequest(this.inputText);
    },
}
</script>