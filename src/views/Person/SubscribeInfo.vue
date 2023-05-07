<!--
 * @Author: yingxin wang
 * @Date: 2023-04-25 16:07:36
 * @LastEditors: yingxin wang
 * @LastEditTime: 2023-05-06 14:38:41
 * @Description: 个人页面中查看个人订阅内容
-->
<template>
    <div>
        <CardItem :result="this.searchResult" style="margin-left: 40px;margin-top: 20px;" />
    </div>
</template>

<script>
import CardItem from '../../components/CardItem.vue'
import axios from 'axios';
export default {
    components: { CardItem },
    data() {
        return {
            searchResult: [],
        }
    },
    methods: {
        search() {
            axios.get('/subscribe/getAllSub/' + this.$cookies.get("cookieAccount")
            ).then((response) => {
                console.log(response.data);
                this.searchResult = [];
                var data = response.data;
                for (var i = 0; i < data.length; i += 1) {
                    this.searchResult.push(data[i]);
                }
            }
            );
        },
    },
    mounted() {
        this.search();
    },
}
</script>

