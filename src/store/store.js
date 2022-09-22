import Vuex from "vuex";
import Vue from "vue";
import booksModule from "./modules/booksModule"
import singleBookModule from "./modules/singleBookModule"
import loginModule from "./modules/loginModule"

//load vuex
Vue.use(Vuex);


const store = new Vuex.Store({
  modules: {
    booksModule,
    singleBookModule,
    loginModule
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
});

export default store;
