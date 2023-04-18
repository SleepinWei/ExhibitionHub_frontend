
<template>
  <Header v-if="$route.meta.isShowHeader"></Header>

  <router-view></router-view>
</template>

<script>
import { RouterLink, RouterView, useRoute } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import Header from "@/components/Header.vue"
import { onMounted, reactive } from 'vue';


export default {
  name: "App",
  components: {
    Header
  },
  setup() {

  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  border: 0;
}

.logo {
  margin: 0 auto 2rem;
}
</style>
