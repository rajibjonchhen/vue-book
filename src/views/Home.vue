<template>
  <div class='m-auto pb-4'>
    <div v-if='isLoading'>
      <Loader />
    </div>
    <div v-else-if="errorMsg">
        <p>{{errorMsg}}</p>
    </div>
    <div v-else>
      <b-container>
        <p class='h1 my-3' v-if="getSearchQueryLength > 2">Search Result</p>
        <div  v-else>
          <p class='h1 my-3'>Displaying books with query '{{initialSearch}}'</p>
        </div>
        <div v-if="getBooksQty">
          <LimitPerPage/>
        </div>
        <b-row v-if="!getBooksQty">
            <p>There is no book with this query</p>
        </b-row>
        <b-row
          class='
            row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5
            m-auto'  v-else>
          <single-card
            v-for='book in books'
            :title='book.title'
            :img='book.cover_i'
            :authors='book.author_name'
            :publishedAt='book.first_publish_year'
            :publisher = 'book.publisher[0]'
            :key='book.cover_i'
            :workId='book.key'
          ></single-card>
        </b-row>

        <div class="my-4">
          <b-button-group v-if="getBooksQty">
            <Pagination/>
          </b-button-group>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
import SingleCard from '@/components/home/SingleCard.vue'
import Loader from '../components/home/Loader.vue'
import { createNamespacedHelpers} from 'vuex';
import LimitPerPage from '../components/home/LimitPerPage.vue';
import Pagination from '../components/home/Pagination.vue';

const {mapGetters, mapActions, mapState} = createNamespacedHelpers('booksModule')

export default {
  name: 'Home',
  computed: {
    ...mapGetters(["getSearchQueryLength", "getBooksQty"]),
    ...mapState("loginModule", ["user"]),
    ...mapState(["searchQuery","books", "isLoading", "errorMsg", "initialSearch" ])
  },
  components: { "single-card": SingleCard, Loader, LimitPerPage, Pagination },

  data () {
    return {
      loading: true,
      rows: 10,
      perPage: 20,
      currentPage: 1,
      numbBooks: 0,
    }
  },

  mounted () {
    this.fetchBooksAction()
  },
  methods:{
    ...mapActions(["fetchBooksAction"]),
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped></style>
