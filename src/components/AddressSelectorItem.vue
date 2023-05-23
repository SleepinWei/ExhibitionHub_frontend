<!-- 使用 npm install element-china-area-data -S 安装相关库 -->

<template>
    <div class="addressSelecotr">
        <div class="block">
            <el-cascader v-model="value" class="hvr-shadow" :options="areaOption" filterable @change="handleChange" />
        </div>
    </div>
</template>
  
<script>

import { regionData, codeToText, TextToCode } from "element-china-area-data";
export default {
    data() {
        return {
            value: [],
            userid: 0,
            areaOption: regionData,//省市区三级联动数据
        }
    },
    methods: {
        handleChange(data) {
            console.log(data)
            if (data[0] != null && data[1] != null && data[2] != null) {
                this.$emit('change', codeToText[data[0]], codeToText[data[1]], codeToText[data[2]]);

                // const str = CodeToText[data[0]] +'/' +CodeToText[data[1]] +'/' + CodeToText[data[2]]
                // console.log(str)
            }
        },

    },
    beforeMount() {
        //this.loadContent()

    }
}
</script>
  
<style scoped>
.addressSelecotr {
    display: flex;
}

.block {
    padding: 2% 0;
    text-align: center;
}
</style>
  