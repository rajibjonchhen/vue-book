<template>
  <div id='app' class="align-components">
    <MyNavbar />
    <div class="main-body">
      <router-view/>
    </div>
    <MyFooter />
  </div>
</template>

<script>
import MyFooter from './components/MyFooter.vue'
import MyNavbar from './components/MyNavbar.vue'

export default {
  name: 'App',
  components: { MyFooter, MyNavbar },

}
</script>

<style>
  @import './global.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  min-width:300px;
}

.align-components{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
