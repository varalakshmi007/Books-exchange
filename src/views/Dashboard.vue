<template>
  <div class="home">
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
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-btn color="primary" depressed small @click="sendRequest(index)"
                >Place Request</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
require("firebase/firestore");
const db = firebase.firestore();

export default {
  name: "Dashboard",
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
        .where("done", "==", false)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let book = doc.data();
            book.id = doc.id;
            self.books.push(book);
          });
        });
    },
    sendRequest(index) {
      const currentUser = firebase.auth().currentUser;
      let self = this;
      db.collection("books")
        .doc(this.books[index].id)
        .set(
          {
            request: true,
            request_email: currentUser.email,
            request_user: currentUser.displayName,
            request_uid: currentUser.uid
          },
          { merge: true }
        )
        .then(function(docRef) {
          self.books.splice(index, 1);
        })
        .catch(function(error) {
          // console.error("Error adding document: ", error);
        });
    }
  }
};
</script>
