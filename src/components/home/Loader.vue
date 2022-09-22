<template>
  <div>
    <b-container>
      <p class='h1 my-3 placeholder-title m-auto'></p>
      <b-row
        class='
          row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5
          m-auto'>
          <LoaderCard class="m-auto" v-for="(book,index) in books" :key="index"/>

      </b-row>

      <div class="my-4">
        <b-button-group>

        </b-button-group>
      </div>
    </b-container>
  </div>
</template>

<script>
import LoaderCard from './LoaderCard.vue';
export default {
name:"Loader",

    data() {
        return {
            books: ["", "", "", "", ""]
        };
    },
    components: { LoaderCard }
}
</script>


<style scoped>

.placeholder-title{
background-color: rgb(190, 189, 189);
height:40px;
width:400px
}
.placeholder-text{
background-color: rgb(190, 189, 189);
height:20px;
width:200px;
margin:10px auto;
}
.book-card{
border: 1px solid rgb(233, 233, 233);
border-radius: 5px;
max-width: 250px;
min-width: 200px;
}
.image-holder{
background-color: rgb(190, 189, 189);
width:100%;
height:300px;
min-height:300px;
overflow: hidden;
border-radius: 5px 5px 0px 0px;
}

.book-info{
min-height: 300px;
padding:5px;
position: relative;
}
.book-description {
background-color: rgb(190, 189, 189);
height:40px;
width:200px;
margin:10px auto;
}

.author-name {
padding:10px;
padding: 1px;
border-radius: 3px;
background-color: rgb(190, 189, 189);
height:20px;
width:200px;
margin:10px auto;
}
.card-btn{
position: absolute;
bottom:10px;
left:0;
right: 0;
}

.learn-btn{
border: none;
background-color: rgb(190, 189, 189);
height:30px;
width:80px;
margin:10px auto;
}

.star-btn{
border: none;
background-color: rgb(190, 189, 189);
height:30px;
width:40px;
margin:10px auto;
}
</style>
