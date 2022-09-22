<template key>
  <div class='confirmation-box'>
    <div>
      <h1 class="text-warning">***** Account Verification *****</h1>
      <h3>Please press the confirm button <br/>to verify your account </h3>
      <b-button class="theme-btn" @click="verifyUser">Confirm</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Confirmation",
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userId: ""

    }
  },
  mounted(){
    this.getUserId()
  },


  methods:{
    getUserId(){
      this.userId = this.$route.params.userId
    },
    async verifyUser(){
      const verified = await this.$store.dispatch("loginModule/setUserVerificationAction", this.userId)
      if(verified){
        this.$router.push("/")
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .confirmation-box{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
  }
</style>
