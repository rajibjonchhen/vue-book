<template>
          <b-col class="m-auto" >
          <div class="book-card my-2" >
            <div class="image-holder d-flex justify-content-center align-items-center">
              {{msg}}
            </div>
            <div class="book-info">
              <p class="placeholder-text">

              </p>
              <div class="">
                <p class="placeholder-text"> </p>
                <br/>
                <p class="placeholder-text"> </p>
              </div>
              <p  class='placeholder-text '> <small></small>

              </p>
              <p class='book-description'>

              </p>
              <div class="card-btn">
                    <button class="learn-btn"></button>
                    <button class="star-btn"></button>
              </div>
            </div>
          </div>
        </b-col>
</template>

<script>
export default {
name:"LoaderCard",
props:["msg"],
data () {
  return {
  }
}
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
