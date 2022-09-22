<template>
  <div class="cover-img-list-holder row-cols-1 mr-2">
      <div class="cover-img-list pointer enlarge-hover border rounded p-1" v-for="(image, i) in getCovers" :key="i"  @click="getCoverImage(image)">
        <img :src="image" :alt="`${singleBook.title}`" width="100%" height="100%"/>
      </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';


export default {
  name: "ImgScroll",
  computed: {
        ...mapGetters("singleBookModule",["getCovers",]),
        ...mapState("singleBookModule", ["isLoading", "errorMsg", "singleBook", "largeCoverImg"]),
    },
    methods:{
      getCoverImage(img) {
            this.$store.dispatch("singleBookModule/setLargeCoverImgAction", img);
        }
    }
}
</script>

<style scoped>

.cover-img-list-holder{
  height: 500px;
  overflow: scroll;

}
.cover-img-list{
  width:70px;
  height:100px;
  margin:3px;
}

@media (max-width:912px){
  .cover-img-list-holder{
  display:flex;
  justify-content: space-between;
  overflow: scroll;
  height: 100%;
}
}
</style>
