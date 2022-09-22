<template>
  <div class="my-navbar">
    <h2>My Navbar</h2>
    <router-link :to="{name:'Home', path: '/'}">Home</router-link>
    <router-link :to="{name:'Detail', path: '/detail'}">Detail</router-link>
    <router-link :to="{name:'About', path: '/about'}">About</router-link>
    <router-link :to="{name:'Login', path: '/login'}">Login</router-link>

  </div>
</template>

<script>
export default {
  name: 'MyNavbar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-navbar{
  width:100%;
  background-color: rgb(48, 158, 214);
  margin: 0;
  padding:0;
}
</style>
