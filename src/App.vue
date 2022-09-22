<template>
  <div id="app">
    <MyNavbar/>
    <main>
      <router-view/>
    </main>
    <MyFooter/>
  </div>
</template>

<script>
import MyNavbar from './components/MyNavbar.vue'
import MyFooter from './components/MyFooter.vue'
export default {
  name: 'App',
  components: { MyNavbar, MyFooter }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding:0;
}
main{
  min-height: 80vh;
}
</style>
