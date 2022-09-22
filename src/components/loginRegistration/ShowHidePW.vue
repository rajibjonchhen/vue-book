<template key>
  <span class="pAbsolute show-password" @click="handleShowPassword"><b-icon   v-if="showPassword" icon="eye-slash"/> <b-icon   v-else   icon="eye"/></span>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ShowHidePW',
  computed: {
  ...mapState("loginModule", ["showSignIn","showPassword"]),
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },

  methods:{

    handleShowPassword() {
      console.log(true)
      this.$store.dispatch('loginModule/setShowPasswordAction',!this.showPassword)
    },
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .show-password{
    right:10px;
    top:5px
  }
</style>
