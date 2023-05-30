<template>
    <body>
        <HeaderItem />
        <el-row style="margin-top: 30px;">
            <el-col :span="24">
                <el-row class="se-selector">
                    <el-col class="se-selector-in">
                        <el-row class="se-selector-header">展览日期&emsp;&emsp;
                            <el-radio-group v-model="ifDateLimit" @change="selectIfDateLimit">

                                <el-radio label="noDateLimit" size="large">日期不限</el-radio>
                                <el-radio label="DateLimit" size="large">选择日期</el-radio>
                                <div v-if="showDateSelector == 1">
                                    <DateSelectorItem @change="dateChange" />
                                </div>
                            </el-radio-group>
                        </el-row>

                        <el-row class="se-selector-header">展览地点&emsp;&emsp;
                            <el-radio-group v-model="ifLocationLimit" @change="selectIfLocationLimit">
                                <el-radio label="noLocationLimit" size="large">地点不限</el-radio>
                                <el-radio label="LocationLimit" size="large">选择地点</el-radio>
                                <div class="selectItem" v-if="showLocationSelector == 1">
                                    <AddressSelectorItem @change="locationChange" />
                                </div>
                            </el-radio-group>
                        </el-row>

                        <el-row class="se-selector-header">展览类型&emsp;&emsp;
                            <TypeSelectorItem @selectType="typeChange" />
                        </el-row>

                        <el-row class="se-selector-header">展览馆&emsp;&emsp;&emsp;
                            <MuseumSelectorItem :search_venue=venue @change="venueChange" />
                        </el-row>
                    </el-col>
                </el-row>

                <el-row style="width: 100%;height: 100%; position: absolute;">
                    <el-col :span="18" class="CardItem">
                        <el-row v-if="inputText !== null && inputText != undefined && inputText !== ''"
                            style="margin-bottom: 20px;margin-top: -20px;color: dimgrey;">
                            下面是" {{ inputText }} "的搜索结果
                        </el-row>
                        <CardItem :result="this.searchResult" />
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </body>
</template>

<script>
import HeaderItem from '../components/Header.vue'
import CardItem from '@/components/CardItemInSearch.vue';
import ExThumbnail from '@/components/ExThumbnail.vue';
import CalendarItem from '../components/CardItemInSearch.vue'
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
        MuseumSelectorItem,
        HeaderItem,
    },
    data() {
        return {
            inputText: '',
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
            ExhibitonArr: [],
            recommends: [],
        }
    },
    methods: {
        submitSearch() {
            this.$router.replace({
                path: "/search", query: { querytext: this.inputText }
            });
            // 调用一次查询
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
            if (this.venue == null || this.venue == "---------------不限---------------" || this.venue == undefined) {
                this.venue = "null"
            }
            console.log(this.inputText)
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
        $route(to, from) {
            console.log(to.query)
            console.log(from.query)
            let that = this;
            if (to.params.id != from.params.id) {
                that.id = to.params.id;
                that.init();
            }
            if (to.query.querytext != from.query.querytext) {
                if (this.$route.query.querytext != null)
                    this.inputText = this.$route.query.querytext;
                this.submitSearch();
            }
        }
    },
    mounted() {
        if (this.$route.query.venue != null) {
            this.venue = this.$route.query.venue;
            this.venueChange(this.venue);
            this.$router.replace({
                path: this.$route.path,
                query: {}//清空路由  
            }
            );
        }
        if (this.$route.query.querytext != null)
            this.inputText = this.$route.query.querytext;
        this.submitSearch(this.inputText);
    },
}

</script>


<style scoped>
@font-face {
    font-family: 'SourceHanSerifSC-VF';
    src: url('../assets/fonts/SourceHanSerifSC-VF.ttf') format('truetype');
}

.se-selector {
    width: 60%;
    border: 1px solid #DCDFE6;
    margin: auto;
    margin-left: 125px;
    display: inline-block;
    border-radius: 10px;
}

.se-selector-in {
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.CardItem {
    margin-top: 50px;
    margin-bottom: 50px;
    margin-left: 120px;
    left: 0;
}


.se-selector-header {
    font-family: 'SourceHanSerifSC-VF', cursive;
    align-items: center;
}
</style>