<template>
  <b-col xs="10" sm="6" md="6" lg="6" class="mx-auto">
    <div class="right-section">
            <p class="h5">Description</p>

            <div class="description-box" >
              <!-- <p v-if="singleBook.description.value"> {{ singleBook.description.value }}</p> -->
              <p  v-if="singleBook.description.value"> {{singleBook.description.value|| "This book does not have description"}}</p>
              <p  v-else> {{ singleBook.description || "This book does not have description"}}</p>
            </div>
            <div class="my-3">
              <span>Add to favorite</span>
              <div class="add-to-fav-button">
                <AddToFavBtn :bookId="bookId"/>
              </div>
            </div>
          </div>
          <div class="subjects-box">
              <p class="h5">Subjects</p>
              <div class="subjects">
                <div  v-for="(subject, i) in singleBook.subjects" :key="i">
                  <span>{{subject}}</span>
                </div>
              </div>
            </div>
          <!-- all authors info -->
          <div class="d-flex">
               <div class="author-info" v-for="author in authorsBio" :key="author.id">

                  <div class="author-img-holder">
                    <img :src="author.authorImg || 'https://picsum.photos/200/300'" :alt="author.name" width="100%" height="100%"/>
                  </div>
                  <p>
                   {{author.name}}
                  </p>
              </div>
          </div>
        </b-col>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import AddToFavBtn from "../AddToFavBtn.vue";
export default {
    name: "RightSection",
    props: ["authorsKey"],
    computed: {
        ...mapGetters("singleBookModule", ["getCovers", "getAuthorsBio", ]),
        ...mapState("singleBookModule", ["isLoading", "errorMsg", "singleBook", "authorsBio", "bookId"]),
    },
    mounted() {
        this.fetchAuthors();
    },
    data() {
        return {};
    },
    methods: {
        fetchAuthors() {
            this.$store.dispatch("singleBookModule/setAuthorsInfoAction", this.authorsKey);
        }
    },
    components: { AddToFavBtn }
};
</script>
<style scoped>

/* right section */

.subjects-box{
  overflow: scroll;
}
.subjects{
  display:flex;
  flex-wrap: wrap;
  border:1px solid rgb(191, 230, 253);
  padding:5px;
  border-radius: 5px;
  margin:5px auto;
  overflow: scroll;
  max-height: 200px;

}
.subjects span{
  font-size: 10px;
  color:white;
  background-color: rgb(136, 163, 193);
  margin:1px;
  padding:2px;
  border-radius:4px;
}
.author-info{
  width:80px;
  height: 100px;
  padding:3px;
  margin:5px;
}
.author-img-holder{
  border-radius:50% ;
  background-color: rgb(194, 226, 238);
  height:50px;
  width:50px;
  overflow: hidden;
  margin: auto;
}

.description-box{
  height:300px;
  overflow: scroll;
}
</style>
