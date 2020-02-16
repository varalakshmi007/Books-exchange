<template>
  <v-container>
    <v-row class="mt-12">
      <v-col v-for="book in books" :key="book.id" md="4" cols="12">
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const firebase = require("firebase/app");
require("firebase/auth");
const db = firebase.firestore();

export default {
  name: "received",
  data: () => ({
    loadingAdd: false,
    books: []
  }),
  mounted() {
    this.getBooks();
  },
  methods: {
    getBooks() {
      try {
        firebase.auth().onAuthStateChanged(user => {
          const self = this;
          db.collection("books")
            .where("done", "==", true)
            .where("request_uid", "==", user.uid)
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                let book = doc.data();
                book.id = doc.id;
                self.books.push(book);
              });
            });
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
