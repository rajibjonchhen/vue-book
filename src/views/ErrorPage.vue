<template key>
  <div class=''>
    <h1>{{msg}}</h1>
    <router-link :to="{path:'Home'}">
      <p>Redirect to home</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
  data () {
    return {
      msg: '404 Error Page not found '
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
