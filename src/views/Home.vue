<template>
  <div class="home">
    <v-row class="mt-12">
      <v-col v-for="(book, index) in books" :key="book.id" md="4" cols="12">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{ book.type }}</div>
              <v-list-item-title class="headline mb-1">{{
                book.name
              }}</v-list-item-title>
              <v-list-item-subtitle>{{
                book.description
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn color="primary" depressed small @click="show(index)"
              >Show details</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Owner details</v-card-title>

        <v-card-text>
          <p>Name: {{ this.name }}</p>
          <p>Email: {{ this.email }}</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
const firebase = require("firebase/app");
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
require("firebase/firestore");
const db = firebase.firestore();

export default {
  name: "Home",
  data: () => ({
    books: [],
    dialog: false,
    name: "",
    email: ""
  }),
  mounted() {
    this.getBooks();
  },
  methods: {
    getBooks() {
      const self = this;
      db.collection("books")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            self.books.push(doc.data());
          });
        });
    },
    show(index) {
      this.dialog = true;
      this.name = this.books[index].user;
      this.email = this.books[index].email;
    }
  }
};
</script>
