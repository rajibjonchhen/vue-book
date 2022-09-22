<template>
  <b-col class="m-auto">
    <div class="book-card my-2">
      <div class="image-holder">
        <img :src="image" width="100%" />
      </div>
      <div class="book-info">
        <p class="h6">
          {{ title }}
        </p>
        <p class="">
          <small>First Published At - {{ publishedAt }} </small>
          <br />
          <small >Publisher - <span v-if="publisher">{{ publisher }}</span> </small>
        </p>
        <p class="authors-box">
          <small>by - </small>
          <span
            class="author-name"
            v-for="(author, index) in authors"
            :key="index"
            >{{ author }}</span
          >
        </p>
        <p class="book-description">
          {{description.value || description || "This book does not have any description :-( " }}
        </p>

         <div class="book-card-buttons">
          <router-link :to="{name:'Detail', params:{bookId}, query:{publishedAt, publisher}}">
            <b-button class="theme-btn-outline"> Learn more </b-button>
          </router-link>
          <!-- add to favorite btn component -->
          <AddToFavBtn :bookId="bookId"/>
        </div>
      </div>
    </div>
  </b-col>
</template>

<script>
import { mapState } from 'vuex';
import AddToFavBtn from '../AddToFavBtn.vue';

export default {
    props: ["title", "img", "authors", "publishedAt", "workId", "publisher"],
    mounted() {
        // this.fetchAuthor('harry potter')
        this.getImg(),
            this.getDescription(),
            this.getBookId();
    },
    computed: {
        ...mapState("booksModule", ["isLoading"])
    },
    data() {
        return {
            image: "https://picsum.photos/200/300",
            description: "",
            favourite: false,
            bookId: null
        };
    },
    methods: {
        getImg() {
            this.image = `https://covers.openlibrary.org/b/id/${this.img}-M.jpg`;
        },
        getBookId() {
            this.bookId = this.workId.split("/")[2];
        },
        async getDescription() {
            try {
                const response = await fetch(`https://openlibrary.org${this.workId}.json`);
                const data = await response.json();
                this.description = data.description;
                // console.log(data);
            }
            catch (error) {
                console.log(error);
            }
        },

    },
    components: { AddToFavBtn }
};
</script>

<style  scoped>
.book-card {
  border: 1px solid rgb(233, 233, 233);
  border-radius: 5px;
  min-width: 200px;
}

.image-holder {
  width: 100%;
  height: 300px;
  min-height: 300px;
  overflow: hidden;
  border-radius: 5px 5px 0px 0px;
}

.book-info {
  min-height: 300px;
  padding: 5px;
  position: relative;
}
.book-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.authors-box{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.author-name {
  background-color: goldenrod;
  padding: 1px;
  margin: 3px;
  font-size: 10px;
  border-radius: 3px;
}

.book-card-buttons {
  display: flex;
  margin: auto;
  gap: 3px;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
}
</style>
