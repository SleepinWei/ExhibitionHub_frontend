<script setup>
import HeaderItem from '../components/Header.vue'
import AddressSelectorItem from '../components/AddressSelectorItem.vue';
import CalendarItem from '../components/CalendarItem.vue'
import DateSelectorItem from '../components/DateSelectorItem.vue';
import TypeSelectorItem from '../components/TypeSelectorItem.vue';
import MuseumSelectorItem from '../components/MuseumSelectorItem.vue';
</script>

<template>
    <body>
        <div class="calendar">
            <CalendarItem :ExhibitonArr="ExhibitonArr" />
        </div>
        <div class="Selector">
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
                <MuseumSelectorItem @change="venueChange" />
            </div>


        </div>

    </body>
</template>

<script>
export default {
    components: {
        AddressSelectorItem,
        CalendarItem,
        DateSelectorItem,
        TypeSelectorItem,
        MuseumSelectorItem
    },
    data() {
        return {
            ifDateLimit: 'noDateLimit',
            ifLocationLimit: 'noLocationLimit',
            showDateSelector: 0,
            showLocationSelector: 0,
            userid: this.$cookies.get("cookieAccount"),
            startTime: '1900-01-01',
            endTime: '2100-12-31',
            venue: "null",
            tags: "-1",
            province: "null",
            city: "null",
            area: "null",
            ExhibitonArr: []

        }
    },
    methods: {
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
            console.log("calendarrrrrrrr", this.tags)
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
            this.$axios.get('https://kjkttt.gardilily.com/api/calendarByOrganizer/' + this.userid + '/' + this.startTime + '/' + this.endTime
                + '/' + this.venue + '/' + this.tags + '/' + this.province + '/' + this.city + '/' + this.area
            ).then(res => res.data).then(res => {
                this.ExhibitonArr = res
                console.log(this.userid + '/' + this.startTime + '/' + this.endTime + '/' + this.venue + '/' + this.tags + '/' + this.province + '/' + this.city + '/' + this.area)
                console.log(this.ExhibitonArr)

            }).catch((error) => {
                //为什么报错但是能够运行请问
                console.log(error)
            });
        }
    },
    beforeMount() {
        this.loadContent()
    },
    unmounted(){
        this.$axios.get('https://kjkttt.gardilily.com/api/calendar/cleancache/' + this.userid

            ).then(res => res.data).then(res => {
                console.log("clean cache success")
            }).catch((error) => {
                console.log(error)
            });
    }
}
</script>

<style scoped>
.calendar {
    position: relative;
    display: inline-block;
    width: 67%;
    margin: 1%;
}

.Selector {
    position: absolute;
    display: inline-block;
    width: 30%;
    margin-top: 2%;
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
