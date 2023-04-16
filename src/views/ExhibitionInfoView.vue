<template>
<el-row>
    <el-col :span="18">
    <el-row class="basic_info">
        <el-col :span="9">
            <el-row justify="center" class="poster-image">
                <el-image style="width: 250px;height: 300px;" :src="poster_url" fit="contain">
                </el-image>
            </el-row>
        </el-col>
        <el-col :span="13" :offset="0">
            <el-row class="sub_info">
                <h2>
                    {{name}}
                </h2>
            </el-row>
            <el-row class="sub_info">
                时间：{{begin_time}} - {{ end_time }}
            </el-row>
            <el-row class="sub_info">
                主办方：{{organizer }}
            </el-row>
            <el-row class="sub_info">
                票价: {{tickets}}
            </el-row>
            <el-row class="sub_info">
                官方链接: 
                <a :href="link">
                    {{link}}
                </a>
            </el-row>
            <el-row class="sub_info">
                标签: 
                <el-tag v-for="tag in tags"> tag </el-tag>
            </el-row>
        </el-col>

    </el-row>

    <el-row class="long_intro">
        <h2>详细介绍</h2>
    </el-row>
    <el-row class="long_intro">
        <!-- {{ intro }} -->
        <div v-html="long_intros"></div>
    </el-row>
    </el-col>
    <el-col :span="6">
        <!-- 推荐信息 -->
        <el-row>
            <h2>
                推荐展览
            </h2>
        </el-row>
        <el-row>
            <ul>
                <li v-for="recommend in recommends">
                    {{recommend}}
                </li>
            </ul>
        </el-row>
    </el-col>
</el-row>

</template>

<script>
export default {
    data() {
        return {
            exId: this.$route.params.exId,
            poster_url: "/src/assets/posters/saber.png",
            name: "Exhibition 1",
            begin_time: "2001-01-01",
            end_time: "2001-02-02",
            organizer: "og1",
            tickets: "2000RMB",
            link: "https://bilibili.com",
            tags: ["tag1", "tag2"],
            intro: "some long introssssss\nssssssssssssssssssssssssssss\nssssssssssssssssssssss\
            ssssssssssssssssssssssssssssss",
            recommends:["ex1","ex2","ex3"]
        }
    },
    mounted() {
        console.log(this.exId);
    },
    computed: {
        long_intros() {
            var arr = this.intro.split("\n");
            var result = ""; 
            arr.forEach((value, index, array) => {
                result += `<p>${value}</p>`
            });
            return result;
        }
    }
}

</script>

<style>
.basic_info{
    padding-top:30px;
}

.el-tag{
    margin-left: 5px;
}

.sub_info{
    margin-top: 5px;
}

.long_intro{
    padding-left: 50px;
}
</style>