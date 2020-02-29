<template>
  <div class="root">
    <v-row>
      <v-col cols="12" md="6">
        <div class="mt-4 text-center">
          <h1>BookXChange</h1>
          <p>Next Generation Library</p>
          <h3>Need a book?</h3>
          <br />
          <p>
            Don't want to buy a book? <br /><b>OR</b><br />Is the book not
            available in the library?
          </p>
          <br />
        </div>
      </v-col>
      <v-col cols="12" class="mt-12" md="6">
        <h3 class="text-center mb-8">
          Sign in to BookXChange and get a book for free.
        </h3>
        <div id="firebaseui-auth-container"></div>
        <div id="loader" class="text-center">Loading...</div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
const firebase = require("firebase/app");

const firebaseui = require("firebaseui");
require("firebaseui/dist/firebaseui.css");

export default {
  name: "Home",
  mounted() {
    const self = this;
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          self.$router.replace({ name: "dashboard" });
          return true;
        },
        uiShown() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById("loader").style.display = "none";
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      credentialHelper: "none"
    };
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>

<style scoped>
.root {
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/library.jpeg");

  color: white;
  opacity: 1.2;
  font-weight: bold;
  font-size: 20px;
}
</style>
