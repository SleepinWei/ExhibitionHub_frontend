<template>
    <el-row style="margin-bottom: 50px;">
        <el-col :span="12" :offset="6" style="margin-top: 50px;">
            <el-input
                v-model="inputText" 
                size="large"
                placeholder="Input"
                >
                <template #prepend>
                    <el-button>
                        <el-icon>
                            <Search />         
                        </el-icon>
                    </el-button>
                </template>
            </el-input>
        </el-col>
    </el-row>

    <ExThumbnail v-for="result in searchResult" :params="{
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
import { url } from 'inspector';
export default {
    components:{ExThumbnail},
    data() {
        return {
            inputText: "",
            searchResult: [
                {
                    name: "Ex1",
                    poster_url : "/src/assets/posters/saber.png",
                    location: "locaiton1",
                    begin_date: "2001-02-02",
                    end_date: "2002-03-03",
                },
            ]
        }
    },
    methods: {
        submitSearch() {
            this.$router.push({
                path: "/search", query: { querytext: this.inputText }
            });
            // 调用一次查询
            this.searchRequest();
        },
        searchRequest() {
            if (this.$route.query.querytext == null) {
                return;
            }
            // console.log(this.$route.query.querytext);
            axios.get(
                url=`/search/${this.inputText}` 
            ).then(
                (response) => {
                    this.searchRequest = response.data;
                }
            )
        },
        keyListener(event) {
            if (event.keyCode == 13) {
                this.submitSearch();
            }
        }
    },
    mounted() {
        window.addEventListener('keydown', this.keyListener,true);
        // 从其他页面跳转过来，需要进行一次查询
        this.searchRequest();
    },
    unmounted() {
        window.removeEventListener('keydown', this.keyListener,false);
    }
}
</script>