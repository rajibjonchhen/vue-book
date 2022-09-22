import config from "../../../config"

const   state = {
  initialSearch: "Science",
  searchQuery: "",
  searchBy: "subject",
  books: [],
  favouriteBooks: [{
    title:'eg -booktitle',
    img:'eg -bookcover_i',
    authors:'eg -bookauthor_name',
    publishedAt:'bookfirst_publish_year',
    publisher : 'eg -bookpublisher[0]',
    key:'eg -bookcover_i',
    workId:'eg -bookkey'
  }],
  totalBooksFound: null,
  isLoading: true,
  limit: 10,
  offset: 10,
  errorMsg: ""
}

const getters = {
  getSearchQueryLength: state => state.searchQuery.length,
  getBooksQty: state => state.books.length
}

const mutations = {
  setSearchQuery(state, payload) {
    // console.log("payload from mutation", payload);
    state.searchQuery = payload;
  },

  setBooks(state, payload) {
    state.books = payload;
  },

  setFavouriteBooks(state, payload) {
    state.favouriteBooks = payload;
  },

  setIsLoading(state, payload) {
    state.isLoading = payload;
  },

  setLimit(state, payload) {
    state.limit = payload;
  },

  setErrorMsg(state, payload) {
    state.errorMsg = payload;
  },

  setSearchBy(state, payload) {
    state.searchBy = payload;
  },

  setOffset(state, payload) {
    state.offset = payload;
  },

  setTotalBooksFound(state, payload) {
    state.totalBooksFound = payload;
  }
}

const actions = {
  // destructuring
  // setSearchQuery: ({commit, state}) => commit('setSearchQuery')
  setSearchQueryAction: (context, payload) =>
    context.commit("setSearchQuery", payload),

  setLimitAction: (context, payload) => context.commit("setLimit", payload),

  setSearchByAction: ({ commit }, payload) => {
    commit("setSearchBy", payload);
  },

  setOffsetAction: ({ commit }, payload) => {
    commit("setOffset", payload);
  },

  setIsLoadingAction: ({ commit }, payload) => {
    commit(" setIsLoading", payload);
  },

  async setFavouriteBooksAction ({ commit,state }, payload) {
    commit("setIsLoading", true)
    try {
      const response = await fetch(
        `${config.dev.openLibUrl}/users/favouriteBooks`,
        { method: "GET",
          headers: {
            "authorization": localStorage.getItem("MyToken"),
          }}
        );
        if (response.status > 204) {
          commit("setErrorMsg", "Error on handling favourite book");
        } else {
          const data = await response.json();
          console.log(data.books)
          // data.book.authors = [{author:"", authorId:"", authorImg:""}]
          // // data.book.authors = () => data.book.authors.map(async (item) =>(
          // //   await this.fetchAuthor(item.author.key)
          // //   )
          // // )
          // data.books.map((book) => (
          //   {
          //     title:book.title || "Title not exist",
          //     img:book.covers[0] || 'https://via.placeholder.com/300',
          //     authors:  book.authors,
          //     publishedAt:'bookfirst_publish_year',
          //     publisher : 'eg -bookpublisher[0]',
          //     key:'eg -bookcover_i',
          //     workId:'eg -bookkey'
          //     }
          //   )
          // )
          commit("setFavouriteBooks", data.books)
          commit("setErrorMsg", "")
          // console.log("state.favouriteBooks",state.favouriteBooks)
          return data.books
      }
    } catch (error) {
      console.log(error);
      commit("setErrorMsg", "Error on handling favourite book");
    } finally {
      commit("setIsLoading", false);
    }
  },

  async fetchAuthor(authorId){
    try {
      const response = await fetch(
        `https://openlibrary.org${authorId}`
      );
      if (response.status !== 200) {
        commit("setErrorMsg", "Error on fetching books");
      } else {
        const data = await response.json();
        console.log(data);
          return
      }
    } catch (error) {
      console.log(error);
      commit("setErrorMsg", "Error on fetching books");
    }
  },

  async handleFavouriteAction({ commit, state }, payload) {
    console.log("handleFavouriteAction")
    try {
      const response = await fetch(
        `${config.dev.beUrl}/users/favouriteBooks`,
        {
          method: "PUT",
          body: JSON.stringify({ bookId: payload }),
          headers: {
            "authorization": localStorage.getItem("MyToken"),
            "content-type": "application/json"
          }
        }
      );
      if (response.status !== 200) {
        commit("setErrorMsg", "Error on handling favourite book");
      } else {
        const data = await response.json();
        console.log(data);
        commit("loginModule/setUser", data.user,{root:true});
        commit("setErrorMsg", "");
      }
    } catch (error) {
      console.log(error);
      commit("setErrorMsg", "Error on handling favourite book");
    } finally {
      commit("setIsLoading", false);
    }
  },


  async fetchBooksAction({ commit, state }, payload) {
    commit("setIsLoading", true);
    let query = "";
    if (state.searchQuery.length > 2) {
      query = state.searchQuery;
    } else {
      query = state.initialSearch;
    }
    try {
      const response = await fetch(
        `${config.dev.openLibUrl}/search.json?${state.searchBy}=${query}&limit=${state.limit}&offset=${state.offset}`
      );
      if (response.status !== 200) {
        commit("setErrorMsg", "Error on fetching books");
      } else {
        const data = await response.json();
        // console.log(data.docs);
        commit("setBooks", data.docs);
        commit("setTotalBooksFound", data.numFound);
        commit("setErrorMsg", "");
      }
    } catch (error) {
      console.log(error);
      commit("setErrorMsg", "Error on fetching books");
    } finally {
      commit("setIsLoading", false);
    }
  }
}

const booksModule = {
namespaced: true,
state,
getters,
mutations,
actions
}

export default booksModule;
