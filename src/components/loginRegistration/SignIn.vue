<template key>
  <form>
    <p class="h3">Sign in</p>
    <form>
      <div>
        <label> Email *</label>
        <input type="email" id="email" name="email"  v-model="signInUser.email" @input="handleChange"/>
      </div>
      <span class="error-msg" v-if="errorSignIn.email.length">{{errorSignIn.email}}</span>
      <div>
        <label> Password *</label>
        <div class="pRelative">
          <input :type="showPassword? 'text':'password'" id="password" name="password"  v-model="signInUser.password" @input="handleChange"/>
          <!-- show hide function component -->
          <ShowHidePW/>
        </div>
      </div>
      <span class="error-msg" v-if="errorSignIn.password.length">{{errorSignIn.password}}</span>
      <div class="my-3">
        <b-button class="theme-btn" type="submit" @click="handleSubmit">Submit</b-button>
      </div>
    </form>
    <p>
      Not a member
      <span @click="changeShowSignIn" class="special-text">register</span>
    </p>
  </form>
</template>

<script>
import { mapState } from "vuex";
import ShowHidePW from "./ShowHidePW.vue";

export default {
    name: "SignIn",
    data() {
        return {
            isSubmit: false,
        };
    },
    computed: {
        ...mapState("loginModule", ["showSignIn", "showPassword", "isloggedIn", "signInUser", "errorSignIn"]),
    },
    methods: {
        changeShowSignIn() {
            console.log("sign in page - reg", this.showSignin, !this.showSignin);
            this.$store.dispatch("loginModule/setShowSignInAction", false);
        },
        async handleSubmit (e) {
            e.preventDefault();
            this.isSubmit = true;
            this.$store.dispatch("loginModule/validateFormSignInAction")
            // if(Object.keys(this.error).length === 0){
            //   console.log("ready to submit")
            // }
            if (this.errorSignIn.email.length === 0 &&
                this.errorSignIn.password.length === 0) {
                  const loginSuccess = await this.$store.dispatch("loginModule/setSignInUserAction")
                  if(loginSuccess){
                    const historyPath = localStorage.getItem("historyRoute")
                    if(historyPath){
                      this.$router.push(historyPath)
                    }else
                    this.$router.push('/')
                  }
            }
        },

        handleChange() {
            if (this.isSubmit) {
                this.$store.dispatch("loginModule/validateFormSignInAction")
            }
        },

    },
    components: { ShowHidePW }
};

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  form{
    width:100%;
  }
  .show-password{
    right:10px;
    top:5px
  }
</style>
