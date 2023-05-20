<template>
    <div class="museumSelecotr">
        <div class="block">
            <el-select class="hvr-shadow" v-model="value" filterable placeholder="---------------不限---------------"
                @change="handleChange">
                <el-option v-for="item in museumOptions" :key="item.id" :label="item.label" :value="item.label" />
            </el-select>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    props:{
        search_venue:{
            type:String
        }
    },
    data() {
        return {
            value: '',
            option: 0,
            museumOptions: [
                { id: 0, label: '---------------不限---------------' },
                // {id:1,label:'上海博物馆'},
                // {id:2,label:'上海科技馆'},
                // {id:3,label:'上海自然博物馆'},
            ],
        }
    },
    methods: {
        handleChange(data) {
            this.option = data
            console.log(this.option)
            this.$emit('change', this.option);
        },
        getAllOrganizer() {
            axios.get(`/ExhibitionMap/getAllVenue`)
                .then(
                    (response) => {
                        console.log(response.data);
                        this.museumOptions = [{ id: 0, label: '---------------不限---------------' },];
                        var data = response.data;
                        for (var i = 0; i < data.length; i += 1) {
                            this.museumOptions.push({ id: i + 1, label: data[i].venue_name });
                        }
                        console.log(this.museumOptions)
                    }
                );
        }
    },
    mounted() {
        if(this.search_venue!=null){
            this.value=this.search_venue;
        }
        this.getAllOrganizer();
    },
}
</script>
  
<style scoped>
.museumSelecotr {
    display: flex;
}

.block {
    padding: 2% 0;
    text-align: center;
}
</style>