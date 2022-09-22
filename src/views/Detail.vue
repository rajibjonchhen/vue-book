<template>
  <div>
  <div v-if="isLoading">
    <p>
      Isloading
    </p>
  </div>
  <div v-else>
    <b-container >
      <b-row class="my-4">
        <h1>{{ singleBook.title }}</h1>
        <div class="publish-box">
          <p class="h6">Publisher - {{ publisher }}<br/>Published Date - {{ publishedAt }}</p>
        </div>
      </b-row>

      <b-row
        class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 m-auto"
      >
      <!-- left section -->
      <LeftSection/>
        <!-- Right section -->
        <RightSection :authorsKey = "singleBook.authors" />
      </b-row>

    </b-container>
  </div>
</div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import RightSection from "../components/detail/RightSection.vue";
import LeftSection from "../components/detail/LeftSection.vue";

export default {
    name: "Detail",
    components: { RightSection, LeftSection },
    computed: {
        ...mapGetters("singleBookModule", ["getCovers", "bookId"]),
        ...mapState("singleBookModule", ["isLoading", "errorMsg", "singleBook"]),

    },
    mounted() {
        this.fetchWorkData();
    },
    data() {
        return {
          publisher:null,
          publishedAt:null,
        };
    },
    methods: {


        fetchWorkData() {
          this.$store.dispatch("singleBookModule/setBookIdAction", this.$route.params.bookId);
            this.publishedAt = this.$route.query.publishedAt
            this.publisher = this.$route.query.publisher

            this.$store.dispatch("singleBookModule/fetchSingleBookAction");
        }
    },
};
</script>
<style scoped>

</style>
