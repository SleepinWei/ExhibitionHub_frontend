<script>
import ExhibitionMap from '../components/ExhibitionMap.vue';

// export default {
//   beforeCreate: function () {
//   document.getElementsByTagName("body")[0].className="active"
//   },
//   beforeUnmount: function () {
//     document.body.removeAttribute("class", "active");
//   }
// }
</script>

<template>
  <!-- <el-row justify="center"> -->
    <!-- <h1>EXHIBITION HUB</h1> -->
  <!-- </el-row> -->

<!-- <template> -->
  <ExhibitionMap/>
  
</template>

<style>
h1{
  font-family:Helvetica, sans-serif;
  font-weight: 700;
  color: white;
}

.active{
  background-image: url("@/assets/starry_night.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
</style>
