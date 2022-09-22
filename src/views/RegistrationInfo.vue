<template key>

  <div class='info-box'>
    <div>
      <p class="h3 text-white bg-success p-2 rounded">{{msg}} </p>
      <p class="h4">Please check your email and confirm</p>
      <p class="h5 ">Did not receive confimation - <span class="special-text pointer underlined" @click="handleResend">resend</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegistrationInfo",
  data () {
    return {
      msg: 'User successfully registered'
    }
  },
  mounted(){
    this.getUserId()
  },
  methods:{
    getUserId(){
      this.userId = this.$route.params.userId
    },

    async handleResend(){
      const data = await this.$store.dispatch("loginModule/resendEmailVeriAction", this.userId)
      if (data) {
        this.msg = data.message
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .info-box{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40vh;
  }

</style>
