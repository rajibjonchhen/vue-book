<template key>
  <form>
    <p class="h3">Enter Details to register</p>
    <form>
      <div>
        <label> First Name *</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          v-model="registerUser.firstName"
          @input="handleChange"
        />
      </div>
      <span class="error-msg" v-if="errorRegister.firstName.length">{{
        errorRegister.firstName
      }}</span>

      <div>
        <label> Last Name *</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          v-model="registerUser.lastName"
          @input="handleChange"
        />
      </div>
      <span class="error-msg" v-if="errorRegister.lastName.length">{{
        errorRegister.lastName
      }}</span>

      <div>
        <label> Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="registerUser.email"
          @input="handleChange"
        />
      </div>
      <span class="error-msg" v-if="errorRegister.email.length">{{ errorRegister.email }}</span>
      <div>
        <label> Password *</label>
        <div class="pRelative">
          <input
          :type="showPassword? 'text':'password'"
          id="password"
          name="password"
          v-model="registerUser.password"
          @input="handleChange"
          />
          <!-- show hide function component -->
          <ShowHidePW/>
        </div>
      </div>
      <span class="error-msg" v-if="errorRegister.password.length">{{
        errorRegister.password
      }}</span>
      <div>
        <label> Repassword *</label>
        <div class="pRelative">
          <input
          :type="showPassword? 'text':'password'"
          id="repassword"
          name="repassword"
          v-model="registerUser.repassword"
          @input="handleChange"
          />
          <!-- show hide function component -->
          <ShowHidePW/>
        </div>
      </div>
      <span class="error-msg" v-if="errorRegister.repassword.length">{{
        errorRegister.repassword
      }}</span>
      <div class="my-3">
        <b-button class="theme-btn" type="submit" @click="handleSubmit">Submit</b-button>
      </div>
    </form>
    <p>
      Already a member
      <span @click="changeShowSignIn" class="special-text">sign in</span>
    </p>
  </form>
</template>

<script>
import { mapState } from "vuex";
import ShowHidePW from "./ShowHidePW.vue";

export default {
    name: "Registration",
    data() {
        return {
            isSubmit: false,
        };
    },
    computed: {
        ...mapState("loginModule", ["showSignIn", "showPassword", "registerUser", "isloggedIn", "errorRegister"]),
    },
    methods: {

        changeShowSignIn() {
            console.log("sign in ");
            this.$store.dispatch("loginModule/setShowSignInAction", true);
        },

        async handleSubmit(e) {
            e.preventDefault();
            this.isSubmit = true;
            this.$store.dispatch("loginModule/validateRegisterAction");
            // if (Object.keys(this.error).length === 0) {
            //   console.log("ready to submit");
            // }
            if (this.errorRegister.firstName.length === 0 &&
                this.errorRegister.lastName.length === 0 &&
                this.errorRegister.email.length === 0 &&
                this.errorRegister.password.length === 0 &&
                this.errorRegister.repassword.length === 0) {
                  console.log("ready to submit")
                const userId  = await this.$store.dispatch("loginModule/setRegisterUserAction")
                if(userId){
                  this.$router.push(`/reginfo/${userId}`);
                }
            }
        },
        handleChange() {
            if (this.isSubmit) {
                this.$store.dispatch("loginModule/validateRegisterAction");
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
