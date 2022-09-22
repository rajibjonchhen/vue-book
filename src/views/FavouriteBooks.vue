<template key>
  <b-container class=''>
      <h2 @click="showBooks">Favourite Books</h2>
      <b-row >
      <h3 class="text-danger">You have not added any books to the favourite list</h3>
      <LoaderCard  v-for="index in 5" :key="index"  :msg="''" />
    </b-row>
      <b-row >
        <!-- <div v-for='book in favouriteBooks'
          :key='book._id'
          :title='book.title'
            :img='book.cover_i'
            :authors='book.author_name'
            :publishedAt='book.publishedAt'>
            <div>
              <img :src="img" :alt="title"/>
            </div>
            <p>{{authors}}</p>
            <p>{{publisher}}</p>
            <p>{{publishedAt}}</p>

        </div> -->
        <!-- <single-card
          v-for='book in favouriteBooks'
            :title='book.title'
            :img='book.cover_i'
            :authors='book.author_name'
            :publishedAt='book.first_publish_year'

            :key='book.cover_i'
            :workId='book.key'></single-card> -->

      </b-row>

  </b-container>
</template>

<script>
import {createNamespacedHelpers, mapState } from 'vuex'
import LoaderCard from "../components/home/LoaderCard.vue"
import SingleCard from '@/components/home/SingleCard.vue'


const { mapActions} = createNamespacedHelpers('booksModule')

export default {
    name: "FavouriteBooks",
    computed:{
      ...mapState("booksModule",["favouriteBooks", "isLoading"]),
  },
    data () {
      return {

    }
    },
    components: { LoaderCard, "single-card": SingleCard },
    mounted () {
      this.getFavouriteBooks()
    },
    methods: {
      ...mapActions(["setFavouriteBooksAction"]),
      async getFavouriteBooks(){
        // this.setFavouriteBooksAction()
      },
      showBooks () {
        console.log("--", this.favouriteBooks, this.books)

      }

    }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
