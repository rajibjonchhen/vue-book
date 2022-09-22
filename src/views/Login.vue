<template>
  <div>
    <b-container>
      <b-row class="row pRelative  mx-auto ">
        <span class="server-msg bg-warning text-dark" v-if="serverMessage.length">{{serverMessage}}</span>
        <span class="server-msg bg-danger  text-light" v-if="serverErrorMessage.length">{{serverErrorMessage}}</span>
        <b-col sm="12" md="6" lg="4" class="mx-auto h-100">
          <div class="login-box mt-5 ">
              <SignIn v-if="showSignIn"/>
              <Registration v-else/>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Registration from '../components/loginRegistration/Registration.vue';
import SignIn from '../components/loginRegistration/SignIn.vue';
export default {
    name: "Login",
    computed: {
    ...mapState("loginModule",[ "showSignIn", "serverMessage", "serverErrorMessage"])
    },
    mounted() {
      this.removeToken()
    },

    data() {
        return {

        };
    },
    methods: {
      removeToken(){
        localStorage.removeItem("MyToken")
      }
    },
    components: { Registration, SignIn }
}
</script>

<style >
  .login-box{
    padding : 10px;
    border: 1px solid rgb(199, 229, 242);
    border-radius: 5px;
  }

  .server-msg{
    color:white;
    padding:5px;
    margin: 0px auto;
    position:absolute;
    border-radius: 5px;
    left:0;
    right: 0;
    top:-5;
  }

</style>
