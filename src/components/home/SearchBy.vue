<template key>
  <div>
    <b-form-select class="select-searchby" v-model="searchBy" :options="options" @change="changeSearchType" ></b-form-select>

  </div>
</template>

<script>
import { mapActions, mapState} from "vuex";

// const {mapGetters} = createNamespacedHelpers('booksModule')


export default {
  name: 'MyNavbar',
  computed: {
    ...mapState("booksModule",["searchBy"]),
  },
  data () {
    return {
      options:[
        {value: "q", text: "Query"},
        {value: "title", text: "title"},
        {value: "author", text: "author"},
        {value: "subject", text: "subject"},
      ]
    }
  },
  methods:{
    ...mapActions("booksModule", ["fetchBooksAction", "setSearchByAction"]),
    changeSearchType(type){
      console.log("hello")
      this.setSearchByAction(type)
      this.fetchBooksAction()
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .select-searchby{
    height:32px;
    border-radius:5px;
    margin: 0 3px ;
    outline: none !important;
  }
</style>
