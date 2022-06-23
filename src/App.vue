<template>
  <div id="app">
    <FloatingWindowExample msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import FloatingWindowExample from "./components/FloatingWindowExample.vue"

export default {
  name: "App",
  components: {
    FloatingWindowExample,
  },
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px; */
}
</style>
