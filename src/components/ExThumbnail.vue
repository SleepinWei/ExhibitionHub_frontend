<template>
<el-row style="margin-left: 50px; margin-right: 50px;">
    <el-card :body-style="{padding: '0px'}" style="width: 100%;" shadow="hover">
        <el-row>
            <el-col :span="6">
            <el-image style="width: 200px;height: 200px;" :src="this.params.poster_url" fit="contain" />
            </el-col>
            <el-col :span="8">
                <p>
                    {{ this.params.name }}
                </p>
                <p>
                    {{ this.params.location }}
                </p>
                <p>
                    {{ this.params.begin_date }} - {{ this.params.end_date }}
                </p>
            </el-col>
        </el-row>
    </el-card>
</el-row>
</template>

<script>
export default {
    props: ['params'],
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>