import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

// Firebase App (the core Firebase SDK) is always required and must be listed first
const firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  appId: process.env.VUE_APP_APPID,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_DATABASEURL,
  measurementId: process.env.VUE_APP_MEASUREMENTID,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

const app = "";

// So that currentUser is accessed after completely loading the firebase.
firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
  if (!app) {
    new Vue({
      router,
      vuetify,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
