<template>
    <el-row style="margin-bottom: 50px; margin-top: 50px;" align="middle">
        <el-col :span="12" :offset="6">
            <el-input v-model="inputText" size="large" placeholder="Input">
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

    <div class="center-row">
        <CardItem :result="this.searchResult" />
    </div>
    <!-- <ExThumbnail v-for="result in searchResult" :params="{
            id: result.id,
            poster_url: result.poster_url,
            name: result.name,
            location: result.location,
            begin_date: result.begin_date,
            end_date: result.end_date
        }">
    </ExThumbnail> -->
</template>

<script>
import ExThumbnail from '@/components/ExThumbnail.vue';
import CardItem from '@/components/CardItem.vue';
import axios from 'axios';
export default {
    components: { ExThumbnail, CardItem },
    data() {
        return {
            inputText: "",
            // searchResult: 
            searchResult: [
                // TODO: searchResult should be an array [] 
            ]
        }
    },
    methods: {
        submitSearch() {
            this.$router.replace({
                path: "/search", query: { querytext: this.inputText }
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
                    console.log(response.data);
                    // this.result = response.data;
                    this.searchResult = [[], [], [], []];
                    var data = response.data;
                    for (var i = 0; i < data.length; i += 4) {
                        this.searchResult[0].push(data[i]);
                        if ((i + 1) < data.length)
                            this.searchResult[1].push(data[i + 1]);
                        if ((i + 2) < data.length)
                            this.searchResult[2].push(data[i + 2]);
                        if ((i + 3) < data.length)
                            this.searchResult[3].push(data[i + 3]);
                    }
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

<style scoped>
.center-row {
    display: flex;
    gap: 30px;
    padding: 30px;
    column-count: 4;
    flex-direction: row;
    text-align: left;
}
</style>