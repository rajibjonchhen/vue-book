<template key>
  <div class='my-footer theme-bg text-light p-2' >
    <h4>All right reserve @codex-software</h4>
  </div>
</template>

<script>
export default {
  name: 'MyFooter',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      doNotShowFooter:true
    }
  },

  methods:{
    checkRoutes() {
      if(this.$route.params === "/login"){
        this.doNotShowFooter = true
      }

    },
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.my-footer {
  width: 100%;
  margin: 0;
  padding: 0
}
</style>
