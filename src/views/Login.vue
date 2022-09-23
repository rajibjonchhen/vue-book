<template>
  <div class="registration-box">

    <h2>Login</h2>
    <form >
      <label>Email <input type="email" name="email" /></label>
      <label>Password <input type="password" name="password"/></label>
      <button>Sign in</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .registration-box{
    max-width: 300px;
    margin: auto;
  }
   input{
    width:100%;
  }
  label{
    font-weight: bold;
  }
</style>
