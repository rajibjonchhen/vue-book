import config from "../../../config"

const state =  {
  singleBook: {
    covers:[]
  },
  isLoading: false,
  errorMsg: "",
  workId: null,
  largeCoverImg: "",
  authorsBio: [],
  bookId:null
}

const mutations = {
  setSingleBook(state, payload) {
    state.singleBook = payload;
  },

  setIsLoading(state, payload) {
    state.isLoading = payload;
  },

  setErrorMsg(state, payload) {
    state.errorMsg = payload;
  },

  setWorkId(state, payload) {
    state.workId = payload;
  },

  setLargeCoverImg(state, payload) {
    state.largeCoverImg = payload;
  },

  setAuthorsBio (state, payload) {
    state.authorsBio = payload
  },

  setBookId (state, payload){
    state.bookId = payload
  }
}

const getters = {
  getCovers: state => {
    return  state.singleBook.covers.map(
      cover => `https://covers.openlibrary.org/b/id/${cover}-L.jpg`
    );

  },
}



const actions = {
  setLargeCoverImgAction: ({ commit, state }, payload) => {
    commit("setLargeCoverImg", payload);
  },

  setBookIdAction: ({ commit, state }, payload) => {
    // console.log("book Id action form setBoook id", payload)
    commit("setBookId", payload);
  },

  fetchSingleBookAction: async ({ commit, state, dispatch }, payload) => {
    commit("setIsLoading", true);
    try {
      const response = await fetch(
        `${config.dev.openLibUrl}/works/${state.bookId}.json`
      );
      if (response.status !== 200) {
        commit("setErrorMsg", "Error on fetching books");
      } else {
        const data = await response.json();
        // console.log("data", data);
        commit("setSingleBook", data);
        commit("setErrorMsg", "");
        // dispatch("setAuthorsInfoAction");
      }
    } catch (error) {
      console.log(error);
      commit("setErrorMsg", "Error on fetching books");
    }finally{
      commit("setIsLoading", false)
    }
  },

  // authors info
  setAuthorsInfoAction: async ({ commit, state }, payload) => {
    commit("setIsLoading", true);
    const authorsArray = []
    payload.forEach(async (aut, i) => {
      try {
        const authorRes = await fetch(
          `${config.dev.openLibUrl}${aut.author.key}.json`
        );
        const authorData = await authorRes.json();
        const imgId = authorData.key.split("/")[2]
        authorData.authorImg = `https://covers.openlibrary.org/a/olid/${imgId}-L.jpg`
        authorsArray.push(authorData);
        // console.log(" authorsArray", authorsArray);

      } catch (error) {
        console.log("error on getting authors data");
      }
    });
    commit("setAuthorsBio", authorsArray);
    console.log("updated authorsBio",state.authorsBio)
   commit("setIsLoading", false)
  }
}

const singleBookModule = {
  namespaced: true,
state,
getters,
mutations,
actions

};

export default singleBookModule;
