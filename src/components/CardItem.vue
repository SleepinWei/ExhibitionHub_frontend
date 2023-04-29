<!--
 * @Author: yingxin wang
 * @Date: 2023-04-25 17:20:15
 * @LastEditors: yingxin wang
 * @LastEditTime: 2023-04-29 15:23:28
 * @Description: 卡片布局
-->
<template>
    <div class="container">
        <div justify="center" align="top" style="width: 30%;" v-for="(row, rowindex) in this.result" :key="rowindex">
            <div :style="{ flex: '1 1 0' }" v-for="(item, index) in row" :key="index">
                <el-card :body-style="{ padding: '0px' }" style="margin-bottom: 25px;">
                    <img :src="'http://127.0.0.1:8080/' + item.poster_url" style="width: 100%">
                    <div style="padding: 14px;">
                        <h3>{{ item.name }}</h3>
                        <p>{{ item.begin_date }} - {{ item.end_date }}</p>
                        <p>{{ item.introduction }}</p>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: ['result'],
    mounted() {
        console.log(this.params);
    }
};
</script>

<style>
.container {
    display: flex;
    gap: 30px;
    padding: 30px;
    column-count: 4;
    flex-direction: row;
    text-align: left;
}

.container>div {
    flex: 1 1 0;
    line-height: 1.2;
}
</style>
  