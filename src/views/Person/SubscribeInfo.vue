<!--
 * @Author: yingxin wang
 * @Date: 2023-04-25 16:07:36
 * @LastEditors: yingxin wang
 * @LastEditTime: 2023-04-29 15:25:53
 * @Description: 个人页面中查看个人订阅内容
-->
<template>
    <div>
        <CardItem></CardItem>
    </div>
</template>

<script>
import CardItem from '../../components/CardItem.vue'
export default {
    components: { CardItem },
    data() {
        return {
            searchResult: [[], [], [], []]
        }
    },
    methods: {
        search() {
            console.log(query);
            axios.get(`/subscribe/getAllSub`, {
                user_id: this.$cookies.get("cookieAccount")
            }).then((response) => {
                console.log(response.data);
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
    },
    mounted() {
        this.search();
    },
}
</script>

