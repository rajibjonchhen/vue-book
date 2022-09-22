<template>
  <div class="my-navbar">
    <b-navbar class='px-3 theme-bg' toggleable="lg" type="dark" >
      <b-navbar-brand  :to="{name:'Home'}"><strong>Book Finder</strong></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" v-if="!['Login', 'Confirmation', 'RegistrationInfo', 'ErrorPage'].includes($route.name)"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav v-if="!['Login', 'Confirmation', 'RegistrationInfo', 'ErrorPage'].includes($route.name)">
        <b-navbar-nav>
          <router-link class="nav-link"  :to="{name : 'Home', path:'/'}">Home</router-link>
          <router-link class="nav-link" :to="{name : 'FavouriteBooks', path:'/favourite'}">FavouriteBooks</router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->

        <b-navbar-nav>
            <b-nav-form class="ml-auto pRelative order2">
              <SearchBy/>
              <b-form-input
              size="sm"
              class="mr-sm-2 px-4 search-input"
              placeholder="Search"
              v-model="searchQuery"
              v-on:input="setSearchQuery"
              ></b-form-input>
              <span class="search-icon pAbsolute"><b-icon icon="search"></b-icon></span>
            </b-nav-form>

            <!-- Using 'button-content' slot -->
            <b-nav-item-dropdown class="user-dropdown" left>
            <template #button-content >

                <span v-if="user" class="user-info">
                  <img class='avatar' :src="`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`" :alt="user.firstName" /> {{user.firstName}}
                </span>
                <span v-else>
                  User
                </span>
            </template>
            <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
            <b-dropdown-item href="#" @click="handleSignInOut">{{user && "Sign Out" || "Sign In"}}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { BNavbar, BNavbarNav, BNavbarBrand, BNavbarToggle, } from 'bootstrap-vue';
import SearchBy from './home/SearchBy.vue';
import _ from "lodash"


export default {
  name: "MyNavbar",
  data() {
    return{
      isToken:false,
      debounceFun: null
    }
  },
  beforeCreate(){

  },
mounted(){
  this.getUser()

  this.debounceFun =  _.debounce(() =>  this.fetchBooksAction() , 1000)
},

  components:{
    "b-navbar": BNavbar,
    "b-navbar-nav": BNavbarNav,
    "b-navbar-brand": BNavbarBrand,
    "b-navbar-toggle": BNavbarToggle,
    SearchBy
},

  computed: {
    ...mapState("booksModule",["searchQuery", "initialSearch"]),
    ...mapState("loginModule", ["user"]),

  },

  methods:{
    ...mapActions("booksModule", ["fetchBooksAction", "setSearchQueryAction"]),

    getUser(){
      const token = localStorage.getItem("MyToken")
      if(token){
        this.isToken = true
        this.$store.dispatch("loginModule/setUserAction", token)
      }
    },


    setSearchQuery(e){
      this.setSearchQueryAction(e)
      console.log("outside debounce",e)
      this.debounceFun()
    },


    handleSignInOut(){
      if(this.user){
        localStorage.removeItem("MyToken")
      }
        this.$router.push('/login')
    }

  }
}

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

.my-navbar{
  position: sticky !important;
  top: 0;
  z-index: 2;
}
.nav-link{
  font-weight: bold;
  color:white;
}
.nav-link:hover{
  color:rgb(143, 237, 250)
}
.form-inline{
    display: flex;
    align-items: center;
    margin:auto
  }
  .btn.my-2.my-sm-0.btn-secondary.btn-sm{
    height: 30px;
    margin-left: 3px;
  }

  .search-icon{
    right:5px;
  }
  .avatar{
    width:30px;
    height:30px;
    border-radius: 50%;
  }

  .user-info{
    width:100px;
    outline: none;
    border:none
  }
  .user-info:focus{
    outline: none;
    border:none
  }

@media (min-width:992px){
  .mr-sm-2.form-control.form-control-sm {
    max-width: 300px;
    margin: auto;
  }

  .navbar-collapse.collapse{
    display:flex;
    justify-content: end;
  }

}
@media (max-width:991px){
  .order1{
    order:1;
  }
  .order2{
    order:2;
  }
  .search-input{
    width:100%;
  }

  .navbar-toggler.collapsed{
    outline:0;
    box-shadow: 0 0 1px 1px rgb(28, 29, 30);
  }
  .navbar-toggler.not-collapsed{
    outline:0;
    box-shadow: 0 0 1px 2px rgb(25, 27, 29);
  }

}

</style>
