<template>
    <el-row style="margin-bottom: 50px;">
        <el-col :span="12" :offset="6" style="margin-top: 50px;">
            <el-input
                v-model="input" 
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
export default {
    components:{ExThumbnail},
    data() {
        return {
            input: "",
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
}
</script>