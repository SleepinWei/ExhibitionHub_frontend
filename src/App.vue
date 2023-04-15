
<template>
  <Header v-if="state.isShowHeader"></Header>

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
    const state = reactive({
      isShowHeader: true,
    });
    const route = useRoute();

    const routeChange = (val, oldVal) => {
      // const referrer= document.getElementById("referrer");
      if (val.path === "/") {
        state.isShowHeader = true;
        // referrer.setAttribute("content", "always");
      }
    };

    onMounted(() => {
      routeChange(route, route);
    })


    return {
      state,
      routeChange
    };
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
