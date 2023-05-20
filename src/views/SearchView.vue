<template>
    <body>
        <!-- <HeaderItem /> -->
        <el-row style="margin-bottom: 50px; margin-top: 50px;" align="middle">
            <el-col :span="12" :offset="6">
                <el-input v-model="inputText" size="large" placeholder="Input">
                    <template #prepend>
                        <el-icon>
                            <Search />
                        </el-icon>
                    </template>
                </el-input>
            </el-col>
            <el-col :span="3" style="height: 100%; margin-left: 10px;">
                <el-button @click="submitSearch">搜索</el-button>
            </el-col>
        </el-row>

        <el-row style="width: 100%;height: 100%; position: absolute;">
            <el-col :span="18" class="CardItem">
                <el-row v-if="searchText !== null" style="margin-bottom: 20px;margin-top: -20px;color: dimgrey;">
                    下面是" {{ searchText }} "的搜索结果
                </el-row>
                <CardItem :result="this.searchResult" />
            </el-col>
            <el-col class="Selector">
                <!-- 'Selector': this.scrollTop < 20, -->
                <div class="demonstration">日程显示</div>
                <div class="selectBlock">
                    <div class="demonstration">展览日期</div>
                    <el-radio-group v-model="ifDateLimit" @change="selectIfDateLimit">
                        <el-radio label="noDateLimit" size="large">日期不限</el-radio>
                        <el-radio label="DateLimit" size="large">选择日期</el-radio>
                        <div class="selectItem" v-if="showDateSelector == 1">
                            <DateSelectorItem @change="dateChange" />
                        </div>
                    </el-radio-group>
                    <br />
                    <div class="demonstration">展览地点</div>
                    <el-radio-group v-model="ifLocationLimit" @change="selectIfLocationLimit">
                        <el-radio label="noLocationLimit" size="large">地点不限</el-radio>
                        <el-radio label="LocationLimit" size="large">选择地点</el-radio>
                        <div class="selectItem" v-if="showLocationSelector == 1">
                            <AddressSelectorItem @change="locationChange" />
                        </div>
                    </el-radio-group>
                    <div class="demonstration">展览类型</div>
                    <TypeSelectorItem @selectType="typeChange" />
                    <div class="demonstration">展览馆</div>
                    <MuseumSelectorItem :search_venue=venue @change="venueChange" />
                </div>
            </el-col>
        </el-row>

        <!-- <ExThumbnail v-for="result in searchResult" :params="{
            id: result.id,
            poster_url: result.poster_url,
            name: result.name,
            location: result.location,
            begin_date: result.begin_date,
            end_date: result.end_date
        }">
    </ExThumbnail> -->
    </body>
</template>

<script>
import HeaderItem from '../components/Header.vue'
import CardItem from '@/components/CardItem.vue';
import ExThumbnail from '@/components/ExThumbnail.vue';
import CalendarItem from '../components/CalendarItem.vue'
import DateSelectorItem from '../components/DateSelectorItem.vue';
import TypeSelectorItem from '../components/TypeSelectorItem.vue';
import AddressSelectorItem from '../components/AddressSelectorItem.vue';
import MuseumSelectorItem from '../components/MuseumSelectorItem.vue';
import axios from 'axios';
export default {
    components: {
        ExThumbnail,
        CardItem,
        AddressSelectorItem,
        CalendarItem,
        DateSelectorItem,
        TypeSelectorItem,
        MuseumSelectorItem
    },
    data() {
        return {
            inputText: "",
            searchText: "",
            searchResult: [],
            ifDateLimit: 'noDateLimit',
            ifLocationLimit: 'noLocationLimit',
            showDateSelector: 0,
            showLocationSelector: 0,
            userid: this.$cookies.get("cookieAccount"),
            startTime: '1900-01-01',
            endTime: '2100-12-31',
            venue: this.$route.query.venue,
            tags: "-1",
            province: "null",
            city: "null",
            area: "null",
            ExhibitonArr: []
        }
    },
    methods: {
        submitSearch() {
            this.$router.replace({
                path: "/search", query: { querytext: this.inputText }
            });
            // 调用一次查询
            this.searchRequest(this.inputText);
        },
        searchRequest(query) {
            // console.log(query);
            // this.searchText = query
            // if (this.searchText === "")
            //     this.searchText = null
            // axios.get(
            //     `/searchByKeyword`,
            //     {
            //         params: {
            //             querytext: String(query)
            //         }
            //     }
            // ).then(
            //     (response) => {
            //         // this.searchResult = response.data;
            //         console.log(response.data);
            //         // this.result = response.data;
            //         this.searchResult = [];
            //         var data = response.data;
            //         for (var i = 0; i < data.length; i += 1) {
            //             this.searchResult.push(data[i]);
            //         }
            //         console.log(this.searchResult)
            //     }
            // );
            this.loadContent();
        },
        keyListener(event) {
            if (event.keyCode == 13) {
                this.submitSearch();
            }
        },

        selectIfDateLimit(data) {
            if (data == 'DateLimit') {
                this.showDateSelector = 1
            } else {
                this.showDateSelector = 0
                //取消日期限制
                this.startTime = '1900-01-01'
                this.endTime = '2100-12-31'
                this.loadContent()
            }
        },
        selectIfLocationLimit(data) {
            if (data == 'LocationLimit') {
                this.showLocationSelector = 1
            } else {
                this.showLocationSelector = 0
                this.province = "null",
                    this.city = "null",
                    this.area = "null",
                    this.loadContent()
            }
        },
        dateChange(src, dst) {
            this.startTime = src
            this.endTime = dst
            this.loadContent()
        },
        locationChange(province, city, area) {
            this.province = province
            this.city = city
            this.area = area
            this.loadContent()
        },
        typeChange(data) {
            if (data.length == 0) {
                this.tags = "-1";
            } else {
                this.tags = ""
                for (var i = 0; i < data.length; ++i) {
                    this.tags += data[i] + ' '
                }
            }
            console.log("searchhhhhhh", this.tags)
            this.loadContent()
        },
        venueChange(venue) {
            if (venue == "---------------不限---------------") {
                venue = "null"
            }
            this.venue = venue
            this.loadContent()
        },
        loadContent() {
            axios.post('/tagSelection/searchByData', {
                query: this.inputText,
                src: this.startTime,
                dst: this.endTime,
                venue: this.venue,
                tags: this.tags,
                province: this.province,
                city: this.city,
                area: this.area
            }
            ).then((response) => {
                this.searchResult = response.data
                console.log(this.startTime + '/' + this.endTime + '/' + this.venue + '/' + this.tags + '/' + this.province + '/' + this.city + '/' + this.area)
                console.log(this.searchResult)
            }).catch((error) => {
                //为什么报错但是能够运行请问
                console.log(error)
            });
        }
    },
    watch: {
        'route'(to, from) {
            let that = this;
            if (to.params.id != from.params.id) {
                that.id = to.params.id;
                that.getData(); // 重新加载数据
            }
        }
    },
    mounted() {
        if (this.$route.query.venue != null) {
            this.venue=this.$route.query.venue;
            this.searchText=null;
            this.venueChange(this.venue);
            this.$router.push({
                path:this.$route.path,
                query: {}
            }
            );//清空路由   
        }else{
            // 从其他页面跳转过来，需要进行一次查询
            if (this.$route.query.querytext != null) {
                this.inputText = this.$route.query.querytext;    
            }
            this.searchRequest(this.inputText);
        }
    },
}
</script>


<style scoped>
.flex-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 50px;
    margin-bottom: 50px;
}

.CardItem {
    margin-top: 50px;
    margin-bottom: 50px;
    margin-left: 60px;
    left: 0;
}

.Selector {
    position: fixed;
    display: inline-block;
    width: 30%;
    margin-top: 2%;
    right: 0;
}

.demonstration {
    font-weight: bold;
    size: 20px;
}

.selectBlock .demonstration {
    font-weight: 400;
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 10px;
}


.selectBlock {
    margin-top: 5%;
}

.selectItem {
    margin-left: 125px;
}

.el-radio-group {
    margin-bottom: 10px;
}
</style>