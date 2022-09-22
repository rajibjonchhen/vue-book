<template key>
  <div>

    <b-button @click='paginate("prev")'> Prev</b-button>
    <b-button @click='paginate("next")'> Next</b-button>
  </div>
</template>

<script>
import { mapState, mapActions, createNamespacedHelpers } from "vuex";
const {mapGetters} = createNamespacedHelpers('booksModule')


export default {
  name: 'MyNavbar',
  computed: {
    ...mapState("booksModule",[ "limit", "offset", "searchQuery", "initialSearch", "totalBooksFound"])
  },
  data () {
    return {

    }
  },
  methods:{
    ...mapActions("booksModule", ["fetchBooksAction", "setOffsetAction"]),

    paginate(page){
      let offset = 0
      if(page === "prev" && this.offset !==0){
          offset =  this.offset - this.limit
        }else if(page === "next" && this.offset < this.totalBooksFound){
          offset = this.offset + this.limit
      }
      this.setOffsetAction(offset)
      this.fetchBooksAction()
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
