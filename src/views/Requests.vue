<template>
  <v-container>
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

              <br />
              <br />

              <v-list-item-subtitle
                ><b>Request user's name</b> -
                {{ book.request_user }}</v-list-item-subtitle
              >
              <v-list-item-subtitle
                ><b>Request user's email</b> -
                {{ book.request_email }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn color="error" depressed small @click="reject(index)"
              >Reject</v-btn
            >
            <v-btn color="success" depressed small @click="accept(index)"
              >Accept</v-btn
            >
          </v-card-actions>
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
  name: "book-requests",
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
            .where("done", "==", false)
            .where("request", "==", true)
            .where("uid", "==", user.uid)
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
        // console.log(e);
      }
    },
    accept(index) {
      const self = this;
      db.collection("books")
        .doc(this.books[index].id)
        .set(
          {
            done: true
          },
          { merge: true }
        )
        .then(function(querySnapshot) {
          self.books.splice(index, 1);
        });
    },
    reject(index) {
      const self = this;
      db.collection("books")
        .doc(this.books[index].id)
        .set(
          {
            request: false,
            request_email: "",
            request_user: "",
            request_uid: ""
          },
          { merge: true }
        )
        .then(function(querySnapshot) {
          self.books.splice(index, 1);
        });
    }
  }
};
</script>
