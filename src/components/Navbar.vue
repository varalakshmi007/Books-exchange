<template>
  <div>
    <v-app-bar
      app
      color="#fff"
      class="pl-7 pr-7 blue darken-1"
      dark
      :clipped-left="$vuetify.breakpoint.lgAndUp"
    >
      <template v-if="user.loggedIn">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

        <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
          <v-btn to="/dashboard" text>
            bookxchange
          </v-btn>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list class="text-center">
            <v-list-item>
              <v-btn @click.prevent="signOut" text>Sign out</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
          <v-btn to="/" text>
            bookxchange
          </v-btn>
        </v-toolbar-title>

        <v-spacer></v-spacer>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-if="user.loggedIn"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-item :key="item.text" link :to="item.link">
            <v-list-item-avatar>
              <v-icon class="green white--text">{{ item.icon }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const firebase = require("firebase/app");

export default {
  name: "Navbar",
  data: () => ({
    drawer: null,
    items: [
      { icon: "mdi-book-open-variant", text: "Dashboard", link: "/dashboard" },
      { icon: "mdi-book-outline", text: "Add book", link: "/add-book" },
      {
        icon: "mdi-bookmark-check",
        text: "Book Requests",
        link: "/book-requests"
      },
      {
        icon: "mdi-bookmark-check",
        text: "Received books",
        link: "/received-books"
      }
    ]
  }),
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch("clearData");
          this.$router.replace({
            name: "home"
          });
        });
    }
  }
};
</script>
