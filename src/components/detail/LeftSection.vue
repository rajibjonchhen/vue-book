<template>
    <b-col xs="12" sm="6" md="6" lg="6" class="mx-auto">
          <div class="left-section d-flex justify-content-between g-2">
            <ImgScroll/>
            <div class="cover-img-holder" >
              <img :src="largeCoverImg" alt="title" width="100%" height="100%"/>
            </div>

          </div>
        </b-col>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ImgScroll from "./ImgScroll.vue";
export default {
    name: "LeftSection",
    computed: {
        ...mapGetters("singleBookModule", ["getCovers",]),
        ...mapState("singleBookModule", ["isLoading", "errorMsg", "singleBook", "largeCoverImg"]),
    },
    mounted() {
        this.getCoverImage(this.getCovers[0]);
    },
    data() {
        return {};
    },
    methods: {
      getCoverImage(img) {
            this.$store.dispatch("singleBookModule/setLargeCoverImgAction", img);
        }
    },
    components: { ImgScroll }
};
</script>
<style scoped>

  /* left section */

.left-section{
  border: 2px solid rgb(222, 222, 222);
  padding: 10px;
  border-radius: 5px;
}

.cover-img-holder {
  height: 100% ;
  max-width: 400px;
  background-color: rgb(194, 226, 238);
  margin:auto
}
.subjects{
  display:flex;
}
.subjects>p{
  font-size: 10px;
}

@media (max-width:912px){
  .left-section{
    display:flex;
    flex-direction: column;
  }
}
</style>
