import config from "../../../config"
const state = {
  showSignIn: true,
  showPassword: false,
  isloggedIn: false,
  serverMessage: "",
  serverErrorMessage: "",
  user: {},

  signInUser: {
    email: "",
    password: ""
  },

  errorSignIn: {
    email: "",
    password: ""
  },

  registerUser: {
    email: "",
    password: "",
    repassword: "",
    firstName: "",
    lastName: ""
  },

  errorRegister: {
    email: "",
    password: "",
    repassword: "",
    firstName: "",
    lastName: ""
  }
};

const getters = {
  getCovers: state => {
    return state.singleBook.covers.map(
      cover => `${config.dev.openLibUrl}/b/id/${cover}-L.jpg`
    );
  }
};

const mutations = {
  setShowSignIn(state, payload) {
    state.showSignIn = payload;
  },

  setIsloggedIn(state, payload) {
    state.isloggedIn = payload;
  },

  setShowPassword(state, payload) {
    state.showPassword = payload;
  },

  setUser(state, payload) {
    state.user = payload;
  },

  setSignInUser(state, payload) {
    state.setSignInUser = payload;
  },

  setErrorSignIn(state, payload) {
    state.errorSignIn = payload;
  },

  setRegisterUser(state, payload) {
    state.registerUser = payload;
  },

  setErrorRegister(state, payload) {
    state.errorRegister = payload;
  },

  setServerMessage(state, payload) {
    state.serverMessage = payload;
  },

  setServerErrorMessage(state, payload) {
    state.serverErrorMessage = payload;
  }
};

const actions = {
  // to alter signin page and registration page
  setShowSignInAction: ({ commit, state }, payload) => {
    commit("setShowSignIn", payload);
  },

  // validate the registration before submiting
  validateRegisterAction: ({ commit, state }, payload) => {
    const regex = /\S+@\S+\.\S+/;
    let error = {};
    // validate first name
    if (!state.registerUser.firstName) {
      error.firstName = "first name is missing";
    } else if (state.registerUser.firstName.length < 2) {
      error.firstName = "first name must longer than 1 char";
    } else {
      error.firstName = "";
    }
    //validate last name
    if (!state.registerUser.lastName) {
      error.lastName = "last name is missing";
    } else if (state.registerUser.lastName.length < 2) {
      error.lastName = "last must be 2 or more char";
    } else {
      error.lastName = "";
    }
    // validat email
    if (!state.registerUser.email) {
      error.email = "email is missing";
    } else if (!regex.test(state.registerUser.email)) {
      error.email = "Email is not valid";
    } else {
      error.email = "";
    }
    // validate password
    if (!state.registerUser.password) {
      error.password = "password is missing";
    } else if (state.registerUser.password.length < 8) {
      error.password = "password must be 8 or more char ";
    } else {
      error.password = "";
    }
    if (!state.registerUser.repassword) {
      error.repassword = "repassword is missing";
    } else if (state.registerUser.repassword !== state.registerUser.password) {
      error.repassword = "password and repassword are different";
    } else {
      error.repassword = "";
    }
    commit("setErrorRegister", error);
  },

  // handle user registration
  setRegisterUserAction: async ({ commit, state }, payload) => {
    try {
      const response = await fetch(`${config.dev.beUrl}/users/register`, {
        method: "POST",
        body: JSON.stringify(state.registerUser),
        headers: {
          "content-type": "application/json"
        }
      });
      const data = await response.json();
      console.log(response.status)
      if (response.status > 204) {
        // setError(data.error);
        commit("setServerErrorMessage", "user already exist");
        setTimeout(() => commit("setServerErrorMessage", ""),5000);
      } else {
        console.log("from else part",data)
        commit("setRegisterUser", {
          email: "",
          password: "",
          repassword: "",
          firstName: "",
          lastName: ""
        });
        commit("setServerMessage", data.message);
        setTimeout(() => commit("setServerMessage", ""), 5000);
        return data.userId
      }
    } catch (error) {
      console.log(error);
    }
  },

// validate signin info before logging in
  validateFormSignInAction: ({ commit, state }, payload) => {
    const regex = /\S+@\S+\.\S+/;
    const error = {};
    if (!state.signInUser.email) {
      error.email = "email is missing";
    } else if (!regex.test(state.signInUser.email)) {
      error.email = "email is not valid";
    } else {
      error.email = "";
    }
    if (!state.signInUser.password) {
      error.password = "password is missing";
    } else if (state.signInUser.password.length < 8) {
      error.password = "password must be 8 or more char ";
    } else {
      error.password = "";
    }

    commit("setErrorSignIn", error);
  },

  // handle signin
  setSignInUserAction: async ({ commit, state }, payload) => {
    console.log("setSignInUSer", payload);
    try {
      const response = await fetch(`${config.dev.beUrl}/users/signin`, {
        method: "POST",
        body: JSON.stringify(state.signInUser),
        headers: {
          "content-type": "application/json"
        }
      });
      const data = await response.json();
      console.log(data);
      if (response.status > 204) {
        commit(
          "setServerErrorMessage",
          "Access denied - Invalid email or password"
        );
        setTimeout(() => commit("setServerErrorMessage", ""), 5000);
      } else {
        if (data.user && data.token) {
          console.log(data);
          localStorage.setItem("MyToken", data.token);
          commit("setUser", data.user);
          commit("setIsloggedIn", true);
          return true
        } else {
          commit("setServerMessage", data.message);
          setTimeout(() => commit("setServerMessage", ""), 5000);
          return false
        }
      }
    } catch (error) {
      console.log(error);
      return false
    }
  },

  // show hide password button control
  setShowPasswordAction: ({ commit, state }, payload) => {
    console.log("setShowPasswordAction", payload);
    commit("setShowPassword", payload);
  },

  // handle user verification waiting - verified from confirmation page
  setUserVerificationAction: async ({ commit, state }, payload) => {
    // console.log("setUserVerificationAction",payload)
    try {
      const response = await fetch(
        `${config.dev.beUrl}/users/confirmation/${payload}`,
        {
          method: "PUT"
        }
      );
      const data = await response.json();
      if(response.status > 204){
        console.log("verification failed")
      }else{
        localStorage.setItem("MyToken", data.token);
        commit("setUser", data.user)
        return true
      }
    } catch (error) {
      console.log(error)
    }
  },


// Get users info using token and me route
  async setUserAction({commit, state}, payload){
    try {
      const response = await fetch(`${config.dev.beUrl}/users/me`, {
        method: "GET",
        headers: {
          "authorization": payload
        }
      })
      const data  = await response.json()
      if(response.status > 204){
        commit(
          "setServerErrorMessage",
          "Error on getting user info"
          )

        }else{
          commit("setUser",data.user)
    }
   } catch (error) {
    console.log(error)
   }
  },

  //  resend Verification email
  async resendEmailVeriAction({commit, state}, payload){
    try {
      const response = await fetch(`${config.dev.beUrl}/users/resend/${payload}`, {
        method: "GET",
      })
      const data  = await response.json()
      if(response.status > 204){
        commit(
          "setServerErrorMessage",
          "Error on getting user info"
          )
          setTimeout(() => commit("setServerErrorMessage", ""), 5000);
        }else{
          return data
    }
   } catch (error) {
    console.log(error)
   }

  }
};


const loginModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default loginModule;
