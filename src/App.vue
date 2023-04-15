
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
.outer-header{
  width: 100%;
  height: 50px;
  min-width: 1300px;
  box-shadow: 0px 4px 4px 1px rgba(0, 0, 0, .2);
}
</style>
