<template>
    <el-row justify="center" align="top">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="(item, index) in items" :key="index" :flex="1">
            <el-card :body-style="{ padding: '0px' }">
                <img :src="item.imageUrl" style="width: 100%">
                <div style="padding: 14px;">
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.description }}</p>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
  
<script>
export default {
    data() {
        return {
            items: [
                {
                    title: 'Card 1',
                    description: 'Description for card 1',
                    imageUrl: 'https://via.placeholder.com/300x200',
                },
                {
                    title: 'Card 2',
                    description: 'Description for card 2 that is longer than the other one',
                    imageUrl: 'https://via.placeholder.com/300x400',
                },
                {
                    title: 'Card 3',
                    description: 'Description for card 3',
                    imageUrl: 'https://via.placeholder.com/300x300',
                },
                {
                    title: 'Card 4',
                    description: 'Description for card 4 that is even longer than the second one',
                    imageUrl: 'https://via.placeholder.com/300x500',
                },
            ],
        };
    },
};
</script>
  