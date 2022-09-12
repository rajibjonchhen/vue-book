<template>
  <div class="my-navbar">
    <h2>My Navbar</h2>
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
}
</style>
