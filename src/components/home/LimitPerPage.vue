<template key>
  <div>
    Limit per page <b-form-select v-model="limit" :options="options" @change="changeLimit" ></b-form-select>
  </div>
</template>

<script>
import { mapState, mapActions, createNamespacedHelpers } from "vuex";
const {mapGetters} = createNamespacedHelpers('booksModule')


export default {
  name: 'MyNavbar',
  computed: {
    ...mapState("booksModule",["limit","searchQuery","initialSearch"]),
  },
  data () {
    return {
        options: [
          { value: 10, text: '10'},
          { value: 25, text: '25' },
          { value: 50, text: '50' },
          { value: 100, text: '100'}
        ],
    }
  },
  methods:{
    ...mapActions("booksModule", ["fetchBooksAction", "setSearchQueryAction", "setLimitAction"]),

    changeLimit(viewlimit){
      this.setLimitAction(viewlimit)
      this.fetchBooksAction()
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
