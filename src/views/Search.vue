<template>
    <el-row>
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
</template>

<script>
export default {
    data() {
        return {
            input: ""
        }
    },
}
</script>