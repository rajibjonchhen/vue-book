<template key>
<div>

  <b-button  class="theme-btn" @click="handleFavourite" >
    <b-icon icon="star-fill" v-if="favourite" style="color: gold"></b-icon>
    <b-icon icon="star-fill" v-else></b-icon>
  </b-button>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "AddToFavBtn",
  props:["bookId"],
  computed:{
    ...mapState("loginModule", ["isLoggedIn","user"]),
  },
  data() {
    return {
      favourite:false
    };
  },
  mounted(){

  },
  methods:{
    ...mapActions("booksModule",["handleFavouriteAction"]),

    handleFavourite() {
      localStorage.setItem("historyRoute",this.$route.path)
      if(this.user){
        this.handleFavouriteAction(this.bookId)
      }else{
        this.favourite = !this.favourite;
        this.$router.push('/login')
      }
        },
  }
};

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.my-footer {
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
