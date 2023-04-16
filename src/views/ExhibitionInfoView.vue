<template>
<el-row>
    <el-col :span="9">
        <div class="poster-image">
            <el-image style="width: 300px;height: 300px;" :src="poster_url" fit="contain">
            </el-image>
        </div>
    </el-col>
    <el-col :span="13" :offset="2">
        <el-row>
            name
        </el-row>
        <el-row>
            time
        </el-row>
        <el-row>
            organizer 
        </el-row>
        <el-row>
            tickets
        </el-row>
        <el-row>
            link
        </el-row>
        <el-row>
            tags
        </el-row>
    </el-col>
</el-row>

<el-row>
    introductions
</el-row>
</template>

<script>
export default {
    data() {
        return {
            exId: this.$route.params.exId,
            poster_url: "/src/assets/posters/saber.png"
        }
    },
    mounted() {
        console.log(this.exId);
    }
}

</script>

<style>
</style>