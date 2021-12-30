<template>
  <div id="app">
    <AppNavbar />
    <AppCanvas />
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue'
import AppCanvas from './components/AppCanvas.vue'

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppCanvas,
  }
}
</script>

<style lang="scss">
@import "../node_modules/bulma/bulma.sass";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
